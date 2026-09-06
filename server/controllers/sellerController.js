const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');
const productService = require('../services/productService');
const ApiError = require('../utils/ApiError');

const ACTIVE_ORDER_STATUSES = ['processing', 'shipped', 'delivered'];

// Aggregation $match does NOT auto-cast — a raw id string never matches an ObjectId field.
const sellerMatch = (sellerId) => ({ seller: new mongoose.Types.ObjectId(sellerId) });

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
      .populate('user', 'name email profileImage')
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