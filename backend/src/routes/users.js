const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const {validateBody, schemas, activitySchema} = require('../helpers/routeHelpers');
//const {validateBody, activitySchema} = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const activityController = require('../controllers/activities');

router.route('/signup')
//validate makes sure the data is valid
//if not it sends a response without calling the usersController
    .post(validateBody(schemas.authSchema),UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), UsersController.signIn);

router.route('/secret')
    .get(UsersController.secret);

router.route('/user/activities/attending')
	.get(validateBody(activitySchema.authSchema), UsersController.userAttendingActivities);

router.route('/user/activities/activity/delete/:id')
	.delete(UsersController.deleteMyActivity);

router.route('/user/myActivities')
    .get(validateBody(activitySchema.authSchema), UsersController.myActivities);

router.route('/user/activities/activity/owner/:activityId')
	.get(UsersController.creatorInformation);

module.exports = router;