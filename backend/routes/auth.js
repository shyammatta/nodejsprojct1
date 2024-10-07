const express = require('express');
const bcrypt = require('bcrypt'); // To compare hashed passwords
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // If the username and password are correct
    res.status(200).json({ message: 'Login successful', username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
});

module.exports = router;
