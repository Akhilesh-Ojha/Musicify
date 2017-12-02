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
    console.log(req.query.q);
    var obj = {params : req.query.q, str: 'abc'+req.query.q};
    /*User.find({firstName: "/.*" + req.query.q + ".*!/"}, function (err, list) {
         if (err) {
             console.log(err);
         } else {
             console.log(list);
             //res.send(list);
         }
    });*/
    res.render('search');

});

router.get('/friendSearch/:q', function (req, res) {
    console.log("q= " + req.params.q + " in friendSearch route\n");
    var result = [];
    User.find({firstName: "/.*" + req.params.q + ".*/"}, function (err, list) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("In else");
            list.toArray().forEach(function (item) {
                console.log("In user.find");
                console.log(item);
                console.log(item.firstName + item.lastName + "\n");
                result.push(item.firstName + item.lastName);
                console.log(result);
            });

        }
    });
});

    //console.log(result);
    //res.send(result);
    /*User.find({firstName: "/.*" + req.params.q + ".*!/"}, function (err, list) {
        if (err) {
            console.log(err);
        } else {
            var result = [];
            console.log("HERE");
            list.toArray();
            console.log(list);
            list.forEach(function (item) {
                console.log(item);
                console.log(item.firstName + item.lastName+"\n");
                result.push(item.firstName + item.lastName);
                console.log(result);
            });
            res.render('search', {ob: list});
            */
    //res.send(list);



       // }
   // });


/*
    User.find({"firstName": "/" + "ak" + "/i"}, function (err, list) {
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
        console.log("here");
       User.update({oAuth_id: id}, {$addToSet:{friends:friend_id}}, function (err, updated) {
           if(err){
               console.log("error:"+error);
           }else{
               console.log("user:"+updated)
           }
       });
   }else{
       console.log("herrw");
       User.update({oAuth_id: id}, {$pull:{friends:friend_id}}, function (err, updated) {
           if(err){
               console.log("error:"+error);
           }else{
               console.log("user:"+updated);
           }
       });
   }



});

*/

module.exports = router;
