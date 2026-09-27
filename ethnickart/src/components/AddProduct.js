import { API_BASE } from '../api';
import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    features: '',
    image: '',
    stock: '',
    rating: '5', // Default rating to 5
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.category || !form.price || !form.image || !form.stock || !form.rating) {
      setError('Please fill all required fields.');
      return;
    }
    if (isNaN(form.rating) || Number(form.rating) < 0 || Number(form.rating) > 5) {
      setError('Please enter a valid rating between 0 and 5.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          subcategory: form.subcategory,
          price: Number(form.price),
          features: form.features.split(',').map(f => f.trim()).filter(Boolean),
          image: form.image,
          stock: Number(form.stock),
          rating: Number(form.rating),
          adminEmail: 'admin@shopease.com',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Product added successfully!');
        setTimeout(() => navigate('/admin/products'), 1200);
      } else {
        setError(data.message || 'Failed to add product');
      }
    } catch (err) {
      setError('Failed to add product: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32 }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name*" style={inputStyle} />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category* (e.g. Fashion)" style={inputStyle} />
          <input name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Subcategory (optional)" style={inputStyle} />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price*" type="number" style={inputStyle} />
          <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma separated)" style={inputStyle} />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL*" style={inputStyle} />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock*" type="number" style={inputStyle} />
          {/* Rating field */}
          <input
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating (0-5)"
            type="number"
            min="0"
            max="5"
            step="0.1"
            required
            style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }}
          />
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
          <button type="submit" style={{ ...inputStyle, background: '#a76f3f', color: '#fff', fontWeight: 700, cursor: 'pointer', border: 'none' }}>Add Product</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.7rem 1.2rem',
  borderRadius: 6,
  border: '1.5px solid #a76f3f',
  fontSize: '1.1rem',
  marginBottom: 14,
};

export default AddProduct; 