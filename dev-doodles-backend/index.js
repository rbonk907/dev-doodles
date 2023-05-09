require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./db');

// routes
const authRouter = require('./routes/auth');
const stickerRouter = require('./routes/stickers');
const shopRouter = require('./routes/shop');
const userRouter = require('./routes/user');

const app = express();
const port = 3000;

// temporary view engine for testing user login flow
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(session({
    store: new pgSession({
        pool: db.pool,
        tableName: 'user_sessions'
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
/** 
 * Upon any server request, passport checks if a user is stored in the
 * in the session object. This calls the `deserializeUser` function 
 * which will return a user object if present. If so, a login session
 * is re-established by populating `req.user` with the current user 
 * information
 */
app.use(passport.authenticate('session'));

app.use('/', authRouter);
app.use('/stickers', stickerRouter);
app.use('/shop', shopRouter);
app.use('/user', userRouter);

app.get('/', function(request, response, next) {
    if (!request.user) { return response.render('home'); }
    next();
}, function(request, response) {
    response.render('index', { user: request.user });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})