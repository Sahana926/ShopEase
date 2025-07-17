import React from 'react';
import Header from './Header';
import logo from '../logo.png';
import '../css/Signup.css';

const About = () => (
  <>
    <Header />
    <div className="signup-container" style={{ maxWidth: 700, marginTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <img src={logo} alt="Ethnickart Logo" style={{ height: 60, marginRight: 18 }} />
        <h1 style={{ color: '#a76f3f', fontSize: '2.2rem', margin: 0 }}>About Ethnickart</h1>
      </div>
      <p style={{ fontSize: '1.15rem', color: '#4a4e69', marginBottom: 18 }}>
        <b>Ethnickart</b> is your one-stop destination for discovering and shopping authentic, regionally celebrated products from across India. We bring the rich heritage, craftsmanship, and flavors of India’s diverse districts right to your doorstep.
      </p>
      <h2 style={{ color: '#6b3e26', fontSize: '1.3rem', marginTop: 24 }}>Our Mission</h2>
      <p style={{ fontSize: '1.08rem', color: '#22223b', marginBottom: 18 }}>
        To empower local artisans, farmers, and small businesses by connecting them with customers who value quality, tradition, and authenticity. We believe every product has a story, and we’re here to share it with the world.
      </p>
      <h2 style={{ color: '#6b3e26', fontSize: '1.3rem', marginTop: 24 }}>What Makes Us Unique?</h2>
      <ul style={{ fontSize: '1.08rem', color: '#22223b', marginBottom: 18, paddingLeft: 24 }}>
        <li>🌏 <b>District Discovery:</b> Shop by region and explore unique products with GI tags and local specialties.</li>
        <li>🤝 <b>Direct from Source:</b> We partner directly with artisans and producers for genuine, high-quality goods.</li>
        <li>🛒 <b>Seamless Shopping:</b> Easy-to-use platform, secure payments, and reliable delivery across India.</li>
        <li>💬 <b>Community & Culture:</b> Learn about the stories, people, and traditions behind every product.</li>
      </ul>
      <h2 style={{ color: '#6b3e26', fontSize: '1.3rem', marginTop: 24 }}>Join Us</h2>
      <p style={{ fontSize: '1.08rem', color: '#22223b' }}>
        Whether you’re a customer seeking something special or a local seller wanting to reach a wider audience, Ethnickart is here for you. Let’s celebrate India’s diversity—one product, one story at a time.
      </p>
      <div style={{ textAlign: 'center', marginTop: 32, color: '#a76f3f', fontWeight: 600 }}>
        Thank you for supporting. <br /> <span style={{ fontSize: '1.3rem' }}>– The Ethnickart Team</span>
      </div>
    </div>
  </>
);

export default About; 