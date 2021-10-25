var express = require('express');
var router = express.Router();
let users = require('../public/data/users.json');
const bcrypt = require('bcrypt');
const fs = require('fs');
var passwordValidator = require('password-validator');

var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(5)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().symbols()
.has().not().spaces()                           // Should not have spaces


const getUserByEmail = (email) => {
    // console.log(users);
    return users.find(user => user.email === email);
}


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
    // console.log(fname, lname, email, password);
    const user = getUserByEmail(email);
    if (user != null) {
        return res.render('signup', { error: 'User already exists. Please login.' });
    }
    // console.log(users);
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword
    });

    // console.log("Trying to write to file");
    fs.writeFileSync("./public/data/users.json", JSON.stringify(users, null, 4), (err) => {
        if (err) {  console.error(err);  return; };
        // console.log("File has been created");
    });
   // fs.writeFileSync('../public/data/users.json', JSON.stringify(users));
  res.render('signup', { signup: true });
});

module.exports = router;
