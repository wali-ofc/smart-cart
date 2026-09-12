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

/**
 * POST /api/cart — { product, quantity } adds/increments.
 * Stock reservation: every unit added to the cart is subtracted from
 * Product.stock (the same pool all customers draw from). Adding beyond the
 * available stock is capped; a fully-exhausted product rejects with 400.
 */
exports.addToCart = async (req, res) => {
  const { product: productId, quantity = 1 } = req.body || {};
  if (!productId) {
    throw new ApiError(400, 'Product id is required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  if (product.stock <= 0) {
    throw new ApiError(400, 'This product is out of stock and cannot be added to the cart');
  }

  const qty = Math.min(99, Math.max(1, Number(quantity) || 1));
  const user = await User.findById(req.user.id);

  const existing = user.cart.find((ci) => ci.product.toString() === productId);
  const held = existing ? existing.quantity : 0;
  // Units this call may reserve: at most what is still available.
  const added = Math.min(qty, product.stock);
  if (added <= 0) {
    throw new ApiError(400, 'Not enough stock available to add more of this product');
  }

  // Atomic reservation: decrement only if enough stock is still there.
  const reserved = await Product.updateOne(
    { _id: product._id, stock: { $gte: added } },
    { $inc: { stock: -added } }
  );
  if (reserved.modifiedCount === 0) {
    throw new ApiError(400, 'Not enough stock available to add more of this product');
  }

  const nextQuantity = Math.min(99, held + added);
  if (existing) {
    existing.quantity = nextQuantity;
  } else {
    user.cart.push({ product: productId, quantity: nextQuantity });
  }

  await user.save();
  await user.populate(CART_POPULATE);

  res.status(201).json({ success: true, count: user.cart.length, cart: user.cart });
};

/**
 * PUT /api/cart/:productId — { quantity } absolute set (spec F011 Update Quantity, decision D13).
 * Delta-modeled reservation: increasing the line reserves more stock, decreasing
 * releases the difference back to availability.
 */
exports.updateQuantity = async (req, res) => {
  const user = await User.findById(req.user.id);
  const line = user.cart.find((ci) => ci.product.toString() === req.params.productId);
  if (!line) {
    throw new ApiError(404, 'Product not in cart');
  }

  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const requested = Math.min(99, Math.max(1, Number(req.body?.quantity) || 1));
  // Absolute cap: what the user already holds plus what is still available.
  const maxTotal = Math.min(99, line.quantity + product.stock);
  const nextQuantity = Math.min(requested, maxTotal);
  const delta = nextQuantity - line.quantity;

  if (delta > 0) {
    const reserved = await Product.updateOne(
      { _id: product._id, stock: { $gte: delta } },
      { $inc: { stock: -delta } }
    );
    if (reserved.modifiedCount === 0) {
      throw new ApiError(400, 'Not enough stock available for that quantity');
    }
  } else if (delta < 0) {
    await Product.updateOne({ _id: product._id }, { $inc: { stock: -delta } });
  }

  line.quantity = nextQuantity;
  await user.save();
  await user.populate(CART_POPULATE);

  res.status(200).json({ success: true, count: user.cart.length, cart: user.cart });
};

/** DELETE /api/cart/:productId — remove one product line, releasing its reserved stock. */
exports.removeFromCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const line = user.cart.find((ci) => ci.product.toString() === req.params.productId);
  if (line) {
    await Product.updateOne({ _id: line.product }, { $inc: { stock: line.quantity } });
  }
  user.cart = user.cart.filter((ci) => ci.product.toString() !== req.params.productId);
  await user.save();

  res.status(200).json({ success: true, count: user.cart.length, cart: user.cart });
};

/** DELETE /api/cart — empty the cart, releasing every line's reserved stock. */
exports.clearCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const releases = user.cart.map((ci) =>
    Product.updateOne({ _id: ci.product }, { $inc: { stock: ci.quantity } })
  );
  await Promise.all(releases);

  user.cart = [];
  await user.save();

  res.status(200).json({ success: true, count: 0, cart: [] });
};