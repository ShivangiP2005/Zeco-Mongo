const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ['Order Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Placed'
  },
  paymentMethod: { type: String, default: 'Cash on Delivery' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);