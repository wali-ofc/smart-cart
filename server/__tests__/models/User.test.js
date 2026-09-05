const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/User');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await User.init(); // build indexes (unique email) before tests
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map(c => c.deleteMany({})));
});

describe('User model (spec §3.2.2)', () => {
  it('hashes password on save and verifies with comparePassword', async () => {
    const user = await User.create({
      name: 'Ali',
      email: 'ali@example.com',
      password: 'secret123',
      role: 'customer'
    });
    expect(user.password).not.toBe('secret123');
    expect(await user.comparePassword('secret123')).toBe(true);
    expect(await user.comparePassword('wrongpass')).toBe(false);
  });

  it('supports legacy matchPassword alias during transition', async () => {
    const user = await User.create({ name: 'Ali', email: 'legacy@example.com', password: 'secret123' });
    expect(await user.matchPassword('secret123')).toBe(true);
  });

  it('rejects name shorter than 2 characters', async () => {
    await expect(
      User.create({ name: 'A', email: 'a@example.com', password: 'secret123' })
    ).rejects.toThrow();
  });

  it('rejects password shorter than 6 characters', async () => {
    await expect(
      User.create({ name: 'Ali', email: 'a2@example.com', password: '12345' })
    ).rejects.toThrow();
  });

  it('rejects invalid email format', async () => {
    await expect(
      User.create({ name: 'Ali', email: 'not-an-email', password: 'secret123' })
    ).rejects.toThrow();
  });

  it('rejects invalid role', async () => {
    await expect(
      User.create({ name: 'Ali', email: 'ali3@example.com', password: 'secret123', role: 'admin' })
    ).rejects.toThrow();
  });

  it('enforces unique email', async () => {
    await User.create({ name: 'Ali', email: 'dup@example.com', password: 'secret123' });
    await expect(
      User.create({ name: 'Sara', email: 'dup@example.com', password: 'secret123' })
    ).rejects.toThrow();
  });

  it('stores server-synced cart items (product ref + quantity)', async () => {
    const user = await User.create({
      name: 'Ali',
      email: 'cart@example.com',
      password: 'secret123',
      cart: [{ product: new mongoose.Types.ObjectId(), quantity: 2 }]
    });
    expect(user.cart).toHaveLength(1);
    expect(user.cart[0].quantity).toBe(2);
  });

  it('toSafeJSON excludes the password hash (spec §4.2.2)', async () => {
    const user = await User.create({ name: 'Ali', email: 'safe@example.com', password: 'secret123' });
    const safe = user.toSafeJSON();
    expect(safe.password).toBeUndefined();
    expect(safe.name).toBe('Ali');
    expect(safe.email).toBe('safe@example.com');
    expect(Object.keys(safe)).toEqual(
      expect.arrayContaining(['_id', 'name', 'email', 'role', 'profileImage', 'cart'])
    );
  });

  it('getSignedToken returns a valid-shaped JWT (spec §4.2.2)', async () => {
    const user = await User.create({ name: 'Ali', email: 'jwt@example.com', password: 'secret123' });
    const token = user.getSignedToken();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });
});