import React, { useState } from 'react';
import AdminHeader from './AdminHeader';

const AdminSettings = () => {
  const [form, setForm] = useState({ email: '', oldPassword: '', newPassword: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess('');
    setError('');
  };

  const handleSave = e => {
    e.preventDefault();
    // Validation
    if (!form.email.trim() || !form.oldPassword.trim() || !form.newPassword.trim()) {
      setError('All fields are required.');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    // Simulate save
    setSuccess('Settings updated successfully!');
    setError('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>Admin Settings</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Admin Email" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} />
          <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} placeholder="Old Password" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} />
          <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} placeholder="New Password" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} />
          <button type="submit" style={{ background: '#a76f3f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.8rem 2.2rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Save</button>
        </form>
        {error && <div style={{ color: 'red', fontWeight: 600, fontSize: '1.05rem', marginTop: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', fontWeight: 600, fontSize: '1.1rem', marginTop: 16 }}>{success}</div>}
      </div>
    </div>
  );
};

export default AdminSettings; 