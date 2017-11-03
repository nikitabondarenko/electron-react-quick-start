const express = require('express');
// var exphbs = require('express-handlebars');
var path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const util = require('util');
const { User, Document } = require('../models/models');
const mongoose = require('mongoose');
const app = express();
const server = require('http').Server(app)
var io = require('socket.io')(server);

mongoose.connect(process.env.MONGODB_URI)



// Example route

app.get('/', function (req, res) {
  console.log('Listen Here')
  res.send('Server 3000 is up and running');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
  .populate('documentsOwned')
  .populate('documentsCanEdit')
  .exec(function(err, user) {
      done(err, user);
    })
});

// passport strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  if (! util.isString(username)) {
      done(null, false, {message: 'User must be string.'});
      return;
    }
  // find the user with the given username
  User.findOne({ username: username, password: password })
  .populate('documentsOwned')
  .populate('documentsCanEdit')
  .exec(function (err, user) {
      if (err) {
        done(err);
        return;
      }
      if (!user) {
        done(null, false, { message: 'Incorrect username or password' });
        return;
      }

      done(null, user);
    })
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

app.post('/register', (req, res) => {
  var error = validateReq(req.body);
  if (error) {
    console.log(error);
  }

  var user = new User ({
    username : req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    documentsOwned: [],
    documentsCanEdit: []
  });

  user.save(function(err){
    if (err){
      console.log('there was an error', err);
      res.status(500).redirect('/register');
      return;
    }
    console.log(`Saved User: ${user.firstName}`);
    res.json({success: true});
    return;
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.json({success: true});
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({success: true});
 }
);

app.get('/home', (req, res) => {
  res.json({success:true, user: req.user})
})


app.post('/saveFile', (req, res) => {
  Document.findByIdAndUpdate({_id: req.body.id },{$set: {rawText: req.body.content}}, (err, result) => {
    if (err){
      res.send('did not update model', err)
    }else {
      res.send("model updated")
    }
  })
})

app.post('/makeDoc', (req, res) => {

  const newDoc = new Document({
    rawText: '',
    title: req.body.title,
    owner: req.user.username,
    sharedWith: [],
  });

  newDoc.save((err, doc) => {
    if (err){
      console.log(err);
      res.json({success: false});
    } else {
      req.user.documentsOwned.push(doc._id);
      req.user.save((err) =>{
        if (err){
          console.log('there was an error', err);
          res.json({success: false})
        } else {
          res.json({success: true, documentInfo: doc})
        }
      })
    }
  });
  }
)

app.get('/editDoc/:docId', (req, res) => {
  Document.findById(req.params.docId, function(err, doc){
    if (err){
      console.log('there was an error', err)
      res.json({success: false})
    } else {
      res.json({success: true, document: doc})
    }
  })
})

app.post('/search', (req, res) => {
  Document.findById(req.body.docId, function(err, doc){
    if (err){
      console.log('there was an error', err);
    } else {
      doc.sharedWith.push(req.user._id)
      req.user.documentsCanEdit.push(doc._id);

      req.user.save((err) =>{
        if (err){
          console.log('there was an error', err);
          res.json({success: false});
        } else {
          console.log("user information updated");
        }
      })
      doc.save((err)=>{
        if (err){
          console.log('there was an error', err);
          res.json({success: false})
        } else {
          console.log('document placed in right directory and updated')
        }
      })
      res.json({success: true, documentInfo: doc});
    }
  })
})

app.post('/updateTitle', (req, res) =>{
  console.log(req.body)
  Document.update({_id: req.body.id },{$set: {title: req.body.newTitle}}, (err, result) => {
    if (err){
      res.send('did not update title', err)
    }else {
      res.send("title updated")
    }
  })
})
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('change', (data) => {
    socket.broadcast.emit('globalChange', data);
  });
});


app.get('/logout', (req, res, next) => {
  req.logout();
  res.json({success: true});
});


server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!');
});
