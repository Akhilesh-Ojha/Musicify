var express = require('express');
var middleware = require('../middlewares/index');
var keys = require('../config/keys');
var router = express.Router();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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
        access_token: req.user.accessToken,
        refresh_token : req.user.refreshToken
    };
    console.log("cred", req.user.accessToken);
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
module.exports = router;

