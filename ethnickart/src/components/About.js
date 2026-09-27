import React from 'react';
import Header from './Header';

const About = () => (
  <>
    <Header />
    <div style={{ maxWidth: 800, margin: '2rem auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ color: '#a76f3f', marginBottom: 18 }}>About <span role="img" aria-label="shopping">🛒</span> shopEase</h2>
      <p style={{ fontSize: '1.18rem', color: '#4b2e22', marginBottom: 18, lineHeight: 1.7 }}>
        Welcome to <b>shopEase</b> <span role="img" aria-label="sparkles">✨</span> — your one-stop destination for a <b>fun, fast, and fabulous</b> online shopping experience! <span role="img" aria-label="party">🥳</span><br/>
        Discover the latest trends, top brands, and everyday essentials, all at your fingertips.
      </p>
      <p style={{ fontSize: '1.08rem', color: '#6b3e26', marginBottom: 14, lineHeight: 1.6 }}>
        Our mission is simple: <b>Make shopping easy, enjoyable, and rewarding for everyone!</b> Whether you’re a gadget geek <span role="img" aria-label="laptop">💻</span>, a fashionista <span role="img" aria-label="dress">👗</span>, or a home hero <span role="img" aria-label="house">🏠</span>, shopEase has something special just for you.
      </p>
      <ul style={{ color: '#6b3e26', fontSize: '1.08rem', marginBottom: 18, lineHeight: 1.7, listStyle: 'none', paddingLeft: 0 }}>
        <li>🛍️ <b>Vast Selection:</b> Explore thousands of products from trusted brands</li>
        <li>🔒 <b>Safe & Secure:</b> Shop with confidence with our secure payment options</li>
        <li>⚡ <b>Super Fast Delivery:</b> Get your orders delivered to your door in no time</li>
        <li>🔄 <b>Easy Returns:</b> Hassle-free returns and responsive support</li>
        <li>🎁 <b>Exclusive Deals:</b> Enjoy special offers and discounts just for you</li>
      </ul>
      <p style={{ fontSize: '1.08rem', color: '#6b3e26', marginBottom: 18, lineHeight: 1.6 }}>
        <span role="img" aria-label="star">⭐</span> Thank you for choosing <b>shopEase</b>! We’re here to make your online shopping journey <b>smooth, safe, and super satisfying</b>.<br/>
        <span role="img" aria-label="heart">❤️</span> Happy Shopping!
      </p>
      <div style={{ textAlign: 'center', marginTop: 32, color: '#a76f3f', fontWeight: 600, fontSize: '1.15rem' }}>
        <span role="img" aria-label="team">🤝</span> The shopEase Team
      </div>
    </div>
  </>
);

export default About; 