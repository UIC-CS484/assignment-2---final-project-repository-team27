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

    const skills = await skLib.getSkillByUserId(req.user['id']);
    // console.log(experiences);

    return res.render('update_skill', {skills: skills});
});


router.post('/', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);
    if (!user) {
        return res.render('user_edit', {error: 'User do not exist'});
    }
    const name = req.body.name;
    const score = req.body.score;

    await skLib.addSkill(user['id'], name, score);

    return res.redirect('/user/update-skill');

});


module.exports = router;
