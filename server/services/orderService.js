const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

/**
 * Allowed status transitions (decision log D8).
 * Seller drives fulfillment; delivery agent only completes or cancels the last leg.
 * `refunded` is seller-driven from any shipped/fulfilled stage (or mid-processing).
 */
const SELLER_TRANSITIONS = {
  pending: ['processing', 'shipped', 'cancelled'],
  processing: ['shipped', 'refunded', 'cancelled'],
  shipped: ['refunded', 'cancelled'],
  delivered: ['refunded', 'cancelled']
};

const DELIVERY_TRANSITIONS = {
  shipped: ['delivered', 'cancelled']
};

// Single source of truth for valid statuses (mirrors the model enum).
const ORDER_STATUSES = Order.schema.path('status').enumValues;

// Statuses a customer may cancel on their own (before the order ships).
const CUSTOMER_CANCELLABLE_STATUSES = ['pending', 'processing'];

/**
 * Release the reserved units of every line back to available stock.
 * Used on cancelled/refunded orders and on customer-deleted orders.
 */
const restockOrderItems = async (order) => {
  await Promise.all(
    order.items.map((item) =>
      Product.updateOne(
        { _id: item.product },
        { $inc: { stock: item.quantity } }
      )
    )
  );
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

/** A seller's order book: paginated + optional status filter (GET /api/seller/orders). */
exports.getSellerOrders = async ({ sellerId, status, page = 1, limit = 8 }) => {
  const query = { seller: sellerId };
  if (status && ORDER_STATUSES.includes(status)) {
    query.status = status;
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(50, Math.max(1, Number(limit) || 8));
  const skip = (pageNum - 1) * limitNum;

  const [orders, total] = await Promise.all([
    Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('user', 'name email')
      .populate('delivery_agent', 'name email'),
    Order.countDocuments(query)
  ]);

  return { orders, total, page: pageNum, pages: Math.ceil(total / limitNum) };
};

/** Order detail — owner, seller, or assigned agent may view (spec GET /api/orders/:id). */
exports.getOrderById = async ({ userId, role, orderId }) => {
  const order = await Order.findById(orderId)
    .populate('items.product', 'name image price description')
    .populate('user', 'name email')
    .populate('delivery_agent', 'name email');

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

  // A seller may (re)assign a courier on a shipped order even when the status
  // itself stays 'shipped' — the courier hand-off happens at ship time.
  const isCourierReassign =
    role === 'seller' &&
    order.status === 'shipped' &&
    status === 'shipped' &&
    !!delivery_agent;

  const allowed = role === 'seller' ? SELLER_TRANSITIONS[order.status] : DELIVERY_TRANSITIONS[order.status];
  if (!isCourierReassign && (!allowed || !allowed.includes(status))) {
    throw new ApiError(400, `Cannot transition order from "${order.status}" to "${status}"`);
  }

  if (role === 'seller') {
    if (order.seller && order.seller.toString() !== userId) {
      throw new ApiError(403, 'Not authorized to update this order');
    }
    if (delivery_agent) {
      order.delivery_agent = delivery_agent;
    }
  } else {
    if (!order.delivery_agent || order.delivery_agent.toString() !== userId) {
      throw new ApiError(403, 'Not authorized to update this order');
    }
  }

  order.status = status;
  await order.save();

  // Released on cancel/refund: the reserved units return to availability.
  // Role-agnostic — seller cancels (incl. refunds) and delivery-agent cancels
  // both hand the goods back to the seller's stock.
  if (status === 'cancelled' || status === 'refunded') {
    await restockOrderItems(order);
  }

  return order;
};

/**
 * Customer cancels their own order (DELETE /api/orders/:id).
 * Hard-deletes the order and releases its reserved stock back to availability.
 * Allowed only before shipping (pending / processing) — once the goods are in
 * transit, cancellation belongs to the seller/delivery flow.
 */
exports.deleteOrder = async ({ userId, orderId }) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  if (!CUSTOMER_CANCELLABLE_STATUSES.includes(order.status)) {
    throw new ApiError(
      400,
      `Order with status "${order.status}" can no longer be cancelled`
    );
  }

  await restockOrderItems(order);
  await order.deleteOne();

  return order;
};