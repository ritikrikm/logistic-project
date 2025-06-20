// File: server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const quoteRoutes = require('./routes/quote');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(helmet());
app.use(compression());
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
}));
app.use(cors({
  origin: ['https://vage.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quote', quoteRoutes);
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/', (req, res) => {
  res.status(200).send('Server is healthy');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
