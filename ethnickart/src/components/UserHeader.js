import { API_BASE } from '../api';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const UserHeader = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) return;
    fetch(`${API_BASE}/api/user?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      });
  }, []);
  return (
    <header style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 16, background: '#000', color: '#fff', borderRadius: 8, marginBottom: 24 }}>
      <Link to="/home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Home</Link>
      <Link to="/products" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Shop</Link>
      <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Cart</Link>
      <Link to="/wishlist" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Wishlist</Link>
      <Link to="/my-orders" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>My Orders</Link>
      <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Dashboard</Link>
      {/* Add other links as needed */}
      {user && (
        <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 13 }}>
          <div><b>{user.firstName}</b> ({user.email})</div>
          <div>{user.phone}</div>
          <div>{user.address}, {user.city} {user.zip}</div>
        </div>
      )}
    </header>
  );
};

export default UserHeader; 