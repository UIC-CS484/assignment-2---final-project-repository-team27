var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const emailValidator = require("email-validator");

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);

    return res.render('user_edit', {
      fname: user['fname'], lname: user['lname'], email: user['email']});
});

router.post('/', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);

    if (user === null) {
        return res.render('user_edit', {error: 'User do not exist'});
    }

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
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

        if (signup_errors.size !== 0) {
            signup_errors.set('error', 'Please address following errors');
            signup_errors.set('fname', fname);
            signup_errors.set('lname', lname);
            signup_errors.set('email', email);
            let signup_errors_obj = Array.from(signup_errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            return res.render('user_edit', signup_errors_obj);
        }
    }
    // console.log(users);
    // console.log(req.body, req.body.twitter)
    await userLib.updateUser(req.user['id'], req.body.fname, req.body.lname, req.body.email, req.body.twitter);

  return res.redirect('/user');

});

module.exports = router;
