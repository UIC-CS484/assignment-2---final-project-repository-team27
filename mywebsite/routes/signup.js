var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userLib = require("../public/javascripts/data_users.js");
const pwdLib = require("../public/javascripts/password_schema.js")

function statExists(checkPath) {
  return new Promise((resolve) => {
    fs.stat(checkPath, (err, result) => {
      if (err) {
        return resolve(undefined);
      }

      return resolve(result);
    });
  });
}

function checkAccess(checkPath, mode) {
  return new Promise((resolve) => {
    fs.access(checkPath, mode, (err) => {
      resolve(!err);
    });
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up to MyWebsite' });
});

router.post('/', async function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    // if (req.app.get('env') !== 'development' && !passwordSchema.validate(password)) {
    //   const failed_validations = passwordSchema.validate(password, {list: true});
    //   failed_validations
    // }
    const errors = pwdLib.validatePassword(password, true);
    if (errors.length != 0) {
      console.log(errors);
      return res.render('signup', { signup: false, errors: errors });
    }
    // console.log(errors);

    const user = userLib.getUserByEmail(email);
    if (user != null) {
        return res.render('signup', { error: 'User already exists. Please login.' });
    }
    // console.log(users);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    userLib.addUser(req.body.fname, req.body.lname, req.body.email, hashedPassword);

  return res.render('signup', { signup: true });
});

module.exports = router;
