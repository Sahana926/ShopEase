import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess('');
  };

  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin12345'; // Set your admin password here

  const validateLogin = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});
    if (!validateLogin()) return;
    if (form.email !== ADMIN_EMAIL || form.password !== ADMIN_PASSWORD) {
      setErrors({ email: 'Invalid admin credentials.' });
      return;
    }
    // Successful admin login
    localStorage.setItem('adminToken', 'admin-static-token');
    navigate('/admin-dashboard');
  };

  return (
    <div className="signup-container">
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          color: '#a76f3f',
          cursor: 'pointer',
          marginBottom: '1rem',
          marginRight: 'auto',
          display: 'block',
        }}
        aria-label="Back"
      >
        &larr;
      </button>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin; 