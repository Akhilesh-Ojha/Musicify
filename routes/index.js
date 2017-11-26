var express = require('express');
var middleware = require('../routes/login');
var app = express();

/* GET home page. */
app.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/profile',ensureAuthenticated, function (req, res) {
    console.log("middle", middleware.ensureAuthenticated);
    res.render("profile", {user: req.user});

});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
module.exports = app;

