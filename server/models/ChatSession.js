const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'ai'],
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: {
    type: [messageSchema],
    default: []
  },
  context: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

// 30-day TTL — sessions auto-expire (spec §3.5.2 / §4.2.2)
chatSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 3600 });

module.exports = mongoose.model('ChatSession', chatSessionSchema);