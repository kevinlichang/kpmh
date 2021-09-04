const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("./db/userModel");

 function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'No user with that email' })
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        }
      })
      .catch(err => {
        return done(null, false, { message: err });
      });
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  });
}

module.exports = initialize;