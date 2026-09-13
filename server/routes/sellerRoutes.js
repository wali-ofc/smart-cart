const express = require('express');
const {
  getDashboard,
  getMyProducts,
  getSellerOrders,
  getOrderStats,
  getSellerOrderDetail,
  getDeliveryAgents,
  createDeliveryAgent,
  deleteDeliveryAgent,
  getProductAnalytics,
  getPredictions
} = require('../controllers/sellerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All seller routes require the seller role
router.use(protect);
router.use(authorize('seller'));

// GET /api/seller/dashboard
router.get('/dashboard', getDashboard);

// GET /api/seller/predictions — demand forecasts + AI insights
router.get('/predictions', getPredictions);

// GET /api/seller/orders — order book (status filter + pagination)
router.get('/orders', getSellerOrders);

// GET /api/seller/orders/stats — status counts + frequency for charts
router.get('/orders/stats', getOrderStats);

// GET /api/seller/orders/:id — single order detail
router.get('/orders/:id', getSellerOrderDetail);

// Delivery agents (couriers) CRUD
router.get('/delivery-agents', getDeliveryAgents);
router.post('/delivery-agents', createDeliveryAgent);
router.delete('/delivery-agents/:id', deleteDeliveryAgent);

// GET /api/seller/products
router.get('/products', getMyProducts);

// GET /api/seller/products/:id/analytics
router.get('/products/:id/analytics', getProductAnalytics);

module.exports = router;