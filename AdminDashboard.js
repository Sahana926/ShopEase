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
        const res = await fetch('http://localhost:5002/api/admin/products');
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
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <h2 style={{ color: '#a76f3f', fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>
        Admin Dashboard
      </h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 32, marginBottom: 40 }}>
          <div style={{ background: '#f7f6f3', borderRadius: 8, padding: 24, minWidth: 180, textAlign: 'center' }}>
            <h3>Total Products</h3>
            <p style={{ fontSize: 32, fontWeight: 700 }}>{totalProducts}</p>
          </div>
          <div style={{ background: '#fff7e6', borderRadius: 8, padding: 24, minWidth: 180, textAlign: 'center' }}>
            <h3>Low Stock Items</h3>
            <p style={{ fontSize: 32, fontWeight: 700 }}>{lowStockItems}</p>
          </div>
          <div style={{ background: '#e6f7ff', borderRadius: 8, padding: 24, minWidth: 180, textAlign: 'center' }}>
            <h3>Total Stock Value</h3>
            <p style={{ fontSize: 32, fontWeight: 700 }}>₹{totalStockValue}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 