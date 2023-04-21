require('dotenv').config();
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');
const crypto = require('crypto');
const db = require('../db');

/* create new strategy for handling username and password authentication.
 * Query the database for a provided username and if it exists, determine if the
 * hashed password provided matches the hashed password store in the DB.
 */
passport.use(new LocalStrategy(function verify(username, password, callback) {
    db.query('SELECT * FROM users WHERE username = $1', [ username ], function(err, pgRes) {
        if (err) { return callback(err); }
        if (!pgRes.rows[0]) { return callback(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, pgRes.rows[0].salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return callback(err); }
            if (!crypto.timingSafeEqual(pgRes.rows[0].hashed_password, hashedPassword)) {
                return callback(null, false, { message: 'Incorrect username or password.' });
            }
            return callback(null, pgRes.rows[0]);
        });
    });
}));
/**
 * New strategy for handling user login with google, using OAuth 2.0
 */
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ],
    state: true
},
function(accessToken, refreshToken, profile, callback) {
    db.query('SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2', [
        'https://accounts.google.com',
        profile.id
    ], function(err, pgRes) {
        if (err) { return callback(err); }
        if (!pgRes.rows[0]) {
            db.query('INSERT INTO users (name) VALUES ($1) RETURNING id', [
                profile.displayName
            ], function(err, result) {
                if (err) { return callback(err); }
                const id = result.rows[0].id
                db.query(
                    'INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)', [
                        id,
                        'https://accounts.google.com',
                        profile.id
                    ], function(err) {
                        if (err) { return callback(err); }
                        const user = {
                            id: id,
                            name: profile.displayName
                        };
                        return callback(null, user);
                    });
            });
        } else {
            db.query('SELECT * FROM users WHERE id = $1', [ pgRes.rows[0].user_id ], function(err, result) {
                if (err) { return callback(err); }
                if (!result.rows) { return callback(null, false); }
                return callback(null, result.rows[0])
            })
        }
    })
}))
/**
 * Upon successful call to either `req.login()` or `passport.authenticate()`
 * the user information is stored within the session for persistent login
 */
passport.serializeUser(function(user, callback) {
    process.nextTick(function() {
        callback(null, { id: user.id, username: user.username, name: user.name });
    });
});

// Retrieves the user object from the session if present
passport.deserializeUser(function(user, callback) {
    process.nextTick(function() {
        return callback(null, user);
    });
});

const router = express.Router();

// render temporary login page for testing username password authentication
router.get('/login', function(req, res, next) {
    res.render('login');
});

/**
 * Calls the LocalStrategy defined above that verifies whether the login information
 * exists in the DB. If the strategy succeeds, the user is added to the req object 
 * along with the helper functions req.login(), req.logout(), and req.isAuthenticated()
 */
router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// render temporary signup form
router.get('/signup', function(req, res, next) {
    res.render('signup');
});
/**
 * Inserts user information into the database, then creates a user object and
 * calls `req.login()` with the new user. If successful, the user is serialized
 * into the session and is redirected to the homepage.
 */
router.post('/signup', function(req, res, next) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return next(err); }
        db.query(
            'INSERT INTO users(username, hashed_password, salt, name) VALUES($1, $2, $3, $4) RETURNING id', 
            [
                req.body.username,
                hashedPassword,
                salt,
                req.body.name ? req.body.name : req.body.username
            ], function(err, pgRes) {
                if (err) { return next(err); }
                const user = {
                    id: pgRes.rows[0].id,
                    username: req.body.username
                };
                req.login(user, function(err) {
                    if (err) { return next(err); }
                    res.redirect('/');
                });
            }
        );
    });
});

module.exports = router;