import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import logo from './logo.png';
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
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/category/:categoryName/:subcategoryName" element={<SubcategoryProducts />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </CartWishlistContext.Provider>
  );
}

export default App;