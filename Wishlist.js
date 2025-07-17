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
    fetch(`http://localhost:5002/api/wishlist?email=${email}`)
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
      await fetch(`http://localhost:5002/api/wishlist/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId })
      });
      // Update local state
      setItems(items => items.filter(item => item.id !== productId));
      // Update global wishlist count
      const wishRes = await fetch(`http://localhost:5002/api/wishlist?email=${email}`);
      const wishData = await wishRes.json();
      setWishlistCount((wishData.wishlist || []).length);
    } catch {
      setError('Failed to remove from wishlist');
    }
  };

  if (!email) return <div className="wishlist-page"><h2>Your Wishlist</h2><p>Please log in to view your wishlist.</p></div>;
  if (loading) return <div className="wishlist-page"><h2>Your Wishlist</h2><p>Loading...</p></div>;

  // Add a mapping from product name to image URL (same as Products.js)
  const productImages = {
    'HP Pavilion 14': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcxSJxOXFuf5Y_CafX-0dGCUo7nb2vASBbA&s',
    'Dell Inspiron 15': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_MFXf4HBcxcbaKwLsWyK5jaJz3WHL70WSQ&s',
    'Apple MacBook Air M1': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wVM0VebRizwrD19OuklzrPMCtJGW6r_CWQ&s',
    'Lenovo IdeaPad Slim 3': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbIQgggmRUmy_IYt40_bVGqCPX9W1JSXbBg&s',
    'ASUS ROG Strix G15 (Gaming Laptop)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1CWx2QqrdOwyFS7D-8Lsme_Z3HzC7ZPyTw&s',
    'Lenovo IdeaCentre AIO 3 (Desktop)': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1fih_FnDUxS4Us45ogr6Am1Jm3Tivo6dEUg&s',
    'Apple iPhone 14': 'https://via.placeholder.com/300x200?text=iPhone+14',
    'Samsung Galaxy S24 5G': 'https://via.placeholder.com/300x200?text=Galaxy+S24+5G',
    'Redmi Note 13 Pro+': 'https://via.placeholder.com/300x200?text=Note+13+Pro+',
    'OnePlus Nord CE 4': 'https://via.placeholder.com/300x200?text=Nord+CE+4',
    'Realme Narzo 60x': 'https://via.placeholder.com/300x200?text=Narzo+60x',
    'Vivo V30 Pro': 'https://via.placeholder.com/300x200?text=V30+Pro',
    'Men Solid Slim Fit Shirt': 'https://via.placeholder.com/300x200?text=Men+Slim+Shirt',
    'Women Printed Saree': 'https://via.placeholder.com/300x200?text=Printed+Saree',
    'Gold Plated Jhumka Earrings': 'https://via.placeholder.com/300x200?text=Jhumka+Earrings',
    'Cotton Dupatta': 'https://via.placeholder.com/300x200?text=Cotton+Dupatta',
    'King Size Bedsheet': 'https://via.placeholder.com/300x200?text=King+Bedsheet',
    'Plastic Storage Box': 'https://via.placeholder.com/300x200?text=Storage+Box',
    'Tupperware Modular Mates Storage Set': 'https://via.placeholder.com/300x200?text=Tupperware+Set',
    'Banarasi Silk Saree': 'https://via.placeholder.com/300x200?text=Banarasi+Saree',
    'Cotton Slim Fit Shirt': 'https://via.placeholder.com/300x200?text=Cotton+Slim+Shirt',
    'WOW Vitamin C Face Serum': 'https://via.placeholder.com/300x200?text=Vitamin+C+Serum',
    'boAt Rockerz 255 Pro+': 'https://via.placeholder.com/300x200?text=Rockerz+255+Pro+',
    'Maybelline Fit Me Foundation': 'https://via.placeholder.com/300x200?text=Fit+Me+Foundation',
    'Premium Cotton Bedsheets': 'https://via.placeholder.com/300x200?text=Premium+Bedsheets',
    'Prestige Induction Cooktop': 'https://via.placeholder.com/300x200?text=Induction+Cooktop',
    'Mamaearth Onion Hair Oil': 'https://via.placeholder.com/300x200?text=Onion+Hair+Oil',
    'Remote Control Racing Car': 'https://via.placeholder.com/300x200?text=Racing+Car',
    'Realme Buds Wireless 3': 'https://via.placeholder.com/300x200?text=Buds+Wireless+3',
    'Leather Tote Bag': 'https://via.placeholder.com/300x200?text=Leather+Tote+Bag',
    'Lizol Disinfectant Cleaner': 'https://via.placeholder.com/300x200?text=Lizol+Cleaner',
  };

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
              }}>
                <img src={productImages[prod.name] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={prod.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px' }} />
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