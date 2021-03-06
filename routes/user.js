var express = require('express');
var router = express.Router();
const lib = require("../modules/users_data.js");
// const tlib = require("../modules/twitter.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await lib.getUserById(req.user['id']);
    // console.log(req.app.get('email'))
    // const twitter_data = await tlib.getTweets('yashashvi_dave');
  return res.render('user', { title: 'MyWebsite', fname: user['fname'],
    lname: user['lname'], email: user['email'], twitter_embedding: user['twitter']});
});

module.exports = router;
