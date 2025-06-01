// File: server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quoteRoutes = require('./routes/quote');
require('dotenv').config();

const app = express();
const PORT = 4002;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quote', quoteRoutes);
app.use('/api/admin', require('./routes/admin'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  console.log('📩 Received contact form submission');
  console.log('📦 Request body:', req.body); // ✅ Check what's actually being received

  try {
    const { name, email, message } = req.body;

    // Basic validation (optional)
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    console.log('✅ Message saved to database');
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error('❌ Error fetching contacts:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
