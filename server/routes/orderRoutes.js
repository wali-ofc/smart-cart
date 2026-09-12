const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All order routes are protected
router.use(protect);

// POST /api/orders — create from cart
router.post(
  '/',
  [
    body('shipping_address.street').notEmpty().withMessage('Street is required'),
    body('shipping_address.city').notEmpty().withMessage('City is required'),
    body('shipping_address.state').notEmpty().withMessage('State is required'),
    body('shipping_address.zip_code').notEmpty().withMessage('Zip code is required'),
    body('shipping_address.country').notEmpty().withMessage('Country is required'),
    body('payment_method')
      .isIn(['cod', 'card', 'other'])
      .withMessage('Payment method must be cod, card, or other'),
    body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes max 500 characters')
  ],
  createOrder
);

// GET /api/orders — my history
router.get('/', getUserOrders);

// GET /api/orders/:id
router.get('/:id', getOrderById);

// PUT /api/orders/:id/status — seller or delivery agent
router.put('/:id/status', updateOrderStatus);

// DELETE /api/orders/:id — customer cancels & deletes their own order
router.delete('/:id', deleteOrder);

module.exports = router;