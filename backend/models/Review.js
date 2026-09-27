const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.Mixed, required: true },
  userEmail: { type: String, required: true },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema); 