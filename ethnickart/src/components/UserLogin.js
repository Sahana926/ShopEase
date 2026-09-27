import { API_BASE } from '../api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

const UserLogin = ({ onSwitchToSignup }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess('');
  };

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});
    if (!validateLogin()) return;
    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Login successful!');
        setErrors({});
        localStorage.setItem('email', form.email); // Save email for login state
        navigate('/home'); // Redirect to Home page after login
        return;
      } else {
        setErrors({ password: data.message || 'Login failed' });
      }
    } catch (err) {
      setErrors({ password: 'Login failed: ' + err.message });
    }
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
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
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
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        New user?{' '}
        <button type="button" className="link-btn" onClick={onSwitchToSignup}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default UserLogin; 