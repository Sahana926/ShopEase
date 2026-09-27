import { API_BASE } from '../api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const lowStockItems = products.filter(p => p.stock < 5).length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #c2e9fb 100%)', padding: 0 }}>
      <div style={{ maxWidth: 950, margin: '2.5rem auto', padding: '2rem 0', borderRadius: 18, boxShadow: '0 4px 32px rgba(167,111,63,0.08)', background: '#fff', position: 'relative' }}>
        <AdminHeader onLogout={handleLogout} />
        <h2 style={{ color: '#a76f3f', fontSize: '2.3rem', fontWeight: 800, marginBottom: 18, textAlign: 'center', letterSpacing: 1 }}>Admin Dashboard</h2>
        <div style={{ textAlign: 'center', color: '#6b3e26', fontSize: '1.13rem', marginBottom: 32, fontStyle: 'italic' }}>
          Welcome back, admin! Here’s a quick summary of your store’s status.
        </div>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 36, marginBottom: 40, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220, background: 'linear-gradient(135deg, #f7f6f3 0%, #fbeee6 100%)', borderRadius: 14, boxShadow: '0 2px 12px rgba(167,111,63,0.10)', padding: 32, textAlign: 'center', margin: 8 }}>
              <div style={{ fontSize: 38, marginBottom: 10 }}>📦</div>
              <div style={{ fontWeight: 700, fontSize: '1.13rem', color: '#a76f3f', marginBottom: 6 }}>Total Products</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: '#6b3e26', marginTop: 4 }}>{totalProducts}</div>
            </div>
            <div style={{ flex: 1, minWidth: 220, background: 'linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)', borderRadius: 14, boxShadow: '0 2px 12px rgba(255,183,71,0.10)', padding: 32, textAlign: 'center', margin: 8 }}>
              <div style={{ fontSize: 38, marginBottom: 10 }}>⚠️</div>
              <div style={{ fontWeight: 700, fontSize: '1.13rem', color: '#ff9800', marginBottom: 6 }}>Low Stock Items</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: '#a76f3f', marginTop: 4 }}>{lowStockItems}</div>
            </div>
            <div style={{ flex: 1, minWidth: 220, background: 'linear-gradient(135deg, #e6f7ff 0%, #b0e0e6 100%)', borderRadius: 14, boxShadow: '0 2px 12px rgba(180,224,230,0.10)', padding: 32, textAlign: 'center', margin: 8 }}>
              <div style={{ fontSize: 38, marginBottom: 10 }}>💰</div>
              <div style={{ fontWeight: 700, fontSize: '1.13rem', color: '#009688', marginBottom: 6 }}>Total Stock Value</div>
              <div style={{ fontSize: 38, fontWeight: 800, color: '#009688', marginTop: 4 }}>₹{totalStockValue}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 