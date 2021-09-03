const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("./db/userModel");

 function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    const currentUser = User.findOne({ username: username })
    if (!currentUser) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, currentUser.password)) {
        return done(null, currentUser)
      } else {
        return done(null, false, { message: 'Password incorrect'})
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    return done(null, User.findById(id));
  });
}

module.exports = initialize;