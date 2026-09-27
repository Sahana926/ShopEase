import { API_BASE } from '../api';
// Home.js (Ethnickart Homepage)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useContext } from 'react';
import { CartWishlistContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [liked, setLiked] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setCartCount, setWishlistCount } = useContext(CartWishlistContext);
  const [email, setEmail] = useState('');

  // Hero images for slider
  const heroImages = [
    'https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/74f0ad81e44e6e6f.jpg?q=60',
    'https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/528bdbb93c6ca663.jpeg?q=60', // Updated second image
    'https://images.meesho.com/images/marketing/1744698265981.webp', // Added third image
  ];
  const [heroIdx, setHeroIdx] = useState(0);
  const nextHero = () => setHeroIdx((heroIdx + 1) % heroImages.length);
  const prevHero = () => setHeroIdx((heroIdx - 1 + heroImages.length) % heroImages.length);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => {
        const products = data.products || [];
        // Pick 8 top-rated or random products
        const sorted = [...products].sort((a, b) => b.rating - a.rating);
        setFeatured(sorted.slice(0, 8));
      });
    const storedEmail = localStorage.getItem('email');
    if (storedEmail && storedEmail.trim()) {
      setEmail(storedEmail.trim());
    }
  }, []);

  useEffect(() => {
    if (!email || featured.length === 0) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/api/cart?email=${email}`),
      fetch(`${API_BASE}/api/wishlist?email=${email}`)
    ])
      .then(async ([cartRes, wishRes]) => {
        const cartData = await cartRes.json();
        const wishData = await wishRes.json();
        const cartMap = {};
        (cartData.cart || []).forEach(item => {
          const pid = item.id || item._id;
          cartMap[pid] = item.quantity || 1;
        });
        setCartQuantities(cartMap);
        const wishMap = {};
        (wishData.wishlist || []).forEach(item => {
          const pid = item.id || item._id;
          wishMap[pid] = true;
        });
        setLiked(wishMap);
        setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
        setWishlistCount((wishData.wishlist || []).length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to fetch cart/wishlist');
      });
  }, [email, setCartCount, setWishlistCount, featured]);

  const getProductId = p => p.id || p._id;

  const refreshCartAndWishlist = async () => {
    try {
      const [cartRes, wishRes] = await Promise.all([
        fetch(`${API_BASE}/api/cart?email=${email}`),
        fetch(`${API_BASE}/api/wishlist?email=${email}`)
      ]);
      const cartData = await cartRes.json();
      const wishData = await wishRes.json();
      const cartMap = {};
      (cartData.cart || []).forEach(item => {
        const pid = item.id || item._id;
        cartMap[pid] = item.quantity || 1;
      });
      setCartQuantities(cartMap);
      const wishMap = {};
      (wishData.wishlist || []).forEach(item => {
        const pid = item.id || item._id;
        wishMap[pid] = true;
      });
      setLiked(wishMap);
      setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
      setWishlistCount((wishData.wishlist || []).length);
    } catch {
      setError('Failed to refresh cart/wishlist');
    }
  };

  const handleCartPlus = async idx => {
    if (!email) {
      setError('Please log in to add to cart');
      return;
    }
    setError('');
    const product = featured[idx];
    const productToSend = { ...product };
    if (product._id && !product.id) productToSend.id = product._id;
    if (product.id && !product._id) productToSend._id = product.id;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: productToSend }),
      });
      if (res.ok) {
        await refreshCartAndWishlist();
      } else {
        setError('Failed to update cart');
      }
    } catch {
      setError('Failed to update cart');
    }
    setLoading(false);
  };

  const handleLike = async idx => {
    if (!email) {
      setError('Please log in to add to wishlist');
      return;
    }
    setError('');
    const product = featured[idx];
    const productId = getProductId(product);
    const inWishlist = liked[productId];
    const productToSend = { ...product };
    if (product._id && !product.id) productToSend.id = product._id;
    if (product.id && !product._id) productToSend._id = product.id;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${inWishlist ? 'remove' : 'add'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: inWishlist ? undefined : productToSend, productId }),
      });
      if (res.ok) {
        await refreshCartAndWishlist();
      } else {
        setError('Failed to update wishlist');
      }
    } catch {
      setError('Failed to update wishlist');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 0%, #e0c3fc 100%)' }}>
      <Header showBack={false} />
      {/* Hero Image placed below the welcome section */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 32, position: 'relative' }}>
        <button onClick={prevHero} style={{ position: 'absolute', left: 30, zIndex: 2, background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 24, color: '#a76f3f' }} aria-label="Previous">
          {'\u2039'}
        </button>
        <img
          src={heroImages[heroIdx]}
          alt="Hero"
          style={{ width: '96vw', maxWidth: '1700px', height: '340px', objectFit: 'cover', borderRadius: '32px', boxShadow: '0 12px 48px rgba(167,111,63,0.13)' }}
        />
        <button onClick={nextHero} style={{ position: 'absolute', right: 30, zIndex: 2, background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontSize: 24, color: '#a76f3f' }} aria-label="Next">
          {'\u203A'}
        </button>
      </div>
      {/* Featured Products Grid */}
      <section style={{ padding: '3rem 0', background: 'rgba(255,255,255,0.7)', minHeight: 500, borderRadius: 24, maxWidth: 1300, margin: '0 auto 2rem auto', boxShadow: '0 2px 24px rgba(167,111,63,0.07)' }}>
        <h2 style={{ textAlign: 'center', color: '#a76f3f', fontWeight: 800, fontSize: '2.1rem', marginBottom: 32, letterSpacing: 1 }}>Featured Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {featured.map((prod, idx) => (
            <div key={prod._id || prod.id} style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 18,
              boxShadow: '0 4px 18px rgba(167,111,63,0.10)',
              padding: '1.7rem 1.1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, transform 0.2s',
              minHeight: 320,
              border: '2px solid #e0c3a3',
              position: 'relative',
            }}
            onClick={() => navigate(`/product-detail`, { state: { product: prod } })}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,111,63,0.18)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 18px rgba(167,111,63,0.10)'}
            >
              <img 
                src={prod.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop'} 
                alt={prod.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop';
                }}
                style={{ width: 130, height: 130, objectFit: 'cover', borderRadius: 14, marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} 
              />
              <div style={{ fontWeight: 700, fontSize: '1.13rem', color: '#a76f3f', textAlign: 'center', marginBottom: 8 }}>{prod.name}</div>
              <div style={{ color: '#ff9900', fontWeight: 600, marginBottom: 8, fontSize: '1.08rem' }}>★ {prod.rating}</div>
              <div style={{ fontWeight: 700, fontSize: '1.13rem', color: '#6b3e26', marginBottom: 8 }}>₹{prod.price}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginTop: 8 }}>
                {cartQuantities[getProductId(prod)] ? (
                  <div style={{ color: '#a76f3f', fontWeight: 600, textAlign: 'center' }}>Added</div>
                ) : (
                  <button
                    style={{ background: '#a76f3f', color: '#fff', border: '2px solid #a76f3f', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: prod.stock === 0 ? 'not-allowed' : email ? 'pointer' : 'not-allowed', opacity: prod.stock === 0 || loading ? 0.7 : 1, marginBottom: '0.2rem', fontSize: '1rem' }}
                    onClick={e => { e.stopPropagation(); if (prod.stock === 0) return; handleCartPlus(idx); }}
                    disabled={loading || prod.stock === 0}
                  >Add to Cart</button>
                )}
                <button
                  style={{ background: '#fff', color: '#a76f3f', border: '1.5px solid #a76f3f', borderRadius: 6, padding: '0.4rem 1.1rem', fontWeight: 600, cursor: prod.stock === 0 ? 'not-allowed' : 'pointer', marginBottom: '0.2rem', opacity: prod.stock === 0 ? 0.5 : 1, fontSize: '1rem' }}
                  onClick={e => { e.stopPropagation(); if (prod.stock === 0) return; navigate('/product-detail', { state: { product: prod } }); }}
                  disabled={prod.stock === 0}
                >View Details</button>
                <button
                  style={{
                    background: liked[getProductId(prod)] ? '#a76f3f' : '#fff',
                    color: liked[getProductId(prod)] ? '#fff' : '#a76f3f',
                    border: '2px solid #a76f3f',
                    borderRadius: '6px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    cursor: prod.stock === 0 ? 'not-allowed' : email ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s, color 0.2s',
                    opacity: prod.stock === 0 || loading ? 0.7 : 1,
                    fontSize: '1rem',
                  }}
                  onClick={e => { e.stopPropagation(); if (prod.stock === 0) return; handleLike(idx); }}
                  disabled={prod.stock === 0}
                >{liked[getProductId(prod)] ? 'Liked' : 'Like'}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="home-footer" style={{ background: 'rgba(107,62,38,0.95)', color: '#fff', padding: '1.7rem 0', textAlign: 'center', marginTop: 40, borderRadius: '0 0 18px 18px', boxShadow: '0 -2px 12px rgba(167,111,63,0.08)' }}>
        <div>© {new Date().getFullYear()} shopEase. All rights reserved.</div>
        <div style={{marginTop:'0.5rem',fontSize:'1.08rem',color:'#fff8e1', fontWeight: 500}}>“Shop the best, from the best.”</div>
      </footer>
    </div>
  );
};

export default Home;
