// File: routes/quote.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { Resend } = require('resend');
const { v4: uuidv4 } = require('uuid');

const resend = new Resend(process.env.RESEND_API_KEY);
const pendingQuotes = new Map();

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
  const data = req.body;
  const retryId = uuidv4();
  let slowTimeoutFired = false;

  const timeout = setTimeout(async () => {
    slowTimeoutFired = true;
    pendingQuotes.set(retryId, data);

    const html = `
      <p><strong>⚠ Backend Save Timeout</strong></p>
      <p>The following quote request took more than 10 seconds to save. It may have failed.</p>
      <hr />
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>From:</strong> ${data.pickupPostalCode} → ${data.deliveryPostalCode}</p>
      <p><strong>Size:</strong> ${data.length}cm x ${data.width}cm x ${data.height}cm</p>
      <p><strong>Weight:</strong> ${data.weight}kg</p>
      <p><strong>Type:</strong> ${data.shipmentType}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
      <hr />
      <p><a href="https://logistics-backend-0jfy.onrender.com/api/quote/retry/${retryId}" style="display:inline-block;padding:10px 15px;background:#0a1f60;color:#fff;border-radius:5px;text-decoration:none;">Retry Save to Database</a></p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'Quote Save Timeout – Retry Needed',
        html,
      });
    } catch (err) {
      console.error(' Timeout email failed:', err);
    }
  }, 10000);

  try {
    const quote = new Quote(data);
    await quote.save();
    clearTimeout(timeout);

    const html = `
      <p><strong>📦 New Quote Submission</strong></p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>From:</strong> ${data.pickupPostalCode} → ${data.deliveryPostalCode}</p>
      <p><strong>Size:</strong> ${data.length}cm x ${data.width}cm x ${data.height}cm</p>
      <p><strong>Weight:</strong> ${data.weight}kg</p>
      <p><strong>Type:</strong> ${data.shipmentType}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: '📬 New Quote Submission Received',
        html,
      });
    } catch (err) {
      console.error('Confirmation email failed:', err);
    }

    if (!slowTimeoutFired) {
      return res.status(201).json({ success: true, message: 'Quote saved successfully' });
    } else {
      return res.status(202).json({ success: true, message: 'Saved, but fallback email already sent' });
    }
  } catch (error) {
    clearTimeout(timeout);
    console.error('Quote save error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/quote/retry/:id
router.get('/retry/:id', async (req, res) => {
  const data = pendingQuotes.get(req.params.id);
  if (!data) return res.status(404).send(' Nothing to retry or already saved.');

  try {
    const quote = new Quote(data);
    await quote.save();
    pendingQuotes.delete(req.params.id);
    res.send(' Quote saved successfully on retry.');
  } catch (err) {
    res.status(500).send(' Retry failed.');
  }
});

module.exports = router;
