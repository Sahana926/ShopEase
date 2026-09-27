const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: { type: [Object], default: [] } // Array of product objects or IDs
});

module.exports = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema); 