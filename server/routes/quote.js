// routes/quote.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// GET /api/quote
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/quote
router.post('/', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: 'Quote submitted successfully' });
  } catch (error) {
    console.error('Quote save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
