const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('../../routes/authRoutes');
const cartRoutes = require('../../routes/cartRoutes');
const { notFound, errorHandler } = require('../../middleware/errorMiddleware');

const Product = require('../../models/Product');
const User = require('../../models/User');

let mongo;

/** Self-contained app — mirrors server.js middleware order; never calls listen(). */
const buildApp = () => {
  const app = express();
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);
  app.use('/api/cart', cartRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

const app = buildApp();
const request = supertest(app);

const PRODUCT_BASE = {
  name: 'Wireless Headphones',
  description: 'Noise-cancelling over-ear wireless headphones with 30h battery.',
  price: 129.99,
  category: 'Electronics & Gadgets',
  image: '/images/products/headphones.jpg',
  stock: 25
};

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await User.init();
  await Product.init();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

/** Register a fresh customer and return a cookie-persisting agent. */
const registerAgent = async () => {
  const agent = supertest.agent(app);
  await agent
    .post('/api/auth/register')
    .send({ name: 'Cart Tester', email: 'cart@example.com', password: 'secret123' })
    .expect(201);
  return agent;
};

describe('Cart API (spec §3.3.1 /api/cart + F011 Update Quantity, D13)', () => {
  it('rejects unauthenticated access', async () => {
    await request.get('/api/cart').expect(401);
    await request.post('/api/cart').send({ product: new mongoose.Types.ObjectId() }).expect(401);
    await request.delete('/api/cart').expect(401);
  });

  it('starts with an empty cart', async () => {
    const agent = await registerAgent();
    const res = await agent.get('/api/cart').expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(0);
    expect(res.body.cart).toEqual([]);
  });

  it('adds a product to the cart', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    const res = await agent
      .post('/api/cart')
      .send({ product: product._id.toString(), quantity: 1 })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
    expect(res.body.cart[0].quantity).toBe(1);
    expect(res.body.cart[0].product._id.toString()).toBe(product._id.toString());
    expect(res.body.cart[0].product.name).toBe(PRODUCT_BASE.name);
    expect(res.body.cart[0].product.price).toBe(PRODUCT_BASE.price);
  });

  it('increments quantity when the same product is added again', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post('/api/cart').send({ product: product._id.toString() }).expect(201);
    const res = await agent
      .post('/api/cart')
      .send({ product: product._id.toString(), quantity: 2 })
      .expect(201);

    expect(res.body.count).toBe(1);
    expect(res.body.cart[0].quantity).toBe(3);
  });

  it('clamps add-to-cart quantity to a maximum of 99', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    const res = await agent
      .post('/api/cart')
      .send({ product: product._id.toString(), quantity: 150 })
      .expect(201);

    expect(res.body.cart[0].quantity).toBe(99);
  });

  it('updates quantity absolutely via PUT (F011 Update Quantity)', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post('/api/cart').send({ product: product._id.toString(), quantity: 1 }).expect(201);

    const res = await agent
      .put(`/api/cart/${product._id.toString()}`)
      .send({ quantity: 5 })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
    expect(res.body.cart[0].quantity).toBe(5);
  });

  it('clamps PUT quantity to the 1..99 range', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post('/api/cart').send({ product: product._id.toString(), quantity: 1 }).expect(201);

    const zero = await agent
      .put(`/api/cart/${product._id.toString()}`)
      .send({ quantity: 0 })
      .expect(200);
    expect(zero.body.cart[0].quantity).toBe(1);

    const huge = await agent
      .put(`/api/cart/${product._id.toString()}`)
      .send({ quantity: 1000 })
      .expect(200);
    expect(huge.body.cart[0].quantity).toBe(99);
  });

  it('returns 404 when updating a product that is not in the cart', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent
      .put(`/api/cart/${product._id.toString()}`)
      .send({ quantity: 2 })
      .expect(404);
  });

  it('removes one product line via DELETE /api/cart/:productId', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post('/api/cart').send({ product: product._id.toString() }).expect(201);

    const res = await agent.delete(`/api/cart/${product._id.toString()}`).expect(200);
    expect(res.body.count).toBe(0);
    expect(res.body.cart).toEqual([]);
  });

  it('clears the whole cart via DELETE /api/cart', async () => {
    const agent = await registerAgent();
    const [p1, p2] = await Promise.all([
      Product.create(PRODUCT_BASE),
      Product.create({ ...PRODUCT_BASE, name: 'Smart Watch', price: 199.5 })
    ]);

    await agent.post('/api/cart').send({ product: p1._id.toString() }).expect(201);
    await agent.post('/api/cart').send({ product: p2._id.toString() }).expect(201);

    const res = await agent.delete('/api/cart').expect(200);
    expect(res.body.count).toBe(0);
    expect(res.body.cart).toEqual([]);

    const after = await agent.get('/api/cart').expect(200);
    expect(after.body.count).toBe(0);
  });

  it('validates the product id on POST', async () => {
    const agent = await registerAgent();
    await agent.post('/api/cart').send({}).expect(400);
    await agent
      .post('/api/cart')
      .send({ product: new mongoose.Types.ObjectId().toString() })
      .expect(404);
  });

  it('stores the cart on the user document (server-synced cart)', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post('/api/cart').send({ product: product._id.toString(), quantity: 2 }).expect(201);

    const user = await User.findOne({ email: 'cart@example.com' });
    expect(user.cart).toHaveLength(1);
    expect(user.cart[0].quantity).toBe(2);
  });
});