import React from 'react';
import { useParams } from 'react-router-dom';

// Local sample products for category page only
const categorySampleProducts = [
  {
    id: 1,
    name: 'Sample Laptop',
    category: 'Electronics',
    price: 45000,
    features: ['i5 Processor', '8GB RAM', '512GB SSD'],
    image: 'https://via.placeholder.com/300x200?text=Sample+Laptop',
    stock: 10,
    rating: 4.2,
  },
  {
    id: 2,
    name: 'Sample Phone',
    category: 'Mobiles',
    price: 20000,
    features: ['6.5-inch Display', '128GB Storage'],
    image: 'https://via.placeholder.com/300x200?text=Sample+Phone',
    stock: 15,
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Sample Shirt',
    category: 'Fashion',
    price: 999,
    features: ['Cotton', 'Slim Fit'],
    image: 'https://via.placeholder.com/300x200?text=Sample+Shirt',
    stock: 20,
    rating: 4.0,
  },
  {
    id: 4,
    name: 'Sample Bedsheet',
    category: 'Home & Kitchen',
    price: 799,
    features: ['King Size', 'Cotton'],
    image: 'https://via.placeholder.com/300x200?text=Sample+Bedsheet',
    stock: 8,
    rating: 4.3,
  },
  // Add more sample products for other categories as needed
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const filtered = categorySampleProducts.filter(
    p => (p.category || '').toLowerCase() === (categoryName || '').toLowerCase()
  );

  if (filtered.length === 0) return <div>No products found.</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{categoryName} Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {filtered.map(prod => (
          <div key={prod.id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 16, textAlign: 'center' }}>
            <img src={prod.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={prod.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: '#a76f3f', marginBottom: 4 }}>{prod.name}</div>
            <div style={{ color: '#6b3e26', fontSize: '1rem' }}>₹{prod.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 