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
    var obj = {params : req.params.q};
    // User.find({"firstName": "/" + req.query.q + "/"}, function (err, list) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(list);
    //     }
    // });
    res.render('search', {ob: obj});
});


module.exports = router;
