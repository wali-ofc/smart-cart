const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('../../routes/authRoutes');
const cartRoutes = require('../../routes/cartRoutes');
const orderRoutes = require('../../routes/orderRoutes');
const { notFound, errorHandler } = require('../../middleware/errorMiddleware');

const Product = require('../../models/Product');
const User = require('../../models/User');
const Order = require('../../models/Order');

let mongo;

const buildApp = () => {
  const app = express();
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/orders', orderRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

const PRODUCT_BASE = {
  name: 'Fitness Band',
  description: 'Waterproof activity tracker with heart-rate monitor.',
  price: 49.99,
  category: 'Health & Fitness',
  image: '/images/products/fitness-band.jpg',
  stock: 10
};

const SHIPPING = {
  street: '1 Test St',
  city: 'Karachi',
  state: 'Sindh',
  zip_code: '74000',
  country: 'Pakistan'
};

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await User.init();
  await Product.init();
  await Order.init();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

const registerAgent = async ({ role = 'customer', email }) => {
  const agent = supertest.agent(app);
  const res = await agent
    .post('/api/auth/register')
    .send({
      name: role === 'customer' ? 'Order Tester' : 'Seller Tester',
      email: email || `${role}@example.com`,
      password: 'secret123',
      role
    });
  expect(res.status).toBe(201);
  return agent;
};

describe('Order stock lifecycle (reserve on cart, consume on checkout, release on cancel)', () => {
  it('reserves stock at cart-add, consumes it through checkout', async () => {
    const customer = await registerAgent({ email: 'buyer@example.com' });
    const product = await Product.create(PRODUCT_BASE);

    // customer reserves ALL stock (10/10)
    await customer
      .post('/api/cart')
      .send({ product: product._id.toString(), quantity: 10 })
      .expect(201);
    let doc = await Product.findById(product._id);
    expect(doc.stock).toBe(0);

    // checkout succeeds even though stock is exhausted (reservation held)
    const orderRes = await customer
      .post('/api/orders')
      .send({ shipping_address: SHIPPING, payment_method: 'cod' })
      .expect(201);
    expect(orderRes.body.success).toBe(true);
    expect(orderRes.body.data.items[0].quantity).toBe(10);

    // checkout clears the cart but keeps the stock consumed
    doc = await Product.findById(product._id);
    expect(doc.stock).toBe(0);

    const cart = await customer.get('/api/cart').expect(200);
    expect(cart.body.count).toBe(0);
  });

  it('releases reserved stock back when the order is cancelled', async () => {
    const customer = await registerAgent({ email: 'buyer2@example.com' });
    const seller = await registerAgent({ role: 'seller', email: 'seller@example.com' });
    const product = await Product.create({ ...PRODUCT_BASE, seller: null });

    await customer
      .post('/api/cart')
      .send({ product: product._id.toString(), quantity: 4 })
      .expect(201);
    expect((await Product.findById(product._id)).stock).toBe(6);

    const orderRes = await customer
      .post('/api/orders')
      .send({ shipping_address: SHIPPING, payment_method: 'card' })
      .expect(201);
    const orderId = orderRes.body.data._id;

    // seller cancels the pending order → stock returns to 10
    const cancel = await seller
      .put(`/api/orders/${orderId}/status`)
      .send({ status: 'cancelled' })
      .expect(200);
    expect(cancel.body.success).toBe(true);

    const doc = await Product.findById(product._id);
    expect(doc.stock).toBe(10);
  });

  it('does not double-release on a cancelled order', async () => {
    const customer = await registerAgent({ email: 'buyer3@example.com' });
    const seller = await registerAgent({ role: 'seller', email: 'seller3@example.com' });
    const product = await Product.create({ ...PRODUCT_BASE, stock: 7 });

    await customer
      .post('/api/cart')
      .send({ product: product._id.toString(), quantity: 3 })
      .expect(201);

    const orderRes = await customer
      .post('/api/orders')
      .send({ shipping_address: SHIPPING, payment_method: 'cod' })
      .expect(201);
    const orderId = orderRes.body.data._id;

    await seller
      .put(`/api/orders/${orderId}/status`)
      .send({ status: 'cancelled' })
      .expect(200);

    // a second cancel attempt from a terminal status is rejected by the transition map
    await seller
      .put(`/api/orders/${orderId}/status`)
      .send({ status: 'cancelled' })
      .expect(400);

    const doc = await Product.findById(product._id);
    expect(doc.stock).toBe(7);
  });
});