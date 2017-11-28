const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const keys = require('./keys');
const encryption = require('./encryption');


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


passport.use(
    new GoogleStrategy({
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: keys.google.callbackURL
        }, function (accessToken, rand, refreshToken, profile, done) {
            console.log("User Google----\n", profile);
            console.log("Access Token---\n", accessToken);
            console.log("Refresh Token----\n", refreshToken);
            if (profile.name) {
                firstName = profile.name.givenName;
                lastName = profile.name.familyName;
            }
            else {
                firstName = profile.displayname;
                lastName = "";
            }
            // User.findOneAndUpdate({oAuth_id: profile.id}, {
            //     $set: {
            //         accessToken: accessToken,
            //         refreshToken: refreshToken
            //     }
            // }, function (err, user) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //
            //     }
            // });

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
                        firstName: firstName,
                        lastName: lastName,
                        email: profile.email,
                        image: profile._json.image.url,
                        createdAt: Date.now(),
                        musicifyAccessToken: encryption.encrypt(profile.id),
                        accessToken: encryption.encrypt(accessToken),
                        refreshToken: refreshToken
                    });
                    user.save(function (err, newUser) {
                        if (err) {
                            console.log(err);  // handle errors!
                        } else {
                            console.log("saving user ..." + newUser);
                            done(null, newUser);
                        }
                    });
                }
            });

        }
    ));