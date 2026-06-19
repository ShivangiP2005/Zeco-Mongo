const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { protect } = require('../middleware/auth');

// GET /api/address — get all saved addresses for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/address — add a new address
router.post('/', protect, async (req, res) => {
  try {
    const { label, fullAddress, pincode, isDefault } = req.body;

    if (!fullAddress || !pincode) {
      return res.status(400).json({ error: 'Address and pincode are required' });
    }

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({ error: 'Pincode must be exactly 6 digits' });
    }

    if (isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }

    const address = await Address.create({
      user: req.user.id,
      label: label || 'Home',
      fullAddress,
      pincode,
      isDefault: !!isDefault
    });

    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/address/:id — remove an address
router.delete('/:id', protect, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;