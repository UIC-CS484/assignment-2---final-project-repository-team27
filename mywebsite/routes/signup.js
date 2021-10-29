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
    var signup_errors = new Map();

    if (req.app.get('env') === 'production') {
        if (fname.length < 1) {
            signup_errors.set('fname_error', 'First name can not be empty');
        }
        if (fname.length > 100) {
            signup_errors.set('fname_error', 'First name can not be longer than 100 characters');
        }
        if (lname.length < 1) {
            signup_errors.set('lname_error', 'Last name can not be empty');
        }
        if (lname.length > 100) {
            signup_errors.set('lname_error', 'Last name can not be longer than 100 characters');
        }

        if (!emailValidator.validate(email)) {
            signup_errors.set('email_error', "Email address is not valid");
          // return res.render('signup', { email_error: "Email address is not valid" });
        }

        const errors = pwdLib.validatePassword(password, true);
        if (errors.length != 0) {
          // console.log(errors);
          // return res.render('signup', { pwderrors: errors });
            signup_errors.set('pwderrors', errors);
        }
        // console.log(errors);

        const user = userLib.getUserByEmail(email);
        if (user != null) {
            signup_errors.set('exists_error', "Email adress is already exists. Please login.");
            // return res.render('signup', { error: 'User already exists. Please login.' });
        }

        if (signup_errors.size !== 0) {
            signup_errors.set('error', 'Please address following errors');
            signup_errors.set('fname', fname);
            signup_errors.set('lname', lname);
            signup_errors.set('email', email);
            let signup_errors_obj = Array.from(signup_errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            return res.render('signup', signup_errors_obj);
        }
    }
    // console.log(users);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    userLib.addUser(req.body.fname, req.body.lname, req.body.email, hashedPassword);

  return res.render('signup', { signup: true });
});

module.exports = router;
