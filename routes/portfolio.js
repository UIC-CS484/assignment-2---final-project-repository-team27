var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const socialLib = require("../modules/user_social.js");
const githubLib = require("../modules/github.js");
const eduLib = require("../modules/user_education.js");


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
    const social = await socialLib.getSocialByUserId(req.user['id']);

    // console.log("14", social);
    // return res.render('portfolio', {});
    if (social) {
        // TODO: UnComment this!!!
        // let repos = await githubLib.get_user_repos(social['github']);
        let repos = [];

        return res.render('portfolio', {
          fname: user['fname'], lname: user['lname'], email: user['email'],
          twitter: social['twitter'], github: social['github'], linkedin: social['linkedin'],
          twitter_embedding: social['twitter_embedding'],
          github_repos: repos
        });

    } else{
        return res.render('portfolio', {
          fname: user['fname'], lname: user['lname'], email: user['email']
        });
    }
});

module.exports = router;
