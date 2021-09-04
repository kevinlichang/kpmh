//create express instance
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(passport)

// const passportLocalMongoose = require('passport-local-mongoose');
// const connectEnsureLogin = require('connect-ensure-login');
const PORT = process.env.PORT || 3000;

const exphbs = require('express-handlebars');



app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// const expressSession = require('express-session')({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// });
// 
// app.use(expressSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const dbConnect = require('./db/dbConnect.js');
const User = require("./db/userModel");
dbConnect();

// mongoose.connect('mongodb://localhost/firstDatabase',
//   { useNewUrlParser: true, useUnifiedTopology: true });

// const Schema = mongoose.Schema;
// const UserDetail = new Schema({
//   username: String,
//   password: String
// });

// UserDetail.plugin(passportLocalMongoose);
// const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// passport.use(UserDetails.createStrategy());

// passport.serializeUser(UserDetails.serializeUser());
// passport.deserializeUser(UserDetails.deserializeUser());

// Starting Page
app.get('/',
  (req, res) => {
    res.render('index', {
      title: 'KPMH Investments',
      script: 'script.js',
    })
  }
);

app.get('/index',
  (req, res) => {
    res.render('index', {
      title: 'KPMH Investments',
      script: 'script.js',
      username: req.user ? req.user.username : ""
    })
  }
);


// Contact page
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact US - KPMH Investments',
    script: 'contactUsScript.js'
  })
});

app.get('/resources', (req, res) => {
  res.render('resources', {
    title: 'Resources - KPMH Investments',
    script: 'script.js'
  })
});

// Send Message to email
app.use('/contact/send', require('./routes/emailRoute'));

// login
// app.post('/login', (req, res, next) => {
//   passport.authenticate('local',
//     (err, user, info) => {
//       if (err) {
//         return next(err);
//       }

//       if (!user) {
//         return res.redirect('/login?info=' + info);
//       }

//       req.logIn(user, function (err) {
//         if (err) {
//           return next(err);
//         }

//         return res.redirect('/');
//       });
//     })(req, res, next);
// });


// app.get('/user',
//   connectEnsureLogin.ensureLoggedIn(),
//   (req, res) => res.send({ user: req.user })
// );

app.get('/profile',
  checkAuthenticated,
  (req, res) => {
    res.render('profile', {
      title: 'Profile - KPMH Investments',
      script: 'script.js',
      username: req.user.username,
      fname: req.user.fname,
      lname: req.user.lname
    })
  }
);

// --------------------LOGIN--------------------------------
app.get('/login', checkNotAuthenticated,
  (req, res) => {
    res.render('login', {
      title: 'Login - KPMH Investments',
      script: 'script.js'
    })
  }
);

app.post('/login', checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
);


// ---------------------REGISTER----------------------------
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register - KPMH Investments',
    script: 'script.js'
  })
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // create a new user instance and collect the data
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      fname: req.body.fname,
      lname: req.body.lname
    });

    // save the new user
    user.save()
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
});

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile');
  }
  next();
}


//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});