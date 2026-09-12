// SmartCart — one-off maintenance: find & remove injection-probe content, disable spam bots.
//
// Default is DRY RUN (report only). Pass --apply to execute deletions.
// Usage: node scripts/cleanupInjections.js [--apply]
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

const Review = require('../models/Review');
const ChatSession = require('../models/ChatSession');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const APPLY = process.argv.includes('--apply');

// --- injection-probe patterns (conservative, case-insensitive) ---
const MATCHES = [
  // SQL / NoSQL injection probes
  /\b(sleep\s*\(|xp_cmdshell|union\s+(all\s+)?select|order\s+by\s+\d|'?\s*or\s+['"]?\d+['"]?\s*=\s*['"]?\d+|select\s+(login|password|username|user|pass|admin|@@version|database\(\))|insert\s+into|drop\s+table|alter\s+table|create\s+table|exec\s*\(|execute\s|--\s|\/\*)/i,
  // MongoDB operator / prototype pollution probes
  /\$where\b|\$gt\b|\$ne\b|\$inc\b|\$push\b|\$lookup\b|proto__|__proto__|constructor\s*\[/i,
  // XSS probes
  /(<script|<\/script|javascript:|onerror\s*=|onload\s*=|alert\s*\(|prompt\s*\()/i,
  // sqlmap artifact
  /SELECT\s+login/i,
];

const matchesAny = (text) => {
  if (!text) return false;
  return MATCHES.some((re) => re.test(text));
};

const preview = (str, len = 100) => {
  if (!str) return '';
  const one = str.replace(/\s+/g, ' ').trim();
  return one.length > len ? one.slice(0, len) + '...' : one;
};

// --- main ---
(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FYP', {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('connected:', mongoose.connection.host + '/' + mongoose.connection.name);

  // --- SCAN 1: Reviews ---
  const reviews = await Review.find({ comment: { $ne: '' } }).populate('user', 'email');
  const badReviews = reviews.filter((r) => matchesAny(r.comment));

  // --- SCAN 2: Chat messages ---
  const sessions = await ChatSession.find();
  const badChat = [];
  for (const session of sessions) {
    for (const msg of session.messages) {
      if (msg.sender === 'user' && matchesAny(msg.message)) {
        badChat.push({
          sessionId: session._id,
          messageId: msg._id,
          userId: session.user,
          messagePreview: preview(msg.message),
        });
      }
    }
  }

  // --- unique affected users (ObjectId strings) ---
  const affectedUserIds = new Set();
  for (const r of badReviews) affectedUserIds.add(r.user._id.toString());
  for (const c of badChat) affectedUserIds.add(c.userId.toString());

  // --- DRY RUN output ---
  if (!APPLY) {
    console.log('\nDRY RUN — no changes made. Re-run with --apply to delete.\n');

    if (badReviews.length === 0 && badChat.length === 0) {
      console.log('No injection-like content found. Nothing to do.');
      await mongoose.disconnect();
      return;
    }

    if (badReviews.length > 0) {
      console.log(`--- Reviews (${badReviews.length}) ---`);
      for (const r of badReviews) {
        console.log(`  reviewId:   ${r._id}`);
        console.log(`  productId:  ${r.product}`);
        console.log(`  user:       ${r.user.email}`);
        console.log(`  comment:    ${preview(r.comment)}`);
        console.log();
      }
    }

    if (badChat.length > 0) {
      console.log(`--- Chat messages (${badChat.length}) ---`);
      for (const c of badChat) {
        console.log(`  sessionId:  ${c.sessionId}`);
        console.log(`  messageId:  ${c.messageId}`);
        console.log(`  message:    ${c.messagePreview}`);
        console.log();
      }
    }

    // summary
    const emails = [];
    for (const uid of affectedUserIds) {
      const u = await User.findById(uid).select('email');
      if (u) emails.push(u.email);
    }
    console.log('--- Summary ---');
    console.log(`  Reviews found:          ${badReviews.length}`);
    console.log(`  Chat messages found:    ${badChat.length}`);
    console.log(`  Unique affected users:  ${emails.length}`);
    if (emails.length > 0) console.log(`  Emails:                 ${emails.join(', ')}`);

    await mongoose.disconnect();
    return;
  }

  // --- --apply: destructive operations ---
  if (badReviews.length === 0 && badChat.length === 0) {
    console.log('No injection-like content found. Nothing to do.');
    await mongoose.disconnect();
    return;
  }

  console.log('\nApplying cleanup...\n');

  // a. Delete matched reviews, collect affected product ids
  const affectedProductIds = new Set();
  let deletedReviews = 0;
  for (const r of badReviews) {
    await Review.deleteOne({ _id: r._id });
    affectedProductIds.add(r.product.toString());
    deletedReviews++;
    console.log(`  deleted review ${r._id} (product ${r.product}, user ${r.user.email})`);
  }

  // b. Recompute ratings for affected products
  let recompared = 0;
  for (const pid of affectedProductIds) {
    const agg = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(pid) } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    const stars = Math.round((agg[0]?.avg ?? 0) * 10) / 10;
    const count = agg[0]?.count ?? 0;
    await Product.updateOne({ _id: pid }, { $set: { rating: { stars, count } } });
    recompared++;
    console.log(`  recomputed rating for product ${pid}: stars=${stars}, count=${count}`);
  }

  // c. Remove matched chat messages
  let removedMessages = 0;
  for (const c of badChat) {
    await ChatSession.updateOne({ _id: c.sessionId }, { $pull: { messages: { _id: c.messageId } } });
    removedMessages++;
    console.log(`  removed chat message ${c.messageId} from session ${c.sessionId}`);
  }

  // d. Disable spam bot accounts (only if they have NO orders)
  let disabled = 0;
  let skipped = 0;
  for (const uid of affectedUserIds) {
    const hasOrders = await Order.exists({ user: uid });
    if (hasOrders) {
      const u = await User.findById(uid).select('email');
      console.log(`  SKIPPED ${u?.email ?? uid} (has orders) — review manually`);
      skipped++;
    } else {
      await User.updateOne({ _id: uid }, { $set: { disabled: true } });
      const u = await User.findById(uid).select('email');
      console.log(`  disabled account ${u?.email ?? uid}`);
      disabled++;
    }
  }

  // e. Final summary
  console.log('\n--- Summary ---');
  console.log(`  Deleted reviews:       ${deletedReviews}`);
  console.log(`  Removed chat messages:  ${removedMessages}`);
  console.log(`  Disabled accounts:     ${disabled}`);
  console.log(`  Skipped (has orders):  ${skipped}`);
  console.log(`  Recomputed products:   ${recompared}`);

  await mongoose.disconnect();
})().catch(async (err) => {
  console.error('CLEANUP FAILED:', err.message);
  try { await mongoose.disconnect(); } catch (_) { /* noop */ }
  process.exit(1);
});
