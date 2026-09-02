const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(query);

    res.status(200).json({ success: true, count: products.length, total, products });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'username profileImage');
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};
