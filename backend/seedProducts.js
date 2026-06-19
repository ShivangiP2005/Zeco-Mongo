require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // Grocery & Kitchen
  { name: 'Fresh Vegetables Basket', category: 'Grocery & Kitchen', subcategory: 'Vegetables', price: 99, mrp: 120, unit: '1 kg', brand: 'Fresh Farm', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300' },
  { name: 'Amul Butter', category: 'Dairy & Breakfast', subcategory: 'Butter', price: 55, mrp: 60, unit: '100g', brand: 'Amul', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300' },
  { name: 'Aashirvaad Atta', category: 'Grocery & Kitchen', subcategory: 'Atta & Flours', price: 280, mrp: 310, unit: '5 kg', brand: 'Aashirvaad', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300' },
  { name: 'Tata Salt', category: 'Grocery & Kitchen', subcategory: 'Salt & Sugar', price: 22, mrp: 25, unit: '1 kg', brand: 'Tata', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=300' },
  { name: 'Fortune Sunflower Oil', category: 'Grocery & Kitchen', subcategory: 'Oils', price: 145, mrp: 160, unit: '1 L', brand: 'Fortune', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300' },

  // Dairy & Breakfast
  { name: 'Amul Milk', category: 'Dairy & Breakfast', subcategory: 'Milk', price: 28, mrp: 30, unit: '500 ml', brand: 'Amul', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300' },
  { name: 'Amul Paneer', category: 'Dairy & Breakfast', subcategory: 'Paneer', price: 75, mrp: 85, unit: '200g', brand: 'Amul', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300' },
  { name: 'Britannia Brown Bread', category: 'Dairy & Breakfast', subcategory: 'Bread', price: 40, mrp: 45, unit: '400g', brand: 'Britannia', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300' },

  // Snacks & Drinks
  { name: 'Lays Classic Salted', category: 'Snacks & Drinks', subcategory: 'Chips', price: 20, mrp: 20, unit: '73g', brand: 'Lays', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300' },
  { name: 'Maggi 2 Minute Noodles', category: 'Snacks & Drinks', subcategory: 'Noodles', price: 14, mrp: 15, unit: '70g', brand: 'Maggi', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300' },
  { name: 'Coca Cola', category: 'Snacks & Drinks', subcategory: 'Cold Drinks', price: 40, mrp: 45, unit: '750 ml', brand: 'Coca Cola', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300' },
  { name: 'Bisleri Water', category: 'Snacks & Drinks', subcategory: 'Water', price: 20, mrp: 20, unit: '1 L', brand: 'Bisleri', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300' },

  // Meat & Fish
  { name: 'Chicken Breast', category: 'Meat & Fish', subcategory: 'Chicken', price: 199, mrp: 220, unit: '500g', brand: 'Fresh', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300' },
  { name: 'Rohu Fish', category: 'Meat & Fish', subcategory: 'Fish', price: 249, mrp: 280, unit: '500g', brand: 'Fresh', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300' },

  // Personal Care
  { name: 'Dove Soap', category: 'Personal Care', subcategory: 'Soap', price: 49, mrp: 55, unit: '100g', brand: 'Dove', image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=300' },
  { name: 'Colgate Toothpaste', category: 'Personal Care', subcategory: 'Toothpaste', price: 89, mrp: 99, unit: '200g', brand: 'Colgate', image: 'https://images.unsplash.com/photo-1559590954-e79fc7b74f65?w=300' },

  // Household
  { name: 'Surf Excel', category: 'Household', subcategory: 'Detergent', price: 120, mrp: 135, unit: '1 kg', brand: 'Surf Excel', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300' },
  { name: 'Harpic Toilet Cleaner', category: 'Household', subcategory: 'Cleaners', price: 99, mrp: 110, unit: '500 ml', brand: 'Harpic', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300' },

  // Baby Care
  { name: 'Pampers Diapers', category: 'Baby Care', subcategory: 'Diapers', price: 499, mrp: 549, unit: '20 count', brand: 'Pampers', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300' },

  // Pet Care
  { name: 'Pedigree Dog Food', category: 'Pet Care', subcategory: 'Dog Food', price: 349, mrp: 380, unit: '1.2 kg', brand: 'Pedigree', image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=300' },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products seeded successfully!');
  process.exit();
};

seed();