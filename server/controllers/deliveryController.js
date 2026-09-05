const Order = require('../models/Order');
const ApiError = require('../utils/ApiError');

/** GET /api/delivery/assigned — orders assigned to me and in transit */
exports.getAssigned = async (req, res) => {
  const orders = await Order.find({
    delivery_agent: req.user.id,
    status: { $in: ['shipped', 'delivered'] }
  })
    .sort({ createdAt: -1 })
    .populate('user', 'name email profileImage')
    .populate('items.product', 'name image price');

  res.status(200).json({ success: true, count: orders.length, orders });
};

/** PUT /api/delivery/:orderId/status — shipped → delivered (or cancelled) */
exports.updateStatus = async (req, res) => {
  const { status } = req.body || {};
  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const order = await Order.findById(req.params.orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  if (!order.delivery_agent || order.delivery_agent.toString() !== req.user.id) {
    throw new ApiError(403, 'This order is not assigned to you');
  }

  const allowed = order.status === 'shipped' ? ['delivered', 'cancelled'] : [];
  if (!allowed.includes(status)) {
    throw new ApiError(400, `Cannot transition order from "${order.status}" to "${status}"`);
  }

  order.status = status;
  await order.save();

  res.status(200).json({ success: true, order });
};