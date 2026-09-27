import { API_BASE } from './api';
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Home from './components/Home';
import AdminStock from './components/AdminStock';
import AdminDashboard from './components/AdminDashboard';
import FrontPage from './components/FrontPage';
import AdminProducts from './components/AdminProducts';
import AddProduct from './components/AddProduct';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import SubcategoryProducts from './components/SubcategoryProducts';
import BuyNow from './components/BuyNow';
import Checkout from './components/Checkout';
import AdminUsers from './components/AdminUsers';
import AdminSettings from './components/AdminSettings';
import AdminOrders from './components/AdminOrders';
import UserOrders from './components/UserOrders';
import UserDashboard from './components/UserDashboard';

// Create CartWishlistContext
export const CartWishlistContext = createContext({
  cartCount: 0,
  wishlistCount: 0,
  setCartCount: () => {},
  setWishlistCount: () => {},
});

// Simple admin route protection
function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('adminToken');
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      Promise.all([
        fetch(`${API_BASE}/api/cart?email=${email}`),
        fetch(`${API_BASE}/api/wishlist?email=${email}`)
      ])
        .then(async ([cartRes, wishRes]) => {
          const cartData = await cartRes.json();
          const wishData = await wishRes.json();
          setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
          setWishlistCount((wishData.wishlist || []).length);
        })
        .catch(() => {
          setCartCount(0);
          setWishlistCount(0);
        });
    } else {
      setCartCount(0);
      setWishlistCount(0);
    }
  }, []);

  return (
    <CartWishlistContext.Provider value={{ cartCount, wishlistCount, setCartCount, setWishlistCount }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/stocks" element={
            <AdminRoute>
              <AdminStock />
            </AdminRoute>
          } />
          <Route path="/admin-dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />
          <Route path="/admin/settings" element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/category/:categoryName/:subcategoryName" element={<SubcategoryProducts />} />
          <Route path="/buy-now/:productId?" element={<BuyNow />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </CartWishlistContext.Provider>
  );
}

export default App;