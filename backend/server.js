const express = require('express');
// var exphbs = require('express-handlebars'); 
// var path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const util = require('util');
const { User } = require('../models/models');

const app = express();
// Example route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

var REQUIRED_ENV = ['MONGODB_URI'];
REQUIRED_ENV.forEach(function(el) {
  if (!process.env[el]){
    throw new Error("Missing required env var " + el);
  }
});

// var IS_DEV = app.get('env') === 'development';

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({keys: ['secret1', 'secret2']}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
    });
});
  
// passport strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  if (! util.isString(username)) {
      done(null, false, {message: 'User must be string.'});
      return;
    }
  // find the user with the given username
  User.findOne({ username: username, password: password }, function (err, user) {
      if (err) {
        done(err);
        return;
      }
      if (!user) {
        done(null, false, { message: 'Incorrect username or password' });
        return;
      }
  
      done(null, user);
    });
}));

var validateReq = function(userData) {
  if (userData.password !== userData.passwordRepeat) {
    return "Passwords don't match.";
  }

  if (!userData.username) {
    return "Please enter a username.";
  }

  if (!userData.password) {
    return "Please enter a password.";
  }
};

app.get('/register', (req, res) => {
  res.json({success: true});
});

app.post('/register', (req, res, next) => {
  var error = validateReq(req.body);
  if (error) {
    console.log(error);
  }

  var user = new User ({
    username : req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  user.save(function(err){
    if (err){
      console.log('there was an error', err);
      res.status(500).redirect('/register');
      return
    }
    console.log("Saved User: ", user);
    res.json({success: true});
    res.redirect('/login');
    return
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.json({success: true});
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/activity',
  failureRedirect: '/login'
}));

app.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.json({success: true});
    res.redirect('/login');
  });
});


app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
