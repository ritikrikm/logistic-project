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
  origin: 'https://vage.netlify.app', // frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api/contact', require('./routes/contact'));
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

app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
