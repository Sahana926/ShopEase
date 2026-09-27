import { API_BASE } from '../api';
import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';
import { CartWishlistContext } from '../App';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const email = localStorage.getItem('email');
  const { setWishlistCount } = useContext(CartWishlistContext);

  useEffect(() => {
    if (!email) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/api/wishlist?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setItems(data.wishlist || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch wishlist');
        setLoading(false);
      });
  }, [email]);

  const handleRemove = async (productId) => {
    if (!email) return;
    try {
      await fetch(`${API_BASE}/api/wishlist/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId })
      });
      // Update local state
      setItems(items => items.filter(item => item.id !== productId));
      // Update global wishlist count
      const wishRes = await fetch(`${API_BASE}/api/wishlist?email=${email}`);
      const wishData = await wishRes.json();
      setWishlistCount((wishData.wishlist || []).length);
    } catch {
      setError('Failed to remove from wishlist');
    }
  };

  if (!email) return <div className="wishlist-page"><h2>Your Wishlist</h2><p>Please log in to view your wishlist.</p></div>;
  if (loading) return <div className="wishlist-page"><h2>Your Wishlist</h2><p>Loading...</p></div>;

  return (
    <>
      <Header />
      <div className="wishlist-page" style={{ padding: '2rem', minHeight: '80vh' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Wishlist</h2>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        {items.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your wishlist is empty.</p>
        ) : (
          <div className="products-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
            justifyItems: 'center',
          }}>
            {items.map((prod, idx) => (
              <div key={prod.id} className="product-card" style={{
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'box-shadow 0.2s',
                width: '100%',
                maxWidth: 320,
                minWidth: 260,
              }}>
                <img 
                  src={prod.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop'} 
                  alt={prod.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop';
                  }}
                  style={{ width: '100%', maxWidth: 220, height: '160px', objectFit: 'cover', borderRadius: '10px' }} 
                />
                <h2 style={{ margin: '1rem 0 0.5rem', fontSize: '1.1rem', color: '#a76f3f', textAlign: 'center' }}>{prod.name}</h2>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#6b3e26', marginBottom: '0.5rem' }}>₹{prod.price}</div>
                <button
                  style={{
                    marginTop: '0.5rem',
                    background: '#fff',
                    color: '#a76f3f',
                    border: '2px solid #a76f3f',
                    borderRadius: '6px',
                    padding: '0.4rem 1.1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onClick={() => handleRemove(prod.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist; 