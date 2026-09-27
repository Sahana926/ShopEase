const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: String,
  userName: String,
  shipping: Object,
  payment: String,  // keep this if it's needed for other details (like Stripe ID)
  paymentType: {
    type: String,
    enum: ['UPI', 'Card', 'Cash on Delivery'],
    default: 'Cash on Delivery'
  },
  productId: String,
  productName: String,
  productImage: String,
  amount: Number,
  status: { type: String, default: 'Placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
