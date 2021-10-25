const LocalStrategy = require('passport-local').Strategy;
let users = require('../public/data/users.json');
const bcrypt = require('bcrypt');

const getUserByEmail = (email) => {
    // console.log(users);
    return users.find(user => user.email === email);
}
const getUserById = (id) => {
    return users.find(user => user.id === id);
}

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
        //TODO: Render error message
      return done(null, false, { message: 'Email or Password is incorrect. Please try again.' })
    }

    try {
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
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize

