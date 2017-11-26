var express = require('express');
var middleware = require('../middlewares/index');
var app = express();

/* GET home page. */
app.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/profile', middleware.ensureAuthenticated, function (req, res) {
    console.log("middle", middleware.ensureAuthenticated);
    res.render("profile", {user: req.user});

});
module.exports = app;

