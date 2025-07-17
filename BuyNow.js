import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

const GST_RATE = 0.05; // 5%
const DELIVERY_CHARGE = 60;
const DISCOUNT_RATE = 0.10; // 10%

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedSize, quantity = 1 } = location.state || {};

  if (!product) {
    return <div style={{ padding: 40, textAlign: 'center' }}>No product selected.</div>;
  }

  const gst = product.price * quantity * GST_RATE;
  const discount = product.price * quantity * DISCOUNT_RATE;
  const total = product.price * quantity + gst + DELIVERY_CHARGE - discount;

  return (
    <>
      <Header />
      <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ color: '#a76f3f', fontSize: '2rem', marginBottom: 18 }}>Order Summary</h2>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 18 }}>
          <img src={product.image} alt={product.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 10 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#6b3e26' }}>{product.name}</div>
            <div style={{ color: '#ff9900', fontWeight: 600 }}>★ {product.rating}</div>
            <div style={{ color: '#222', marginTop: 6 }}>Size: <b>{selectedSize}</b></div>
            <div style={{ color: '#222', marginTop: 6 }}>Quantity: <b>{quantity}</b></div>
            <div style={{ color: '#222', marginTop: 6 }}>Price: ₹{product.price} x {quantity} = ₹{product.price * quantity}</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #eee', margin: '18px 0' }}></div>
        <div style={{ fontSize: '1.08rem', marginBottom: 8 }}>GST (5%): <span style={{ float: 'right' }}>₹{gst.toFixed(2)}</span></div>
        <div style={{ fontSize: '1.08rem', marginBottom: 8 }}>Delivery Charge: <span style={{ float: 'right' }}>₹{DELIVERY_CHARGE}</span></div>
        <div style={{ fontSize: '1.08rem', marginBottom: 8, color: '#388e3c' }}>Discount (10%): <span style={{ float: 'right' }}>-₹{discount.toFixed(2)}</span></div>
        <div style={{ borderTop: '1px solid #eee', margin: '18px 0' }}></div>
        <div style={{ fontWeight: 700, fontSize: '1.2rem', margin: '18px 0 8px', color: '#a76f3f' }}>Total: <span style={{ float: 'right' }}>₹{total.toFixed(2)}</span></div>
        <button
          style={{
            background: '#a76f3f',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.7rem 2.2rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: 24,
            width: '100%'
          }}
          onClick={() => alert('Payment flow coming soon!')}
        >Pay</button>
      </div>
    </>
  );
};

export default BuyNow; 