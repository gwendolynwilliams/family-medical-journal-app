var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dataRoute = require('./routes/data');
var unauthorized = require('./routes/unauthorized');

// Strategy
var passport = require('./strategies/user.js');
var session = require('express-session');

// Route includes
var login = require('./routes/login');
var user = require('./routes/user');
var register = require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/login', login);
app.use('/user', user);
app.use('/unauthorized', unauthorized);
app.use('/', dataRoute);

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('public/scripts'));
app.use(express.static('public/views'));
app.use(express.static('public/views/styles'));
app.use(express.static('public/views/templates'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});