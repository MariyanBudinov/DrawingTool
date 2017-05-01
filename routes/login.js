var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var db = req.db;
  var users = db.get('users');

  users.find({ username: username }).then(function (data) {
    if (data.length > 0) {
      console.log(data);
      console.log(data[0].password);
      
      bcrypt.compare(password, data[0].password, function (err, res1) {
        if(err) res.render('login','message: Database error');
        if (res1) {
          req.session.userId = data[0]._id;
          req.session.username = username;
          res.render('index');
        } else {
          res.render('login', { message: 'Invalid password! Try again' })
        }
      });
    } else {
      res.render('login', { message: 'Invalid username! Try again ' });
    }
  });
});



router.get('/', function (req, res, next) {
  if (req.session.username || req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

module.exports = router;
