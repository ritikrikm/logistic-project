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
      <p><