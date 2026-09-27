import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../logo.png';

const AdminHeader = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 2rem',
      height: 72,
      minHeight: 72,
      background: '#2d2d2d', color: '#fff', borderRadius: 8, marginBottom: 24,
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#ffd700', fontSize: 28, marginRight: 12, cursor: 'pointer', padding: 0 }}
          aria-label="Back"
        >
          &larr;
        </button>
        <img src={logo} alt="Shopease Logo" style={{ width: 48, height: 48, borderRadius: 8, marginRight: 14 }} />
        <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: 1 }}>Shopease Admin Panel</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/admin-dashboard" style={{ color: location.pathname === '/admin-dashboard' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Dashboard</Link>
        <Link to="/admin/stocks" style={{ color: location.pathname === '/admin/stocks' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Stock</Link>
        <Link to="/admin/orders" style={{ color: location.pathname === '/admin/orders' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Orders</Link>
        <Link to="/admin/products" style={{ color: location.pathname === '/admin/products' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Products</Link>
        <Link to="/admin/add-product" style={{ color: location.pathname === '/admin/add-product' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Add Product</Link>
        <Link to="/admin/users" style={{ color: location.pathname === '/admin/users' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Users</Link>
        <Link to="/admin/settings" style={{ color: location.pathname === '/admin/settings' ? '#ffd700' : '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Settings</Link>
        {onLogout && (
          <button onClick={onLogout} style={{ marginLeft: 32, background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.6rem 1.4rem', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem' }}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default AdminHeader; 