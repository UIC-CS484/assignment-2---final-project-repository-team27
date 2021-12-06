var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const skLib = require("../modules/user_skill.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    
    return res.render('add_skill', {});
});


module.exports = router;
