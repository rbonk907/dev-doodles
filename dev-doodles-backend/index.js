require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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
const port = process.env.PORT || 3001; // leave 3000 open for the frontend

// temporary view engine for testing user login flow
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ 
    origin: 'https://frontend-dev-doodles.onrender.com', 
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
}));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// app.use(cookieParser(process.env.COOKIE_SECRET));

/**
 * Upon any server request, where a cookie containing the session ID is
 * also passed in, express-session verifies the signed cookie with the
 * stored secret. Assuming all is well, the session is re-populated
 * with the information stored in the database.
 */
app.set('trust proxy', 1);
app.use(session({
    store: new pgSession({
        pool: db.pool,
        tableName: 'user_sessions'
    }),
    secret: process.env.COOKIE_SECRET,
    name: 'devDoodle',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, sameSite: 'none', secure: true, } // 30 days
}));
/** 
 * Passport calls the `deserializeUser` function which will return
 * a user object if present and a login session is re-established
 * by populating `req.user` with the current user information
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