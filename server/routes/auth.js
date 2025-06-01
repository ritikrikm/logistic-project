const express = require('express');
const bcrypt = require('bcrypt');


const router = express.Router();

// Health check
router.get('/', (req, res) => {
  res.send('Auth API working 👋');
});


  
  

module.exports = router;
