import { API_BASE } from '../api';
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { CartWishlistContext } from '../App';

const SubcategoryProducts = () => {
  const { categoryName, subcategoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const decodedSubcategory = decodeURIComponent(subcategoryName);
  const navigate = useNavigate();
  const { setCartCount, setWishlistCount } = useContext(CartWishlistContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [cartQuantities, setCartQuantities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const email = localStorage.getItem('email');

  useEffect(() => {
    // Fetch products from backend and filter
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
          const filtered = (data.products || []).filter(p =>
            p.category === decodedCategory && p.subcategory === decodedSubcategory
          );
          setFilteredProducts(filtered);
          setLiked(Array(filtered.length).fill(false));
          setCartQuantities(Array(filtered.length).fill(0));
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to fetch products');
      }
      setLoading(false);
    };
    fetchProducts();
  }, [decodedCategory, decodedSubcategory]);

  useEffect(() => {
    if (!email || filteredProducts.length === 0) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/api/cart?email=${email}`),
      fetch(`${API_BASE}/api/wishlist?email=${email}`)
    ])
      .then(async ([cartRes, wishRes]) => {
        const cartData = await cartRes.json();
        const wishData = await wishRes.json();
        setCartQuantities(
          filteredProducts.map(p => {
            const item = (cartData.cart || []).find(item => item.id === p.id);
            return item ? item.quantity : 0;
          })
        );
        setLiked(filteredProducts.map(p => (wishData.wishlist || []).some(item => item.id === p.id)));
        setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
        setWishlistCount((wishData.wishlist || []).length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to fetch cart/wishlist');
      });
  }, [email, setCartCount, setWishlistCount, filteredProducts]);

  const handleCartPlus = async idx => {
    if (!email) {
      setError('Please log in to add to cart');
      return;
    }
    setError('');
    const product = filteredProducts[idx];
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product }),
      });
      if (res.ok) {
        const cartRes = await fetch(`${API_BASE}/api/cart?email=${email}`);
        const cartData = await cartRes.json();
        setCartQuantities(
          filteredProducts.map(p => {
            const item = (cartData.cart || []).find(item => item.id === p.id);
            return item ? item.quantity : 0;
          })
        );
        setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
        navigate('/product-detail', { state: { product } });
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
    const product = filteredProducts[idx];
    const inWishlist = liked[idx];
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${inWishlist ? 'remove' : 'add'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: inWishlist ? undefined : product, productId: product.id })
      });
      if (res.ok) {
        setLiked(prev => prev.map((v, i) => (i === idx ? !v : v)));
        const wishRes = await fetch(`${API_BASE}/api/wishlist?email=${email}`);
        const wishData = await wishRes.json();
        setWishlistCount((wishData.wishlist || []).length);
      } else {
        setError('Failed to update wishlist');
      }
    } catch {
      setError('Failed to update wishlist');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="products-page" style={{ padding: '2rem', background: '#f7f6f3', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.2rem', color: '#6b3e26' }}>{decodedSubcategory} in {decodedCategory}</h1>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
        <div className="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#a76f3f', fontWeight: 600, fontSize: '1.2rem' }}>No products found</div>
          ) : (
            filteredProducts.map((prod, idx) => (
              <div key={prod.id} className="product-card" style={{
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'box-shadow 0.2s',
                opacity: loading ? 0.6 : 1
              }}>
                <img 
                  src={prod.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop'} 
                  alt={prod.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop';
                  }}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }} 
                />
                <h2 style={{ margin: '1rem 0 0.5rem', fontSize: '1.2rem', color: '#a76f3f', textAlign: 'center' }}>{prod.name}</h2>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#6b3e26', marginBottom: '0.5rem' }}>₹{prod.price}</div>
                <div style={{ color: '#ff9900', fontWeight: 600, marginBottom: '1rem' }}>★ {prod.rating}</div>
                {prod.features && prod.features.length > 0 && (
                  <ul style={{ textAlign: 'left', margin: '0 0 1rem 0', padding: '0 0 0 1.2rem', color: '#4a4e69', fontSize: '1.02rem' }}>
                    {prod.features.map((f, i) => (
                      <li key={i} style={{ marginBottom: 2 }}>{f}</li>
                    ))}
                  </ul>
                )}
                <div style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
                  {cartQuantities[idx] === 0 ? (
                    <button
                      style={{ background: '#a76f3f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => handleCartPlus(idx)}
                      disabled={loading}
                    >Add to Cart</button>
                  ) : (
                    <div style={{ marginBottom: '1rem', color: '#a76f3f', fontWeight: 600 }}>Added</div>
                  )}
                  <button
                    style={{ background: '#fff', color: '#a76f3f', border: '1.5px solid #a76f3f', borderRadius: 6, padding: '0.4rem 1.1rem', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => navigate('/product-detail', { state: { product: prod } })}
                  >View Details</button>
                  <button
                    onClick={() => handleLike(idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.7rem',
                      cursor: 'pointer',
                      color: liked[idx] ? '#e63946' : '#a76f3f',
                      marginLeft: 4,
                      transition: 'color 0.2s'
                    }}
                    title={liked[idx] ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label={liked[idx] ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    disabled={loading}
                  >{liked[idx] ? '\u2764\ufe0f' : '\ud83e\udd0d'}</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SubcategoryProducts; 