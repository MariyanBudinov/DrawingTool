var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET home page. */
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var db = req.db;
    var users = db.get('users');

    users.find({ username: username }).then(function (data) {
        if (data.length > 0) {
            res.render('register', { message: 'User with this username already exists!' });
        } else {
            bcrypt.hash(password, 10, function (err, hash) {
                users.insert(({
                    username: username,
                    password: hash
                }));
            })
            res.redirect('/');
        }
    });
});

router.get('/', function (req, res, next) {
    res.render('register');
});

module.exports = router;
