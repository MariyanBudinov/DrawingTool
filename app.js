var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var monk = require('monk');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var fbLogin = require('./routes/passport');
var db = monk("mongodb://mariyan:1234@ds157980.mlab.com:57980/drawingtooldb-mm");


var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Static content
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

//Database
app.use(function (req, res, next) {
    req.db = db;
    next();
});

//Sessions
app.use(session({
    secret: 'momchil',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
    var facebookUsers = db.get('facebookUsers');
    facebookUsers.findById(_id, function (err, user){
        done(err, user);
    });
});

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

//Facebook Login
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

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://drawing-tool-mm.herokuapp.com',
        failureRedirect: 'http://drawing-tool-mm.herokuapp.com/login'
    }));



// app.use(passport);



function requireLogin(req, res, next) {
    if (req.session.username || req.user) {
        next();
    }
    // if (res.authResponse.accessToken){
    //     next();
    // }
    else {
        res.redirect('/login');
    }
}

app.use('/login', login);
app.use('/', requireLogin, index);
app.use('/logout', logout);

//catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//});

module.exports = app;
