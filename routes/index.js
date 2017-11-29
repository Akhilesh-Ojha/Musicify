var express = require('express');
var middleware = require('../middlewares/index');
var keys = require('../config/keys');
var router = express.Router();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var passport = require('passport');
var encryption = require('../config/encryption');
var User = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
    //console.log(req.cookies);
    //console.log('User- ' + user);
    //console.log('\nUser id- '+ user._id);
    //console.log('\n cookie is - '+ req.headers.cookie.musicifyLogin);
    //console.log('\n decrypted cookie is - '+ encryption.decrypt(req.headers.cookie.musicifyLogin));
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

router.get('/profile',middleware.ensureAuthenticated, function (req, res) {
    var oauth2Client = new OAuth2(
        keys.google.clientID,
        keys.google.clientSecret ,
        keys.google.callBackURL
    );
    oauth2Client.credentials = {
        access_token: encryption.decrypt(req.user.refreshToken.access_token)
    };
    console.log("Decrypted access token in /profile call--\n", req.user.accessToken+'\n');
    google.youtube({
        version: 'v3',
        auth: oauth2Client
    }).subscriptions.list({
        part: 'snippet',
        mine: true,
        headers: {}
    }, function(err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data) {
            console.log(data);
            res.json({
                status: "ok",
                data: data
            });
        }
        if (response) {
            console.log('Status code: ' + response.statusCode);
        }
    });
});

router.get('/home', function (req, res) {
    res.render('home', { user: req.user });
});

router.get('/logout', function (req, res) {
    res.clearCookie('musicifyLogin');
    req.logout();
    res.redirect('/login');
});


module.exports = router;

