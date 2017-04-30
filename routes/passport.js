var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongodb = require('mongodb');
var monk = require('monk');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//Facebook Login
module.exports = function (app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (_id, done) {
        var facebookUsers = db.get('facebookUsers');
        facebookUsers.findById(_id, function (err, user) {
            done(err, user);
        });
    });

    var FACEBOOK_APP_ID = 1487666597973757;
    var FACEBOOK_SECRET = '4aeefd80f5a57fbf189882ef94e35eb7';


    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "http://drawing-tool-mm.herokuapp.com/auth/facebook/callback"
        //  "http://localhost:3000/auth/facebook/callback" || 
    },
        function (accessToken, refreshToken, profile, done) {
            var facebookUsers = db.get('facebookUsers');
            facebookUsers.findOne({
                'facebook.id': profile.id
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    facebookUsers.insert(
                        ({
                            name: profile.displayName,

                            username: profile.username,
                            provider: 'facebook',

                            facebook: profile._json
                        }));

                    return done(null, user);
                } else {
                    return done(null, user);
                }
            });
        }
    ));

    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: 'http://drawing-tool-mm.herokuapp.com',
            failureRedirect: 'http://drawing-tool-mm.herokuapp.com/login'
        }));
}




