var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var passport = require('passport');


var app = express();


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/login', function (req,res) {
   res.render('login');
});

app.get('/profile', ensureAuthenticated, function(req, res) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("profile", {user: req.user});
        }
});



function ensureAuthenticated (req, res, next) {
    console.log("In is ensureAuthenticated")
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated');
    res.redirect('/login');
};







module.exports = app;

