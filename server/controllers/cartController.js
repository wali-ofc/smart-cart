const User = require('../models/User');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

const CART_POPULATE = { path: 'cart.product', select: 'name description price category image stock' };

/** GET /api/cart — current user's cart with populated products */
exports.getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate(CART_POPULATE);

  const cart = user.cart.map((ci) => ({
    product: ci.product,
    quantity: ci.quantity
  }));

  res.status(200).json({ success: true, count: cart.length, cart });
};

/** POST /api/cart — { product, quantity } adds/increments */
exports.addToCart = async (req, res) => {
  const { product: productId, quantity = 1 } = req.body || {};
  if (!productId) {
    throw new ApiError(400, 'Product id is required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const qty = Math.min(99, Math.max(1, Number(quantity) || 1));
  const user = await User.findById(req.user.id);

  const existing = user.cart.find((ci) => ci.product.toString() === productId);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + qty);
  } else {
    user.cart.push({ product: productId, quantity: qty });
  }

  await user.save();
  await user.populate(CART_POPULATE);

  res.status(201).json({ success: true, count: user.cart.length, cart: user.cart });
};

/** DELETE /api/cart/:productId — remove one product line */
exports.removeFromCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter((ci) => ci.product.toString() !== req.params.productId);
  await user.save();

  res.status(200).json({ success: true, count: user.cart.length, cart: user.cart });
};

/** DELETE /api/cart — empty the cart */
exports.clearCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = [];
  await user.save();

  res.status(200).json({ success: true, count: 0, cart: [] });
};