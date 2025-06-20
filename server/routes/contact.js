const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Resend } = require('resend');
const { v4: uuidv4 } = require('uuid');

// Setup Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const pendingSaves = new Map();

// Schema
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
  let timeoutTriggered = false;

  const retryLink = `https://logistics-backend-0jfy.onrender.com/api/contact/retry/${retryId}`;

  // Timeout handler (after 10s)
  const timeout = setTimeout(async () => {
    timeoutTriggered = true;
    pendingSaves.set(retryId, formData);

    const html = `
      <p><strong>Contact Save Timeout</strong></p>
      <p>Form submission took too long to save. Retry may be needed.</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <hr />
      <a href="${retryLink}"
         style="display:inline-block;padding:10px 15px;background:#0a1f60;color:#fff;border-radius:5px;text-decoration:none;">
        Retry Save to Database
      </a>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'Contact Save Timeout – Retry Required',
        html,
      });
    } catch (emailErr) {
      console.error('Timeout email error:', emailErr);
    }
  }, 10000);

  try {
    const contact = new Contact(formData);
    await contact.save();
    clearTimeout(timeout);

    const html = `
      <p>New Contact Form Submission</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'New Contact Form Received',
        html,
      });
    } catch (err) {
      console.error('Email send error:', err);
    }

    res.status(timeoutTriggered ? 202 : 201).json({
      success: true,
      message: timeoutTriggered
        ? 'Saved after delay. Admin notified with retry option.'
        : 'Contact saved and email sent successfully.',
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error('Contact DB save error:', err);
    pendingSaves.set(retryId, formData); // Still store for retry

    const html = `
      <p><strong>Contact Save Failed</strong></p>
      <p>The following message could not be saved in the database.</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <hr />
      <a href="${retryLink}"
         style="display:inline-block;padding:10px 15px;background:#0a1f60;color:#fff;border-radius:5px;text-decoration:none;">
        Retry Save to Database
      </a>
    `;

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajiv.sharma@vagelogistics.com',
        subject: 'Contact Save Failed – Retry Required',
        html,
      });
    } catch (emailErr) {
      console.error('Resend fallback email failed:', emailErr);
    }

    res.status(202).json({
      success: true,
      message: 'Message received. Our team was notified in case of backend issues.',
    });
  }
});

// GET /api/contact/retry/:id
router.get('/retry/:id', async (req, res) => {
  const data = pendingSaves.get(req.params.id);
  if (!data) return res.status(404).send('Retry failed: Data not found.');

  try {
    const contact = new Contact(data);
    await contact.save();
    pendingSaves.delete(req.params.id);
    res.send('Contact saved successfully.');
  } catch (err) {
    res.status(500).send('Retry failed.');
  }
});

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

module.exports = router;
