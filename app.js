const express = require('express');
const app = express();
require('dotenv').config();
const bcrypt = require('bcrypt');

// const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');

// require DB connections
const dbConnect = require('./db/dbConnect.js'); // User Model
const User = require("./db/userModel");
dbConnect();

const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const expressSession = require('express-session')({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// });
// app.use(expressSession);

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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

// ----------------- REGISTER ----------------------------------
app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      // save the new user
      user.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((err) => {
          res.status(500).send({
            message: "Error creating user",
            err,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Error trying to hash password",
        e,
      });
    });
});




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

//         return res.redirect('/dashboard');
//       });
//     })(req, res, next);
// });


// app.get('/user',
//   connectEnsureLogin.ensureLoggedIn(),
//   (req, res) => res.send({ user: req.user })
// );

// app.get('/profile',
//   connectEnsureLogin.ensureLoggedIn(),
//   (req, res) => {
//     res.render('profile', {
//       title: 'Profile - KPMH Investments'
//     })
//   }
// );

// app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
//    <br><br>
//    <a href="/logout">Log Out</a><br><br>
//    <a href="/profile">Members Only</a>`);
// });

// app.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/login');
// });

//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});