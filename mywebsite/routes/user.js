var express = require('express');
var router = express.Router();
let users = require('../public/data/users.json');

const getUserById = (id) => {
    return users.find(user => user.id === id);
}


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        res.redirect('/login')
    }
    // console.log(req.app.get('email'))
  res.render('user', { title: 'MyWebsite', username: req.app.get('email') });
});

module.exports = router;
