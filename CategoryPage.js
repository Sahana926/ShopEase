import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [productsBySubcat, setProductsBySubcat] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5002/api/products');
        if (res.ok) {
          const data = await res.json();
          // Filter products by category (case-insensitive)
          const filtered = (data.products || []).filter(
            p => (p.category || '').toLowerCase() === (categoryName || '').toLowerCase()
          );
          // Extract unique subcategories
          const uniqueSubcats = [
            ...new Set(filtered.map(p => p.subcategory))
          ];
          setSubcategories(uniqueSubcats);
          // Group products by subcategory
          const bySubcat = {};
          uniqueSubcats.forEach(subcat => {
            bySubcat[subcat] = filtered.filter(p => p.subcategory === subcat);
          });
          setProductsBySubcat(bySubcat);
        }
      } catch (err) {
        setSubcategories([]);
        setProductsBySubcat({});
      }
      setLoading(false);
    };
    fetchProducts();
  }, [categoryName]);

  if (loading) return <div>Loading...</div>;
  if (subcategories.length === 0) return <div>No subcategories found.</div>;

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
    <div style={{ padding: 40 }}>
      <h2>{categoryName} Subcategories</h2>
      <ul>
        {subcategories.map(subcat => (
          <li key={subcat}>
            <button onClick={() => navigate(`/category/${categoryName}/${encodeURIComponent(subcat)}`)}>
              {subcat}
            </button>
            {/* Show 3 products for this subcategory */}
            <div style={{ marginTop: 10, marginBottom: 24 }}>
              {productsBySubcat[subcat] && productsBySubcat[subcat].length > 0 ? (
                <div style={{ display: 'flex', gap: 16 }}>
                  {productsBySubcat[subcat].map(prod => (
                    <div key={prod._id || prod.id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 12, minWidth: 160, textAlign: 'center' }}>
                      <img src={productImages[prod.name] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={prod.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                      <div style={{ fontWeight: 600, color: '#a76f3f', marginBottom: 4 }}>{prod.name}</div>
                      <div style={{ color: '#6b3e26', fontSize: '1rem' }}>₹{prod.price}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: '#a76f3f', fontSize: '0.95rem' }}>No products found.</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage; 