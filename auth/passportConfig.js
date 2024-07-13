

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByEmail, createUser } = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await findUserByEmail(profile.emails[0].value);
        if (!user) {
            // If user doesn't exist, create a new user with Google profile data
            user = await createUser({
                email: profile.emails[0].value,
                googleId: profile.id,
                displayName: profile.displayName,
                photo: profile.photos[0].value,
                
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.email); // Serialize by email or unique identifier
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await findUserByEmail(email);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
