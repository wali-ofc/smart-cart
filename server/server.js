const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ quiet: true });

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
const adminRoutes = require('./routes/adminRoutes'); // transitional — superseded by seller/delivery routes (Phase 3)

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
app.use('/api/admin', adminRoutes); // transitional

// Basic health route
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Production: serve the built React client (repo-root dist/ from `npm run build`)
// Express 5 note: SPA fallback uses a middleware, not app.get('*') (path-to-regexp v8).
if (process.env.NODE_ENV === 'production') {
  const distDir = path.resolve(__dirname, '..', 'dist');
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// 404 + central error handler — LAST (spec §4.2.1)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));