require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || true,
  })
);
app.set('trust proxy', true); // so req.ip works properly

const mongoUri =
  process.env.MONGO_URI || 'mongodb://localhost:27017/ethnickart';

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

// --- Admin Auth Middleware ---
function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  if (token !== 'admin-static-token') {
    return res.status(403).json({ message: 'Invalid admin token' });
  }
  next();
}

module.exports = { verifyAdmin };

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

