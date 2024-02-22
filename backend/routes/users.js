// Import necessary modules and classes
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config'); // Import your configuration file
const User = require('../models/user'); // Import the User class
const { ensureLoggedIn, authenticateJWT } = require('../middleware/auth');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new User instance
    const newUser = new User(username, password);

    // Register the user
    const registrationResult = await newUser.register();

    if (registrationResult) {
      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login a user and generate a JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password, token } = req.body;

    if (token) {
      try {
        const decodedToken = jwt.verify(token, config.SECRET_KEY);
        const userObject = { username: decodedToken.username };

        return res.status(200).json({ token, userObject });
      } catch (tokenError) {
        console.error('Auto Login Failed:', tokenError);
        return res.status(401).json({ error: 'Auto-login failed. Invalid token.' });
      }
    } else {

      // Create a new User instance
      const user = new User(username, password);

      // Login the user
      const loginResult = await user.login();

      if (loginResult) {
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, config.SECRET_KEY, {
          expiresIn: '15m',
        });

        const userObject = { username: user.username }

        res.status(200).json({ token, userObject });
      } else {
        console.error('Login failed. incorrect username or password.')
        res.status(401).json({ error: 'Login failed. Incorrect username or password.' });
      }
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user favorites (protected route)
router.get('/:username/favorites', async (req, res) => {
  try {
    // Extract the user's username from the JWT token
    const { username } = req.params;

    // Create a new User instance
    const user = new User(username);

    // Retrieve user favorites
    const favorites = await user.getFavoriteMovieNames();
    console.log(favorites);
    res.status(200).json({ favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve favorites' });
  }
});

// Add a movie to user favorites (protected route)
router.post('/favorites/add', async (req, res) => {
  try {
    // Extract the user's username from the JWT token
    const { username, movieName, movieImdbId } = req.body;

    // Create a new User instance
    const user = new User(username);

    // Add the movie to user favorites
    const addResult = await user.addFavoriteMovieName(movieName, movieImdbId);

    if (addResult) {
      res.status(201).json({ message: 'Movie added to favorites' });
    } else {
      res.status(500).json({ error: 'Failed to add movie to favorites' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add movie to favorites' });
  }
});

// Delete a movie from user favorites (protected route)
router.delete('/favorites/delete', async (req, res) => {
  try {
    // Extract the user's username and movieName from the request body
    const { username, movieName, movieImdbId } = req.body;

    // Create a new User instance
    const user = new User(username);

    // Delete the movie from user favorites
    const deleteResult = await user.deleteFavoriteMovieName(movieName, movieImdbId);

    if (deleteResult) {
      res.status(200).json({ message: 'Movie deleted from favorites' });
    } else {
      res.status(500).json({ error: 'Failed to delete movie from favorites' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete movie from favorites' });
  }
});


module.exports = router;
