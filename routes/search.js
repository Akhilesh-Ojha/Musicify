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

router.get('/video/results/:search_query', middleware.ensureAuthenticated, function (req, res) {
    query = req.params.search_query;
    console.log(query);
    var dataFinal;
    youtube.search.list({
        maxResults: 9,
        part: 'snippet',
        q: query,
        type: 'video'
    }, function (err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data) {
            // console.log(typeof data);
            dataFinal = data;


            //res.send(dataFinal);

            console.log(dataFinal);
            res.render('resultsVideo', {results: dataFinal})
            //res.render('resultsVideo',{results:data})
        }
    });
});


router.get('/video/results/:search_query/next/:nextPageToken', middleware.ensureAuthenticated, function (req, res) {
    var nextPageToken = req.params.nextPageToken;
    console.log(nextPageToken);
    var dataFinal;
    youtube.search.list({
        nextPageToken: "'"+ nextPageToken+"'",
        maxResults: 12,
        part: 'snippet',
        q: query,
        type: 'video'
    }, function (err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data) {
            // console.log(typeof data);
            dataFinal = data;


            //res.send(dataFinal);

            console.log(dataFinal);
            res.render('resultsVideo', {results: dataFinal})
            //res.render('resultsVideo',{results:data})
        }
    });
});

router.get('/video/results/:search_query/prev/:prevPageToken', middleware.ensureAuthenticated, function (req, res) {
    var prevPageToken = req.params.prevPageToken;
    console.log(prevPageToken);
    var dataFinal;
    youtube.search.list({
        prevPageToken: "'"+prevPageToken+"'",
        maxResults: 9,
        part: 'snippet',
        q: query,
        type: 'video'
    }, function (err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data) {
            // console.log(typeof data);
            dataFinal = data;


            //res.send(dataFinal);

            //console.log(dataFinal);
            res.render('resultsVideo', {results: dataFinal})
            //res.render('resultsVideo',{results:data})
        }
    });
});


    module.exports = router;