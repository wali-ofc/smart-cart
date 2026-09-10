const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  zip_code: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: [items => items.length > 0, 'Order must contain at least one item']
  },
  shipping_address: {
    type: addressSchema,
    required: true
  },
  payment_method: {
    type: String,
    required: true,
    enum: ['cod', 'card', 'other']
  },
  items_price: {
    type: Number,
    min: 0,
    default: 0
  },
  total_price: {
    type: Number,
    min: 0,
    default: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  delivery_agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: 500,
    trim: true
  }
}, { timestamps: true });

// Index for owned-order history (spec §4.2.2)
orderSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);