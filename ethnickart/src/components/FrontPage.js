import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const FrontPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '3rem 2.5rem', textAlign: 'center', maxWidth: 400 }}>
        <img src={logo} alt="Shopease Logo" style={{ width: 90, marginBottom: 18 }} />
        <h1 style={{ color: '#a76f3f', fontWeight: 800, fontSize: '2.2rem', marginBottom: 10 }}>ShopEase</h1>
        <div style={{ fontSize: '1.1rem', color: '#6b3e26', marginBottom: 28, fontStyle: 'italic' }}>
          “Shop the best, from the best.”
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button onClick={() => navigate('/login')} style={btnStyle}>User Login</button>
          <button onClick={() => navigate('/admin/login')} style={{ ...btnStyle, background: '#2d2d2d', color: '#fff' }}>Admin Login</button>
          <button onClick={() => navigate('/signup')} style={{ ...btnStyle, background: '#fff7e6', color: '#a76f3f', border: '1.5px solid #a76f3f' }}>Signup</button>
        </div>
      </div>
      <div style={{ marginTop: 32, color: '#a76f3f', fontSize: '1.1rem', letterSpacing: 1 }}>Welcome to Shopease - Your one-stop shop for everything!</div>
    </div>
  );
};

const btnStyle = {
  padding: '0.8rem 0',
  borderRadius: 8,
  border: 'none',
  background: '#ffd700',
  color: '#2d2d2d',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'background 0.18s',
};

export default FrontPage; 