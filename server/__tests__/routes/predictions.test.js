const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('../../routes/authRoutes');
const sellerRoutes = require('../../routes/sellerRoutes');
const { notFound, errorHandler } = require('../../middleware/errorMiddleware');

const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

let mongo;
let originalFetch;

const buildApp = () => {
  const app = express();
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);
  app.use('/api/seller', sellerRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

const PRODUCT = (overrides = {}) => ({
  name: 'Forecast Product',
  description: 'Used to verify the demand forecast service.',
  price: 10,
  category: 'Health & Fitness',
  image: '/images/products/test.jpg',
  stock: 5,
  ...overrides,
});

const SHIPPING = {
  street: '1 Test St',
  city: 'Karachi',
  state: 'Sindh',
  zip_code: '74000',
  country: 'Pakistan',
};

// Midday UTC timestamps for k days ago — avoids midnight date-boundary flakiness.
const noonDaysAgo = (k) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - k);
  return new Date(`${d.toISOString().slice(0, 10)}T12:00:00.000Z`);
};

beforeAll(async () => {
  originalFetch = global.fetch;
  // Simulate Ollama being absent so the service hits its deterministic fallback instantly.
  global.fetch = jest.fn().mockRejectedValue(new Error('Ollama not running (test)'));

  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await User.init();
  await Product.init();
  await Order.init();
});

afterAll(async () => {
  global.fetch = originalFetch;
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

const register = async ({ role = 'customer', email }) => {
  const agent = supertest.agent(app);
  const res = await agent.post('/api/auth/register').send({
    name: role === 'seller' ? 'Seller Tester' : 'Forecast Tester',
    email: email || `${role}@example.com`,
    password: 'secret123',
    role,
  });
  expect(res.status).toBe(201);
  return agent;
};

describe('GET /api/seller/predictions — demand forecast', () => {
  it('computes forecasts + stock risk from the last 28 days of orders', async () => {
    const seller = await register({ role: 'seller', email: 'seller@example.com' });
    const sellerDoc = await User.findOne({ email: 'seller@example.com' });
    const customer = await register({ email: 'buyer@example.com' });
    const customerDoc = await User.findOne({ email: 'buyer@example.com' });

    // Hot item: 1 unit/day for the last 7 days → rate 1/day → forecast30 = 30 ≥ stock 5 → critical.
    const hotItem = await Product.create(
      PRODUCT({ name: 'Hot Item', stock: 5, seller: sellerDoc._id })
    );
    // Medium item: same sales but plenty of stock → 40 days of cover → low.
    const mediumItem = await Product.create(
      PRODUCT({ name: 'Medium Item', stock: 40, seller: sellerDoc._id })
    );
    // Slow item: no sales at all → over (dormant), null days-of-stock.
    await Product.create(PRODUCT({ name: 'Slow Item', stock: 100, seller: sellerDoc._id }));

    for (let k = 0; k < 7; k++) {
      await Order.create({
        user: customerDoc._id,
        items: [
          { product: hotItem._id, name: 'Hot Item', price: 10, quantity: 1 },
          { product: mediumItem._id, name: 'Medium Item', price: 10, quantity: 1 },
        ],
        shipping_address: SHIPPING,
        payment_method: 'cod',
        seller: sellerDoc._id,
        status: 'processing',
        createdAt: noonDaysAgo(k),
      });
    }

    const res = await seller.get('/api/seller/predictions').expect(200);
    expect(res.body.success).toBe(true);

    const { summary, products, insights, aiAvailable, aiSummary, generatedAt } = res.body.data;

    expect(summary.productsAnalyzed).toBe(3);
    expect(summary.withSales).toBe(2);
    expect(summary.totalForecast7).toBe(14); // 7 units each for hot + medium
    expect(summary.totalForecast30).toBe(60); // 30 units each
    expect(summary.atRiskCount).toBe(2); // hot (critical) + medium (low)
    expect(generatedAt).toBeTruthy();

    // Graceful AI fallback when Ollama is unavailable — deterministic insights remain.
    expect(aiAvailable).toBe(false);
    expect(aiSummary).toBeNull();
    expect(Array.isArray(insights)).toBe(true);
    expect(insights.length).toBeGreaterThan(0);

    const byName = (name) => products.find((p) => p.name === name);
    const hot = byName('Hot Item');
    const medium = byName('Medium Item');
    const slow = byName('Slow Item');

    expect(hot.forecast30).toBe(30);
    expect(hot.forecast7).toBe(7);
    expect(hot.trend).toBe('rising');
    expect(hot.risk).toBe('critical');
    expect(hot.avgDailyUnits).toBe(1);

    expect(medium.forecast30).toBe(30);
    expect(medium.risk).toBe('low');
    expect(medium.daysOfStock).toBe(40);

    expect(slow.forecast30).toBe(0);
    expect(slow.trend).toBe('stable');
    expect(slow.risk).toBe('over');
    expect(slow.daysOfStock).toBeNull();

    // Sorted by forecast30 desc (top seller first).
    expect(products[0].forecast30).toBe(30);
  });

  it('rejects customers (403) and anonymous users (401)', async () => {
    const customer = await register({ email: 'buyer2@example.com' });
    await customer.get('/api/seller/predictions').expect(403);

    await supertest(app).get('/api/seller/predictions').expect(401);
  });
});