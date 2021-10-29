var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userLib = require("../modules/users_data.js");
const pwdLib = require("../modules/password_schema.js")
const emailValidator = require("email-validator");

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

    if (req.app.get('env') === 'production') {
        if (!emailValidator.validate(email)) {
          return res.render('signup', { email_error: "Email address is not valid" });
        }

        const errors = pwdLib.validatePassword(password, true);
        if (errors.length != 0) {
          // console.log(errors);
          return res.render('signup', { pwderrors: errors });
        }
        // console.log(errors);

        const user = userLib.getUserByEmail(email);
        if (user != null) {
            return res.render('signup', { error: 'User already exists. Please login.' });
        }
    }
    // console.log(users);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    userLib.addUser(req.body.fname, req.body.lname, req.body.email, hashedPassword);

  return res.render('signup', { signup: true });
});

module.exports = router;
