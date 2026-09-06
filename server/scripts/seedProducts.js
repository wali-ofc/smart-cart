// SmartCart product seed (plan Phase 4, decision D9).
//
// Reads the baked curated manifest server/scripts/seedData.json (50 products,
// 10 per spec category — generated ONCE from the retired static catalog) and
// upserts it into MongoDB as spec-shaped Product documents (documentation.md
// §3.2.2). Also creates the demo seller account used by the seller dashboards.
//
// SAFE TO RE-RUN: idempotent — products upsert by name, demo seller created once.
// WARNING: this is a DEVELOPMENT seed. Run against the local FYP db (or a fresh
// Atlas db). It never deletes existing products.
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

const Product = require('../models/Product');
const User = require('../models/User');

const seedData = require('./seedData.json');

const DEMO_SELLER_EMAIL = process.env.DEMO_SELLER_EMAIL || 'seller@smartcart.local';
const DEMO_SELLER_PASSWORD = process.env.DEMO_SELLER_PASSWORD || 'seller123';

// --- deterministic rating derivation (stars 3.6–4.9, count 0–150) per plan §6.2 ---
const hashString = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const deriveRating = (title) => {
  const rand = mulberry32(hashString(title));
  const stars = Math.round((3.6 + rand() * 1.3) * 10) / 10; // 3.6 – 4.9
  const count = Math.floor(rand() * 151); // 0 – 150
  return { stars, count };
};

// --- keywords + description from static fields (plan §6.2) ---
const STOPWORDS = new Set(['the', 'and', 'for', 'with', 'new', 'by', 'a', 'of', 'on', 'in', 'to']);

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));

const deriveKeywords = (entry) => {
  const tokens = [...tokenize(`${entry.title} ${entry.brand} ${entry.category}`)];
  return [...new Set(tokens)].slice(0, 10);
};

const deriveDescription = (entry) => {
  const category = entry.category;
  const brand = entry.brand || 'SmartCart';
  return `${entry.title} by ${brand} — a curated pick for SmartCart's ${category} collection.`;
};

// --- spec Product document mapping (documentation.md §3.2.2) ---
const toProductDoc = (entry, sellerId) => ({
  name: entry.title,
  description: deriveDescription(entry),
  price: entry.price,
  category: entry.category, // verbatim enum value from seedData.json
  subCategory: entry.brand || undefined,
  seller: sellerId, // demo seller owns the seeded catalog (seller dashboards + detail view)
  image: entry.imgSrc, // root-relative; served by the client origin (Vite dev / Vercel prod)
  keywords: deriveKeywords(entry),
  rating: deriveRating(entry.title),
  likes: [],
  stock: entry.isAvailable ? 10 : 0
});

const upsertProducts = async (sellerId) => {
  const byCategory = {};
  for (const entry of seedData) {
    const doc = toProductDoc(entry, sellerId);
    const filter = { name: doc.name };
    const update = { $set: doc };
    await Product.updateOne(filter, update, { upsert: true });
    byCategory[doc.category] = (byCategory[doc.category] || 0) + 1;
  }
  return byCategory;
};

const getOrCreateDemoSeller = async () => {
  const existing = await User.findOne({ email: DEMO_SELLER_EMAIL });
  if (existing) return existing;
  return User.create({
    name: 'SmartCart Demo Seller',
    email: DEMO_SELLER_EMAIL,
    password: DEMO_SELLER_PASSWORD,
    role: 'seller'
  });
};

(async () => {
  if (!Array.isArray(seedData) || seedData.length === 0) {
    console.error('seedData.json missing or empty — run the curation step first.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FYP', {
    serverSelectionTimeoutMS: 5000
  });
  console.log('connected:', mongoose.connection.host + '/' + mongoose.connection.name);

  const seller = await getOrCreateDemoSeller();
  console.log('demo seller:', seller.email, '(role: seller)');

  const byCategory = await upsertProducts(seller._id);
  console.log('seeded products per category:');
  for (const [category, count] of Object.entries(byCategory)) {
    console.log(`  ${category}: ${count}`);
  }
  console.log('total:', Object.values(byCategory).reduce((a, b) => a + b, 0));

  await mongoose.disconnect();
})().catch(async (err) => {
  console.error('SEED FAILED:', err.message);
  try { await mongoose.disconnect(); } catch (_) { /* noop */ }
  process.exit(1);
});