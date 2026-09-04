const express = require('express');
const { getAnalytics, getProducts, getOrders, getCustomers, updateOrderStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('seller'));

router.get('/analytics', getAnalytics);
router.get('/products', getProducts);
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/customers', getCustomers);

module.exports = router;
