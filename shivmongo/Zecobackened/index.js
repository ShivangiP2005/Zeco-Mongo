// const express = require('express');
// const connectDB = require('./db');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const Cart = require('./models/Cart');

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// // ✅ Save or update cart
app.post('/api/cart', async (req, res) => {
  const { username, phone, items, totalPrice } = req.body;

  if (!username || !phone || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    let cart = await Cart.findOne({ phone });

    if (cart) {
      // Merge new items into existing cart
      items.forEach(newItem => {
        const existingItem = cart.items.find(i => i.name === newItem.name);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      });
      cart.totalPrice += totalPrice;
    } else {
      cart = new Cart({ username, phone, items, totalPrice });
    }

    await cart.save();
    console.log("📦 Cart saved in DB:", cart); // ✅ DEBUG LOG
    res.json({ message: "Cart saved successfully", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get cart by username
app.get('/api/cart/:username', async (req, res) => {
  try {
    const cart = await Cart.findOne({ username: req.params.username });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete full cart by username
app.delete('/api/cart/:username', async (req, res) => {
  try {
    await Cart.deleteOne({ username: req.params.username });
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cart' });
  }
  console.log("🚀 Incoming cart data:", req.body);

});

// ✅ Delete specific item from cart by username and item name
app.delete('/api/cart/:username/:itemName', async (req, res) => {
  const { username, itemName } = req.params;

  try {
    const cart = await Cart.findOne({ username });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.name !== itemName);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.json({ message: `Item ${itemName} deleted` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// app.listen(5000, () => {
//   console.log('🔥 Server running on http://localhost:5000');
// });
// // Get cart by username
// app.get('/api/cart/:username', async (req, res) => {
//     try {
//       const cart = await Cart.findOne({ username: req.params.username });
//       if (!cart) return res.status(404).json({ message: "Cart not found" });
//       res.json(cart);
//     } catch (err) {
//       res.status(500).json({ error: "Server error" });
//     }
//   });
//   app.use(express.json());
  