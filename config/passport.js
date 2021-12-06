const lib = require("../modules/users_data.js");

const LocalStrategy = require('passport-local').Strategy;
// let users = require('../public/data/users.json');
const bcrypt = require('bcrypt');


function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await lib.getUserByEmail(email)
    // console.log("11", user);
    if (user == null) {
        //TODO: Render error message
      return done(null, false, { message: 'Email or Password is incorrect. Please try again.' })
    }

    try {
      // console.log("18", user, user.password, user['password'])
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user, { username: email })
      } else {
        return done(null, false, { message: 'Email or Password is incorrect. Please try again.' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    var user = await lib.getUserById(id);
    return done(null, user);
  })
}

module.exports = initialize

