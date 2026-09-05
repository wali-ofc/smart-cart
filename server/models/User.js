const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'delivery'],
    default: 'customer'
  },
  cart: {
    type: [cartItemSchema],
    default: []
  },
  profileImage: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Hash password before saving (Mongoose 9: async hooks return, no next())
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method (spec §4.2.2)
userSchema.methods.comparePassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Back-compat alias so the current authController does not crash mid-transition
// (removed when authController lands in Phase 2)
userSchema.methods.matchPassword = userSchema.methods.comparePassword;

// Sign JWT (spec §4.2.2)
userSchema.methods.getSignedToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Safe serialization — never leak the password hash (spec §4.2.2)
userSchema.methods.toSafeJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    profileImage: this.profileImage,
    cart: this.cart,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);