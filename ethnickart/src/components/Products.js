import { API_BASE } from '../api';
import React, { useState, useEffect, useContext } from 'react';
import { CartWishlistContext } from '../App';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

// Sample products
const allProducts = [
  // Electronics - Laptops & Desktops (6 products)
  {
    id: 101,
    name: 'HP Pavilion 14',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/laptop/y/g/x/-original-imagwzrg6hztgghy.jpeg',
    price: 62000,
    rating: 4.6,
    category: 'Electronics',
    subcategory: 'Laptops & Desktops',
    features: [
      '11th Gen Intel Core i5',
      '16GB RAM, 512GB SSD',
      'Windows 11, 14" FHD',
      'Slim & Lightweight',
    ],
    stock: 5,
  },
  {
    id: 102,
    name: 'Dell Inspiron 15',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/computer/laptop/y/g/x/inspiron-3501-dell-original-imag4z2gqzqgk7z.jpeg',
    price: 55000,
    rating: 4.5,
    category: 'Electronics',
    subcategory: 'Laptops & Desktops',
    features: [
      'Ryzen 5 5500U Processor',
      '8GB RAM, 512GB SSD',
      'Windows 11 + MS Office',
      'Backlit Keyboard',
    ],
    stock: 5,
  },
  {
    id: 103,
    name: 'Apple MacBook Air M1',
    image: 'https://rukminim2.flixcart.com/image/416/416/l2f20sw0/computer/laptop/2/0/0/-original-imagdrt8h2gk7z.jpeg',
    price: 85000,
    rating: 4.9,
    category: 'Electronics',
    subcategory: 'Laptops & Desktops',
    features: [
      'Apple M1 Chip, 8GB RAM',
      '256GB SSD',
      'macOS, 13.3" Retina Display',
      'Up to 18 hours battery',
    ],
    stock: 5,
  },
  {
    id: 104,
    name: 'Lenovo IdeaPad Slim 3',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/laptop/2/0/0/-original-imagz7h2gk7z.jpeg',
    price: 38000,
    rating: 4.4,
    category: 'Electronics',
    subcategory: 'Laptops & Desktops',
    features: [
      'Intel Core i3 12th Gen',
      '8GB RAM, 256GB SSD',
      '15.6" FHD, Anti-glare',
      'Lightweight Budget Laptop',
    ],
    stock: 5,
  },
  {
    id: 105,
    name: 'ASUS ROG Strix G15 (Gaming Laptop)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/laptop/2/0/0/-original-imagz7h2gk7z.jpeg',
    price: 95000,
    rating: 4.8,
    category: 'Electronics',
    subcategory: 'Laptops & Desktops',
    features: [
      'AMD Ryzen 7, RTX 3050 GPU',
      '16GB RAM, 1TB SSD',
      'RGB Keyboard, 144Hz Display',
    ],
    stock: 5,
  },
  {
    id: 106,
    name: 'Lenovo IdeaCentre AIO 3 (Desktop)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/allinone-desktop/2/0/0/-original-imagz7h2gk7z.jpeg',
    price: 50000,
    rating: 4.5,
    category: 'Electronics',
    subcategory: 'Laptops & Desktops',
    features: [
      'Intel Core i5 12th Gen',
      '8GB RAM, 512GB SSD',
      '23.8" FHD Display',
      'Wireless Keyboard & Mouse',
    ],
    stock: 5,
  },

  // Mobiles - Smartphones (Android, iPhones) (6 products)
  {
    id: 237,
    name: 'Apple iPhone 14',
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-model-unselect-202209?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1661027788805',
    price: 79999,
    rating: 4.9,
    category: 'Mobiles',
    subcategory: 'Smartphones (Android, iPhones)',
    features: [
      '6.1-inch Super Retina XDR',
      'A15 Bionic Chip',
      'Dual 12MP Cameras',
      'iOS 17',
    ],
    stock: 5,
  },
  {
    id: 238,
    name: 'Samsung Galaxy S24 5G',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/g/x/galaxy-s24-samsung-original-imagwzrg6hztgghy.jpeg',
    price: 69999,
    rating: 4.8,
    category: 'Mobiles',
    subcategory: 'Smartphones (Android, iPhones)',
    features: [
      '6.2-inch Dynamic AMOLED 2X',
      'Exynos 2400',
      '50MP Triple Camera',
      'Android 14',
    ],
    stock: 5,
  },
  {
    id: 239,
    name: 'Redmi Note 13 Pro+',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/g/x/note-13-pro-plus-redmi-original-imagwzrg6hztgghy.jpeg',
    price: 31999,
    rating: 4.7,
    category: 'Mobiles',
    subcategory: 'Smartphones (Android, iPhones)',
    features: [
      '6.67-inch AMOLED',
      '200MP Camera',
      'Dimensity 7200-Ultra',
      '5000mAh Battery',
    ],
    stock: 5,
  },
  {
    id: 240,
    name: 'OnePlus Nord CE 4',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/g/x/nord-ce-4-oneplus-original-imagwzrg6hztgghy.jpeg',
    price: 24999,
    rating: 4.6,
    category: 'Mobiles',
    subcategory: 'Smartphones (Android, iPhones)',
    features: [
      '6.7-inch AMOLED',
      'Snapdragon 7 Gen 3',
      '50MP Dual Camera',
      'OxygenOS 14',
    ],
    stock: 5,
  },
  {
    id: 241,
    name: 'Realme Narzo 60x',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/g/x/narzo-60x-realme-original-imagwzrg6hztgghy.jpeg',
    price: 13999,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Smartphones (Android, iPhones)',
    features: [
      '6.72-inch FHD+ Display',
      'Dimensity 6100+',
      '50MP AI Camera',
      '5000mAh Battery',
    ],
    stock: 5,
  },
  {
    id: 242,
    name: 'Vivo V30 Pro',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/g/x/v30-pro-vivo-original-imagwzrg6hztgghy.jpeg',
    price: 41999,
    rating: 4.7,
    category: 'Mobiles',
    subcategory: 'Smartphones (Android, iPhones)',
    features: [
      '6.78-inch AMOLED',
      'MediaTek Dimensity 8200',
      '50MP Triple Camera',
      '4600mAh Battery',
    ],
    stock: 5,
  },
  // Mobiles - Feature Phones (6 products)
  {
    id: 243,
    name: 'Nokia 110 4G',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/feature-phone/y/g/x/110-4g-nokia-original-imagwzrg6hztgghy.jpeg',
    price: 2499,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Feature Phones',
    features: [
      '1.8-inch Display',
      '4G VoLTE',
      'Wireless FM',
      'Expandable Storage',
    ],
    stock: 5,
  },
  {
    id: 244,
    name: 'Samsung Guru Music 2',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/feature-phone/y/g/x/guru-music-2-samsung-original-imagwzrg6hztgghy.jpeg',
    price: 1899,
    rating: 4.3,
    category: 'Mobiles',
    subcategory: 'Feature Phones',
    features: [
      '2-inch Display',
      'FM Radio',
      'Dual SIM',
      '800mAh Battery',
    ],
    stock: 5,
  },
  {
    id: 245,
    name: 'Lava A1 Star',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/feature-phone/y/g/x/a1-star-lava-original-imagwzrg6hztgghy.jpeg',
    price: 1299,
    rating: 4.2,
    category: 'Mobiles',
    subcategory: 'Feature Phones',
    features: [
      '1.77-inch Display',
      'Dual SIM',
      '800mAh Battery',
      'Torch Light',
    ],
    stock: 5,
  },
  {
    id: 246,
    name: 'Itel Magic X Pro',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/feature-phone/y/g/x/magic-x-pro-itel-original-imagwzrg6hztgghy.jpeg',
    price: 1799,
    rating: 4.1,
    category: 'Mobiles',
    subcategory: 'Feature Phones',
    features: [
      '2.4-inch Display',
      'Dual SIM',
      'Wireless FM',
      'Expandable Storage',
    ],
    stock: 5,
  },
  {
    id: 247,
    name: 'Micromax X412',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/feature-phone/y/g/x/x412-micromax-original-imagwzrg6hztgghy.jpeg',
    price: 1099,
    rating: 4.0,
    category: 'Mobiles',
    subcategory: 'Feature Phones',
    features: [
      '1.8-inch Display',
      'Dual SIM',
      'FM Radio',
      'Expandable Storage',
    ],
    stock: 5,
  },
  {
    id: 248,
    name: 'Karbonn K9',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/feature-phone/y/g/x/k9-karbonn-original-imagwzrg6hztgghy.jpeg',
    price: 1199,
    rating: 4.1,
    category: 'Mobiles',
    subcategory: 'Feature Phones',
    features: [
      '2.4-inch Display',
      'Dual SIM',
      '1800mAh Battery',
      'FM Radio',
    ],
    stock: 5,
  },
  // Mobiles - Mobile Cases & Covers (6 products)
  {
    id: 249,
    name: 'Spigen Rugged Armor Case (iPhone 14)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/case/y/g/x/rugged-armor-spigen-original-imagwzrg6hztgghy.jpeg',
    price: 1499,
    rating: 4.7,
    category: 'Mobiles',
    subcategory: 'Mobile Cases & Covers',
    features: [
      'Shock Absorption',
      'Carbon Fiber Design',
      'Wireless Charging Compatible',
      'Precise Cutouts',
    ],
    stock: 5,
  },
  {
    id: 250,
    name: 'Ringke Fusion Case (Samsung S24)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/case/y/g/x/fusion-ringke-original-imagwzrg6hztgghy.jpeg',
    price: 1299,
    rating: 4.6,
    category: 'Mobiles',
    subcategory: 'Mobile Cases & Covers',
    features: [
      'Crystal Clear Back',
      'Shock Absorption',
      'Slim Profile',
      'Precise Cutouts',
    ],
    stock: 5,
  },
  {
    id: 251,
    name: 'Pikachu Soft Silicone Cover (Redmi Note)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/case/y/g/x/pikachu-silicone-original-imagwzrg6hztgghy.jpeg',
    price: 499,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Mobile Cases & Covers',
    features: [
      'Soft Silicone',
      'Cute Pikachu Design',
      'Full Protection',
      'Easy to Install',
    ],
    stock: 5,
  },
  {
    id: 252,
    name: 'Transparent Bumper Case (OnePlus)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/case/y/g/x/transparent-bumper-original-imagwzrg6hztgghy.jpeg',
    price: 599,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Mobile Cases & Covers',
    features: [
      'Shockproof Corners',
      'Crystal Clear',
      'Slim Fit',
      'Easy Access Buttons',
    ],
    stock: 5,
  },
  {
    id: 253,
    name: 'Leather Flip Cover (Realme Narzo)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/case/y/g/x/leather-flip-cover-original-imagwzrg6hztgghy.jpeg',
    price: 799,
    rating: 4.3,
    category: 'Mobiles',
    subcategory: 'Mobile Cases & Covers',
    features: [
      'Premium Leather',
      'Card Slots',
      'Magnetic Closure',
      'Full Protection',
    ],
    stock: 5,
  },
  {
    id: 254,
    name: 'Designer Back Cover (Vivo Series)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/case/y/g/x/designer-back-cover-original-imagwzrg6hztgghy.jpeg',
    price: 699,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Mobile Cases & Covers',
    features: [
      'Trendy Design',
      'Scratch Resistant',
      'Perfect Fit',
      'Easy to Install',
    ],
    stock: 5,
  },
  // Mobiles - Power Banks (6 products)
  {
    id: 255,
    name: 'Mi 10000mAh Power Bank 3i',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/power-bank/y/g/x/mi-3i-original-imagwzrg6hztgghy.jpeg',
    price: 1299,
    rating: 4.6,
    category: 'Mobiles',
    subcategory: 'Power Banks',
    features: [
      '10000mAh Capacity',
      'Dual Output',
      '18W Fast Charging',
      'Aluminum Alloy Body',
    ],
    stock: 5,
  },
  {
    id: 256,
    name: 'Portronics Power Brick 20000mAh',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/power-bank/y/g/x/power-brick-portronics-original-imagwzrg6hztgghy.jpeg',
    price: 1799,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Power Banks',
    features: [
      '20000mAh Capacity',
      'Dual USB Output',
      'LED Indicator',
      'Fast Charging',
    ],
    stock: 5,
  },
  {
    id: 257,
    name: 'Ambrane 27000mAh Power Bank',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/power-bank/y/g/x/ambrane-27000mah-original-imagwzrg6hztgghy.jpeg',
    price: 2499,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Power Banks',
    features: [
      '27000mAh Capacity',
      'Triple Output',
      'Type-C Input',
      'Fast Charging',
    ],
    stock: 5,
  },
  {
    id: 258,
    name: 'Realme Dart Charge 10000mAh',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/power-bank/y/g/x/realme-dart-original-imagwzrg6hztgghy.jpeg',
    price: 1599,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Power Banks',
    features: [
      '10000mAh Capacity',
      'Dart Charge',
      'Dual Output',
      'Slim Design',
    ],
    stock: 5,
  },
  {
    id: 259,
    name: 'URBN 20000mAh Compact Power Bank',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/power-bank/y/g/x/urbn-20000mah-original-imagwzrg6hztgghy.jpeg',
    price: 1899,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Power Banks',
    features: [
      '20000mAh Capacity',
      'Compact Size',
      'Dual USB Output',
      'Fast Charging',
    ],
    stock: 5,
  },
  {
    id: 260,
    name: 'Samsung 25W 10000mAh Slim Power Bank',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/power-bank/y/g/x/samsung-25w-original-imagwzrg6hztgghy.jpeg',
    price: 2299,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Power Banks',
    features: [
      '10000mAh Capacity',
      '25W Fast Charging',
      'Slim Design',
      'Dual Output',
    ],
    stock: 5,
  },
  // Mobiles - Chargers & Cables (6 products)
  {
    id: 261,
    name: 'Samsung 25W Fast Charger USB-C',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/charger/y/g/x/25w-fast-charger-samsung-original-imagwzrg6hztgghy.jpeg',
    price: 1499,
    rating: 4.6,
    category: 'Mobiles',
    subcategory: 'Chargers & Cables',
    features: [
      '25W Fast Charging',
      'USB Type-C',
      'Compact Design',
      'Over-voltage Protection',
    ],
    stock: 5,
  },
  {
    id: 262,
    name: 'Apple 20W USB-C Power Adapter',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/charger/y/g/x/20w-usb-c-apple-original-imagwzrg6hztgghy.jpeg',
    price: 1999,
    rating: 4.7,
    category: 'Mobiles',
    subcategory: 'Chargers & Cables',
    features: [
      '20W Fast Charging',
      'USB Type-C',
      'Compact & Portable',
      'Universal Compatibility',
    ],
    stock: 5,
  },
  {
    id: 263,
    name: 'boAt Dual Port Wall Charger',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/charger/y/g/x/dual-port-boat-original-imagwzrg6hztgghy.jpeg',
    price: 799,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Chargers & Cables',
    features: [
      'Dual USB Output',
      'Smart IC Protection',
      'Universal Compatibility',
      'Compact Design',
    ],
    stock: 5,
  },
  {
    id: 264,
    name: 'MI USB Type-C Cable 1.2m',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/cable/y/g/x/type-c-mi-original-imagwzrg6hztgghy.jpeg',
    price: 299,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Chargers & Cables',
    features: [
      '1.2m Length',
      'Type-C',
      'Fast Charging Support',
      'Tangle Free',
    ],
    stock: 5,
  },
  {
    id: 265,
    name: 'Portronics Konnect A Type-C Cable',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/cable/y/g/x/konnect-a-portronics-original-imagwzrg6hztgghy.jpeg',
    price: 399,
    rating: 4.3,
    category: 'Mobiles',
    subcategory: 'Chargers & Cables',
    features: [
      'Type-C',
      'Fast Charging',
      '1.5m Length',
      'Braided Cable',
    ],
    stock: 5,
  },
  {
    id: 266,
    name: 'Realme 33W Dart Charger',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/charger/y/g/x/33w-dart-realme-original-imagwzrg6hztgghy.jpeg',
    price: 1299,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Chargers & Cables',
    features: [
      '33W Fast Charging',
      'Type-C',
      'Smart Protection',
      'Compact Design',
    ],
    stock: 5,
  },
  // Mobiles - Screen Protectors (6 products)
  {
    id: 267,
    name: 'Gorilla Edge-to-Edge Glass (iPhone 14)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/y/g/x/gorilla-glass-iphone14-original-imagwzrg6hztgghy.jpeg',
    price: 799,
    rating: 4.6,
    category: 'Mobiles',
    subcategory: 'Screen Protectors',
    features: [
      '9H Hardness',
      'Edge-to-Edge Protection',
      'Oleophobic Coating',
      'Easy Installation',
    ],
    stock: 5,
  },
  {
    id: 268,
    name: 'Spigen Tempered Glass (Samsung S24)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/y/g/x/spigen-glass-s24-original-imagwzrg6hztgghy.jpeg',
    price: 999,
    rating: 4.7,
    category: 'Mobiles',
    subcategory: 'Screen Protectors',
    features: [
      '9H Hardness',
      'Anti-Fingerprint',
      'Easy Installation',
      'Case Friendly',
    ],
    stock: 5,
  },
  {
    id: 269,
    name: 'Flipkart SmartBuy Glass (Redmi Note)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/y/g/x/smartbuy-glass-redmi-original-imagwzrg6hztgghy.jpeg',
    price: 399,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Screen Protectors',
    features: [
      'HD Clarity',
      'Scratch Resistant',
      'Bubble Free',
      'Easy Installation',
    ],
    stock: 5,
  },
  {
    id: 270,
    name: 'Case U Tempered Glass (OnePlus Nord)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/y/g/x/case-u-glass-oneplus-original-imagwzrg6hztgghy.jpeg',
    price: 499,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Screen Protectors',
    features: [
      '9H Hardness',
      'Full Coverage',
      'Easy Installation',
      'Anti-Shatter',
    ],
    stock: 5,
  },
  {
    id: 271,
    name: 'AGARO 9H Glass (Vivo Series)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/y/g/x/agaro-glass-vivo-original-imagwzrg6hztgghy.jpeg',
    price: 599,
    rating: 4.3,
    category: 'Mobiles',
    subcategory: 'Screen Protectors',
    features: [
      '9H Hardness',
      'HD Clarity',
      'Easy Installation',
      'Oleophobic Coating',
    ],
    stock: 5,
  },
  {
    id: 272,
    name: 'Realme Narzo Full Cover Glass',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/screen-guard/y/g/x/full-cover-realme-original-imagwzrg6hztgghy.jpeg',
    price: 499,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Screen Protectors',
    features: [
      'Full Coverage',
      'Scratch Resistant',
      'Easy Installation',
      'HD Clarity',
    ],
    stock: 5,
  },
  // Mobiles - Mobile Holders (6 products)
  {
    id: 273,
    name: 'Portronics Clamp Car Mobile Holder',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile-holder/y/g/x/clamp-car-portronics-original-imagwzrg6hztgghy.jpeg',
    price: 699,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Mobile Holders',
    features: [
      '360° Rotation',
      'Strong Clamp',
      'Dashboard & Windshield Mount',
      'Universal Fit',
    ],
    stock: 5,
  },
  {
    id: 274,
    name: 'Spigen OneTap Dashboard Mount',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile-holder/y/g/x/onetap-spigen-original-imagwzrg6hztgghy.jpeg',
    price: 1499,
    rating: 4.6,
    category: 'Mobiles',
    subcategory: 'Mobile Holders',
    features: [
      'OneTap Technology',
      'Dashboard Mount',
      'Adjustable Viewing',
      'Strong Suction',
    ],
    stock: 5,
  },
  {
    id: 275,
    name: 'ELV Flexible Long Arm Mount',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile-holder/y/g/x/flexible-long-arm-elv-original-imagwzrg6hztgghy.jpeg',
    price: 599,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Mobile Holders',
    features: [
      'Long Flexible Arm',
      '360° Rotation',
      'Dashboard & Bedside Use',
      'Universal Fit',
    ],
    stock: 5,
  },
  {
    id: 276,
    name: 'Amkette Air Vent Phone Holder',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile-holder/y/g/x/air-vent-amkette-original-imagwzrg6hztgghy.jpeg',
    price: 499,
    rating: 4.3,
    category: 'Mobiles',
    subcategory: 'Mobile Holders',
    features: [
      'Air Vent Mount',
      'Compact Design',
      'Easy Installation',
      'Universal Fit',
    ],
    stock: 5,
  },
  {
    id: 277,
    name: 'AutoWiz Magnetic Holder',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile-holder/y/g/x/magnetic-autowiz-original-imagwzrg6hztgghy.jpeg',
    price: 799,
    rating: 4.4,
    category: 'Mobiles',
    subcategory: 'Mobile Holders',
    features: [
      'Magnetic Mount',
      '360° Rotation',
      'Dashboard & Desk Use',
      'Universal Fit',
    ],
    stock: 5,
  },
  {
    id: 278,
    name: 'Boat Car Grip Wireless Charger Holder',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile-holder/y/g/x/car-grip-boat-original-imagwzrg6hztgghy.jpeg',
    price: 1999,
    rating: 4.5,
    category: 'Mobiles',
    subcategory: 'Mobile Holders',
    features: [
      'Wireless Charging',
      'Auto-Clamp',
      'Dashboard & Air Vent Mount',
      'Universal Fit',
    ],
    stock: 5,
  },
  // Fashion - T-Shirts, Shirts, Jeans (Men)
  {
    id: 279,
    name: 'U.S. Polo Assn. Polo T-Shirt',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/t-shirt/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1199,
    rating: 4.5,
    category: 'Fashion',
    subcategory: 'T-Shirts, Shirts, Jeans',
    features: [
      'Cotton',
      'Slim Fit',
      'Short Sleeve',
      'Embroidered Logo',
    ],
    stock: 5,
  },
  {
    id: 280,
    name: "Levi's Slim Fit Jeans",
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/jeans/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 2499,
    rating: 4.6,
    category: 'Fashion',
    subcategory: 'T-Shirts, Shirts, Jeans',
    features: [
      'Denim',
      'Slim Fit',
      'Mid Wash',
      '5 Pockets',
    ],
    stock: 5,
  },
  {
    id: 281,
    name: 'Allen Solly Checked Shirt',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/shirt/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1599,
    rating: 4.4,
    category: 'Fashion',
    subcategory: 'T-Shirts, Shirts, Jeans',
    features: [
      'Cotton Blend',
      'Regular Fit',
      'Full Sleeve',
      'Checked Pattern',
    ],
    stock: 5,
  },
  {
    id: 282,
    name: 'Jack & Jones Graphic T-Shirt',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/t-shirt/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 999,
    rating: 4.3,
    category: 'Fashion',
    subcategory: 'T-Shirts, Shirts, Jeans',
    features: [
      'Cotton',
      'Graphic Print',
      'Crew Neck',
      'Short Sleeve',
    ],
    stock: 5,
  },
  {
    id: 283,
    name: 'Wrangler Regular Fit Jeans',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/jeans/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1999,
    rating: 4.4,
    category: 'Fashion',
    subcategory: 'T-Shirts, Shirts, Jeans',
    features: [
      'Denim',
      'Regular Fit',
      'Stone Wash',
      'Classic 5 Pocket',
    ],
    stock: 5,
  },
  {
    id: 284,
    name: 'Peter England Solid Formal Shirt',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/shirt/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1399,
    rating: 4.5,
    category: 'Fashion',
    subcategory: 'T-Shirts, Shirts, Jeans',
    features: [
      'Cotton Blend',
      'Solid Color',
      'Full Sleeve',
      'Regular Fit',
    ],
    stock: 5,
  },
  // Fashion - Shoes & Sandals (Men)
  {
    id: 285,
    name: 'Woodland Leather Casual Shoes',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/shoes/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 3499,
    rating: 4.7,
    category: 'Fashion',
    subcategory: 'Shoes & Sandals',
    features: [
      'Genuine Leather',
      'Lace Up',
      'Cushioned Insole',
      'Durable Sole',
    ],
    stock: 5,
  },
  {
    id: 286,
    name: 'Red Tape Running Sneakers',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/shoes/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 2299,
    rating: 4.5,
    category: 'Fashion',
    subcategory: 'Shoes & Sandals',
    features: [
      'Mesh Upper',
      'Lightweight',
      'EVA Sole',
      'Lace Up',
    ],
    stock: 5,
  },
  {
    id: 287,
    name: 'Nike Revolution 6 Running Shoes',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/shoes/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 3999,
    rating: 4.8,
    category: 'Fashion',
    subcategory: 'Shoes & Sandals',
    features: [
      'Breathable Mesh',
      'Foam Midsole',
      'Rubber Outsole',
      'Lace Up',
    ],
    stock: 5,
  },
  {
    id: 288,
    name: 'Sparx Sports Sandals',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/sandal/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 899,
    rating: 4.4,
    category: 'Fashion',
    subcategory: 'Shoes & Sandals',
    features: [
      'Adjustable Straps',
      'EVA Sole',
      'Water Friendly',
      'Lightweight',
    ],
    stock: 5,
  },
  {
    id: 289,
    name: "Adidas Men's Slides",
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/sandal/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1499,
    rating: 4.5,
    category: 'Fashion',
    subcategory: 'Shoes & Sandals',
    features: [
      'Synthetic Upper',
      'Slip On',
      'Cushioned Footbed',
      'Water Resistant',
    ],
    stock: 5,
  },
  {
    id: 290,
    name: 'Bata Black Formal Shoes',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/shoes/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1299,
    rating: 4.3,
    category: 'Fashion',
    subcategory: 'Shoes & Sandals',
    features: [
      'Synthetic Leather',
      'Slip On',
      'Cushioned Insole',
      'Formal Wear',
    ],
    stock: 5,
  },
  // Fashion - Watches, Belts, Wallets (Men)
  {
    id: 291,
    name: 'Titan Neo Analog Watch',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/watch/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 2999,
    rating: 4.6,
    category: 'Fashion',
    subcategory: 'Watches, Belts, Wallets',
    features: [
      'Analog Display',
      'Stainless Steel Back',
      'Water Resistant',
      'Leather Strap',
    ],
    stock: 5,
  },
  {
    id: 292,
    name: 'Fastrack Casual Wrist Watch',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/watch/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 1999,
    rating: 4.5,
    category: 'Fashion',
    subcategory: 'Watches, Belts, Wallets',
    features: [
      'Quartz Movement',
      'Water Resistant',
      'Silicone Strap',
      'Bold Markers',
    ],
    stock: 5,
  },
  {
    id: 293,
    name: 'Allen Solly Reversible Leather Belt',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/belt/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 899,
    rating: 4.4,
    category: 'Fashion',
    subcategory: 'Watches, Belts, Wallets',
    features: [
      'Genuine Leather',
      'Reversible',
      'Pin Buckle',
      'Adjustable Length',
    ],
    stock: 5,
  },
  {
    id: 294,
    name: 'WildHorn RFID Wallet',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/wallet/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 799,
    rating: 4.5,
    category: 'Fashion',
    subcategory: 'Watches, Belts, Wallets',
    features: [
      'RFID Protected',
      'Genuine Leather',
      'Multiple Compartments',
      'Compact Design',
    ],
    stock: 5,
  },
  {
    id: 295,
    name: 'Fossil Black Dial Chronograph',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/watch/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 7999,
    rating: 4.7,
    category: 'Fashion',
    subcategory: 'Watches, Belts, Wallets',
    features: [
      'Chronograph',
      'Black Dial',
      'Stainless Steel',
      'Water Resistant',
    ],
    stock: 5,
  },
  {
    id: 296,
    name: 'Peter England Leather Belt',
    image: 'https://rukminim2.flixcart.com/image/416/416/kqidx8w0/belt/y/g/x/men-original-imag4z2gqzqgk7z.jpeg',
    price: 699,
    rating: 4.3,
    category: 'Fashion',
    subcategory: 'Watches, Belts, Wallets',
    features: [
      'Genuine Leather',
      'Pin Buckle',
      'Classic Design',
      'Adjustable Length',
    ],
    stock: 5,
  },
  // Fashion - Kurtis, Tops, Leggings (Women)
{
  id: 297,
  name: 'Biba Printed Straight Kurti',
  image: 'https://rukminim2.flixcart.com/image/416/416/kz8qsnk0/kurta/l/h/7/xl-kurti-yellow-biba-original-imagbpkggwhtqtkg.jpeg',
  price: 1299,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Kurtis, Tops, Leggings',
  features: [
    'Rayon Fabric',
    'Straight Cut',
    '3/4 Sleeve',
    'Printed Design',
  ],
  stock: 5,
},
{
  id: 298,
  name: 'Libas Anarkali Kurta',
  image: 'https://rukminim2.flixcart.com/image/416/416/l0lbrm80/kurta/x/v/n/m-kurti-libas-original-imagccuhbqzyspqt.jpeg',
  price: 1499,
  rating: 4.6,
  category: 'Fashion',
  subcategory: 'Kurtis, Tops, Leggings',
  features: [
    'Cotton Blend',
    'Anarkali Fit',
    'Full Sleeve',
    'Embroidered Neckline',
  ],
  stock: 5,
},
{
  id: 299,
  name: 'W Solid Cotton Kurta',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/kurta/b/o/p/m-22fe16295-116115-w-original-imaggfefmrb2xgbr.jpeg',
  price: 1399,
  rating: 4.4,
  category: 'Fashion',
  subcategory: 'Kurtis, Tops, Leggings',
  features: [
    'Solid Pattern',
    'Cotton Fabric',
    'Straight Hem',
    'Keyhole Neck',
  ],
  stock: 5,
},
{
  id: 300,
  name: 'Aurelia Churidar Leggings',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/legging/g/y/l/free-1262-royalblue-aurelia-original-imagq4ug8fbm6x4v.jpeg',
  price: 599,
  rating: 4.3,
  category: 'Fashion',
  subcategory: 'Kurtis, Tops, Leggings',
  features: [
    'Cotton Stretch',
    'Elastic Waistband',
    'Full Length',
    'Colorfast Fabric',
  ],
  stock: 5,
},
{
  id: 301,
  name: 'Fabindia Handwoven Kurti',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/kurta/q/a/x/xs-kurta-fabindia-original-imagwuwz7czgmcmz.jpeg',
  price: 1799,
  rating: 4.6,
  category: 'Fashion',
  subcategory: 'Kurtis, Tops, Leggings',
  features: [
    'Handwoven Cotton',
    'Angrakha Style',
    'Quarter Sleeve',
    'Indigo Print',
  ],
  stock: 5,
},
{
  id: 302,
  name: 'H&M Peach Casual Top',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/top/2/j/d/s-12345-h-m-original-imagzd4gfydahdgh.jpeg',
  price: 999,
  rating: 4.2,
  category: 'Fashion',
  subcategory: 'Kurtis, Tops, Leggings',
  features: [
    'Polyester Blend',
    'Short Sleeve',
    'Loose Fit',
    'Solid Color',
  ],
  stock: 5,
},
// Fashion - Sarees & Ethnic Wear (Women)
{
  id: 303,
  name: 'Pothys Pure Silk Saree',
  image: 'https://rukminim2.flixcart.com/image/416/416/l4d2ljk0/sari/1/6/b/free-6126s1356a-ishin-unstitched-original-imagfhyffdp4fdbs.jpeg',
  price: 3599,
  rating: 4.6,
  category: 'Fashion',
  subcategory: 'Sarees & Ethnic Wear',
  features: ['Pure Silk', 'Zari Border', 'Traditional Weave', 'Unstitched Blouse'],
  stock: 5,
},
{
  id: 304,
  name: 'Ishin Georgette Printed Saree',
  image: 'https://rukminim2.flixcart.com/image/416/416/l0sgyvk0/sari/4/o/m/free-isc1119-ishin-unstitched-original-imagcg7sk7fzefgq.jpeg',
  price: 1199,
  rating: 4.4,
  category: 'Fashion',
  subcategory: 'Sarees & Ethnic Wear',
  features: ['Georgette Fabric', 'Floral Print', 'Lightweight', 'Matching Blouse Piece'],
  stock: 5,
},
{
  id: 305,
  name: 'Mimosa Banarasi Art Silk Saree',
  image: 'https://rukminim2.flixcart.com/image/416/416/l2f20sw0/sari/t/h/2/free-3921-mimosa-unstitched-original-imagdrwhtkeqk6hg.jpeg',
  price: 1599,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Sarees & Ethnic Wear',
  features: ['Art Silk', 'Banarasi Weave', 'Festive Wear', 'Gold Zari Work'],
  stock: 5,
},
{
  id: 306,
  name: 'Kalanjali Cotton Blend Saree',
  image: 'https://rukminim2.flixcart.com/image/416/416/l1zc6fk0/sari/q/g/2/free-bans0041-kalanjali-unstitched-original-imagdfzdcfsz6whm.jpeg',
  price: 999,
  rating: 4.2,
  category: 'Fashion',
  subcategory: 'Sarees & Ethnic Wear',
  features: ['Cotton Blend', 'Printed Design', 'Comfort Fit', 'Casual Wear'],
  stock: 5,
},
{
  id: 307,
  name: 'Sangria Ready-to-Wear Saree',
  image: 'https://rukminim2.flixcart.com/image/416/416/l3lx8cw0/sari/g/m/2/free-sar-sangria-unstitched-original-imagepc3v9bcphfu.jpeg',
  price: 1899,
  rating: 4.3,
  category: 'Fashion',
  subcategory: 'Sarees & Ethnic Wear',
  features: ['Ready-to-Wear', 'Pre-Stitched Pallu', 'Modern Design', 'Stretchable Waistband'],
  stock: 5,
},
{
  id: 308,
  name: 'Vark Zari Border Saree',
  image: 'https://rukminim2.flixcart.com/image/416/416/l4x2rgw0/sari/2/5/j/free-vark-unstitched-original-imagfpph2dnpqd7f.jpeg',
  price: 1799,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Sarees & Ethnic Wear',
  features: ['Zari Border', 'Festive Look', 'With Blouse Piece', 'Elegant Drape'],
  stock: 5,
},
// Fashion - Handbags & Jewellery (Women)
{
  id: 309,
  name: 'Lavie Quilted Satchel Bag',
  image: 'https://rukminim2.flixcart.com/image/416/416/kz1lle80/hand-messenger-bag/i/v/h/lhbq092019n4-lavie-satchel-original-imagb2zn5qccm5kt.jpeg',
  price: 2299,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Handbags, Jewellery',
  features: ['PU Leather', 'Quilted Texture', 'Zip Closure', 'Dual Handles'],
  stock: 5,
},
{
  id: 310,
  name: 'Caprese Sling Crossbody Bag',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/hand-messenger-bag/u/x/i/stella-ladies-sling-bag-caprese-original-imagg4vsdhghpzc7.jpeg',
  price: 1499,
  rating: 4.4,
  category: 'Fashion',
  subcategory: 'Handbags, Jewellery',
  features: ['Compact Design', 'Adjustable Strap', 'PU Finish', 'Magnetic Closure'],
  stock: 5,
},
{
  id: 311,
  name: 'Zaveri Pearls Kundan Set',
  image: 'https://rukminim2.flixcart.com/image/416/416/kkr72q80/jewellery-set/q/s/g/zpfk9270-zaveri-pearls-original-imagyekjht2x6ehy.jpeg',
  price: 999,
  rating: 4.3,
  category: 'Fashion',
  subcategory: 'Handbags, Jewellery',
  features: ['Kundan Work', 'Necklace & Earrings', 'Traditional Style', 'Gold Plated'],
  stock: 5,
},
{
  id: 312,
  name: 'Voylla Oxidised Jhumka Earrings',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/earring/6/k/k/-original-imagpphhdytsjhah.jpeg',
  price: 499,
  rating: 4.2,
  category: 'Fashion',
  subcategory: 'Handbags, Jewellery',
  features: ['Oxidised Finish', 'Traditional Jhumka', 'Lightweight', 'Silver Tone'],
  stock: 5,
},
{
  id: 313,
  name: 'Peora Rose Gold Necklace',
  image: 'https://rukminim2.flixcart.com/image/416/416/l3929ow0/necklace-chain/g/b/m/-original-imagefnh9zevczwj.jpeg',
  price: 799,
  rating: 4.4,
  category: 'Fashion',
  subcategory: 'Handbags, Jewellery',
  features: ['Rose Gold Plated', 'Minimalist Design', 'Chain with Pendant', 'Adjustable Length'],
  stock: 5,
},
{
  id: 314,
  name: 'Lino Perros Faux Leather Tote',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/hand-messenger-bag/q/q/2/women-tote-black-tote-bag-lino-perros-original-imagqcp3gpzgrcgq.jpeg',
  price: 1899,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Handbags, Jewellery',
  features: ['Spacious Design', 'Faux Leather', 'Stylish Handles', 'Inner Zipper Pocket'],
  stock: 5,
},
// Fashion - Heels & Flats (Women)
{
  id: 315,
  name: 'Carlton London Block Heels',
  image: 'https://rukminim2.flixcart.com/image/416/416/l3929ow0/sandal/g/f/x/-original-imagefneuknmfgkz.jpeg',
  price: 2399,
  rating: 4.4,
  category: 'Fashion',
  subcategory: 'Heels & Flats',
  features: ['PU Sole', 'Buckle Closure', 'Block Heel', 'Party Wear'],
  stock: 5,
},
{
  id: 316,
  name: 'Metro Stiletto Sandals',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sandal/2/k/h/4-aw23stilettos02blkgld-4-metro-black-gold-original-imagw34gvsvppghe.jpeg',
  price: 2699,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Heels & Flats',
  features: ['High Stiletto Heel', 'Glossy Finish', 'Open Toe', 'Ankle Strap'],
  stock: 5,
},
{
  id: 317,
  name: 'Bata Flat Sandals',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sandal/d/z/1/8-5618671-8-bata-black-original-imagqfk4d7zzg8fv.jpeg',
  price: 999,
  rating: 4.3,
  category: 'Fashion',
  subcategory: 'Heels & Flats',
  features: ['Comfort Footbed', 'Slip On', 'Flat Heel', 'Everyday Wear'],
  stock: 5,
},
{
  id: 318,
  name: 'Catwalk Pencil Heels',
  image: 'https://rukminim2.flixcart.com/image/416/416/l45xea80/sandal/k/w/q/7-4454-7-catwalk-rose-gold-original-imagf4srysn9s4ee.jpeg',
  price: 1999,
  rating: 4.4,
  category: 'Fashion',
  subcategory: 'Heels & Flats',
  features: ['Pencil Heel', 'Ankle Strap', 'Shiny Finish', 'Trendy Design'],
  stock: 5,
},
{
  id: 319,
  name: 'Crocs Literide Sandals',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sandal/8/p/x/6-206081-6-crocs-black-original-imagg3r6hqghss8n.jpeg',
  price: 3499,
  rating: 4.6,
  category: 'Fashion',
  subcategory: 'Heels & Flats',
  features: ['LiteRide Foam', 'Ultra-Lightweight', 'Flexible Straps', 'Contoured Footbed'],
  stock: 5,
},
{
  id: 320,
  name: 'Skechers GOwalk Flats',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/i/v/e/-original-imagpzv7k4cuwfvy.jpeg',
  price: 2899,
  rating: 4.5,
  category: 'Fashion',
  subcategory: 'Heels & Flats',
  features: ['Slip-On Design', 'Air-Cooled Goga Mat', 'High Rebound Cushioning', 'Walking Comfort'],
  stock: 5,
},
// Home & Kitchen - Curtains & Bedsheets
{
  id: 401,
  name: 'Bombay Dyeing Cotton Bedsheet',
  image: 'https://rukminim2.flixcart.com/image/416/416/kv9urgw0/bedsheet/d/h/v/printed-double-200x225-blossom-dream-bombay-dyeing-original-imag87hjzzfjgzfr.jpeg',
  price: 1199,
  rating: 4.4,
  category: 'Home & Kitchen',
  subcategory: 'Curtains & Bedsheets',
  features: ['100% Cotton', 'Double Bed', 'Floral Print', '2 Pillow Covers'],
  stock: 5,
},
{
  id: 402,
  name: 'Home Sizzler Door Curtains (Set of 2)',
  image: 'https://rukminim2.flixcart.com/image/416/416/l4ei1e80/curtain/k/q/0/p2d2hddhssl2026-home-sizzler-original-imagfbvx4rsqq4km.jpeg',
  price: 799,
  rating: 4.3,
  category: 'Home & Kitchen',
  subcategory: 'Curtains & Bedsheets',
  features: ['Polyester Fabric', 'Eyelet Style', '5 Feet', 'Solid Color'],
  stock: 5,
},
{
  id: 403,
  name: 'Spaces Geometric King Bedsheet',
  image: 'https://rukminim2.flixcart.com/image/416/416/ky1vl3k0/bedsheet/x/s/s/printed-double-274x274-spaces-original-imagaccfgrqgwkqg.jpeg',
  price: 1799,
  rating: 4.5,
  category: 'Home & Kitchen',
  subcategory: 'Curtains & Bedsheets',
  features: ['King Size', 'Soft Cotton', 'Geometric Pattern', '2 Pillow Covers'],
  stock: 5,
},
{
  id: 404,
  name: 'Status Window Curtains (Set of 2)',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/curtain/o/t/l/p2w5h8p-sd-hf-gd-rod-pocket-status-original-imagq7t7nzzbp22n.jpeg',
  price: 699,
  rating: 4.2,
  category: 'Home & Kitchen',
  subcategory: 'Curtains & Bedsheets',
  features: ['Rod Pocket Style', 'Polyester Blend', 'Window Size', 'Textured'],
  stock: 5,
},
{
  id: 405,
  name: 'Bombay Dyeing Abstract Bedsheet',
  image: 'https://rukminim2.flixcart.com/image/416/416/l2jcccw0/bedsheet/g/n/8/cotton-printed-double-274-x-229-blush-cherry-bombay-dyeing-original-imagdv9gq2byh8qh.jpeg',
  price: 1299,
  rating: 4.3,
  category: 'Home & Kitchen',
  subcategory: 'Curtains & Bedsheets',
  features: ['Double Bed', 'Cotton', 'Abstract Design', 'Bright Colors'],
  stock: 5,
},
{
  id: 406,
  name: 'Flipkart SmartBuy Door Curtains',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/curtain/o/s/h/door-152-1-door-curtain-1-flipkart-smartbuy-original-imagnywgj9ga9pz5.jpeg',
  price: 599,
  rating: 4.1,
  category: 'Home & Kitchen',
  subcategory: 'Curtains & Bedsheets',
  features: ['Polyester', '6 Feet Length', 'Machine Washable', 'Fade Resistant'],
  stock: 5,
},
// Home & Kitchen - Wall Clocks & Paintings
{
  id: 407,
  name: 'Ajanta Quartz Wall Clock',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/clock/j/e/z/ajanta-wall-clock-35-ajanta-original-imagr73zq2r3g4ha.jpeg',
  price: 499,
  rating: 4.5,
  category: 'Home & Kitchen',
  subcategory: 'Wall Clocks & Paintings',
  features: ['Quartz Movement', '12-Inch Diameter', 'Plastic Frame', 'Classic Design'],
  stock: 5,
},
{
  id: 408,
  name: 'Flipkart SmartBuy Modern Wall Painting',
  image: 'https://rukminim2.flixcart.com/image/416/416/kz4gh3k0/painting/k/h/l/12-wall-painting-painting-set-of-3-painting-for-bedroom-original-imagb94cuhzvjycy.jpeg',
  price: 999,
  rating: 4.4,
  category: 'Home & Kitchen',
  subcategory: 'Wall Clocks & Paintings',
  features: ['Canvas Material', 'Set of 3', 'Abstract Art', 'Framed'],
  stock: 5,
},
{
  id: 409,
  name: 'Seiko Decorative Wall Clock',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/clock/z/h/n/qxa520g-seiko-original-imagrkddzvcthjzf.jpeg',
  price: 2499,
  rating: 4.7,
  category: 'Home & Kitchen',
  subcategory: 'Wall Clocks & Paintings',
  features: ['Silent Sweep', 'Designer Look', 'Metallic Finish', 'Imported Brand'],
  stock: 5,
},
{
  id: 410,
  name: 'eCraftIndia Radha Krishna Painting',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/painting/0/2/7/35-radha-krishna-painting-on-canvas-traditional-wall-art-original-imagmu7nxhx8t8bz.jpeg',
  price: 799,
  rating: 4.6,
  category: 'Home & Kitchen',
  subcategory: 'Wall Clocks & Paintings',
  features: ['Religious Theme', 'Canvas', 'UV Textured', 'Framed'],
  stock: 5,
},
{
  id: 411,
  name: 'Zentangle Mandala Art Frame',
  image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/painting/c/1/v/18-mandala-wall-painting-original-imagk4uychvdbuqf.jpeg',
  price: 649,
  rating: 4.3,
  category: 'Home & Kitchen',
  subcategory: 'Wall Clocks & Paintings',
  features: ['Mandala Art', 'Black & White', 'Set of 3', 'Wood Frame'],
  stock: 5,
},
{
  id: 412,
  name: 'Titan Designer Wall Clock',
  image: 'https://rukminim2.flixcart.com/image/416/416/k0plpjk0/clock/f/y/k/2-titan-wall-clock-wc1012titan-original-imafk6ryfvdeh3tu.jpeg',
  price: 1899,
  rating: 4.4,
  category: 'Home & Kitchen',
  subcategory: 'Wall Clocks & Paintings',
  features: ['Titan Brand', 'Stylish Look', 'Analog Display', 'Large Numbers'],
  stock: 5,
},
// Home & Kitchen - Storage Boxes & Organizers
{
  id: 413,
  name: 'Cello Multicolor Plastic Storage Box (Set of 4)',
  image: 'https://rukminim2.flixcart.com/image/416/416/kzhbfrk0/storage-box/s/d/n/4-5-lr4x4-multi-cello-original-imagbhxkw4jh9wkn.jpeg',
  price: 899,
  rating: 4.5,
  category: 'Home & Kitchen',
  subcategory: 'Storage Boxes & Organizers',
  features: ['Plastic Build', 'Stackable', 'Multicolor', 'With Lids'],
  stock: 5,
},
{
  id: 414,
  name: 'Flipkart SmartBuy Shoe Organizer',
  image: 'https://rukminim2.flixcart.com/image/416/416/kzvlua80/shoe-rack/l/o/s/2-3-tier-shoe-rack-flipkart-smartbuy-original-imagbtxej3bhzp5r.jpeg',
  price: 699,
  rating: 4.3,
  category: 'Home & Kitchen',
  subcategory: 'Storage Boxes & Organizers',
  features: ['3 Tiers', 'Metal Frame', 'Compact', 'Dust Cover'],
  stock: 5,
},
{
  id: 415,
  name: 'AmazonBasics Foldable Storage Bins',
  image: 'https://rukminim2.flixcart.com/image/416/416/ko382a80/storage-box/x/t/f/28-foldable-storage-bin-set-of-6-bins-14-x10-x8-amazonbasics-original-imag2mkfctt5d4yy.jpeg',
  price: 1299,
  rating: 4.6,
  category: 'Home & Kitchen',
  subcategory: 'Storage Boxes & Organizers',
  features: ['Fabric', 'Foldable', 'Label Window', 'Set of 6'],
  stock: 5,
},
{
  id: 416,
  name: 'Home Story Drawer Organizer',
  image: 'https://rukminim2.flixcart.com/image/416/416/ktszgy80/storage-box/n/l/n/1-4-grid-organizer-drawer-divider-home-story-original-imag6gphkfbx6xwz.jpeg',
  price: 349,
  rating: 4.2,
  category: 'Home & Kitchen',
  subcategory: 'Storage Boxes & Organizers',
  features: ['Plastic Material', '4-Grid', 'Ideal for Socks & Innerwear', 'Compact'],
  stock: 5,
},
{
  id: 417,
  name: 'Nilkamal Plastic Crate Box',
  image: 'https://rukminim2.flixcart.com/image/416/416/kxrvi4w0/storage-box/j/c/e/1-plastic-storage-box-nilkamal-original-imaga5s8fjmb8nhg.jpeg',
  price: 649,
  rating: 4.4,
  category: 'Home & Kitchen',
  subcategory: 'Storage Boxes & Organizers',
  features: ['Heavy Duty', 'Ventilated', 'Stackable', 'Commercial Use'],
  stock: 5,
},
{
  id: 418,
  name: 'Tupperware Modular Mates Storage Set',
  image: 'https://rukminim2.flixcart.com/image/416/416/l1jmc280/storage-box/v/b/6/4-5-3-5-2-5-1-1-7l-set-of-4-tupperware-original-imagdchpsuvcuz9d.jpeg',
  price: 1599,
  rating: 4.7,
  category: 'Home & Kitchen',
  subcategory: 'Storage Boxes & Organizers',
  features: ['Airtight', 'BPA-Free', 'Modular', '4-Piece Set'],
  stock: 5,
},

];

export const sampleProducts = allProducts.filter(p => p.category !== 'Two-Wheelers' && p.category !== 'Furniture');

// For the main Products page, only show a curated set (e.g., best sellers or featured products)
export const mainPageProducts = sampleProducts.filter(p =>
  // Example: show only Mobiles, Laptops, and a few best sellers
  (p.category === 'Mobiles' && p.subcategory === 'Smartphones (Android, iPhones)') ||
  (p.category === 'Electronics')
)
.filter(p =>
  !['Mobile Accessories', 'Home Furnishing', 'Kitchen Appliances', 'Electronics & Gadgets', 'Home Cleaning'].includes(p.category)
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState({});
  const [cartQuantities, setCartQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { setCartCount, setWishlistCount } = useContext(CartWishlistContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const isLoggedIn = !!email;

  // On mount, get email from localStorage (for login persistence)
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail && storedEmail.trim()) {
      setEmail(storedEmail.trim());
    }
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (res.ok) {
          const data = await res.json();
          const loadedProducts = data.products || [];
          setProducts(loadedProducts);
          setFilteredProducts(loadedProducts);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart and wishlist from backend whenever products, email, or login state changes
  useEffect(() => {
    if (!isLoggedIn || products.length === 0) return;
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE}/api/cart?email=${email}`),
      fetch(`${API_BASE}/api/wishlist?email=${email}`)
    ])
      .then(async ([cartRes, wishRes]) => {
        const cartData = await cartRes.json();
        const wishData = await wishRes.json();
        // Map productId to quantity for cart
        const cartMap = {};
        (cartData.cart || []).forEach(item => {
          const pid = item.id || item._id;
          cartMap[pid] = item.quantity || 1;
        });
        setCartQuantities(cartMap);
        // Map productId to true for wishlist
        const wishMap = {};
        (wishData.wishlist || []).forEach(item => {
          const pid = item.id || item._id;
          wishMap[pid] = true;
        });
        setLiked(wishMap);
        setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
        setWishlistCount((wishData.wishlist || []).length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to fetch cart/wishlist');
      });
  }, [isLoggedIn, email, setCartCount, setWishlistCount, products]);

  // Remove localStorage sync for liked/cartQuantities (except for guest users, which we don't handle here)

  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
      setShowSuggestions(false);
    } else {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    }
  }, [search, products]);

  const handleSuggestionClick = (name) => {
    setSearch(name);
    setShowSuggestions(false);
    setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(name.toLowerCase())));
  };

  // Helper: get product id (id or _id)
  const getProductId = p => p.id || p._id;

  // After add/remove, always re-fetch cart/wishlist from backend
  const refreshCartAndWishlist = async () => {
    try {
      const [cartRes, wishRes] = await Promise.all([
        fetch(`${API_BASE}/api/cart?email=${email}`),
        fetch(`${API_BASE}/api/wishlist?email=${email}`)
      ]);
      const cartData = await cartRes.json();
      const wishData = await wishRes.json();
      const cartMap = {};
      (cartData.cart || []).forEach(item => {
        const pid = item.id || item._id;
        cartMap[pid] = item.quantity || 1;
      });
      setCartQuantities(cartMap);
      const wishMap = {};
      (wishData.wishlist || []).forEach(item => {
        const pid = item.id || item._id;
        wishMap[pid] = true;
      });
      setLiked(wishMap);
      setCartCount((cartData.cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
      setWishlistCount((wishData.wishlist || []).length);
    } catch {
      setError('Failed to refresh cart/wishlist');
    }
  };

  const handleCartPlus = async idx => {
    if (!isLoggedIn) {
      setError('Please log in to add to cart');
      return;
    }
    setError('');
    const product = filteredProducts[idx];
    const productId = getProductId(product);
    // Ensure both id and _id are present if available
    const productToSend = { ...product };
    if (product._id && !product.id) productToSend.id = product._id;
    if (product.id && !product._id) productToSend._id = product.id;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: productToSend }),
      });
      if (res.ok) {
        await refreshCartAndWishlist();
      } else {
        setError('Failed to update cart');
      }
    } catch {
      setError('Failed to update cart');
    }
    setLoading(false);
  };

  const handleLike = async idx => {
    if (!isLoggedIn) {
      setError('Please log in to add to wishlist');
      return;
    }
    setError('');
    const product = filteredProducts[idx];
    const productId = getProductId(product);
    const inWishlist = liked[productId];
    // Ensure both id and _id are present if available
    const productToSend = { ...product };
    if (product._id && !product.id) productToSend.id = product._id;
    if (product.id && !product._id) productToSend._id = product.id;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${inWishlist ? 'remove' : 'add'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: inWishlist ? undefined : productToSend, productId }),
      });
      if (res.ok) {
        await refreshCartAndWishlist();
      } else {
        setError('Failed to update wishlist');
      }
    } catch {
      setError('Failed to update wishlist');
    }
    setLoading(false);
  };

  // Compute unique categories from products
  const excludedCategories = [
    'Mobile Accessories',
    'Home Furnishing',
    'Kitchen Appliances',
    'Electronics & Gadgets',
    'Home Cleaning'
  ];
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
    .filter(cat => Boolean(cat) && !excludedCategories.includes(cat));

  return (
    <>
      <Header />
      <div className="products-page" style={{ padding: '2.5rem 0', background: 'linear-gradient(135deg, #f7f6f3 0%, #fbeee6 100%)', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.2rem', color: '#6b3e26' }}>
          {selectedCategory ? selectedCategory : 'All Categories'}
        </h1>
        <div style={{ maxWidth: 400, margin: '0 auto 2rem auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label htmlFor="category-select" style={{ fontWeight: 600, color: '#6b3e26', fontSize: '1.08rem' }}>Select Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={e => {
                const cat = e.target.value;
                setSelectedCategory(cat);
                setSearch('');
                if (cat === '') {
                  setFilteredProducts(products);
                } else {
                  setFilteredProducts(products.filter(p => p.category === cat));
                }
              }}
              style={{ width: '100%', padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem', marginBottom: 0 }}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: 14, position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for products..."
              style={{ width: '100%', padding: '0.7rem 1.2rem', borderRadius: 6, border: '1.5px solid #a76f3f', fontSize: '1.1rem' }}
              onFocus={() => search && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={e => {
                if (e.key === 'Enter' && filteredProducts.length > 0) {
                  setShowSuggestions(false);
                }
              }}
            />
            {showSuggestions && search && (
              <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', border: '1px solid #eee', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 10 }}>
                {filteredProducts.length === 0 ? (
                  <div style={{ padding: '0.7rem 1.2rem', color: '#a76f3f' }}>No products found</div>
                ) : (
                  filteredProducts.slice(0, 5).map(p => (
                    <div
                      key={p.id}
                      style={{ padding: '0.7rem 1.2rem', cursor: 'pointer', borderBottom: '1px solid #f5f5f5' }}
                      onMouseDown={() => handleSuggestionClick(p.name)}
                    >{p.name}</div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
        <div className="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          justifyItems: 'center',
        }}>
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#a76f3f', fontWeight: 600, fontSize: '1.2rem' }}>No products found</div>
          ) : (
            filteredProducts.map((prod, idx) => (
              <div key={prod.id} className="product-card" style={{
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 4px 18px rgba(167,111,63,0.10)',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'box-shadow 0.2s, transform 0.2s',
                opacity: loading ? 0.6 : 1,
                width: '100%',
                maxWidth: 320,
                minWidth: 260,
                cursor: 'pointer',
                border: '1.5px solid #f3e3d0',
                marginBottom: 8,
                boxSizing: 'border-box',
                ':hover': {
                  boxShadow: '0 8px 32px rgba(167,111,63,0.18)',
                  transform: 'translateY(-4px) scale(1.03)',
                },
              }}>
                <img src={prod.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={prod.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }} />
                <div style={{ color: '#ff9900', fontWeight: 600, margin: '0.5rem 0 0.5rem', fontSize: '1.08rem' }}>★ {prod.rating}</div>
                <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: '#a76f3f', textAlign: 'center' }}>{prod.name}</h2>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#6b3e26', marginBottom: '0.5rem' }}>₹{prod.price}</div>
                {prod.stock === 0 && (
                  <div style={{ color: 'red', fontWeight: 700, marginBottom: '1rem' }}>
                    Out of Stock ({prod._id || prod.id})
                  </div>
                )}
                {cartQuantities[getProductId(prod)] ? (
                  <div style={{ marginBottom: '1rem', color: '#a76f3f', fontWeight: 600 }}>Added</div>
                ) : (
                  <button
                    style={{ background: '#a76f3f', color: '#fff', border: '2px solid #a76f3f', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: prod.stock === 0 ? 'not-allowed' : isLoggedIn ? 'pointer' : 'not-allowed', opacity: prod.stock === 0 || loading ? 0.7 : 1, marginBottom: '1rem' }}
                    onClick={() => prod.stock === 0 ? null : handleCartPlus(idx)}
                    disabled={loading || prod.stock === 0}
                  >Add to Cart</button>
                )}
                <button
                  style={{ background: '#fff', color: '#a76f3f', border: '1.5px solid #a76f3f', borderRadius: 6, padding: '0.4rem 1.1rem', fontWeight: 600, cursor: prod.stock === 0 ? 'not-allowed' : 'pointer', marginBottom: '0.5rem', opacity: prod.stock === 0 ? 0.5 : 1 }}
                  onClick={() => prod.stock === 0 ? null : navigate('/product-detail', { state: { product: prod } })}
                  disabled={prod.stock === 0}
                >View Details</button>
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <button
                    style={{
                      background: liked[getProductId(prod)] ? '#a76f3f' : '#fff',
                      color: liked[getProductId(prod)] ? '#fff' : '#a76f3f',
                      border: '2px solid #a76f3f',
                      borderRadius: '6px',
                      padding: '0.5rem 1.2rem',
                      fontWeight: 600,
                      cursor: prod.stock === 0 ? 'not-allowed' : isLoggedIn ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s, color 0.2s',
                      opacity: prod.stock === 0 || loading ? 0.7 : 1
                    }}
                    onClick={() => prod.stock === 0 ? null : handleLike(idx)}
                    disabled={prod.stock === 0}
                  >
                    {liked[getProductId(prod)] ? 'Liked' : 'Like'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
 