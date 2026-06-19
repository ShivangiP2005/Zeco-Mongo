const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// POST /api/orders — place order
router.post('/', protect, async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;
    if (!address) return res.status(400).json({ error: 'Address is required' });

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalPrice: cart.totalPrice,
      address,
      paymentMethod: paymentMethod || 'Cash on Delivery'
    });

    // Clear cart after order
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders — get user's orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id — single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// PUT /api/orders/:id/cancel — cancel order (only if not yet packed)
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to cancel this order' });
    }

    const nonCancellableStatuses = ['Packed', 'Out for Delivery', 'Delivered'];
    if (nonCancellableStatuses.includes(order.status)) {
      return res.status(400).json({ error: `Cannot cancel — order is already ${order.status}` });
    }

    order.status = 'Cancelled';
    await order.save();
    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;