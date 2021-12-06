var express = require('express');
var router = express.Router();
const userLib = require("../modules/users_data.js");
const expLib = require("../modules/user_experience.js");

/* GET home page. */

router.get('/', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }

    const experiences = await expLib.getExperienceByUserId(req.user['id']);
    // console.log(experiences);

    return res.render('update_experience', {experiences: experiences});
});


router.get('/:xid', async function(req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    // console.log(req.params.xid);
    if (req.params.xid) {
        const exp = await expLib.getExperienceById(req.params.xid);

        return res.render('add_experience', {
            employer: exp['employer'], role: exp['role'], 
            xid: exp['xid'], start_date: exp['start_date'], end_date: exp['end_date'],
            description: exp['description'], location: exp['location']});
    }0
    return res.render('add_experience', {experiences: experiences});
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
    const employer = req.body.employer;
    const role = req.body.role;
    const description = req.body.description;
    const location = req.body.location;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    var errors = new Map();


    if (req.app.get('env') === 'production') {
        if (employer.length > 200 || employer.length <= 0) {
            errors.set('employer_error', 'Employer name is invalid');
        }
        if (role.length > 100  || role.length <= 0) {
            errors.set('role_error', 'Role is invalid');
        }
        if (description.length > 500) {
            errors.set('description_error', 'Description is too long');
        }
        if (location.length > 100) {
            errors.set('location_error', 'Location is too long');
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
            errors.set('employer', employer);
            errors.set('role', role);
            errors.set('description', description);
            errors.set('location', location);
            errors.set('start_date', start_date);
            errors.set('end_date', end_date);
            let errors_obj = Array.from(errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            return res.render('add_experience', errors_obj);

        }
    }
    
    await expLib.addExperience(user['id'], employer, role, start_date, end_date, description, location);

    return res.redirect('/user/update-experience');

});


router.post('/:xid', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        // If user is not logged in then redirect to login page
        return res.redirect('/login')
    }
    const user = await userLib.getUserById(req.user['id']);
    if (!user) {
        return res.render('user_edit', {error: 'User do not exist'});
    }
    if (!req.params.xid) {
        return res.redirect('/user/update-experience');
    }
    const exp = await expLib.getExperienceById(req.params.xid);

    if (!exp) {
        // console.log("not getting the exp object from database")
        return res.redirect('/user/update-experience')
    }


    const employer = req.body.employer;
    const role = req.body.role;
    const description = req.body.description;
    const location = req.body.location;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    var errors = new Map();


    if (req.app.get('env') === 'production') {
        if (employer.length > 200 || employer.length <= 0) {
            errors.set('employer_error', 'Employer name is invalid');
        }
        if (role.length > 100  || role.length <= 0) {
            errors.set('role_error', 'Role is invalid');
        }
        if (description.length > 500) {
            errors.set('description_error', 'Description is too long');
        }
        if (location.length > 100) {
            errors.set('location_error', 'Location is too long');
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
            errors.set('employer', employer);
            errors.set('role', role);
            errors.set('description', description);
            errors.set('location', location);
            errors.set('start_date', start_date);
            errors.set('end_date', end_date);
            let errors_obj = Array.from(errors).reduce((obj, [key, value]) => (
              Object.assign(obj, { [key]: value }) 
            ), {});
            errors.set('xid', req.params.xid);
            return res.render('add_experience', errors_obj);

        }
    }
    
    // console.log("updating experinece...", req.params.xid)
    await expLib.updateExperience(req.params.xid, employer, role, start_date, end_date, description, location);

  return res.redirect('/user/update-experience');

});

module.exports = router;
