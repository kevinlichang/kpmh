//create express instance
const express = require('express');
var path = require('path');
require('dotenv').config();

const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const User = require('./user.js'); // User Model

var exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const expressSession = require('express-session')({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Starting Page
app.get('/',
  (req, res) => {
    res.render('index', {
      title: 'KPMH Investments'
    })
  }
);

app.get('/index',
  (req, res) => {
    res.render('index', {
      title: 'KPMH Investments'
    })
  }
);


// Contact page
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact US - KPMH Investments'
  })
});

app.get('/resources', (req, res) => {
  res.render('resources', {
    title: 'Resources - KPMH Investments'
  })
});

// Send Message to email
app.use('/contact/send', require('./routes/emailRoute'));

// ------------------- Login -------------------------------------

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login - KPMH Investments'
  })
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect('/login?info=' + info);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/dashboard');
      });
    })(req, res, next);
});


// app.get('/user',
//   connectEnsureLogin.ensureLoggedIn(),
//   (req, res) => res.send({ user: req.user })
// );

app.get('/profile',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render('profile', {
      title: 'Profile - KPMH Investments'
    })
  }
);

app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   <br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/profile">Members Only</a>`);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});