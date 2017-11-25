var express = require('express');


var app = express();


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/login', function (req,res) {
   res.render('login');
});





module.exports = app;

