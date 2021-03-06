var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
const flash = require('flash');
const bcrypt = require('bcrypt')
var passwordValidator = require('password-validator');
const emailValidator = require("email-validator");
require('dotenv').config();
var mysql = require('mysql2');
const Chart = require('chart.js');

require('./modules/sqlite_con');
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
// var loginSubmitRouter = require('./routes/loginSubmit');
var userRouter = require('./routes/user');
var logoutRouter = require('./routes/logout');
var deactivateRouter = require('./routes/deactivate');
var userEditRouter = require('./routes/user_edit');
var addSocialRouter = require('./routes/add_social');
var userPortfolio = require('./routes/portfolio');
var addEducationRouter = require('./routes/add_education');
var updateEducationRouter = require('./routes/update_education');
var deleteEducationRouter = require('./routes/delete_education');
var addExperienceRouter = require('./routes/add_experience');
var updateExperienceRouter = require('./routes/update_experience');
var deleteExperienceRouter = require('./routes/delete_experience');
var addSkillRouter = require('./routes/add_skill');
var updateSkillRouter = require('./routes/update_skill');
var deleteSkillRouter = require('./routes/delete_skill');

var app = express();
require('./config/passport')(passport);
// Set the production env
app.set('env', 'production');
// const initializePassport = require('./config/passport')
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )

// TODO: Move this session secret to somewhere else?
var session_config = {
        secret: 'secret', //a random unique string key used to authenticate a session
        resave: true, //enables the session to be stored back to the session store, even if the session was never modified during the request
        saveUninitialized: true, //this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
        cookie: { secure: true } //true is a recommended option. However, it requires an https-enabled website
        //store  parameter when saving session to database
};

session_config.cookie.secure = false;//Express Sessions
app.use(session(session_config))
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/logout', logoutRouter);
app.use('/deactivate', deactivateRouter);
app.use('/user/edit', userEditRouter);
app.use('/user/add-social', addSocialRouter);
app.use('/user/portfolio', userPortfolio);
app.use('/user/add-education', addEducationRouter);
app.use('/user/update-education', updateEducationRouter);
app.use('/user/delete-education', deleteEducationRouter);
app.use('/user/add-experience', addExperienceRouter);
app.use('/user/update-experience', updateExperienceRouter);
app.use('/user/delete-experience', deleteExperienceRouter);
app.use('/user/add-skill', addSkillRouter);
app.use('/user/update-skill', updateSkillRouter);
app.use('/user/delete-skill', deleteSkillRouter);
// app.use('/loginSubmit', loginSubmitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // console.log("app", err);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
