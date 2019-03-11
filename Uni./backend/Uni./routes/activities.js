const express = require('express');
const router = require('express-promise-router')();
//const passport = require('passport');
//const passportConf = require('../passport');

const {validateBody, activitySchema} = require('../helpers/routeHelpers');
const activityController = require('../controllers/activities')

router.route('')
    .get(validateBody(activitySchema.authSchema),activityController.activities);

router.route('/activity/:id')
    .get(validateBody(activitySchema.authSchema), activityController.activityId);

router.route('/activity/create')
    .post(validateBody(activitySchema.authSchema), activityController.activityCreateId);

router.route('/activity/attend/:id')
    .put(activityController.attendActivity);

router.route('/activity/unattend/:id')
    .put(activityController.unattendActivity);
  module.exports = router;
