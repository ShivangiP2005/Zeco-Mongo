const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products — all products, with search & category filter
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    let query = { isAvailable: true };

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNum);

    const products = await Product.find(query)
      .skip(skip)
      .limit(limitNum);

    res.json({
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/categories — all unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Serviceable pincodes — simulating Zepto's delivery zone check
const SERVICEABLE_PINCODES = [
  '400001','400002','400003','400004','400005','400050','400051','400052',
  '400053','400054','400055','400056','400057','400058','400059','400060',
  '400061','400062','400063','400064','400065','400066','400067','400068',
  '400069','400070','400071','400072','400074','400075','400076','400077',
  '400078','400080','400081','400082','400083','400084','400085','400086',
  '400087','400088','400089','400090','400091','400092','400093','400094',
  '400095','400096','400097','400098','400099','110001','110002','110003',
  '560001','560002','560003','411001','411002','411003','600001','600002'
];

router.get('/check-pincode/:pincode', (req, res) => {
  const { pincode } = req.params;

  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ error: 'Enter a valid 6-digit pincode' });
  }

  const serviceable = SERVICEABLE_PINCODES.includes(pincode);
  res.json({
    serviceable,
    pincode,
    message: serviceable
      ? 'Great! We deliver to your area in 10 minutes'
      : 'Sorry, we don\'t deliver to this area yet'
  });
});

module.exports = router;