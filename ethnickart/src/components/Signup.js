import { API_BASE } from '../api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

const Signup = ({ onSwitchToLogin, onSignupSuccess, onBackToHome }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [resendMsg, setResendMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    // Name validations
    if (!/^[A-Za-z]+$/.test(form.firstName)) {
      newErrors.firstName = 'First name should contain only letters';
    }
    // Allow last name to be a single letter or more
    if (!/^[A-Za-z]{1,}$/.test(form.lastName)) {
      newErrors.lastName = 'Last name should contain only letters (at least 1)';
    }
    // Email
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    // Phone (Indian number: 10 digits starting with 6-9)
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits starting with 6–9';
    }
    // Password
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,10}$/.test(form.password)
    ) {
      newErrors.password =
        'Password must be 6–10 characters, include uppercase, number, and special character';
    }
    // Confirm password
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`${API_BASE}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }),
        });
        const data = await response.json();
        if (response.ok && data.otpRequired) {
          setOtpSent(true);
          setSignupEmail(form.email);
        } else if (!response.ok) {
          setErrors({ email: data.message || 'Signup failed' });
        } else if (typeof onSignupSuccess === 'function') {
          onSignupSuccess({ email: form.email, phone: form.phone });
        }
      } catch (err) {
        setErrors({ email: 'Signup failed: ' + err.message });
      }
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setOtpError('');
    setResendMsg('');
    try {
      const response = await fetch(`${API_BASE}/api/confirm-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(false);
        setOtp('');
        setOtpError('');
        setResendMsg('');
        // Redirect to login page after OTP verification
        window.location.href = '/login';
      } else {
        setOtpError(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setOtpError('OTP verification failed: ' + err.message);
    }
  };

  const handleResendOtp = async () => {
    setResendMsg('');
    setOtpError('');
    try {
      const response = await fetch(`${API_BASE}/api/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signupEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setResendMsg('OTP resent! Check the terminal.');
      } else {
        setOtpError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setOtpError('Failed to resend OTP: ' + err.message);
    }
  };

  if (otpSent) {
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
        <h2>Verify OTP</h2>
        <form onSubmit={handleOtpVerify}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            {otpError && <p className="error">{otpError}</p>}
            {resendMsg && <p className="success">{resendMsg}</p>}
            <button type="submit">Verify OTP</button>
          </form>
          <button type="button" onClick={handleResendOtp} style={{ marginTop: '1rem' }}>
            Resend OTP
          </button>
      </div>
    );
  }

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
      {/* <Header /> */}
      {/* <button className="back-btn" type="button" onClick={onBackToHome}>&larr; Back</button> */}
      <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

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
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit">Register</button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already registered?{' '}
          <button type="button" className="link-btn" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
    </div>
  );
};

export default Signup;
