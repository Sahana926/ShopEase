import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>All Products</h2>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
              <thead>
                <tr style={{ background: '#f7f6f3' }}>
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Image</th>
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Name</th>
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Category</th>
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Price</th>
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24, color: '#888' }}>No products found.</td></tr>
                ) : (
                  products.map(prod => (
                    <tr key={prod._id}>
                      <td style={{ padding: 8 }}>
                        {prod.image ? <img src={prod.image} alt={prod.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} /> : '—'}
                      </td>
                      <td style={{ padding: 8 }}>{prod.name}</td>
                      <td style={{ padding: 8 }}>{prod.category}</td>
                      <td style={{ padding: 8 }}>₹{prod.price}</td>
                      <td style={{ padding: 8, color: prod.stock === 0 ? 'red' : undefined, fontWeight: prod.stock === 0 ? 700 : undefined }}>
                        {prod.stock === 0 ? `Out of Stock (${prod._id})` : prod.stock}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts; 