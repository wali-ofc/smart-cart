const Review = require('../models/Review');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

/** Recompute a product's aggregate rating { stars, count } from its reviews. */
const recomputeRating = async (productId) => {
  const agg = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  const { avg = 0, count = 0 } = agg[0] || {};
  await Product.findByIdAndUpdate(productId, {
    rating: { stars: Math.round(avg * 10) / 10, count }
  });
};

/** GET /api/reviews/product/:productId — public; reviews for a product */
exports.getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name profileImage')
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: reviews.length, reviews });
};

/** GET /api/reviews/my-reviews — protected; current user's reviews */
exports.getMyReviews = async (req, res) => {
  const reviews = await Review.find({ user: req.user.id })
    .populate('product', 'name image price')
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: reviews.length, reviews });
};

/** POST /api/reviews/product/:productId — protected; one review per user per product */
exports.createReview = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const existing = await Review.findOne({ product: product._id, user: req.user.id });
  if (existing) {
    throw new ApiError(400, 'You have already reviewed this product');
  }

  const review = await Review.create({
    user: req.user.id,
    product: product._id,
    rating: req.body.rating,
    comment: req.body.comment ?? ''
  });

  await recomputeRating(product._id);
  res.status(201).json({ success: true, data: review });
};

/** PUT /api/reviews/:id — protected; owner only */
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
  if (review.user.toString() !== req.user.id) {
    throw new ApiError(403, 'Not authorized to edit this review');
  }

  if (req.body.rating !== undefined) review.rating = req.body.rating;
  if (req.body.comment !== undefined) review.comment = req.body.comment;
  await review.save();

  await recomputeRating(review.product);
  res.status(200).json({ success: true, data: review });
};

/** DELETE /api/reviews/:id — protected; owner only */
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
  if (review.user.toString() !== req.user.id) {
    throw new ApiError(403, 'Not authorized to delete this review');
  }

  const productId = review.product;
  await review.deleteOne();

  await recomputeRating(productId);
  res.status(200).json({ success: true, data: {} });
};