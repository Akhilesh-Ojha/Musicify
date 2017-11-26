var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var config = require('./oAuth');
var User = require("../models/user");
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var mongoose = require('mongoose');

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
        clientSecret:clientSecret,
        callbackURL: callbackURL
    },
    function (request, accessToken, refreshToken, profile, done) {
        console.log("user google", profile);
        console.log(refreshToken);
        User.findOne({u_oAuth_id: profile.id}, function (err, user) {
            if (err) {
                console.log(err);  // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    provider: profile.provider,
                    u_oAuth_id: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.email,
                    image : profile._json.image.url,
                    createdAt: Date.now()
                });
                user.save(function(err) {
                    if(err) {
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
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        console.log(user);
        if (!err) done(null, user);
        else done(err, null);
    });
});

app.get('/auth/google',
    passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read']
            // accessType: 'offline',
            // approvalPrompt: 'force'
        }
    ));
app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/account');
    });

app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account');
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


module.exports =app;