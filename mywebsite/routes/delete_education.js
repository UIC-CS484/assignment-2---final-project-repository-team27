var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const eduLib = require("../modules/user_education.js");

/* GET home page. */
router.get('/:eid', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    if (!req.params.eid) {
        return res.redirect('/user/update-education')
    }
    const edu = await eduLib.getEducationById(req.params.eid);

    if (!edu) {
        return res.redirect('/user/update-education')
    }

    await eduLib.deleteEducation(edu['eid']);
    return res.redirect('/user/update-education');
});

module.exports = router;
