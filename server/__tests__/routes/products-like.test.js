const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('../../routes/authRoutes');
const productRoutes = require('../../routes/productRoutes');
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
  app.use('/api/products', productRoutes);
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
const registerAgent = async (email = 'liker@example.com') => {
  const agent = supertest.agent(app);
  await agent
    .post('/api/auth/register')
    .send({ name: 'Like Tester', email, password: 'secret123' })
    .expect(201);
  return agent;
};

describe('Product likes API (spec §3.3.1 /api/products likes + client /likes)', () => {
  it('rejects unauthenticated like mutations and the likes list', async () => {
    const product = await Product.create(PRODUCT_BASE);
    await request.get('/api/products/likes').expect(401);
    await request.post(`/api/products/${product._id}/like`).expect(401);
    await request.delete(`/api/products/${product._id}/like`).expect(401);
  });

  it('exposes a public like status that starts false', async () => {
    const product = await Product.create(PRODUCT_BASE);
    const res = await request.get(`/api/products/${product._id}/like`).expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.liked).toBe(false);
    expect(res.body.likeCount).toBe(0);
  });

  it('likes a product (POST) and is idempotent', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    const first = await agent
      .post(`/api/products/${product._id}/like`)
      .expect(200);
    expect(first.body.success).toBe(true);
    expect(first.body.liked).toBe(true);
    expect(first.body.likeCount).toBe(1);

    const again = await agent
      .post(`/api/products/${product._id}/like`)
      .expect(200);
    expect(again.body.liked).toBe(true);
    expect(again.body.likeCount).toBe(1);
  });

  it('reflects the like in the public status endpoint', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post(`/api/products/${product._id}/like`).expect(200);

    const res = await agent.get(`/api/products/${product._id}/like`).expect(200);
    expect(res.body.liked).toBe(true);
    expect(res.body.likeCount).toBe(1);
  });

  it('unlikes a product (DELETE) and is idempotent', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post(`/api/products/${product._id}/like`).expect(200);
    const removed = await agent
      .delete(`/api/products/${product._id}/like`)
      .expect(200);
    expect(removed.body.success).toBe(true);
    expect(removed.body.liked).toBe(false);
    expect(removed.body.likeCount).toBe(0);

    const again = await agent
      .delete(`/api/products/${product._id}/like`)
      .expect(200);
    expect(again.body.liked).toBe(false);
    expect(again.body.likeCount).toBe(0);
  });

  it('returns my liked products via GET /api/products/likes', async () => {
    const agent = await registerAgent();
    const liked = await Product.create({
      ...PRODUCT_BASE,
      name: 'Liked Watch',
      price: 199.5
    });
    const ignored = await Product.create({
      ...PRODUCT_BASE,
      name: 'Ignored Lamp'
    });

    await agent.post(`/api/products/${liked._id}/like`).expect(200);

    const res = await agent.get('/api/products/likes').expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
    expect(res.body.products).toHaveLength(1);
    expect(res.body.products[0].name).toBe('Liked Watch');
    expect(res.body.products[0]._id.toString()).not.toBe(ignored._id.toString());
  });

  it('scopes liked listings per user', async () => {
    const alice = await registerAgent('alice@example.com');
    const bob = await registerAgent('bob@example.com');
    const product = await Product.create(PRODUCT_BASE);

    await alice.post(`/api/products/${product._id}/like`).expect(200);

    const aliceLikes = await alice.get('/api/products/likes').expect(200);
    expect(aliceLikes.body.count).toBe(1);

    const bobLikes = await bob.get('/api/products/likes').expect(200);
    expect(bobLikes.body.count).toBe(0);
  });

  it('returns 404 when liking a nonexistent product', async () => {
    const agent = await registerAgent();
    const ghost = new mongoose.Types.ObjectId().toString();
    await agent.post(`/api/products/${ghost}/like`).expect(404);
    await agent.get(`/api/products/${ghost}/like`).expect(404);
  });

  it('records likes on the Product document', async () => {
    const agent = await registerAgent();
    const product = await Product.create(PRODUCT_BASE);

    await agent.post(`/api/products/${product._id}/like`).expect(200);

    const stored = await Product.findById(product._id);
    const user = await User.findOne({ email: 'liker@example.com' });
    expect(stored.likes.map((id) => id.toString())).toContain(user._id.toString());
    expect(stored.likes).toHaveLength(1);
  });
});