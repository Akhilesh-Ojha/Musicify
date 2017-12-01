var express = require('express');
var Promise = require('promise');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var keys = require('../config/keys');
var google = require('googleapis');
var search = require('youtube-search');

var query;
var youtube = google.youtube({
    version: 'v3',
    auth: keys.google.apiKey
});


var router = express.Router();


var result = new Promise(
    function (resolve, reject) {
        var resp = youtube.search.list({
            part: 'snippet',
            q: query,
            type: 'video'
        },function (err, data, response) {
            if (err) {
                console.error('Error: ' + err);
                res.json({
                    status: "error"
                });
            }
            if (data) {
                // console.log(typeof data);
                //  return res.json({
                //      status: "ok",
                //      data: data
                //  });
                //dataFinal = data;
                resolve(data);
                //res.render('resultsVideo',{results:data})
            }
        });
    }
);

router.get('/video/results/:search_query', middleware.ensureAuthenticated, function (req, res) {
    query = req.params.search_query;
    console.log(query);
    var dataFinal;
    var resp = youtube.search.list({
        part: 'snippet',
        q: query,
        type: 'video'
    },function (err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data) {
           // console.log(typeof data);
            dataFinal = data;
           //  return res.json({
           //      status: "ok",
           //      data: data
           //  });
            console.log(dataFinal);
            res.render('resultsVideo',{results:dataFinal})
            //res.render('resultsVideo',{results:data})
        }
    });


});


module.exports = router;