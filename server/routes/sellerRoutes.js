const express = require('express');
const {
  getDashboard,
  getMyProducts,
  getProductAnalytics
} = require('../controllers/sellerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All seller routes require the seller role
router.use(protect);
router.use(authorize('seller'));

// GET /api/seller/dashboard
router.get('/dashboard', getDashboard);

// GET /api/seller/products
router.get('/products', getMyProducts);

// GET /api/seller/products/:id/analytics
router.get('/products/:id/analytics', getProductAnalytics);

module.exports = router;