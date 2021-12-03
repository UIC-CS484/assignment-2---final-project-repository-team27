var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const exLib = require("../modules/user_experience.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const experience = await exLib.getExperienceByUserId(req.user['id']);

    // console.log("14", social);
    if (experience) {
        return res.render('add_experience', {});
    } else{
        return res.render('add_experience', {});
    }

});



module.exports = router;
