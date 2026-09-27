const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'HP Pavilion 14',
    category: 'Electronics',
    price: 62000,
    features: [
      '11th Gen Intel Core i5',
      '16GB RAM, 512GB SSD',
      'Windows 11, 14" FHD',
      'Slim & Lightweight',
    ],
    stock: 5,
    rating: 4.0,
    image: 'https://via.placeholder.com/300x200?text=HP+Pavilion+14',
  },
  {
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 55000,
    features: [
      'Ryzen 5 5500U Processor',
      '8GB RAM, 512GB SSD',
      'Windows 11 + MS Office',
      'Backlit Keyboard',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Apple MacBook Air M1',
    category: 'Electronics',
    price: 85000,
    features: [
      'Apple M1 Chip, 8GB RAM',
      '256GB SSD',
      'macOS, 13.3" Retina Display',
      'Up to 18 hours battery',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Lenovo IdeaPad Slim 3',
    category: 'Electronics',
    price: 38000,
    features: [
      'Intel Core i3 12th Gen',
      '8GB RAM, 256GB SSD',
      '15.6" FHD, Anti-glare',
      'Lightweight Budget Laptop',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'ASUS ROG Strix G15 (Gaming Laptop)',
    category: 'Electronics',
    price: 95000,
    features: [
      'AMD Ryzen 7, RTX 3050 GPU',
      '16GB RAM, 1TB SSD',
      'RGB Keyboard, 144Hz Display',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Lenovo IdeaCentre AIO 3 (Desktop)',
    category: 'Electronics',
    price: 50000,
    features: [
      'Intel Core i5 12th Gen',
      '8GB RAM, 512GB SSD',
      '23.8" FHD Display',
      'Wireless Keyboard & Mouse',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Apple iPhone 14',
    category: 'mobile',
    price: 79999,
    features: [
      '6.1-inch Super Retina XDR',
      'A15 Bionic Chip',
      'Dual 12MP Cameras',
      'iOS 17',
    ],
    stock: 5,
    rating: 4.0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-ajpteApnLtlLSFvmhHxFr_34mTd2DLiJw&s',
  },
  {
    name: 'Samsung Galaxy S24 5G',
    category: 'Mobile',
    price: 69999,
    features: [
      '6.2-inch Dynamic AMOLED 2X',
      'Exynos 2400',
      '50MP Triple Camera',
      'Android 14',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Redmi Note 13 Pro+',
    category: 'Mobile',
    price: 31999,
    features: [
      '6.67-inch AMOLED',
      '200MP Camera',
      'Dimensity 7200-Ultra',
      '5000mAh Battery',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'OnePlus Nord CE 4',
    category: 'Mobile',
    price: 24999,
    features: [
      '6.7-inch AMOLED',
      'Snapdragon 7 Gen 3',
      '50MP Dual Camera',
      'OxygenOS 14',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Realme Narzo 60x',
    category: 'Mobile',
    price: 13999,
    features: [
      '6.72-inch FHD+ Display',
      'Dimensity 6100+',
      '50MP AI Camera',
      '5000mAh Battery',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Vivo V30 Pro',
    category: 'Mobile',
    price: 41999,
    features: [
      '6.78-inch AMOLED',
      'MediaTek Dimensity 8200',
      '50MP Triple Camera',
      '4600mAh Battery',
    ],
    stock: 5,
    rating: 4.0,
  },
  {
    name: 'Men Solid Slim Fit Shirt',
    category: 'Fashion',
    price: 799,
    features: [
      'Cotton Blend',
      'Slim Fit',
      'Full Sleeve',
      'Machine Washable',
    ],
    stock: 10,
    rating: 4.0,
  },
  {
    name: 'Women Printed Saree',
    category: 'Fashion',
    price: 1299,
    features: [
      'Poly Silk',
      'Printed',
      'With Blouse Piece',
      'Dry Clean Only',
    ],
    stock: 8,
    rating: 4.0,
  },
  {
    name: 'Gold Plated Jhumka Earrings',
    category: 'Fashion',
    price: 499,
    features: [
      'Gold Plated',
      'Traditional Design',
      'For Women & Girls',
      'Lightweight',
    ],
    stock: 15,
    rating: 4.0,
  },
  {
    name: 'Cotton Dupatta',
    category: 'Fashion',
    price: 299,
    features: [
      'Pure Cotton',
      'Soft & Lightweight',
      '2.25m Length',
      'Hand Wash',
    ],
    stock: 12,
    rating: 4.0,
  },
  {
    name: 'King Size Bedsheet',
    category: 'Home & Kitchen',
    price: 999,
    features: [
      'Cotton',
      'King Size',
      'Printed',
      '2 Pillow Covers',
    ],
    stock: 7,
    rating: 4.0,
  },
  {
    name: 'Plastic Storage Box',
    category: 'Home & Kitchen',
    price: 649,
    features: [
      'Heavy Duty',
      'Ventilated',
      'Stackable',
      'Commercial Use',
    ],
    stock: 20,
    rating: 4.0,
  },
  {
    name: 'Tupperware Modular Mates Storage Set',
    category: 'Home & Kitchen',
    price: 1599,
    features: [
      'Airtight',
      'BPA-Free',
      'Modular',
      '4-Piece Set',
    ],
    stock: 10,
    rating: 4.0,
  },
  {
    name: 'Banarasi Silk Saree',
    category: 'Sarees & Ethnic Wear',
    price: 1499,
    features: [
      'Handwoven',
      'Rich Pallu',
      'Perfect for weddings',
    ],
    rating: 4.5,
    stock: 10,
  },
  {
    name: 'Cotton Slim Fit Shirt',
    category: "Men's Wear",
    price: 799,
    features: [
      'Breathable Fabric',
      'Available in 5 colors',
      'Machine Wash',
    ],
    rating: 4.3,
    stock: 15,
  },
  {
    name: 'WOW Vitamin C Face Serum',
    category: 'Skincare Products',
    price: 499,
    features: [
      'Brightens Skin',
      'Paraben-Free',
      'Suitable for all skin types',
    ],
    rating: 4.7,
    stock: 20,
  },
  {
    name: 'boAt Rockerz 255 Pro+',
    category: 'Mobile Accessories',
    price: 1299,
    features: [
      '40Hrs Battery',
      'Fast Charging',
      'IPX7 Water Resistance',
    ],
    rating: 4.6,
    stock: 25,
  },
  {
    name: 'Maybelline Fit Me Foundation',
    category: 'Makeup & Beauty',
    price: 549,
    features: [
      'Matte Finish',
      '18 Shades',
      'SPF 22',
    ],
    rating: 4.4,
    stock: 30,
  },
  {
    name: 'Premium Cotton Bedsheets',
    category: 'Home Furnishing',
    price: 999,
    features: [
      '100% Cotton',
      '400 TC',
      'Fade Resistant',
    ],
    rating: 4.2,
    stock: 12,
  },
  {
    name: 'Prestige Induction Cooktop',
    category: 'Kitchen Appliances',
    price: 2199,
    features: [
      'Auto Shut-off',
      '7 Preset Modes',
      'Anti-Magnetic Wall',
    ],
    rating: 4.5,
    stock: 8,
  },
  {
    name: 'Mamaearth Onion Hair Oil',
    category: 'Hair Care',
    price: 399,
    features: [
      'Reduces Hair Fall',
      'Non-Sticky',
      'Suitable for All',
    ],
    rating: 4.3,
    stock: 18,
  },
  {
    name: 'Remote Control Racing Car',
    category: 'Toys & Kids',
    price: 1199,
    features: [
      'Rechargeable',
      '360° Spins',
      'LED Lights',
    ],
    rating: 4.6,
    stock: 14,
  },
  {
    name: 'Realme Buds Wireless 3',
    category: 'Electronics & Gadgets',
    price: 1699,
    features: [
      'ANC',
      '30Hrs Playtime',
      'Dual Pairing',
    ],
    rating: 4.4,
    stock: 22,
  },
  {
    name: 'Leather Tote Bag',
    category: 'Handbags & Accessories',
    price: 1399,
    features: [
      'Spacious',
      'Water Resistant',
      'Zipper Closure',
    ],
    rating: 4.5,
    stock: 16,
  },
  {
    name: 'Lizol Disinfectant Cleaner',
    category: 'Home Cleaning',
    price: 299,
    features: [
      '99.9% Germ Kill',
      'Citrus Fresh',
      '2L',
    ],
    rating: 4.7,
    stock: 40,
  },
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/ethnickart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Do NOT clear all products before seeding
  // await Product.deleteMany({});
  // console.log('Cleared all products from the collection.');
  for (const prod of products) {
    // Check if product exists by name+category+subcategory
    const existing = await Product.findOne({
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory,
    });
    if (!existing) {
      await Product.create(prod);
      console.log(`Added: ${prod.name} (${prod.category})`);
    } else {
      // Optionally update non-stock fields (except stock)
      // await Product.updateOne({ _id: existing._id }, { $set: { ...prod, stock: existing.stock } });
      console.log(`Skipped (already exists): ${prod.name} (${prod.category})`);
    }
  }
  mongoose.disconnect();
}

seed(); 