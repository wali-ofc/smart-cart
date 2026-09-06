const { validationResult } = require('express-validator');
const orderService = require('../services/orderService');
const ApiError = require('../utils/ApiError');

const failed = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }
};

/** POST /api/orders — create order from cart */
exports.createOrder = async (req, res) => {
  failed(req);
  const { shipping_address, payment_method, notes } = req.body;
  const order = await orderService.createOrder(req.user.id, {
    shipping_address,
    payment_method,
    notes
  });

  res.status(201).json({ success: true, data: order });
};

/** GET /api/orders — current user's order history */
exports.getUserOrders = async (req, res) => {
  const orders = await orderService.getUserOrders(req.user.id);
  res.status(200).json({ success: true, count: orders.length, orders });
};

/** GET /api/orders/:id — owner/seller/agent scoped detail */
exports.getOrderById = async (req, res) => {
  const order = await orderService.getOrderById({
    userId: req.user.id,
    role: req.user.role,
    orderId: req.params.id
  });
  res.status(200).json({ success: true, data: order });
};

/** PUT /api/orders/:id/status — seller or delivery agent transitions */
exports.updateOrderStatus = async (req, res) => {
  const { status, delivery_agent } = req.body || {};
  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const order = await orderService.updateOrderStatus({
    userId: req.user.id,
    role: req.user.role,
    orderId: req.params.id,
    status,
    delivery_agent
  });
  res.status(200).json({ success: true, data: order });
};