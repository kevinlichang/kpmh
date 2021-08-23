const express = require('express');
const app = express();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');

// require DB connections
const dbConnect = require('./db/dbConnect.js'); // User Model
const User = require("./db/userModel");
const auth = require("./auth");
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

app.post('/login', (req, res) => {
  // check if username exists
  User.findOne({ username: req.body.username }).then((user) => {
    // compare password entered to hashed password
    bcrypt.compare(req.body.password, user.password)
      .then((passwordCheck) => {

        // check if password matches
        if (!passwordCheck) {
          return res.status(400).send({
            message: "Passwords do not match",
            error,
          });
        }

        //   create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userUsername: user.username,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        //   return success response
        res.status(200).send({
          message: "Login Successful",
          username: user.username,
          token
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Passwords does not match",
          error,
        });
      });
    
    
  })
    .catch((e) => {
      res.status(404).send({
        message: "Username not found",
        e,
      });
    });
});

// free endpoint
app.get("/free-endpoint", (req, res) => {
  res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (req, res) => {
  res.send({ message: "You are authorized to access me" });
});

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
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