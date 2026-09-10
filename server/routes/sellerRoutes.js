const express = require('express');
const {
  getDashboard,
  getMyProducts,
  getSellerOrders,
  getOrderStats,
  getSellerOrderDetail,
  getProductAnalytics
} = require('../controllers/sellerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All seller routes require the seller role
router.use(protect);
router.use(authorize('seller'));

// GET /api/seller/dashboard
router.get('/dashboard', getDashboard);

// GET /api/seller/orders — order book (status filter + pagination)
router.get('/orders', getSellerOrders);

// GET /api/seller/orders/stats — status counts + frequency for charts
router.get('/orders/stats', getOrderStats);

// GET /api/seller/orders/:id — single order detail
router.get('/orders/:id', getSellerOrderDetail);

// GET /api/seller/products
router.get('/products', getMyProducts);

// GET /api/seller/products/:id/analytics
router.get('/products/:id/analytics', getProductAnalytics);

module.exports = router;