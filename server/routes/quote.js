// File: routes/quote.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { Resend } = require('resend');
const { v4: uuidv4 } = require('uuid');

const resend = new Resend(process.env.RESEND_API_KEY);
const pendingQuotes = new Map();

// GET /api/quote - Fetch all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/quote - Submit a new quote
router.post('/', async (req, res) => {
  const data = req.body;
  const retryId = uuidv4();
  let timeoutFired = false;

  const timeout = setTimeout(async () => {
    timeoutFired = true;
    pendingQuotes.set(retryId, data);

    const html = `
      <p><strong>Quote Submission Delay</strong></p>
      <p>This quote request took over 10 seconds to save. It might have failed.</p>
      <hr />
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Route:</strong> ${data.pickupPostalCode} → ${data.deliveryPostalCode}</p>
      <p><strong>Size:</strong> ${data.length}cm × ${data.width}cm × ${data.height}cm</p>
      <p><strong>Weight:</strong> ${data.weight}kg</p>
      <p><strong>Type:</strong> ${data.shipmentType}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
      <hr />
      <p>
        <a href="https://logistics-backend-0jfy.onrender.com/api/quote/retry/${retryId}" 
           style="display:inline-block;padding:10px 15px;background:#0a1f60;color:#fff;text-decoration:none;border-radius:4px;">
          Retry Save to Database
        </a>
      </p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'Quote Save Timeout – Retry Required',
        html,
      });
    } catch (err) {
      console.error('Resend email (timeout) failed:', err);
    }
  }, 10000);

  try {
    const quote = new Quote(data);
    await quote.save();
    clearTimeout(timeout);

    const html = `
      <p>New Quote Submission</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Route:</strong> ${data.pickupPostalCode} → ${data.deliveryPostalCode}</p>
      <p><strong>Size:</strong> ${data.length}cm × ${data.width}cm × ${data.height}cm</p>
      <p><strong>Weight:</strong> ${data.weight}kg</p>
      <p><strong>Type:</strong> ${data.shipmentType}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'New Quote Received',
        html,
      });
    } catch (err) {
      console.error('Resend email (confirmation) failed:', err);
    }

    res.status(timeoutFired ? 202 : 201).json({
      success: true,
      message: timeoutFired
        ? 'Quote saved, but a retry link was also sent via email due to delay.'
        : 'Quote saved and email sent successfully.',
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error('Quote save error:', err);

    // Fallback: send email even if DB save fails
    const html = `
      <p><strong>Quote Save Failed (Exception)</strong></p>
      <p>The following quote submission failed to save to the database.</p>
      <hr />
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Route:</strong> ${data.pickupPostalCode} → ${data.deliveryPostalCode}</p>
      <p><strong>Size:</strong> ${data.length}cm × ${data.width}cm × ${data.height}cm</p>
      <p><strong>Weight:</strong> ${data.weight}kg</p>
      <p><strong>Type:</strong> ${data.shipmentType}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'Quote Save Failed – Manual Attention Required',
        html,
      });
    } catch (emailErr) {
      console.error('Resend fallback email failed:', emailErr);
    }

    res.status(202).json({
      success: false,
      message: 'We received your request, but there was a server error. Our team has been notified.',
    });
  }
});

// GET /api/quote/retry/:id - Retry saving the quote manually
router.get('/retry/:id', async (req, res) => {
  const data = pendingQuotes.get(req.params.id);
  if (!data) return res.status(404).send('Nothing to retry or already saved.');

  try {
    const quote = new Quote(data);
    await quote.save();
    pendingQuotes.delete(req.params.id);
    res.send('Quote saved successfully.');
  } catch (err) {
    res.status(500).send('Retry failed.');
  }
});

module.exports = router;
