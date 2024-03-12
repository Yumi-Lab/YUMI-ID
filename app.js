const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setters
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const routeTestingRouter = require('./routes/auth.route');
const siteRoute = require('./routes/home.route')
app.use('/route_testing', routeTestingRouter);
app.use('/', siteRoute);

// Middleware Errors Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Internal Server Error');
});

module.exports = app;
