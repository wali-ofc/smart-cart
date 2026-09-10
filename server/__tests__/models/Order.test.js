const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Order = require('../../models/Order');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await Order.init();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map(c => c.deleteMany({})));
});

const buildOrder = overrides => ({
  user: new mongoose.Types.ObjectId(),
  items: [
    {
      product: new mongoose.Types.ObjectId(),
      name: 'Wireless Headphones',
      price: 129.99,
      quantity: 2
    }
  ],
  shipping_address: {
    street: '1 Main Street',
    city: 'Lahore',
    state: 'Punjab',
    zip_code: '54000',
    country: 'Pakistan'
  },
  payment_method: 'cod',
  items_price: 259.98,
  total_price: 259.98,
  status: 'pending',
  ...overrides
});

describe('Order model (spec §3.2.2)', () => {
  it('creates a valid order with spec defaults', async () => {
    const o = await Order.create(buildOrder());
    expect(o.status).toBe('pending');
    expect(o.items_price).toBe(259.98);
    expect(o.total_price).toBe(259.98);
    expect(o.items[0].name).toBe('Wireless Headphones'); // embedded name per spec
  });

  it('REJECTS the legacy "paid" status (dropped from spec enum)', async () => {
    await expect(Order.create(buildOrder({ status: 'paid' }))).rejects.toThrow();
  });

  it('accepts all 6 spec statuses', async () => {
    for (const status of ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']) {
      const o = await Order.create(buildOrder({ status }));
      expect(o.status).toBe(status);
    }
  });

  it('rejects an unknown status', async () => {
    await expect(Order.create(buildOrder({ status: 'dispatched' }))).rejects.toThrow();
  });

  it('rejects an invalid payment_method (spec enum: cod/card/other)', async () => {
    await expect(Order.create(buildOrder({ payment_method: 'cash' }))).rejects.toThrow();
  });

  it('accepts card and other payment methods', async () => {
    const card = await Order.create(buildOrder({ payment_method: 'card' }));
    const other = await Order.create(buildOrder({ payment_method: 'other' }));
    expect(card.payment_method).toBe('card');
    expect(other.payment_method).toBe('other');
  });

  it('rejects empty items array', async () => {
    await expect(Order.create(buildOrder({ items: [] }))).rejects.toThrow();
  });

  it('stores zip_code inside shipping_address (spec field name)', async () => {
    const o = await Order.create(buildOrder());
    expect(o.shipping_address.zip_code).toBe('54000');
  });

  it('rejects notes longer than 500 chars', async () => {
    await expect(Order.create(buildOrder({ notes: 'x'.repeat(501) }))).rejects.toThrow();
  });
});