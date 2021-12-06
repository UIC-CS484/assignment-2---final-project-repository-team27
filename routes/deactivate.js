var express = require('express');
var router = express.Router();
const lib = require("../modules/users_data.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    // const user = lib.getUserById(req.user['id']);
    lib.deactivateUser(req.user['id']);
    req.logout();
    res.redirect('/');
});

module.exports = router;
