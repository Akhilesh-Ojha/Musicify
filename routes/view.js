var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var keys = require('../config/keys');



var router = express.Router();


router.get('/profile', middleware.ensureAuthenticated, function (req, res) {
   var profile_id = req.query.id;
   User.findOne({id: profile_id}, function (err,result) {
       if(err){
           res.json({
               status: "error",
               data : err
           })
       }
       else{
           res.json({
               status: "ok",
               data : result
           })
       }
   })
});

router.get('/playlist', middleware.ensureAuthenticated, function (req, res) {
   var playlist_id = req.query.id;
   User.findOne({playlist: {id : playlist_id}}, function (err, result) {
       if(err){
           res.json({
               status: "error",
               data : err
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

module.exports = router;