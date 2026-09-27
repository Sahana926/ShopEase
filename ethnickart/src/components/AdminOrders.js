import { API_BASE } from '../api';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/orders`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          padding: 24,
        }}
      >
        <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>All Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: 24 }}>
            No orders found.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Order ID</th>
                <th style={{ padding: 10 }}>User</th>
                <th style={{ padding: 10 }}>Product</th>
                <th style={{ padding: 10 }}>Amount</th>
                <th style={{ padding: 10 }}>Payment Type</th>
                <th style={{ padding: 10 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ padding: 8 }}>{order._id}</td>
                  <td style={{ padding: 8 }}>{order.userName || order.userEmail}</td>
                  <td style={{ padding: 8 }}>{order.productName}</td>
                  <td style={{ padding: 8 }}>₹{order.amount}</td>
                  <td style={{ padding: 8 }}>{order.paymentType || 'N/A'}</td>
                  <td style={{ padding: 8 }}>{order.status || 'Placed'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
