var express = require('express');
var middleware = require('../middlewares/index');
var keys = require('../config/keys');
var router = express.Router();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var passport = require('passport');
var encryption = require('../config/encryption');
var User = require('../models/user');

var youtube = google.youtube({
    version: 'v3',
    auth: keys.google.apiKey
});

/* GET home page. */
router.get('/', function (req, res, next) {

    //Ask shubham

    if(req.cookies.musicifyLogin){
        User.findOne({oAuth_id: encryption.decrypt(req.cookies.musicifyLogin)}, function (err, user) {
            passport.serializeUser(function(user, done) {
                done(null, user._id);
            });
            res.redirect('/home');
        });
    }
    else res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
    res.render('login');
});



router.get('/home', function (req, res) {

    // res.render('home', { user: req.user });
});


router.get('/logout', function (req, res) {
    res.clearCookie('musicifyLogin');
    req.logout();
    res.redirect('/login');
});


module.exports = router;

