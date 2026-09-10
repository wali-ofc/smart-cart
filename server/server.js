const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ quiet: true, path: path.join(__dirname, '.env') });

const connectDB = require('./config/database');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const chatRoutes = require('./routes/chatRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middleware — spec §4.2.1 order: CORS → body → cookie → routes → error LAST
// CORS — dev allows Vite origins; production allows the Hostinger site (CLIENT_URL env overrides)
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [process.env.CLIENT_URL || 'https://olive-jay-713205.hostingersite.com']
    : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Serve uploaded images statically
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// Database connection
connectDB();

// Route groups — spec §3.3.1
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);

// Basic health route
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Serve the built React client (repo-root dist/ from `npm run build`).
// Activated whenever a build actually exists — not gated solely on NODE_ENV —
// so a missing/incorrect NODE_ENV on the host can't turn the site into a JSON 404.
// Express 5 note: SPA fallback uses a middleware, not app.get('*') (path-to-regexp v8).
const distDir = path.resolve(__dirname, '..', 'dist');
const hasBuild = fs.existsSync(path.join(distDir, 'index.html'));
if (process.env.NODE_ENV === 'production' || hasBuild) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  console.warn('[server] dist/index.html not found — run `npm run build` at the repo root to serve the client (non-API routes will 404).');
}

// 404 + central error handler — LAST (spec §4.2.1)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));