const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 200,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics & Gadgets',
      'Fashion & Apparel',
      'Beauty & Personal Care',
      'Home & Kitchen',
      'Health & Fitness'
    ]
  },
  subCategory: {
    type: String,
    trim: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  },
  keywords: [{
    type: String,
    trim: true
  }],
  rating: {
    stars: { type: Number, min: 0, max: 5, default: 0 },
    count: { type: Number, min: 0, default: 0 }
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, { timestamps: true });

// Text index for search (spec §4.2.2)
productSchema.index({ name: 'text', description: 'text', keywords: 'text' });

// Compound index for category+price filtering (spec §4.2.2)
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);