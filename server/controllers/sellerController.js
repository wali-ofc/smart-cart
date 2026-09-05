const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const productService = require('../services/productService');
const ApiError = require('../utils/ApiError');

const ACTIVE_ORDER_STATUSES = ['processing', 'shipped', 'delivered'];

/** GET /api/seller/dashboard — key metrics + recent orders for the seller */
exports.getDashboard = async (req, res) => {
  const sellerId = req.user.id;

  const [totalProducts, revenueAgg, totalCustomers, recentOrders] = await Promise.all([
    Product.countDocuments({ seller: sellerId }),
    Order.aggregate([
      { $match: { seller: sellerId, status: { $in: ACTIVE_ORDER_STATUSES } } },
      { $group: { _id: null, revenue: { $sum: '$total_price' }, orders: { $sum: 1 } } }
    ]),
    User.countDocuments({ role: 'customer' }),
    Order.find({ seller: sellerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email profileImage')
  ]);

  const stats = revenueAgg[0] || { revenue: 0, orders: 0 };

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalRevenue: stats.revenue,
      totalOrders: stats.orders,
      totalCustomers,
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
    { $match: { seller: req.user.id, status: { $in: ACTIVE_ORDER_STATUSES } } },
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