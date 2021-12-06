var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const eduLib = require("../modules/user_education.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const education = await eduLib.getEducationByUserId(req.user['id']);

    // console.log("14", social);
    if (education) {
        return res.render('add_education', {});
    } else{
        return res.render('add_education', {});
    }

});



module.exports = router;
