/**
 * TRANSITIONAL + FROZEN (Phase 3) — superseded by seller/order routes (§3.3.1):
 *   getAnalytics      → GET /api/seller/dashboard
 *   getProducts       → GET /api/seller/products
 *   getOrders         → GET /api/orders + dashboard recentOrders
 *   getCustomers      → dashboard totalCustomers
 *   updateOrderStatus → PUT /api/orders/:id/status (enforces D8 state machine)
 * Kept ONLY so the iframed admin-build dashboard (client/public/admin-build) keeps
 * rendering until React seller pages land (Phase 5) and this mount is removed (Phase 7).
 * Do NOT extend, fix, or reuse — add features to seller/order routes instead.
 */
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const outOfStock = await Product.countDocuments({ stock: 0 });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });
    
    // Revenue
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $in: ['processing', 'shipped', 'delivered'] } } },
      { $group: { _id: null, total: { $sum: '$total_price' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10).populate('user', 'name email profileImage');
    const topProducts = await Product.find().sort({ stock: -1 }).limit(10);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalProducts,
        totalCustomers,
        totalRevenue,
        outOfStock, deliveredOrders, cancelledOrders,
        recentOrders,
        topProducts
      }
    });
  } catch (error) {
    console.error('Admin Analytics Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email profileImage').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


