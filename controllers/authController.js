const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const { createUser, findUserByEmail } = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await findUserByEmail(email);
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await createUser({ email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ message: 'Logged in successfully' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout user
const logoutUser = (req, res) => {
    req.logout();
    res.redirect('/books'); // Redirect to login page after logout
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
