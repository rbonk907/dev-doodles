const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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

app.get('/', function(request, response, next) {
    // response.json({ info: 'Dev Doodles API' });
    if (!request.user) { return response.render('home'); }
    next();
}, function(request, response) {
    response.render('index', { user: request.user });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})