import { API_BASE } from '../api';
import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) return;
    fetch(`${API_BASE}/api/user?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      });
  }, []);
  if (!user) return <div><UserHeader /><div style={{ padding: 40 }}>Loading user details...</div></div>;
  return (
    <>
      <UserHeader />
      <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32 }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 24 }}>My Dashboard</h2>
        <div style={{ fontSize: '1.1rem', marginBottom: 12 }}><b>Name:</b> {user.firstName} {user.lastName}</div>
        <div style={{ fontSize: '1.1rem', marginBottom: 12 }}><b>Email:</b> {user.email}</div>
        <div style={{ fontSize: '1.1rem', marginBottom: 12 }}><b>Phone:</b> {user.phone}</div>
        <div style={{ fontSize: '1.1rem', marginBottom: 12 }}><b>Address:</b> {user.address}, {user.city} {user.zip}</div>
      </div>
    </>
  );
};

export default UserDashboard; 