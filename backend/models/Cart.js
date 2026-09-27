const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: {
    type: [
      {
        id: { type: mongoose.Schema.Types.Mixed, required: true },
        name: { type: String },
        image: { type: String },
        price: { type: Number },
        rating: { type: Number },
        quantity: { type: Number, default: 1 },
        // ...other product fields
      }
    ],
    default: []
  }
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema); 