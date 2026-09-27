import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { sampleProducts } from './Products';

const GST_RATE = 0.05; // 5%
const DELIVERY_CHARGE = 60;
const DISCOUNT_RATE = 0.10; // 10%

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [showOpenBoxPrompt, setShowOpenBoxPrompt] = useState(false);
  let product = location.state?.product;
  let selectedSize, quantity;

  if (!product && params.productId) {
    product = sampleProducts.find(p => String(p.id) === String(params.productId));
    // Optionally, you could get size/quantity from query params
  }

  if (!product) {
    return <div style={{ padding: 40, textAlign: 'center' }}>No product selected.</div>;
  }

  selectedSize = location.state?.selectedSize;
  quantity = location.state?.quantity || 1;

  const gst = product.price * quantity * GST_RATE;
  const discount = product.price * quantity * DISCOUNT_RATE;
  const total = product.price * quantity + gst + DELIVERY_CHARGE - discount;

  return (
    <>
      <Header />
      <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ color: '#a76f3f', fontSize: '2rem', marginBottom: 18 }}>Order Summary</h2>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 18 }}>
          <img src={product.image || 'https://via.placeholder.com/120x80?text=No+Image'} alt={product.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 10 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#6b3e26' }}>{product.name}</div>
            <div style={{ color: '#ff9900', fontWeight: 600 }}>★ {product.rating}</div>
            {selectedSize && <div style={{ color: '#222', marginTop: 6 }}>Size: <b>{selectedSize}</b></div>}
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
          onClick={() => setShowOpenBoxPrompt(true)}
        >Buy Now</button>
      </div>
      {showOpenBoxPrompt && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, maxWidth: 420, width: '90%', boxShadow: '0 2px 16px rgba(0,0,0,0.18)' }}>
            <h3 style={{ color: '#a76f3f', marginBottom: 18, fontWeight: 700, fontSize: '1.3rem' }}>Rest assured with open box delivery</h3>
            <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 18 }}>
              <li style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 22, marginRight: 10 }}>📦</span>
                Ask the Agent to open the package in front of you, check for Damages, Parts Missing or Wrong Item
              </li>
              <li style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 22, marginRight: 10 }}>🔍</span>
                Share the OTP after checking the product for these issues
              </li>
              <li style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 22, marginRight: 10 }}>✅</span>
                After OTP is shared, Returns will NOT be accepted for Damages, Parts Missing or Wrong item
              </li>
            </ul>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 18 }}>
              Orders placed with '1 Day Delivery' option, will not have open-box delivery.<br />
              'Working condition' of the product will not be verified during delivery.
            </div>
            <button
              style={{
                background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6,
                padding: '0.7rem 2.2rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', width: '100%'
              }}
              onClick={() => {
                setShowOpenBoxPrompt(false);
                localStorage.setItem('checkoutProduct', JSON.stringify(product));
                navigate('/checkout', { state: { product } });
              }}
            >Accept & Continue</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNow; 