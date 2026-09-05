const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

const SORT_WHITELIST = {
  price: 'price',
  '-price': '-price',
  newest: '-createdAt',
  rating: '-rating.stars'
};

const UPDATABLE_FIELDS = [
  'name',
  'description',
  'price',
  'category',
  'subCategory',
  'image',
  'keywords',
  'stock'
];

/** Sanitize an update payload to whitelisted schema fields only. */
const pickUpdatable = (data) => {
  const patch = {};
  for (const key of UPDATABLE_FIELDS) {
    if (data[key] !== undefined) patch[key] = data[key];
  }
  return patch;
};

/** Paginated, filterable product listing (spec GET /api/products). */
exports.listProducts = async ({
  category,
  search,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
  sort = 'newest',
  seller
}) => {
  const query = {};

  if (category) query.category = category;
  if (search) query.$text = { $search: search };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (seller) query.seller = seller;

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(50, Math.max(1, Number(limit) || 10));
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query).sort(SORT_WHITELIST[sort] || '-createdAt').skip(skip).limit(limitNum),
    Product.countDocuments(query)
  ]);

  // Slim payload: expose likeCount instead of the raw likes id-array
  const slim = products.map((p) => {
    const doc = p.toObject();
    doc.likeCount = p.likes.length;
    delete doc.likes;
    return doc;
  });

  return { products: slim, total, page: pageNum, pages: Math.ceil(total / limitNum) };
};

/** All product categories (spec GET /api/products/categories). */
exports.listCategories = async () => {
  return Product.distinct('category');
};

/** Single product detail (spec GET /api/products/:id). */
exports.getProduct = async (productId) => {
  const product = await Product.findById(productId).populate('seller', 'name email profileImage');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

/** Create a product as a seller (spec POST /api/products). */
exports.createProduct = async (data) => {
  // seller is not a seller-editable field (excluded from pickUpdatable) but MUST be recorded
  const product = await Product.create({ ...pickUpdatable(data), seller: data.seller });
  return product;
};

/** Update a product, seller-owned only (spec PUT /api/products/:id). */
exports.updateProduct = async (productId, sellerId, data) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  if (product.seller && product.seller.toString() !== sellerId) {
    throw new ApiError(403, 'Not authorized to edit this product');
  }

  Object.assign(product, pickUpdatable(data));
  await product.save();
  return product;
};

/** Delete a product, seller-owned only (spec DELETE /api/products/:id). */
exports.deleteProduct = async (productId, sellerId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  if (product.seller && product.seller.toString() !== sellerId) {
    throw new ApiError(403, 'Not authorized to delete this product');
  }

  await product.deleteOne();
  return product;
};

/** Products the current user liked (spec GET /api/products/likes). */
exports.getLikedProducts = async (userId) => {
  return Product.find({ likes: userId });
};

/** Add a like (idempotent) — spec POST /api/products/:id/like. */
exports.addLike = async (productId, userId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  if (!product.likes.some((id) => id.toString() === userId)) {
    product.likes.push(userId);
    await product.save();
  }

  return { liked: true, likeCount: product.likes.length };
};

/** Remove a like (idempotent) — spec DELETE /api/products/:id/like. */
exports.removeLike = async (productId, userId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  if (product.likes.some((id) => id.toString() === userId)) {
    product.likes = product.likes.filter((id) => id.toString() !== userId);
    await product.save();
  }

  return { liked: false, likeCount: product.likes.length };
};