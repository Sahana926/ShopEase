const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  features: { type: [String], default: [] },
  image: { type: String },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema); 