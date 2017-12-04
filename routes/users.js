var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/search', middleware.ensureAuthenticated, function (req, res) {
    //document.getElementById("heading").innerHTML = "What you doing";
    res.render('searchUser');

});

router.get('/friendSearch/:q', function (req, res) {
    var result = [];
    User.find({firstName: {'$regex': req.params.q, '$options': 'i'}}, function (err, list) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("In else");
            list.forEach(function (t) {

                if (req.user.friends.indexOf(t.oAuth_id) == -1)
                    t.isFriend = false;
                else
                    t.isFriend = true;
            });
            res.json({
                list: list
            });
        }
    });
});


router.get('/profile/:id', middleware.ensureAuthenticated, function (req, res) {
    User.findOne({oAuth_id: req.params.id}, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('profile', {user: user});
        }
    });

});

router.get('/addFriend', middleware.ensureAuthenticated, function (req, res) {
    console.log(req.query.id + "follow" + req.query.follow);
    var user_id = req.user.oAuth_id;
    var friend_id = {
        oAuth_id: req.query.id
    };

    if (req.query.follow === "1") {
        User.update({oAuth_id: user_id}, {$addToSet: {friends: friend_id}}, function (err, updated) {
            if (err) {
                console.log("error:" + error);
            } else {
                console.log("user:" + updated)
            }
        });
    } else {

        User.update({oAuth_id: user_id}, {$pull: {friends: friend_id}}, function (err, updated) {
            if (err) {
                console.log("error:" + error);
            } else {
                console.log("user:" + updated);
            }
        });
    }


});


module.exports = router;
