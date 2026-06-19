const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  mrp: { type: Number },
  image: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String },
  unit: { type: String },
  stock: { type: Number, default: 100 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);