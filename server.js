require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const mongodb = require('./data/database');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const ensureAuthenticated = require('./middleware/ensureAuthenticated'); // Import the middleware

require('./auth/passportConfig');

const app = express();

const port = process.env.PORT || 3300;

app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Should be true in production with HTTPS
}));

// Initialize Passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// OAuth authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

// Route to serve Swagger documentation
app.use('/api-docs', ensureAuthenticated, require('./routes/swaggerRoute')); // Protect the /api-docs route

// Protected route example
app.get('/protected-route', ensureAuthenticated, (req, res) => {
    res.send('This is a protected route');
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.use(errorHandler);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on http://localhost:${port}`);
        });
    }
});
