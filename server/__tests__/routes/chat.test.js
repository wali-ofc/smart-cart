const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('../../routes/authRoutes');
const cartRoutes = require('../../routes/cartRoutes');
const chatRoutes = require('../../routes/chatRoutes');
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
  app.use('/api/chat', chatRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

const app = buildApp();

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

const registerCustomerAgent = async () => {
  const agent = supertest.agent(app);
  const signupRes = await agent
    .post('/api/auth/register')
    .send({
      name: 'Chat Tester',
      email: `tester_${Date.now()}_${Math.random()}@example.com`,
      password: 'password123',
      role: 'customer'
    });
  expect(signupRes.status).toBe(201);
  return { agent, user: signupRes.body.user };
};

describe('Chat API (/api/chat - documentation.md §3.3.1 & §4.2.5)', () => {
  it('rejects unauthenticated requests to send chat messages', async () => {
    const res = await supertest(app)
      .post('/api/chat')
      .send({ message: 'hello' });
    expect(res.status).toBe(401);
  });

  describe('Cart Queries (Count, Total, Item Names)', () => {
    it('answers "how many items in cart" correctly for empty and non-empty carts', async () => {
      const { agent } = await registerCustomerAgent();

      // Empty cart query
      const emptyRes = await agent
        .post('/api/chat')
        .send({ message: 'how many items in cart' });
      expect(emptyRes.status).toBe(200);
      expect(emptyRes.body.success).toBe(true);
      expect(emptyRes.body.reply).toMatch(/cart is empty/i);

      // Create product and add to cart
      const product = await Product.create({
        name: 'Smart Watch Series 5',
        description: 'Fitness smartwatch with heart rate sensor.',
        price: 199.99,
        category: 'Electronics & Gadgets',
        image: '/images/products/watch.jpg',
        stock: 50
      });

      const addCartRes = await agent.post('/api/cart').send({ product: product._id.toString(), quantity: 3 });
      expect(addCartRes.status).toBe(201);

      // Non-empty cart query
      const cartRes = await agent
        .post('/api/chat')
        .send({ message: 'how many items are in my cart' });
      expect(cartRes.status).toBe(200);
      expect(cartRes.body.reply).toMatch(/3 items in your cart/i);
      expect(cartRes.body.actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'navigate', url: '/profile?section=cart' })
        ])
      );
    });

    it('answers "total cart amount" with accurate total price and breakdown', async () => {
      const { agent } = await registerCustomerAgent();

      const p1 = await Product.create({
        name: 'Wireless Earbuds',
        description: 'High quality bluetooth wireless earbuds.',
        price: 49.99,
        category: 'Electronics & Gadgets',
        image: '/images/products/earbuds.jpg',
        stock: 20
      });

      const p2 = await Product.create({
        name: 'Phone Case',
        description: 'Protective silicone phone case.',
        price: 15.00,
        category: 'Electronics & Gadgets',
        image: '/images/products/case.jpg',
        stock: 30
      });

      await agent.post('/api/cart').send({ product: p1._id.toString(), quantity: 2 }); // $99.98
      await agent.post('/api/cart').send({ product: p2._id.toString(), quantity: 1 }); // $15.00

      const res = await agent
        .post('/api/chat')
        .send({ message: 'what is my total cart amount?' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toMatch(/\$114\.98/);
      expect(res.body.reply).toMatch(/Wireless Earbuds x2/);
      expect(res.body.reply).toMatch(/Phone Case x1/);
    });

    it('answers "names of items in cart" listing each item name and subtotal', async () => {
      const { agent } = await registerCustomerAgent();

      const p1 = await Product.create({
        name: 'Leather Wallet',
        description: 'Genuine leather slim wallet.',
        price: 35.00,
        category: 'Fashion & Apparel',
        image: '/images/products/wallet.jpg',
        stock: 10
      });

      await agent.post('/api/cart').send({ product: p1._id.toString(), quantity: 1 });

      const res = await agent
        .post('/api/chat')
        .send({ message: 'names of items in cart' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toMatch(/Leather Wallet/i);
      expect(res.body.reply).toMatch(/\$35\.00/);
    });
  });

  describe('Order Queries (Price, Name/Items, Status, Details by Order Number)', () => {
    it('answers order price, items, status, and details using short ID or ObjectId', async () => {
      const { agent, user } = await registerCustomerAgent();

      const sellerUser = await User.create({
        name: 'Demo Seller',
        email: `seller_chat_${Date.now()}@example.com`,
        password: 'password123',
        role: 'seller'
      });

      const p1 = await Product.create({
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical gaming keyboard.',
        price: 120.00,
        category: 'Electronics & Gadgets',
        image: '/images/products/keyboard.jpg',
        stock: 10
      });

      const p2 = await Product.create({
        name: 'Gaming Mouse',
        description: 'Ergonomic optical gaming mouse.',
        price: 60.00,
        category: 'Electronics & Gadgets',
        image: '/images/products/mouse.jpg',
        stock: 15
      });

      // Create dummy order
      const order = await Order.create({
        user: user._id,
        seller: sellerUser._id,
        items: [
          { product: p1._id, name: p1.name, price: 120.00, quantity: 1 },
          { product: p2._id, name: p2.name, price: 60.00, quantity: 2 }
        ],
        shipping_address: {
          street: '123 Tech Lane',
          city: 'Innovation City',
          state: 'CA',
          zip_code: '90210',
          country: 'USA'
        },
        payment_method: 'card',
        items_price: 240.00,
        tax_price: 10.00,
        shipping_price: 5.00,
        total_price: 255.00,
        status: 'processing'
      });

      const fullId = order._id.toString();
      const shortId = fullId.slice(-6);

      // 1. Price of order by short ID
      const priceRes = await agent
        .post('/api/chat')
        .send({ message: `price of order #${shortId}` });
      expect(priceRes.status).toBe(200);
      expect(priceRes.body.reply).toMatch(/\$255\.00/);

      // 2. Names of items in order by short ID
      const itemsRes = await agent
        .post('/api/chat')
        .send({ message: `names of items in order ${shortId}` });
      expect(itemsRes.status).toBe(200);
      expect(itemsRes.body.reply).toMatch(/Mechanical Keyboard x1/i);
      expect(itemsRes.body.reply).toMatch(/Gaming Mouse x2/i);

      // 3. Status of order
      const statusRes = await agent
        .post('/api/chat')
        .send({ message: `status of order #${shortId.toUpperCase()}` });
      expect(statusRes.status).toBe(200);
      expect(statusRes.body.reply).toMatch(/Processing/i);

      // 4. Full details of order by full ObjectId
      const detailsRes = await agent
        .post('/api/chat')
        .send({ message: `details of order ${fullId}` });
      expect(detailsRes.status).toBe(200);
      expect(detailsRes.body.reply).toMatch(/Order #/);
      expect(detailsRes.body.reply).toMatch(/Status: Processing/);
      expect(detailsRes.body.reply).toMatch(/Total: \$255\.00/);
      expect(detailsRes.body.reply).toMatch(/123 Tech Lane/);
      expect(detailsRes.body.actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'navigate', url: `/orders/${fullId}` })
        ])
      );
    });

    it('handles non-existent order numbers gracefully', async () => {
      const { agent } = await registerCustomerAgent();

      const res = await agent
        .post('/api/chat')
        .send({ message: 'details of order #abcdef' });

      expect(res.status).toBe(200);
      expect(res.body.reply).toMatch(/couldn't find an order matching/i);
      expect(res.body.actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'navigate', url: '/profile?section=orders' })
        ])
      );
    });
  });
});
