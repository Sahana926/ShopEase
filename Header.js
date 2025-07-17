import React, { useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CartWishlistContext } from '../App';
import logo from '../logo.png';



const Header = ({ showBack = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlistCount } = useContext(CartWishlistContext);

  const handleLogout = () => {
    localStorage.removeItem('email');
    alert('Logout successful!');
    navigate('/');
  };

  // Hide back button only on landing page
  const hideBack = location.pathname === "/";

  return (
    <nav className="home-navbar">
      <div className="navbar-left" style={{ display: 'flex', alignItems: 'center' }}>
        {!hideBack && (
          <button
            onClick={() => navigate(-1)}
            style={{
              marginRight: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#a76f3f',
            }}
            aria-label="Back"
          >
            &larr;
          </button>
        )}
        <img
          src={logo}
          alt="Ethnickart Logo"
          style={{ height: '48px', marginRight: '1rem', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        />
        <h1 style={{ margin: 0 }}>ShopEase</h1>
      </div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/about">About Us</Link>
        <Link to="/wishlist" className="wishlist-link" style={{ position: 'relative', marginLeft: '1.5rem' }}>
          <span role="img" aria-label="Wishlist" style={{ fontSize: '1.5rem' }}>❤️</span>
          {wishlistCount > 0 && (
            <span className="badge wishlist-badge">{wishlistCount}</span>
          )}
        </Link>
        <Link to="/cart" className="cart-link" style={{ position: 'relative', marginLeft: '1.5rem' }}>
          <span role="img" aria-label="Cart" style={{ fontSize: '1.5rem' }}>🛒</span>
          {cartCount > 0 && (
            <span className="badge cart-badge">{cartCount}</span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-500"
          style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', marginLeft: '1.5rem' }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header; 