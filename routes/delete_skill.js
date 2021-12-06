var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const skLib = require("../modules/user_skill.js");

/* GET home page. */
router.get('/:sid', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    if (!req.params.sid) {
        return res.redirect('/user/update-skill')
    }
    const sk = await skLib.getSkillById(req.params.sid);

    if (!sk) {
        return res.redirect('/user/update-skill')
    }

    await skLib.deleteSkill(sk['sid']);
    return res.redirect('/user/update-skill');
});

module.exports = router;
