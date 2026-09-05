const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../../models/Product');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await Product.init(); // build text + compound indexes before tests
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map(c => c.deleteMany({})));
});

const base = {
  name: 'Wireless Headphones',
  description: 'Noise-cancelling over-ear wireless headphones with 30h battery.',
  price: 129.99,
  category: 'Electronics & Gadgets',
  image: '/images/products/headphones.jpg',
  stock: 25
};

describe('Product model (spec §3.2.2)', () => {
  it('creates a valid product with spec defaults', async () => {
    const p = await Product.create(base);
    expect(p.rating).toEqual({ stars: 0, count: 0 });
    expect(p.keywords).toEqual([]);
    expect(p.likes).toEqual([]);
    expect(p.stock).toBe(25);
  });

  it('rejects an unknown category (spec enum only)', async () => {
    await expect(Product.create({ ...base, category: 'Groceries' })).rejects.toThrow();
  });

  it('accepts each of the 5 spec categories', async () => {
    const categories = [
      'Electronics & Gadgets',
      'Fashion & Apparel',
      'Beauty & Personal Care',
      'Home & Kitchen',
      'Health & Fitness'
    ];
    for (const category of categories) {
      const p = await Product.create({ ...base, category, name: `${category} item` });
      expect(p.category).toBe(category);
    }
  });

  it('rejects negative price and stock', async () => {
    await expect(Product.create({ ...base, price: -5 })).rejects.toThrow();
    await expect(Product.create({ ...base, stock: -1 })).rejects.toThrow();
  });

  it('rejects name > 200 chars and description > 2000 chars', async () => {
    await expect(Product.create({ ...base, name: 'x'.repeat(201) })).rejects.toThrow();
    await expect(Product.create({ ...base, description: 'x'.repeat(2001) })).rejects.toThrow();
  });

  it('supports text search across name/description/keywords (spec §4.2.2)', async () => {
    await Product.create(base);
    await Product.create({
      ...base,
      name: 'Yoga Mat',
      category: 'Health & Fitness',
      description: 'Eco-friendly yoga mat',
      keywords: ['exercise', 'fitness']
    });
    const hits = await Product.find({ $text: { $search: 'headphones' } });
    expect(hits).toHaveLength(1);
    expect(hits[0].name).toBe('Wireless Headphones');

    const keywordHits = await Product.find({ $text: { $search: 'exercise' } });
    expect(keywordHits).toHaveLength(1);
    expect(keywordHits[0].name).toBe('Yoga Mat');
  });

  it('supports compound category+price filtering (spec §4.2.2)', async () => {
    await Product.create(base);
    await Product.create({
      ...base,
      name: 'Bluetooth Speaker',
      price: 59.99,
      category: 'Electronics & Gadgets'
    });
    await Product.create({
      ...base,
      name: 'Denim Jacket',
      price: 49.99,
      category: 'Fashion & Apparel'
    });
    const hits = await Product.find({
      category: 'Electronics & Gadgets',
      price: { $gte: 50, $lte: 200 }
    });
    expect(hits).toHaveLength(2); // headphones + speaker, NOT the jacket
  });

  it('accepts rating object and likes array', async () => {
    const p = await Product.create({
      ...base,
      rating: { stars: 4.5, count: 12 },
      likes: [new mongoose.Types.ObjectId()]
    });
    expect(p.rating.stars).toBe(4.5);
    expect(p.rating.count).toBe(12);
    expect(p.likes).toHaveLength(1);
  });

  it('rejects rating stars out of 0-5 range', async () => {
    await expect(Product.create({ ...base, rating: { stars: 6, count: 1 } })).rejects.toThrow();
  });
});