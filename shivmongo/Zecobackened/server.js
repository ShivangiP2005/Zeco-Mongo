const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://ShivangiZeco:Zecoshivangi%402025@zecocluster.iimr7a3.mongodb.net/ZecoDB?retryWrites=true&w=majority&appName=Zecocluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Schema & Model
const cartSchema = new mongoose.Schema({
  username: String,
  phone: { type: String, unique: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  timestamp: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

// 🟢 GET CART by phone (used on page load)
app.get('/models/cart/:phone', async (req, res) => {
  try {
    const phone = req.params.phone;
    const cart = await Cart.findOne({ phone });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error('❌ GET cart failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🟢 POST to save/update cart
app.post('/models/cart', async (req, res) => {
  try {
    const { username, phone, items, totalPrice, timestamp } = req.body;

    if (!username || !phone || !items || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let existingCart = await Cart.findOne({ phone });

    if (existingCart) {
      // Replace old cart items with new ones
      existingCart.username = username;
      existingCart.items = items;
      existingCart.totalPrice = totalPrice;
      existingCart.timestamp = timestamp || new Date();
      await existingCart.save();
    } else {
      await Cart.create({ username, phone, items, totalPrice, timestamp });
    }

    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (error) {
    console.error('❌ POST cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});app.post('/api/cart', async (req, res) => {
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


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
