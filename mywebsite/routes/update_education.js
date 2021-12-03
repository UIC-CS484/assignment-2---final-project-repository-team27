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

    const educations = await eduLib.getEducationByUserId(req.user['id']);
    // console.log(educations);

    return res.render('update_education', {educations: educations});
});


router.get('/:eid', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    // console.log(req.params.eid);
    if (req.params.eid) {
        const edu = await eduLib.getEducationById(req.params.eid);

        return res.render('add_education', {
            university: edu['university'], degree: edu['degree'], 
            eid: edu['eid'], major: edu['major'], start_date: edu['start_date'], end_date: edu['end_date']});
    }
    return res.render('add_education', {educations: educations});
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
    const university = req.body.university;
    const degree = req.body.degree;
    const major = req.body.major;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    var errors = new Map();


    if (req.app.get('env') === 'production') {
        if (university.length > 300 || university.length <= 0) {
            errors.set('university_error', 'University name is invalid');
        }
        if (degree.length > 100 || degree.length <= 0) {
            errors.set('degree_error', 'Degree is invalid');
        }
        if (major.length > 150 || major.length <= 0) {
            errors.set('major_error', 'Major is invalid');
        }
        if (start_date < 1900 && start_date > 2022) {
            errors.set('start_date_error', 'Start year is invalid');
        }
        if (end_date < 1900 && end_date > 2050) {
            errors.set('end_date_error', 'End year is invalid');
        }
        if (start_date > end_date) {
            errors.set('end_date_error', 'End year should be after start date');            
        }

        if (errors.size !== 0) {
            errors.set('error', 'Please address following errors');
            errors.set('university', university);
            errors.set('degree', degree);
            errors.set('major', major);
            errors.set('start_date', start_date);
            errors.set('end_date', end_date);
            let errors_obj = Array.from(errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            return res.render('add_education', errors_obj);

        }
    }
    
    await eduLib.addEducation(user['id'], university, degree, major, start_date, end_date);

    return res.redirect('/user/update-education');

});


router.post('/:eid', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);
    if (!user) {
        return res.render('user_edit', {error: 'User do not exist'});
    }
    if (!req.params.eid) {
        return res.redirect('/user/update-education');
    }
    const edu = await eduLib.getEducationById(req.params.eid);

    if (!edu) {
        return res.redirect('/user/update-education')
    }


    const university = req.body.university;
    const degree = req.body.degree;
    const major = req.body.major;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    var errors = new Map();


    if (req.app.get('env') === 'production') {
        if (university.length > 300 || university.length <= 0) {
            errors.set('university_error', 'University name is invalid');
        }
        if (degree.length > 100 || degree.length <= 0) {
            errors.set('degree_error', 'Degree is invalid');
        }
        if (major.length > 150 || major.length <= 0) {
            errors.set('major_error', 'Major is invalid');
        }
        if (start_date < 1900 && start_date > 2022) {
            errors.set('start_date_error', 'Start year is invalid');
        }
        if (end_date < 1900 && end_date > 2050) {
            errors.set('end_date_error', 'End year is invalid');
        }
        if (start_date > end_date) {
            errors.set('end_date_error', 'End year should be after start date');            
        }

        if (errors.size !== 0) {
            errors.set('error', 'Please address following errors');
            errors.set('university', university);
            errors.set('degree', degree);
            errors.set('major', major);
            errors.set('start_date', start_date);
            errors.set('end_date', end_date);
            let errors_obj = Array.from(errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            errors.set('eid', req.params.eid);
            return res.render('add_education', errors_obj);

        }
    }
    
    await eduLib.updateEducation(req.params.eid, university, degree, major, start_date, end_date);

  return res.redirect('/user/update-education');

});

module.exports = router;
