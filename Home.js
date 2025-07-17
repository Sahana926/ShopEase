// Home.js (Ethnickart Homepage)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5002/api/products')
      .then(res => res.json())
      .then(data => {
        const products = data.products || [];
        // Pick 8 top-rated or random products
        const sorted = [...products].sort((a, b) => b.rating - a.rating);
        setFeatured(sorted.slice(0, 8));
      });
  }, []);

  // Add a mapping from product name to image URL
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
    <div>
      <Header showBack={false} />
      {/* Hero Banner */}
      <section className="hero-section" style={{ marginBottom: 32 }}>
        <div className="hero-bg" style={{
          backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0701/8568/1211/files/logo4.png?height=628&pad_color=ffffff&v=1673216910&width=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '340px',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}></div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ color: '#fff', fontSize: '2.8rem', fontWeight: 800, textShadow: '2px 2px 8px #000' }}>Welcome to ShopEase</h1>
          <p style={{ color: '#fff8e1', fontSize: '1.3rem', marginTop: 12, textShadow: '1px 1px 6px #000' }}>Shop the best, from the best.</p>
        </div>
      </section>
      {/* Featured Products Grid */}
      <section style={{ padding: '3rem 0', background: '#f7f6f3', minHeight: 500 }}>
        <h2 style={{ textAlign: 'center', color: '#a76f3f', fontWeight: 800, fontSize: '2rem', marginBottom: 32 }}>Featured Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {featured.map(prod => (
            <div key={prod._id || prod.id} style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, transform 0.2s',
              minHeight: 320,
              border: '2px solid #e0c3a3',
            }}
            onClick={() => navigate(`/product-detail`, { state: { product: prod } })}
            >
              <img src={productImages[prod.name] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={prod.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#a76f3f', textAlign: 'center', marginBottom: 8 }}>{prod.name}</div>
              <div style={{ color: '#ff9900', fontWeight: 600, marginBottom: 8 }}>★ {prod.rating}</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#6b3e26', marginBottom: 8 }}>₹{prod.price}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="home-footer" style={{ background: '#6b3e26', color: '#fff', padding: '1.5rem 0', textAlign: 'center', marginTop: 40 }}>
        <div>© {new Date().getFullYear()} Ethnickart. All rights reserved.</div>
        <div style={{marginTop:'0.5rem',fontSize:'1rem',color:'#fff8e1'}}>“Shop the best, from the best.”</div>
      </footer>
    </div>
  );
};

export default Home;
