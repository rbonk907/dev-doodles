const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');

/* create new strategy for handling username and password authentication.
 * Query the database for a provided username and if it exists, determine if the
 * hashed password provided matches the hashed password store in the DB.
 */
passport.use(new LocalStrategy(function verify(username, password, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
        if (err) { return callback(err); }
        if (!row) { return callback(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return callback(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return callback(null, false, { message: 'Incorrect username or password.' });
            }
            return callback(null, row);
        });
    });
}));

passport.serializeUser(function(user, callback) {
    process.nextTick(function() {
        callback(null, { id: user.id, username: user.username });
    });
});

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

router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
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

module.exports = router;