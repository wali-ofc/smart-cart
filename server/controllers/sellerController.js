const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');
const productService = require('../services/productService');
const orderService = require('../services/orderService');
const predictionService = require('../services/predictionService');
const ApiError = require('../utils/ApiError');

const ACTIVE_ORDER_STATUSES = ['processing', 'shipped', 'delivered'];

// Aggregation $match does NOT auto-cast — match both ObjectId and String values for robust query matching.
const sellerMatch = (sellerId) => {
  if (mongoose.Types.ObjectId.isValid(sellerId)) {
    return {
      $or: [
        { seller: new mongoose.Types.ObjectId(sellerId) },
        { seller: String(sellerId) }
      ]
    };
  }
  return { seller: sellerId };
};

/** GET /api/seller/dashboard — §5.2 checklist: total revenue, orders this month, products listed, average rating, recent orders */
exports.getDashboard = async (req, res) => {
  const sellerId = req.user.id;
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [
    totalProducts,
    revenueAgg,
    ordersThisMonth,
    ratingAgg,
    totalCustomers,
    recentOrders
  ] = await Promise.all([
    Product.countDocuments({ seller: sellerId }),
    Order.aggregate([
      { $match: { ...sellerMatch(sellerId), status: { $in: ACTIVE_ORDER_STATUSES } } },
      { $group: { _id: null, revenue: { $sum: '$total_price' }, orders: { $sum: 1 } } }
    ]),
    // Orders placed this calendar month (any status — counts cancelled/pending placed this month too)
    Order.countDocuments({ seller: sellerId, createdAt: { $gte: monthStart } }),
    // Average of products that actually have ratings (unrated products would drag the mean to 0)
    Product.aggregate([
      { $match: { ...sellerMatch(sellerId), 'rating.count': { $gt: 0 } } },
      { $group: { _id: null, averageRating: { $avg: '$rating.stars' }, ratedProducts: { $sum: 1 } } }
    ]),
    User.countDocuments({ role: 'customer' }),
    Order.find({ seller: sellerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
  ]);

  const stats = revenueAgg[0] || { revenue: 0, orders: 0 };
  const rating = ratingAgg[0] || { averageRating: 0, ratedProducts: 0 };
  const averageRating = rating.ratedProducts ? Math.round(rating.averageRating * 10) / 10 : 0;

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalRevenue: stats.revenue,
      totalOrders: stats.orders,
      ordersThisMonth,
      totalCustomers,
      averageRating,
      ratedProducts: rating.ratedProducts,
      recentOrders
    }
  });
};

/** GET /api/seller/products — the seller's own products (paginated) */
exports.getMyProducts = async (req, res) => {
  const { page, limit, search } = req.query;
  const result = await productService.listProducts({ seller: req.user.id, page, limit, search });

  res.status(200).json({ success: true, count: result.products.length, ...result });
};

/** GET /api/seller/orders — the seller's order book (paginated, status filter) */
exports.getSellerOrders = async (req, res) => {
  const { status, page, limit } = req.query;
  const result = await orderService.getSellerOrders({
    sellerId: req.user.id,
    status,
    page,
    limit
  });

  res.status(200).json({ success: true, count: result.orders.length, ...result });
};

/** GET /api/seller/orders/stats — status counts + frequency data for charts */
exports.getOrderStats = async (req, res) => {
  const sellerId = req.user.id;
  const { period } = req.query; // 'all' | '1m' | '7d' | '24h'

  const now = new Date();
  let dateFilter = {};
  if (period === '1m') {
    dateFilter = { createdAt: { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) } };
  } else if (period === '7d') {
    dateFilter = { createdAt: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
  } else if (period === '24h') {
    dateFilter = { createdAt: { $gte: new Date(now - 24 * 60 * 60 * 1000) } };
  }

  const match = { ...sellerMatch(sellerId), ...dateFilter };

  // Status counts (always across all time for the stat boxes)
  const statusCountsAgg = await Order.aggregate([
    { $match: sellerMatch(sellerId) },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  const statusCounts = {};
  statusCountsAgg.forEach((r) => { statusCounts[r._id] = r.count; });

  // Frequency chart — grouped by day/hour depending on period
  let dateFormat;
  let groupKey;
  if (period === '24h') {
    dateFormat = '%Y-%m-%d %H:00';
    groupKey = { $dateToString: { format: dateFormat, date: '$createdAt' } };
  } else {
    dateFormat = '%Y-%m-%d';
    groupKey = { $dateToString: { format: dateFormat, date: '$createdAt' } };
  }

  const frequencyAgg = await Order.aggregate([
    { $match: match },
    { $group: { _id: groupKey, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  const frequency = frequencyAgg.map((r) => ({ date: r._id, count: r.count }));

  res.status(200).json({
    success: true,
    data: { statusCounts, frequency }
  });
};

/** GET /api/seller/orders/:id — single order detail for the seller */
exports.getSellerOrderDetail = async (req, res) => {
  const order = await orderService.getOrderById({
    userId: req.user.id,
    role: 'seller',
    orderId: req.params.id,
  });
  res.status(200).json({ success: true, data: order });
};

/** GET /api/seller/delivery-agents — list all delivery-role users (for courier dropdown) */
exports.getDeliveryAgents = async (req, res) => {
  const agents = await User.find({ role: 'delivery' }).select('name email createdAt');
  res.status(200).json({ success: true, agents });
};

/** POST /api/seller/delivery-agents — create a new delivery user */
exports.createDeliveryAgent = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email, and password are required');
  }
  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(400, 'A user with this email already exists');
  }

  const agent = await User.create({ name, email, password, role: 'delivery' });
  res.status(201).json({ success: true, agent: { _id: agent._id, name: agent.name, email: agent.email } });
};

/** DELETE /api/seller/delivery-agents/:id — remove a delivery user */
exports.deleteDeliveryAgent = async (req, res) => {
  const agent = await User.findOne({ _id: req.params.id, role: 'delivery' });
  if (!agent) {
    throw new ApiError(404, 'Delivery agent not found');
  }
  await agent.deleteOne();
  res.status(200).json({ success: true, data: {} });
};

/** GET /api/seller/products/:id/analytics — units sold / revenue / orders per product */
exports.getProductAnalytics = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, seller: req.user.id });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const agg = await Order.aggregate([
    { $match: { ...sellerMatch(req.user.id), status: { $in: ACTIVE_ORDER_STATUSES } } },
    { $unwind: '$items' },
    { $match: { 'items.product': product._id } },
    {
      $group: {
        _id: null,
        unitsSold: { $sum: '$items.quantity' },
        revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        orders: { $sum: 1 }
      }
    }
  ]);

  const stats = agg[0] || { unitsSold: 0, revenue: 0, orders: 0 };

  res.status(200).json({ success: true, data: { product, ...stats } });
};

/** GET /api/seller/predictions — demand forecasts (7/30-day), trend, stock risk + AI insights */
exports.getPredictions = async (req, res) => {
  const data = await predictionService.getPredictions(req.user.id);
  res.status(200).json({ success: true, data });
};