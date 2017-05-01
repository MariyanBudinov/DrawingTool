var express = require('express');
var router = express.Router();



router.post('/', function (req, res, next) {
    var db = req.db;
    var usernameId = req.session.userId || req.user.facebook.id;
    var drawing = req.body;
    var drawings = db.get('drawings');

    var users = db.get('users');
    // if(req.session.userId){
    //     users.find({_id: req.session.userId})

    // }
    if (usernameId == req.session.userId) {
        users.find({ _id: req.session.userId }).then(function (data) {
            users.update({'_id': usernameId}, {$set : {'drawing': drawing}})
        }).catch(function(){
            res.json('Drawing was not saved');
        });
    } 
    // if(usernameId == req.user.facebook.id){
    //     var facebookUsers = db.get('facebookUsers');
    //     facebookUsers.update({'_id': usernameId}, {$set : {'drawing': drawing}});
    // }

    drawings.find({ _id: drawing._id })
        .then(function (data) {
            if (data.length != 0)
                res.json('Same drawing already saved!')
            else {
                drawings.insert(drawing)
                    .then(function () {
                        res.json('Drawing successfully saved!')
                    })
                    .catch(function () {
                        res.json('Drawing was not saved');
                    })
            }
        })
        .catch(function () {
            res.json('Error! Please try again later')
        });
});

// router.get('/', function (req, res, next) {
//     var usernameId = req.session.userId || req.user.facebook.id;

//     var db = req.db;
//     var drawings = db.get('drawings');
//     drawings.find({ _id: usernameId, }).then(function (data) {
//         res.json(data);
//     });
// });

module.exports = router;
