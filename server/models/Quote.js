// models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  pickupPostalCode: String,
  deliveryPostalCode: String,
  length: Number,
  width: Number,
  height: Number,
  weight: Number,
  shipmentType: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema);
