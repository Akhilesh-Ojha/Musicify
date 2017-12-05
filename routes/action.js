var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var keys = require('../config/keys');



var router = express.Router();

router.get('/follow', middleware.ensureAuthenticated, function (req, res) {
   var follow_id = {
       oAuth_id: req.query.id
   };
   var user_id = req.user.oAuth_id;
   User.update({oAuth_id:user_id}, {$addToSet: {following: follow_id}}, function (err, result) {
       if (err){
           console.log(err);
       }
       else {
           console.log(result);
       }
   });
   var user_id_ob ={
       oAuth_id:user_id
   };
   User.update({oAuth_id:follow_id}, {$addToSet: {followers: user_id_ob}}, function (err, result){
       if (err){
           res.json({
               status:"error",
               data : err
           })
       }
       else {

       }
   });

});
router.get('/unfollow', middleware.ensureAuthenticated, function (req, res) {
   var unfollow_id = {
       oAuth_id: req.query.id
   };
   var user_id = req.user.oAuth_id;

   User.update({oAuth_id:user_id},{$pull:{following: unfollow_id}},function (err, result) {
        if(err){
            res.json({
                status: "error",
                data : err
            })
        }
        else{
            res.json({
                status: "ok",
                data:result
            })
        }
    });
    var user_id_ob ={
        oAuth_id:user_id
    };
   User.update({oAuth_id:unfollow_id.oAuth_id}, {$pull: {followers: user_id_ob}}, function (err, result){
        if (err){
            res.json({
                status:"error",
                data : err
            })
        }
        else {
            res.json({
                status: "ok",
                data : result
            })
        }
    })
});

router.get('/create/playlist', middleware.ensureAuthenticated, function (req, res) {
   var id = req.query.id;
   var name = req.query.name;
   var description = req.query.description;
   var sharing = req.query.sharing;
    var genre = req.query.genre;
   var user_id = req.user.oAuth_id;

   User.update({oAuth_id: user_id}, {
                                    $push : {
                                            playlist:{
                                                id:id ,
                                                name:name,
                                                description:description,
                                                sharing : sharing
                                            }
                                    }
   }, function (err, result) {
       if(err){
           res.json({
               status:"error",
               data: err
           })
       }
       else{
           res.json({
               status: "ok",
               data:result
           })
       }
   });
});

router.get('/save/playlist', middleware.ensureAuthenticated, function (req, res) {
    var playlist_id = req.query.id;
    var user_id = req.user.oAuth_id;
   User.findOne({playlist:{id : playlist_id}}, function (err, result) {
      if(err){
          res.json({
              status: "error",
              data : err
          })
      }
      else{
          User.update({oAuth_id:user_id}, {$addToSet : {playlist:result}},function (err,updatedResult) {
            if(err){
                res.json({
                    status: "error",
                    data : err
                })
            }
            else{
                res.json({
                    status:"ok",
                    data : updatedResult
                })
            }
          })
      }
   });
});

router.get('/delete/playlist', middleware.ensureAuthenticated, function (req, res) {

});


module.exports = router;
