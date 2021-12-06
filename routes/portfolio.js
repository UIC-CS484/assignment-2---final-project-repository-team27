var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const socialLib = require("../modules/user_social.js");
const githubLib = require("../modules/github.js");
const eduLib = require("../modules/user_education.js");
const expLib = require("../modules/user_experience.js");
const skLib = require("../modules/user_skill.js");


/* GET home page. */
router.get('/', async function(req, res, next) {
    // console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    // req.user['id'].set(1)
    const user = await userLib.getUserById(req.user['id']);
    var params = new Map();
    params.set('fname', user['fname'])
    params.set('lname', user['lname'])
    params.set('email', user['email'])
    params.set('tagline', user['tagline'])
    params.set('phone', user['phone'])
    params.set('location', user['location'])

    // console.log("14", social);
    // return res.render('portfolio', {});
    const social = await socialLib.getSocialByUserId(req.user['id']);
    if (social) {
        // TODO: UnComment this!!!
        // let repos = [];
        let repos = await githubLib.get_user_repos(social['github']);
        // console.log(length(repos.slice(3)))
        // console.log(repos.length, repos.slice(0, 2).length)
        params.set('github_repos', repos.slice(0, Math.min(repos.length, 3)));
        params.set('twitter', social['twitter']);
        params.set('github', social['github']);
        params.set('linkedin', social['linkedin']);
        params.set('twitter_embedding', social['twitter_embedding']);

    }

    const educations = await eduLib.getEducationByUserId(req.user['id']);
    params.set('educations', educations)

    const experiences = await expLib.getExperienceByUserId(req.user['id']);
    params.set('experiences', experiences)

    const skills = await skLib.getSkillByUserId(req.user['id']);
    params.set('skills', skills)

    let params_obj = Array.from(params).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
    ), {});
    return res.render('portfolio', params_obj);
    
});

module.exports = router;
