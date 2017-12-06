var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var Playlist = require('../models/playlist');
var keys = require('../config/keys');



var router = express.Router();

router.get('/follow', middleware.ensureAuthenticated, function (req, res) {
    var follow_id = req.query.id;
    var user_id = req.user.id;
    User.findOne({id: follow_id}, function (err, followUser) {
       if(err){
           res.json({
               status: "error",
               data : err
           })
       }
       else{
           User.findOne({id: user_id}, function (err, user) {
               followUser.followers.push(user);
               followUser.save();
               user.following.push(followUser);
               user.save(function (err, result) {
                   if(err){
                       res.json({
                           status: "error",
                           data : err
                       })
                   }
                   else{
                       res.json({
                           status:"ok",
                           data : result
                       })
                   }
               })

           })
       }
    });

});
router.get('/unfollow', middleware.ensureAuthenticated, function (req, res) {
    var unfollow_id = req.query.id;
    var user_id = req.user.id;
    User.findOne({id: unfollow_id}, function (err, unfollowUser) {
        if(err){
            res.json({
                status: "error",
                data : err
            })
        }
        else{
            User.findOne({id: user_id}, function (err, user) {
                unfollowUser.followers.pull(user);
                followUser.save();
                user.following.pull(unfollowUser);
                user.save(function (err, result) {
                    if(err){
                        res.json({
                            status: "error",
                            data : err
                        })
                    }
                    else{
                        res.json({
                            status:"ok",
                            data : result
                        })
                    }
                })

            })
        }
    });
});

router.get('/create/playlist', middleware.ensureAuthenticated, function (req, res) {
   var name = req.query.name;
   var description = req.query.description;
   var sharing = req.query.sharing;
   var genre = req.query.genre;
   var image = req.query.image;

   var user_id = req.user.id;


   Playlist.create({
       image: image,
       name :name,
       description : description,
       sharing: sharing,
       genre : genre
   }, function (err, playlist) {
       if(err){
           res.json({
               status:"error",
               data: err
           })
       }
       else{
           User.findOne({id : user_id}, function (err, foundUser) {
               if(err){
                   res.json({
                       status:"error",
                       data: err
                   })
               }
               else{
                   foundUser.playlist.push(playlist);
                   foundUser.save(function (err, result ) {
                       if (err){
                           res.json({
                               status:"error",
                               data: err
                           })
                       }
                       else{
                           res.json({
                               status:"ok",
                               data : result
                           })
                       }
                   })
               }
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
