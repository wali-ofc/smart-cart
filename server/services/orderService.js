const Order = require('../models/Order');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * Allowed status transitions (decision log D8).
 * Seller drives fulfillment; delivery agent only completes or cancels the last leg.
 */
const SELLER_TRANSITIONS = {
  pending: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['cancelled'],
  delivered: ['cancelled']
};

const DELIVERY_TRANSITIONS = {
  shipped: ['delivered', 'cancelled']
};

/**
 * Create an order from the user's cart (spec POST /api/orders).
 * Calculates items_price/total_price, records the seller, clears the cart.
 */
exports.createOrder = async (userId, { shipping_address, payment_method, notes }) => {
  const user = await User.findById(userId).populate('cart.product', 'name price seller stock');

  if (!user || user.cart.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  const items = user.cart.map((ci) => {
    if (!ci.product) {
      throw new ApiError(400, 'One or more cart items are no longer available');
    }
    return {
      product: ci.product._id,
      name: ci.product.name,
      price: ci.product.price,
      quantity: ci.quantity
    };
  });

  const items_price = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  // MVP: single-seller order — records the first item's seller (schema constraint: one seller per order).
  // IMPORTANT: read `seller` from the POPULATED cart product — `items` above already replaced
  // `product` with the raw ObjectId (ci.product._id), which has no `.seller`.
  const firstProduct = user.cart[0].product;
  const seller = firstProduct && firstProduct.seller ? firstProduct.seller : undefined;

  const order = await Order.create({
    user: userId,
    items,
    shipping_address,
    payment_method,
    items_price,
    total_price: items_price,
    seller,
    notes: notes || undefined,
    status: 'pending'
  });

  user.cart = [];
  await user.save();

  return order;
};

/** Current user's order history (spec GET /api/orders). */
exports.getUserOrders = async (userId) => {
  return Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('items.product', 'name image price');
};

/** Order detail — owner, seller, or assigned agent may view (spec GET /api/orders/:id). */
exports.getOrderById = async ({ userId, role, orderId }) => {
  const order = await Order.findById(orderId)
    .populate('items.product', 'name image price description')
    .populate('user', 'name email profileImage');

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  // `user` is populated above → compare the embedded _id, not the rendered doc
  const isOwner = order.user._id.toString() === userId;
  const isSeller = order.seller && order.seller.toString() === userId;
  const isAgent = order.delivery_agent && order.delivery_agent.toString() === userId;
  if (!isOwner && !isSeller && !isAgent) {
    throw new ApiError(403, 'Not authorized to view this order');
  }

  return order;
};

/**
 * Update order status (spec PUT /api/orders/:id/status).
 * Seller drives pending→processing→shipped (+ optional delivery_agent assignment at ship time).
 * Delivery agent completes shipped→delivered or cancels.
 */
exports.updateOrderStatus = async ({ userId, role, orderId, status, delivery_agent }) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  const allowed = role === 'seller' ? SELLER_TRANSITIONS[order.status] : DELIVERY_TRANSITIONS[order.status];
  if (!allowed || !allowed.includes(status)) {
    throw new ApiError(400, `Cannot transition order from "${order.status}" to "${status}"`);
  }

  if (role === 'seller') {
    if (order.seller && order.seller.toString() !== userId) {
      throw new ApiError(403, 'Not authorized to update this order');
    }
    if (status === 'shipped' && delivery_agent) {
      order.delivery_agent = delivery_agent;
    }
  } else {
    if (!order.delivery_agent || order.delivery_agent.toString() !== userId) {
      throw new ApiError(403, 'Not authorized to update this order');
    }
  }

  order.status = status;
  await order.save();
  return order;
};