const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000,
    trim: true
  }
}, { timestamps: true });

// Reviews for a product load by product (spec §4.2.2)
reviewSchema.index({ product: 1 });

// Ensure one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);