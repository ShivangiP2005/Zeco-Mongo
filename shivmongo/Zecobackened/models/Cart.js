// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  username: String,
  phone: {
    type: String,
    required: true,
    unique: true
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);
