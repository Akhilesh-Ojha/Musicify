var express = require('express');
var middleware = require('../middlewares/index');
var User = require('../models/user');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});



module.exports = router;
