var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const eduLib = require("../modules/user_education.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const education = await eduLib.getEducationByUserId(req.user['id']);

    // console.log("14", social);
    if (education) {
        return res.render('add_education', {});
    } else{
        return res.render('add_education', {});
    }

});

router.post('/', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);
    const educations = await eduLib.getEducationByUserId(req.user['id']);

    if (!user) {
        return res.render('user_edit', {error: 'User do not exist'});
    }
    const university = req.body.university;
    const degree = req.body.degree;
    const major = req.body.major;
    const start_year = req.body.start_year;
    const end_year = req.body.end_year;
    var errors = new Map();

    if (req.app.get('env') === 'production') {
        if (university.length > 300) {
            errors.set('university_error', 'University text is too long');
        }
        if (degree.length > 100) {
            errors.set('degree_error', 'Degree text is too long');
        }
        if (major.length > 150) {
            errors.set('major_error', 'Major text is too long');
        }
        if (start_year < 1900 && start_year > 2022) {
            errors.set('start_year_error', 'Start year is invalid');
        }
        if (end_year < 1900 && end_year > 2050) {
            errors.set('end_year_error', 'End year is invalid');
        }

        if (errors.size !== 0) {
            errors.set('error', 'Please address following errors');
            errors.set('university', university);
            errors.set('degree', degree);
            errors.set('major', major);
            errors.set('start_year', start_year);
            errors.set('end_year', end_year);
            let errors_obj = Array.from(errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            return res.render('add_education', errors_obj);
        }
    }

    // if (education) {
    //     await eduLib.updateEducation(education['eid'], university, degree, major, start_year, end_year);
    // } else {
    await eduLib.addEducation(user['id'], university, degree, major, start_year, end_year);
    // }


  return res.redirect('/user');

});

module.exports = router;
