import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

// --- Stock Table Component ---
function StockTable({ products, onReorder, onExport, search, setSearch, onStockUpdate }) {
  // Filter products by name or SKU
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by product name or SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1.5px solid #aaa', width: 260 }}
        />
        <button onClick={onExport} style={{ background: '#2d2d2d', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 600 }}>Export CSV</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
          <thead>
            <tr style={{ background: '#f7f6f3' }}>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Image</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Product ID</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Product Name</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Category</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>SKU Code</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Price</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Quantity in Stock</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Stock Status</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Last Updated</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Update Stock</th>
              <th style={{ padding: 10, borderBottom: '2px solid #eee' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(prod => {
              let status = 'In Stock';
              let rowStyle = {};
              if (prod.stock < 1) {
                status = 'Out of Stock';
                rowStyle = { background: '#ffeaea' };
              } else if (prod.stock < 5) {
                status = 'Low Stock';
                rowStyle = { background: '#fff7e6' };
              }
              return (
                <tr key={prod._id} style={rowStyle}>
                  <td style={{ padding: 8 }}>
                    {prod.image ? <img src={prod.image} alt={prod.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} /> : '—'}
                  </td>
                  <td style={{ padding: 8 }}>{prod._id}</td>
                  <td style={{ padding: 8 }}>{prod.name}</td>
                  <td style={{ padding: 8 }}>{prod.category}</td>
                  <td style={{ padding: 8 }}>{prod.sku || '—'}</td>
                  <td style={{ padding: 8 }}>₹{prod.price}</td>
                  <td style={{ padding: 8 }}>{prod.stock}</td>
                  <td style={{ padding: 8, fontWeight: 600 }}>{status}</td>
                  <td style={{ padding: 8 }}>{prod.lastUpdated || '—'}</td>
                  <td style={{ padding: 8 }}>
                    <input
                      type="number"
                      min="0"
                      value={prod._editStock !== undefined ? prod._editStock : prod.stock}
                      onChange={e => onStockUpdate(prod._id, e.target.value)}
                      style={{ width: 60, padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    <button
                      onClick={() => onReorder(prod, true)}
                      style={{ marginLeft: 8, background: '#2d2d2d', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 0.8rem', cursor: 'pointer', fontWeight: 600 }}
                    >Update</button>
                  </td>
                  <td style={{ padding: 8 }}>
                    {status === 'Low Stock' && (
                      <button onClick={() => onReorder(prod)} style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 0.8rem', cursor: 'pointer', fontWeight: 600 }}>Reorder</button>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={11} style={{ textAlign: 'center', padding: 24, color: '#888' }}>No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Main AdminStock Page ---
const AdminStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editStocks, setEditStocks] = useState({});
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5002/api/admin/products');
        if (!res.ok) throw new Error('Unauthorized or Failed to fetch');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Stock input handler
  const handleStockUpdate = (id, value) => {
    setProducts(prev => prev.map(p => p._id === id ? { ...p, _editStock: value } : p));
  };

  // Update stock in backend
  const handleUpdateStock = async (prod) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5002/api/admin/products/${prod._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: Number(prod._editStock) }),
      });
      if (!res.ok) throw new Error('Failed to update stock');
      const updated = await res.json();
      setProducts(prev => prev.map(p => p._id === prod._id ? { ...updated, _editStock: undefined } : p));
      alert('Stock updated!');
    } catch (err) {
      alert('Error updating stock: ' + err.message);
    }
  };

  // Reorder handler (dummy or update stock)
  const handleReorder = (prod, update) => {
    if (update) {
      handleUpdateStock(prod);
    } else {
      alert(`Reorder placed for ${prod.name} (SKU: ${prod.sku || 'N/A'})!`);
    }
  };

  // Export CSV handler
  const handleExport = () => {
    const csvRows = [
      ['Product ID', 'Product Name', 'Category', 'SKU Code', 'Price', 'Quantity in Stock', 'Stock Status', 'Last Updated'],
      ...products.map(prod => [
        prod._id, prod.name, prod.category, prod.sku || '', prod.price, prod.stock,
        prod.stock < 1 ? 'Out of Stock' : prod.stock < 5 ? 'Low Stock' : 'In Stock',
        prod.lastUpdated || ''
      ])
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock_inventory.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto' }}>
      <AdminHeader onLogout={handleLogout} />
      <h2 style={{ color: '#a76f3f', fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>
        Stock Inventory
      </h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading products...</p>
      ) : (
        <StockTable
          products={products}
          onReorder={handleReorder}
          onExport={handleExport}
          search={search}
          setSearch={setSearch}
          onStockUpdate={handleStockUpdate}
        />
      )}
    </div>
  );
};

export default AdminStock;
