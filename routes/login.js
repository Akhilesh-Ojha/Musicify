var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var middleware = require('../middlewares/index');
var passport = require('passport');
//var config = require('./oAuth');
var User = require("../models/user");
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var mongoose = require('mongoose');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
//google auth variables

var clientID = '364964255074-417gn90l0c4d8bs7m3lfpav06bh540ds.apps.googleusercontent.com';
var clientSecret = 'Ryb2MG-eFizzsH6pz5gKxO_b';
var callbackURL = 'http://localhost:3000/login/auth/google/callback';


var app = express();

// view engine setup
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


/*Strategy setup for Google oAuth2*/


passport.use(new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callbackURL
    },
    function (accessToken,rand, refreshToken, profile, done) {
        console.log("user google", profile);
        console.log("Access Token", accessToken);
        console.log("refres", refreshToken);
        User.findOne({oAuth_id: profile.id}, function (err, user) {
            if (err) {
                console.log(err);  // handle errors!
            }
            else if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    provider: profile.provider,
                    oAuth_id: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.email,
                    image: profile._json.image.url,
                    createdAt: Date.now(),
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);  // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (!err) {
            done(null, user);
        }
        else done(err, null);
    });
});

app.get('/auth/google',
    passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read',
                'https://www.googleapis.com/auth/youtube.readonly'
            ],
            accessType: 'offline'
            //approvalPrompt: 'force'
        }
    ));


app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/login/profile');
    });

app.get("/profile", middleware.ensureAuthenticated, function (req, res) {
    var oauth2Client = new OAuth2(
        clientID,
        clientSecret,
        callbackURL
    );

    oauth2Client.credentials = {
        access_token: req.user.accessToken

    };

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

module.exports = app;