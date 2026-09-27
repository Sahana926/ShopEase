import { API_BASE } from '../api';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState('');
  const [editingRating, setEditingRating] = useState({});
  const [saving, setSaving] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: 'admin@shopease.com' })
      });
      if (!res.ok) throw new Error('Failed to delete product');
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting('');
    }
  };

  const handleRatingChange = (id, value) => {
    setEditingRating(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveRating = async (id) => {
    setSaving(id);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: 'admin@shopease.com', rating: Number(editingRating[id]) })
      });
      if (!res.ok) throw new Error('Failed to update rating');
      await fetchProducts();
      setEditingRating(prev => ({ ...prev, [id]: undefined }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving('');
    }
  };

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
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Rating</th>
                  <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Delete</th>
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
                      <td style={{ padding: 8 }}>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={editingRating[prod._id] !== undefined ? editingRating[prod._id] : prod.rating}
                          onChange={e => handleRatingChange(prod._id, e.target.value)}
                          style={{ width: 60, padding: 4, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 }}
                        />
                        <button
                          style={{ background: '#2d2d2d', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600, cursor: 'pointer', opacity: saving === prod._id ? 0.6 : 1 }}
                          onClick={() => handleSaveRating(prod._id)}
                          disabled={saving === prod._id}
                        >{saving === prod._id ? 'Saving...' : 'Save'}</button>
                      </td>
                      <td style={{ padding: 8 }}>
                        <button
                          style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', fontWeight: 600, cursor: 'pointer', opacity: deleting === prod._id ? 0.6 : 1 }}
                          onClick={() => handleDelete(prod._id)}
                          disabled={deleting === prod._id}
                        >{deleting === prod._id ? 'Deleting...' : 'Delete'}</button>
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