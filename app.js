var express = require('express');
var path = require('path');
var cookieSession = require('cookie-session');
var passport = require('passport');
var passportSetup = require('./config/passport-setup');
var keys = require('./config/keys');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var authRoutes = require('./routes/auth');

var app = express();

app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys : [keys.session.cookieKey]
}));

//initialese passport
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect('mongodb://localhost/MusicifyDB',{
    useMongoClient: true
}, function (err, db) {
    if(err){
        console.log(err);
    }
    else {
        console.log("DB connected successfully");
    }
});



app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/auth',authRoutes);


// view engine setup
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;