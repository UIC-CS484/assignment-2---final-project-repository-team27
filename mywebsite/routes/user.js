var express = require('express');
var router = express.Router();
const lib = require("../public/javascripts/index.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    const user = lib.getUserById(req.user['id']);

    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        res.redirect('/login')
    }
    // console.log(req.app.get('email'))
  res.render('user', { title: 'MyWebsite', fname: user['fname'],
    lname: user['lname'], email: user['email'] });
});

module.exports = router;
