// File: routes/contact.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Resend } = require('resend');
const { v4: uuidv4 } = require('uuid');

// Setup Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory retry map
const pendingSaves = new Map();

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  const formData = { name, email, message };
  const retryId = uuidv4();
  let slowTimeoutFired = false;

  const timeout = setTimeout(async () => {
    slowTimeoutFired = true;
    pendingSaves.set(retryId, formData);

    const html = `
      <p><strong>⚠ Backend Save Timeout</strong></p>
      <p>The following contact form submission took more than 10 seconds to save. It may have failed.</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="background:#f4f4f4;padding:10px;border-radius:6px;">${message}</p>
      <hr />
      <p>To attempt saving this data again, click below:</p>
      <a href="https://logistics-backend-0jfy.onrender.com/api/contact/retry/${retryId}"
         style="display:inline-block;padding:10px 15px;background:#0a1f60;color:#fff;border-radius:5px;text-decoration:none;">
        Retry Save to Database
      </a>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'Contact Save Timeout – Retry Needed',
        html,
      });
    } catch (emailErr) {
      console.error(' Email send failed:', emailErr);
    }
  }, 10000);

  try {
    const contact = new Contact(formData);
    await contact.save();

    if (!slowTimeoutFired) {
      clearTimeout(timeout);
      return res.status(201).json({ success: true, message: 'Message saved successfully' });
    } else {
      return res.status(202).json({ success: true, message: 'Saved, but fallback email already sent' });
    }
  } catch (err) {
    clearTimeout(timeout);
    console.error(' Save error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/contact/retry/:id
router.get('/retry/:id', async (req, res) => {
  const formData = pendingSaves.get(req.params.id);
  if (!formData) return res.status(404).send(' Nothing to retry or already saved.');

  try {
    const contact = new Contact(formData);
    await contact.save();
    pendingSaves.delete(req.params.id);
    res.send('✅ Contact saved successfully on retry.');
  } catch (err) {
    res.status(500).send(' Retry failed.');
  }
});

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
