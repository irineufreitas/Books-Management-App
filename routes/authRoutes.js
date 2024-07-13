

const express = require('express');
const passport = require('passport');
const { check } = require('express-validator');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.get('/logout', logoutUser);

// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

module.exports = router;
