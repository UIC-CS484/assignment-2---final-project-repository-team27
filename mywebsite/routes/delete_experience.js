var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const exLib = require("../modules/user_experience.js");

/* GET home page. */
router.get('/:xid', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    if (!req.params.xid) {
        return res.redirect('/user/update-experience')
    }
    const exp = await exLib.getExperienceById(req.params.xid);

    if (!exp) {
        return res.redirect('/user/update-experience')
    }

    await exLib.deleteExperience(exp['xid']);
    return res.redirect('/user/update-experience');
});

module.exports = router;
