import { API_BASE } from '../api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Checkout.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }
    fetch(`${API_BASE}/api/orders?email=${email}`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, [email, navigate]);

  // Add cancel order handler
  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/orders/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      if (res.ok) {
        setOrders(orders => orders.filter(order => order._id !== orderId));
      } else {
        alert('Failed to cancel order.');
      }
    } catch {
      alert('Failed to cancel order.');
    }
  };

  return (
    <>
      <div className="checkout-header-sticky">
        <Header />
      </div>
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24, maxWidth: 900, margin: '2rem auto' }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>My Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: 24 }}>No orders found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Order ID</th>
                <th style={{ padding: 10 }}>Product</th>
                <th style={{ padding: 10 }}>Amount</th>
                <th style={{ padding: 10 }}>Payment Type</th>
                <th style={{ padding: 10 }}>Status</th>
                <th style={{ padding: 10 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td style={{ padding: 8 }}>{order._id}</td>
                  <td style={{ padding: 8 }}>{order.productName}</td>
                  <td style={{ padding: 8 }}>₹{order.amount}</td>
                  <td style={{ padding: 8 }}>{order.paymentType || 'N/A'}</td>
                  <td style={{ padding: 8 }}>{order.status || 'Placed'}</td>
                  <td style={{ padding: 8 }}>
                    {order.status !== 'Cancelled' && (
                      <button onClick={() => handleCancel(order._id)} style={{ background: '#ff5252', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1.1rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserOrders; 