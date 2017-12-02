var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/search', middleware.ensureAuthenticated, function (req, res) {
    //document.getElementById("heading").innerHTML = "What you doing";
    console.log(req.query.q);
    User.find({firstName: "/." + "A"+ "./"}, function (err, list) {
        if (err) {
            console.log(err);
        } else {
            console.log(list);
        }
    });
    res.render('search');
});
router.get('/profile/:name',middleware.ensureAuthenticated, function (req, res) {
   res.render('profile');
});

router.get('/addFriend',middleware.ensureAuthenticated,function (req, res) {
   console.log(req.query.q+"follow"+req.query.follow);
   var id = "552515916436987050000";
   var friend_id = {
       oAuth_id: "915236895140184200000"
   };

   if(req.query.follow === "1"){
       User.update({oAuth_id: id}, {$addToSet:{friends:friend_id}}, function (err, updated) {
           if(err){
               console.log("error:"+error);
           }else{
               console.log("user:"+updated)
           }
       });
   }else{

       User.update({oAuth_id: id}, {$pull:{friends:friend_id}}, function (err, updated) {
           if(err){
               console.log("error:"+error);
           }else{
               console.log("user:"+updated);
           }
       });
   }



});


module.exports = router;
