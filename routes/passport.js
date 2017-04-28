var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongodb = require('mongodb');
var monk = require('monk');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//Facebook Login
module.exports.facebookLogin = function (req, res, next) {
    var FACEBOOK_APP_ID = 1487666597973757;
    var FACEBOOK_SECRET = '4aeefd80f5a57fbf189882ef94e35eb7';

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback" || "http://drawing-tool-mm.herokuapp.com/auth/facebook/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            var facebookUsers = db.get('facebookUsers');

            facebookUsers.findOne({
                'facebook.id': profile.id
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    facebookUsers.insert(
                        ({
                            name: profile.displayName,
                            //email: profile.emails[0].value,
                            username: profile.username,
                            provider: 'facebook',
                            //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                            facebook: profile._json
                        }));
                    // user.save(function (err) {
                    //     if (err) console.log(err);
                    //     return done(err, user);
                    // });
                    return done(err, user);
                } else {
                    //found user. Return
                    return done(err, user);
                }
            });
        }
    ));
}

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));




module.exports = {
    router,
    passport
}

