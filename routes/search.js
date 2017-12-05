var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var keys = require('../config/keys');
var google = require('googleapis');


var query;
var youtube = google.youtube({
    version: 'v3',
    auth: keys.google.apiKey
});


var router = express.Router();


router.get('/user', middleware.ensureAuthenticated, function (req, res) {
   var displayName = req.query.displayName;
   User.find({displayName: {'$regex': displayName, '$options' : 'i'}}, function (err, result) {
       if(err){
           res.json({
               status: "error",
               data: err
           })
       }
       else{
           console.log(result);
           res.json({
               status: "ok",
               data : result
           })
       }
   })
});

router.get('/music', middleware.ensureAuthenticated, function (req, res) {
   search_query = req.query.name;
    youtube.search.list({
        maxResults: 18,
        part: 'snippet',
        q: query,
        type: 'video'
    }, function (err, data) {
        if (err) {
            res.json({
                status: "error",
                data : err
            });
        }
        if (data) {
            res.json({
                status: "ok",
                data : data
            })
        }
    });
});

module.exports = router;