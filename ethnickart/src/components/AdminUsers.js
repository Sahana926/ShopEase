import { API_BASE } from '../api';
import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>All Users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Name</th>
                <th style={{ padding: 10 }}>Email</th>
                <th style={{ padding: 10 }}>Phone</th>
                <th style={{ padding: 10 }}>Verified</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: '#888' }}>No users found.</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 10 }}>Name</th>
                <th style={{ padding: 10 }}>Email</th>
                <th style={{ padding: 10 }}>Phone</th>
                <th style={{ padding: 10 }}>Verified</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={{ padding: 8 }}>{user.firstName} {user.lastName}</td>
                  <td style={{ padding: 8 }}>{user.email}</td>
                  <td style={{ padding: 8 }}>{user.phone}</td>
                  <td style={{ padding: 8 }}>{user.isVerified ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers; 