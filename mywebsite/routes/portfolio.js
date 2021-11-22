var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const socialLib = require("../modules/user_social.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    // console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    if (req.isAuthenticated()) {
        // TODO: if user is already authenticated then what?
        console.log("user is already logged in")
    }
    const user = await userLib.getUserById(req.user['id']);
    const social = await socialLib.getSocialByUserId(req.user['id']);

    // console.log("14", social);
    if (social) {
        return res.render('portfolio', {
          fname: user['fname'], lname: user['lname'], email: user['email'],
          twitter: social['twitter'], github: social['github'], linkedin: social['linkedin'],
          twitter_embedding: social['twitter_embedding']
        });

    } else{
        return res.render('portfolio', {
          fname: user['fname'], lname: user['lname'], email: user['email']
        });
    }
});

module.exports = router;
