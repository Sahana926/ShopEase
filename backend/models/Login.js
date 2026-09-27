const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  ip:        { type: String },
  date:      { type: Date, default: Date.now },
});

module.exports = mongoose.models.Login || mongoose.model('Login', loginSchema); 