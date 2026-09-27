import { API_BASE } from '../api';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './Checkout.css';

const Checkout = () => {
  let product = useLocation().state?.product;

  if (!product) {
    const stored = localStorage.getItem('checkoutProduct');
    if (stored) {
      product = JSON.parse(stored);
    }
  }

  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '', phone: '' });
  const [payment, setPayment] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiError, setUpiError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardError, setCardError] = useState('');
  const [cardPaid, setCardPaid] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isFirstOrder, setIsFirstOrder] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) return;
    fetch(`${API_BASE}/api/user?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          if (data.user.address || data.user.city || data.user.zip) {
            setShipping({
              name: data.user.firstName,
              phone: data.user.phone,
              address: data.user.address,
              city: data.user.city,
              zip: data.user.zip
            });
            setIsFirstOrder(false);
          } else {
            setIsFirstOrder(true);
          }
        }
        setUserLoaded(true);
      });
  }, []);

  if (!product) return <div style={{ padding: 40 }}>No product selected for checkout.</div>;

  const handleInput = e => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const email = localStorage.getItem('email');
    const userName = shipping.name;
    if (isFirstOrder) {
      await fetch(`${API_BASE}/api/user/address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: shipping.name,
          phone: shipping.phone,
          address: shipping.address,
          city: shipping.city,
          zip: shipping.zip
        })
      });
    }
    const orderData = {
      userEmail: email,
      userName,
      shipping,
      payment,
      paymentType: payment === 'cod' ? 'Cash on Delivery' : payment === 'card' ? 'Card' : payment === 'upi' ? 'UPI' : payment,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      amount: product.price,
      status: 'Placed'
    };
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      setOrderPlaced(true);
      localStorage.removeItem('checkoutProduct');
    }
  };

  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 days delivery
    return deliveryDate.toDateString();
  };

  return (
    <>
      <div className="checkout-header-sticky">
        <Header />
      </div>
      <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32 }}>
        <h2 style={{ color: '#a76f3f', marginBottom: 24 }}>Checkout</h2>

        {/* Order Summary */}
        <section style={{ marginBottom: 32 }}>
          <h3 style={{ color: '#6b3e26', marginBottom: 12 }}>Order Summary</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <img src={product.image || 'https://via.placeholder.com/120x80?text=No+Image'} alt={product.name} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#a76f3f' }}>{product.name}</div>
              <div style={{ color: '#6b3e26', fontSize: '1rem' }}>₹{product.price}</div>
            </div>
          </div>
        </section>

        {/* Shipping Info */}
        <section style={{ marginBottom: 32 }}>
          <h3 style={{ color: '#6b3e26', marginBottom: 12 }}>Shipping Information</h3>
          {userLoaded && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input name="name" value={shipping.name} onChange={handleInput} placeholder="Full Name" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} disabled={!isFirstOrder && !!shipping.name} />
              <input name="phone" value={shipping.phone} onChange={handleInput} placeholder="Phone Number" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} disabled={!isFirstOrder && !!shipping.phone} />
              <input name="address" value={shipping.address} onChange={handleInput} placeholder="Address" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f', gridColumn: 'span 2' }} disabled={!isFirstOrder && !!shipping.address} />
              <input name="city" value={shipping.city} onChange={handleInput} placeholder="City" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} disabled={!isFirstOrder && !!shipping.city} />
              <input name="zip" value={shipping.zip} onChange={handleInput} placeholder="ZIP Code" style={{ padding: 10, borderRadius: 6, border: '1.5px solid #a76f3f' }} disabled={!isFirstOrder && !!shipping.zip} />
            </div>
          )}
        </section>

        {/* Payment Options */}
        <section style={{ marginBottom: 32 }}>
          <h3 style={{ color: '#6b3e26', marginBottom: 12 }}>Payment Options</h3>
          <div style={{ display: 'flex', gap: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
              Cash on Delivery
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} />
              Credit/Debit Card
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="radio" name="payment" value="upi" checked={payment === 'upi'} onChange={() => { setPayment('upi'); setUpiVerified(false); setUpiId(''); setUpiError(''); }} />
              UPI
            </label>
          </div>
          {payment === 'upi' && (
            <div style={{ marginTop: 24, background: '#f7fafd', padding: 20, borderRadius: 8, border: '1px solid #e3eaf2' }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Choose an option</div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <input type="radio" checked readOnly style={{ marginRight: 8 }} />
                Your UPI ID
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={e => { setUpiId(e.target.value); setUpiVerified(false); setUpiError(''); }}
                  style={{ flex: 1, padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem' }}
                />
                <span
                  style={{ color: '#1976d2', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}
                  onClick={() => {
                    // Simple UPI ID validation: must match pattern like name@bank
                    const upiPattern = /^[\w.-]+@[\w.-]+$/;
                    if (!upiPattern.test(upiId)) {
                      setUpiError('Enter a valid UPI ID');
                      setUpiVerified(false);
                    } else {
                      setUpiVerified(true);
                      setUpiError('');
                    }
                  }}
                >VERIFY</span>
                <button
                  style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 2.2rem', fontWeight: 700, fontSize: '1.1rem', cursor: upiVerified ? 'pointer' : 'not-allowed', opacity: upiVerified ? 1 : 0.6 }}
                  disabled={!upiVerified}
                  onClick={handlePlaceOrder}
                >PAY ₹{product.price}</button>
              </div>
              {upiError && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{upiError}</div>}
              <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Pay by any UPI app</div>
            </div>
          )}
          {payment === 'card' && (
            <div style={{ marginTop: 24, background: '#f7fafd', padding: 20, borderRadius: 8, border: '1px solid #e3eaf2' }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Credit / Debit / ATM Card</div>
              <input
                type="text"
                placeholder="Enter Card Number"
                value={cardNumber}
                onChange={e => {
                  setCardNumber(e.target.value.replace(/[^0-9]/g, ''));
                  setCardError('');
                }}
                maxLength={16}
                style={{ width: '100%', padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem', marginBottom: 12 }}
              />
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <select
                  value={cardMonth}
                  onChange={e => setCardMonth(e.target.value)}
                  style={{ flex: 1, padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem' }}
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  value={cardYear}
                  onChange={e => setCardYear(e.target.value)}
                  style={{ flex: 1, padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem' }}
                >
                  <option value="">YY</option>
                  {[...Array(12)].map((_, i) => {
                    const year = new Date().getFullYear() % 100 + i;
                    return <option key={year} value={String(year).padStart(2, '0')}>{String(year).padStart(2, '0')}</option>;
                  })}
                </select>
                <input
                  type="password"
                  placeholder="CVV"
                  value={cardCVV}
                  onChange={e => setCardCVV(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={3}
                  style={{ flex: 1, padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem' }}
                />
              </div>
              <button
                style={{ background: '#ff6f1a', color: '#fff', border: 'none', borderRadius: 6, padding: '0.9rem 0', fontWeight: 700, fontSize: '1.1rem', cursor: cardNumber.length === 16 && cardMonth && cardYear && cardCVV.length === 3 ? 'pointer' : 'not-allowed', width: '100%', marginBottom: 8, opacity: cardNumber.length === 16 && cardMonth && cardYear && cardCVV.length === 3 ? 1 : 0.6 }}
                disabled={!(cardNumber.length === 16 && cardMonth && cardYear && cardCVV.length === 3)}
                onClick={() => {
                  // Simple validation
                  if (!/^\d{16}$/.test(cardNumber)) {
                    setCardError('Enter a valid 16-digit card number');
                    return;
                  }
                  if (!cardMonth || !cardYear) {
                    setCardError('Select valid expiry');
                    return;
                  }
                  if (!/^\d{3}$/.test(cardCVV)) {
                    setCardError('Enter a valid 3-digit CVV');
                    return;
                  }
                  setCardError('');
                  setCardPaid(true);
                  setTimeout(() => {
                    setOrderPlaced(true);
                  }, 1000);
                }}
              >PAY ₹{product.price}</button>
              {cardError && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{cardError}</div>}
              <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Add and secure cards as per RBI guidelines</div>
              {cardPaid && <div style={{ color: '#388e3c', fontWeight: 600, marginTop: 10 }}>Payment successful! Sent to admin UPI ID.</div>}
            </div>
          )}
        </section>

        {/* Place Order */}
        {payment !== 'upi' && payment !== 'card' && (
          <button
            style={{ background: '#a76f3f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.8rem 2.2rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginBottom: 24 }}
            onClick={handlePlaceOrder}
            disabled={orderPlaced || !shipping.name || !shipping.address || !shipping.city || !shipping.zip || !shipping.phone}
          >
            {orderPlaced ? 'Order Placed!' : 'Place Order'}
          </button>
        )}

        {/* Order Details Section */}
        {orderPlaced && (
          <div style={{ marginTop: 24, padding: 20, border: '1px solid #ddd', borderRadius: 8, backgroundColor: '#f9f9f9' }}>
            <h3 style={{ color: '#4caf50', marginBottom: 12 }}>Order Placed Successfully!</h3>
            <p><strong>Name:</strong> {shipping.name}</p>
            <p><strong>Phone:</strong> {shipping.phone}</p>
            <p><strong>Address:</strong> {shipping.address}, {shipping.city}, {shipping.zip}</p>
            <p><strong>Payment Mode:</strong> {payment.toUpperCase()}</p>
            <p><strong>Delivery Expected By:</strong> {getDeliveryDate()}</p>
            <p><strong>Order Total:</strong> ₹{product.price}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
