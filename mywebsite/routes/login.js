var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
    if (req.isAuthenticated()) {
        // TODO: if user is already authenticated then what?
        console.log("user is already logged in")
    }
  res.render('login', { title: 'MyWebsite' });
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
