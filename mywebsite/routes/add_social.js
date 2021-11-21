var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const socialLib = require("../modules/user_social.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const social = await socialLib.getSocialByUserId(req.user['id']);

    // console.log("14", social);
    if (social) {
        return res.render('add_social', {
          twitter: social['twitter'], github: social['github'], linkedin: social['linkedin'],
          twitter_embedding: social['twitter_embedding']});
    } else{
        return res.render('add_social', {});
    }

});

router.post('/', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);
    const social = await socialLib.getSocialByUserId(req.user['id']);

    if (!user) {
        return res.render('user_edit', {error: 'User do not exist'});
    }
    const twitter = req.body.twitter;
    const github = req.body.github;
    const linkedin = req.body.linkedin;
    const twitter_embedding = req.body.twitter_embedding;
    var errors = new Map();

    if (req.app.get('env') === 'production') {
        if (twitter.length > 100) {
            errors.set('twitter_error', 'Twitter username too long');
        }
        if (github.length > 100) {
            errors.set('github_error', 'GitHub username too long');
        }
        if (linkedin.length > 100) {
            errors.set('linkedin_error', 'Linkedin username too long');
        }
        if (twitter_embedding.length > 5000) {
            errors.set('twitter_embedding_error', 'Twitter Embedding URL username too long');
        }

        if (errors.size !== 0) {
            errors.set('error', 'Please address following errors');
            errors.set('twitter', twitter);
            errors.set('github', github);
            errors.set('linkedin', linkedin);
            errors.set('twitter_embedding', twitter_embedding);
            let errors_obj = Array.from(errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            return res.render('add_social', errors_obj);
        }
    }

    if (social) {
        await socialLib.updateSocial(social['sid'], req.body.twitter, req.body.github, req.body.linkedin,
            req.body.twitter_embedding);
    } else {
        await socialLib.addSocial(user['id'], req.body.twitter, req.body.github, req.body.linkedin,
            req.body.twitter_embedding);
    }


  return res.redirect('/user');

});

module.exports = router;
