const { validationResult } = require('express-validator');
const productService = require('../services/productService');
const ApiError = require('../utils/ApiError');

const failed = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }
};

/** GET /api/products — paginated list with category/search/price filters */
exports.getProducts = async (req, res) => {
  const { category, search, minPrice, maxPrice, page, limit, sort } = req.query;
  const result = await productService.listProducts({
    category,
    search,
    minPrice,
    maxPrice,
    page,
    limit,
    sort
  });

  res.status(200).json({ success: true, count: result.products.length, ...result });
};

/** GET /api/products/categories */
exports.getCategories = async (req, res) => {
  const categories = await productService.listCategories();
  res.status(200).json({ success: true, count: categories.length, categories });
};

/** GET /api/products/:id */
exports.getProduct = async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.status(200).json({ success: true, product });
};

/** GET /api/products/likes — protected; products the current user liked */
exports.getLikes = async (req, res) => {
  const products = await productService.getLikedProducts(req.user.id);
  res.status(200).json({ success: true, count: products.length, products });
};

/** GET /api/products/:id/like — public (optionalAuth); like status for current viewer */
exports.getLikeStatus = async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  const liked = req.user
    ? product.likes.some((id) => id.toString() === req.user.id)
    : false;

  res.status(200).json({ success: true, liked, likeCount: product.likes.length });
};

/** POST /api/products/:id/like — protected; idempotent add */
exports.addLike = async (req, res) => {
  const result = await productService.addLike(req.params.id, req.user.id);
  res.status(200).json({ success: true, ...result });
};

/** DELETE /api/products/:id/like — protected; idempotent remove */
exports.removeLike = async (req, res) => {
  const result = await productService.removeLike(req.params.id, req.user.id);
  res.status(200).json({ success: true, ...result });
};

/** POST /api/products — seller-only create */
exports.createProduct = async (req, res) => {
  failed(req);
  const product = await productService.createProduct({ ...req.body, seller: req.user.id });
  res.status(201).json({ success: true, product });
};

/** PUT /api/products/:id — seller-only update */
exports.updateProduct = async (req, res) => {
  failed(req);
  const product = await productService.updateProduct(req.params.id, req.user.id, req.body);
  res.status(200).json({ success: true, product });
};

/** DELETE /api/products/:id — seller-only delete */
exports.deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: {} });
};