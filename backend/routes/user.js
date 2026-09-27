const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Login = require('../models/Login');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyAdmin } = require('../index');

// User Schema
const userSchema = new mongoose.Schema({
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      { type: String, required: true },
  password:   { type: String, required: true },
  otp:        { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  address:    { type: String, default: '' },
  city:       { type: String, default: '' },
  zip:        { type: String, default: '' }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false
    });

    console.log(`OTP for ${email} (${phone}): ${otp}`);
    await user.save();
    console.log('User saved:', email);
    res.status(201).json({ message: 'OTP sent (check backend terminal for demo).', otpRequired: true });
  } catch (err) {
    console.log('Signup error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Confirm OTP
router.post('/confirm-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    if (!user.otp || !user.otpExpires) return res.status(400).json({ message: 'No OTP found. Please resend OTP.' });
    if (user.otp !== otp) return res.status(400).json({ message: 'OTP is not correct' });
    if (user.otpExpires < new Date()) return res.status(400).json({ message: 'OTP expired. Please resend OTP.' });
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Resend OTP
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
    console.log(`Resent OTP for ${email} (${user.phone}): ${otp}`);
    res.json({ message: 'OTP resent (check backend terminal for demo).' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your account with OTP before logging in.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });
    // ✅ Save login info in "login" collection
    await Login.create({
      userEmail: user.email,
      ip: req.ip
    });
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add to cart
router.post('/cart/add', async (req, res) => {
  const { email, product } = req.body;
  let cart = await Cart.findOne({ email });
  if (!cart) {
    cart = new Cart({ email, items: [{ ...product, quantity: 1 }] });
  } else {
    const idx = cart.items.findIndex(item => item.id === product.id);
    if (idx === -1) {
      cart.items.push({ ...product, quantity: 1 });
    } else {
      cart.items[idx].quantity += 1;
    }
  }
  await cart.save();
  res.json({ message: 'Added to cart', cart: cart.items });
});
// Remove from cart (decrement or remove)
router.post('/cart/remove', async (req, res) => {
  const { email, productId } = req.body;
  try {
    let cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const idx = cart.items.findIndex(item => item.id === productId);
    if (idx === -1) return res.status(404).json({ message: 'Product not in cart' });
    if (cart.items[idx].quantity > 1) {
      cart.items[idx].quantity -= 1;
    } else {
      cart.items.splice(idx, 1);
    }
    await cart.save();
    res.json({ message: 'Removed from cart', cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Update cart quantity
router.post('/cart/update-quantity', async (req, res) => {
  const { email, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const idx = cart.items.findIndex(item => item.id === productId);
    if (idx === -1) return res.status(404).json({ message: 'Product not in cart' });
    if (quantity < 1) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = quantity;
    }
    await cart.save();
    res.json({ message: 'Cart updated', cart: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Get cart (ensures image URLs for all items)
router.get('/cart', async (req, res) => {
  const { email } = req.query;
  try {
    let cart = await Cart.findOne({ email });
    const items = cart ? cart.items : [];
    const productsData = require('../productsData');
    const imageMap = {};
    productsData.forEach(p => { if (p.image) imageMap[p.name] = p.image; });
    const formattedItems = items.map(item => {
      const obj = item.toObject ? item.toObject() : item;
      if (!obj.image || obj.image.includes('via.placeholder.com')) {
        obj.image = imageMap[obj.name] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop';
      }
      return obj;
    });
    res.json({ cart: formattedItems });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Add to wishlist
router.post('/wishlist/add', async (req, res) => {
  const { email, product } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ email });
    if (!wishlist) {
      wishlist = new Wishlist({ email, items: [product] });
    } else {
      // Prevent duplicates
      if (!wishlist.items.some(item => item.id === product.id)) {
        wishlist.items.push(product);
      }
    }
    await wishlist.save();
    res.json({ message: 'Added to wishlist', wishlist: wishlist.items });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Remove from wishlist
router.post('/wishlist/remove', async (req, res) => {
  const { email, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ email });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    wishlist.items = wishlist.items.filter(item => item.id !== productId);
    await wishlist.save();
    res.json({ message: 'Removed from wishlist', wishlist: wishlist.items });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Get wishlist (ensures image URLs for all items)
router.get('/wishlist', async (req, res) => {
  const { email } = req.query;
  try {
    let wishlist = await Wishlist.findOne({ email });
    const items = wishlist ? wishlist.items : [];
    const productsData = require('../productsData');
    const imageMap = {};
    productsData.forEach(p => { if (p.image) imageMap[p.name] = p.image; });
    const formattedItems = items.map(item => {
      const obj = item.toObject ? item.toObject() : item;
      if (!obj.image || obj.image.includes('via.placeholder.com')) {
        obj.image = imageMap[obj.name] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop';
      }
      return obj;
    });
    res.json({ wishlist: formattedItems });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a review
router.post('/review', async (req, res) => {
  const { productId, userEmail, reviewText } = req.body;
  if (!productId || !userEmail || !reviewText) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const review = new Review({ productId, userEmail, reviewText });
    await review.save();
    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Get all reviews for a product
router.get('/review', async (req, res) => {
  const { productId } = req.query;
  if (!productId) return res.status(400).json({ message: 'Missing productId' });
  try {
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    // For each review, get the user's name
    const emails = [...new Set(reviews.map(r => r.userEmail))];
    const users = await User.find({ email: { $in: emails } });
    const userMap = {};
    users.forEach(u => { userMap[u.email] = u; });
    const reviewsWithName = reviews.map(r => ({
      ...r.toObject(),
      firstName: userMap[r.userEmail]?.firstName || '',
      lastName: userMap[r.userEmail]?.lastName || ''
    }));
    res.json({ reviews: reviewsWithName });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new product (admin only)
router.post('/products', async (req, res) => {
  // Simple admin check: require adminEmail in body
  const { adminEmail, name, category, subcategory, price, features, image, stock, rating } = req.body;
  if (adminEmail !== 'admin@shopease.com') {
    return res.status(403).json({ message: 'Only admin can add products' });
  }
  try {
    const product = new Product({ name, category, subcategory, price, features, image, stock, rating });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all products (auto-seeds & ensures image URLs)
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();
    if (!products || products.length === 0) {
      const productsData = require('../productsData');
      await Product.insertMany(productsData);
      products = await Product.find();
    }
    const productsData = require('../productsData');
    const imageMap = {};
    productsData.forEach(p => { if (p.image) imageMap[p.name] = p.image; });
    const formattedProducts = products.map(p => {
      const obj = p.toObject ? p.toObject() : p;
      if (!obj.image || obj.image.includes('via.placeholder.com')) {
        obj.image = imageMap[obj.name] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop';
      }
      return obj;
    });
    res.json({ products: formattedProducts });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update product stock (admin only)
router.patch('/products/:id/stock', async (req, res) => {
  const { adminEmail, stock } = req.body;
  if (adminEmail !== 'admin@shopease.com') {
    return res.status(403).json({ message: 'Only admin can update stock' });
  }
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Stock updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update product fields (admin only)
router.patch('/products/:id', async (req, res) => {
  const { adminEmail, rating } = req.body;
  if (adminEmail !== 'admin@shopease.com') {
    return res.status(403).json({ message: 'Only admin can update products' });
  }
  try {
    const update = {};
    if (rating !== undefined) update.rating = rating;
    // Add more fields here if needed
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a product (admin only)
router.delete('/products/:id', async (req, res) => {
  const { adminEmail } = req.body;
  if (adminEmail !== 'admin@shopease.com') {
    return res.status(403).json({ message: 'Only admin can delete products' });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// --- Admin: Get all products ---
router.get('/admin/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Admin: Update product stock ---
router.put('/admin/products/:id', async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Place a new order
router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Get orders (all or by user)
router.get('/orders', async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { userEmail: email } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Cancel an order
router.post('/orders/cancel', async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: 'Missing orderId' });
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order cancelled', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user by email
router.get('/user', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Missing email' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Update user address
router.post('/user/address', async (req, res) => {
  const { email, name, phone, address, city, zip } = req.body;
  if (!email) return res.status(400).json({ message: 'Missing email' });
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { firstName: name, phone, address, city, zip },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 