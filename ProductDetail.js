import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [reviews, setReviews] = React.useState([]);
  const [reviewInput, setReviewInput] = React.useState("");
  const [reviewError, setReviewError] = React.useState("");
  const [loadingReviews, setLoadingReviews] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const email = localStorage.getItem('email');

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

  // Fetch reviews from backend
  useEffect(() => {
    if (!product?.id) return;
    setLoadingReviews(true);
    fetch(`http://localhost:5002/api/review?productId=${encodeURIComponent(String(product.id))}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched reviews:', data);
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  }, [product?.id]);

  if (!product) {
    return <div style={{ padding: 40, textAlign: 'center' }}>No product selected.</div>;
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <img src={productImages[product.name] || 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.name} style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: 10 }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#a76f3f', fontSize: '2rem', marginBottom: 8 }}>{product.name}</h2>
            <div style={{ color: '#ff9900', fontWeight: 600, marginBottom: 8 }}>★ {product.rating}</div>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', color: '#6b3e26', marginBottom: 12 }}>₹{product.price}</div>
            <div style={{ marginBottom: 12 }}><b>Description:</b> {product.description || 'No description available.'}</div>
            <div style={{ marginBottom: 12 }}>
              <b>Size:</b> {sizes.map(size => (
                <button
                  key={size}
                  style={{
                    marginLeft: 8,
                    padding: '0.3rem 1.1rem',
                    borderRadius: 6,
                    border: selectedSize === size ? '2px solid #a76f3f' : '1px solid #ccc',
                    background: selectedSize === size ? '#a76f3f' : '#fff',
                    color: selectedSize === size ? '#fff' : '#222',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedSize(size)}
                >{size}</button>
              ))}
            </div>
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <b>Quantity:</b>
              <button
                style={{
                  background: '#fff',
                  color: '#a76f3f',
                  border: '2px solid #a76f3f',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  marginRight: 4
                }}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity === 1}
              >-</button>
              <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button
                style={{
                  background: '#a76f3f',
                  color: '#fff',
                  border: '2px solid #a76f3f',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  marginLeft: 4
                }}
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
            <button
              style={{
                background: '#a76f3f',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.7rem 2.2rem',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                marginTop: 16
              }}
              onClick={() => navigate('/buy-now', { state: { product, selectedSize, quantity } })}
            >Buy Now</button>
          </div>
        </div>
      </div>
      {/* Review Section */}
      <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24, marginTop: 24 }}>
        <h3 style={{ color: '#a76f3f', marginBottom: 12 }}>Reviews</h3>
        {loadingReviews ? (
          <div style={{ color: '#888', marginBottom: 16 }}>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div style={{ color: '#888', marginBottom: 16 }}>No reviews yet. Be the first to review!</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
            {reviews.map((rev, idx) => (
              <li key={rev._id || idx} style={{ background: '#f7f6f3', borderRadius: 8, padding: '0.7rem 1rem', marginBottom: 8 }}>
                <span style={{ color: '#6b3e26', fontWeight: 600 }}>
                  {(rev.firstName || rev.lastName) ? `${rev.firstName || ''} ${rev.lastName || ''}`.trim() : 'User'}:
                </span> {rev.reviewText}
                <span style={{ float: 'right', color: '#aaa', fontSize: '0.95em' }}>{rev.createdAt ? new Date(rev.createdAt).toLocaleString() : ''}</span>
              </li>
            ))}
          </ul>
        )}
        <form
          onSubmit={async e => {
            e.preventDefault();
            setReviewError("");
            if (!reviewInput.trim()) {
              setReviewError("Review cannot be empty");
              return;
            }
            if (!email) {
              setReviewError("Please log in to submit a review");
              return;
            }
            setSubmitting(true);
            try {
              const res = await fetch('http://localhost:5002/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: String(product.id), userEmail: email, reviewText: reviewInput.trim() })
              });
              if (res.ok) {
                setReviewInput("");
                // Await the fetch for new reviews
                const reviewsRes = await fetch(`http://localhost:5002/api/review?productId=${encodeURIComponent(String(product.id))}`);
                const reviewsData = await reviewsRes.json();
                console.log('Fetched reviews after submit:', reviewsData);
                setReviews(Array.isArray(reviewsData.reviews) ? reviewsData.reviews : []);
              } else {
                const data = await res.json();
                setReviewError(data.message || 'Failed to submit review');
              }
            } catch (err) {
              setReviewError('Failed to submit review');
            }
            setSubmitting(false);
          }}
        >
          <textarea
            value={reviewInput}
            onChange={e => setReviewInput(e.target.value)}
            placeholder="Write your review here..."
            rows={3}
            style={{ width: '100%', borderRadius: 6, border: '1.5px solid #a76f3f', padding: '0.7rem', fontSize: '1.05rem', marginBottom: 8 }}
          />
          {reviewError && <div style={{ color: 'red', marginBottom: 8 }}>{reviewError}</div>}
          <button
            type="submit"
            style={{ background: '#a76f3f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer' }}
            disabled={submitting}
          >{submitting ? 'Submitting...' : 'Submit Review'}</button>
        </form>
      </div>
    </>
  );
};

export default ProductDetail; 