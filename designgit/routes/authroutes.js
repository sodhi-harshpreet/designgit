const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Handle user registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Registration error:", error); // Log the full error
      return res.status(400).json({ error: error.message });
    }

    // Send user data, message, and session token after registration
    res.status(200).json({
      message: 'User registered successfully',
      user: data.user,
      session: data.session,
      token: data.session?.access_token,
    });
  } catch (err) {
    console.error("Unexpected error:", err); // Catch any unexpected errors
    res.status(500).json({ error: 'An unexpected error occurred during registration' });
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error); // Log the full error
      return res.status(400).json({ error: error.message });
    }

    // Send session information and user data after login
    res.status(200).json({
      message: 'Logged in successfully',
      user: data.user,
      session: data.session,
      token: data.session?.access_token,
    });
  } catch (err) {
    console.error("Unexpected error:", err); // Catch any unexpected errors
    res.status(500).json({ error: 'An unexpected error occurred during login' });
  }
});

module.exports = router;
