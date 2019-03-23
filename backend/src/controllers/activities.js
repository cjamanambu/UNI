const JWT = require('jsonwebtoken');
const User = require('../models/users');
const Activity = require('../models/activities');
const { JWT_SECRET } = require('../configuration');
const passport = require('passport');

const ObjectId = require('mongoose').Types.ObjectId;


module.exports = {

    activities: async (req, res , next) => {
        await Activity.find({}, function(err, activities) {
            if(err) {
                res.json({
                    success: false,
                    info: 'something went really wrong!'
                });
                next();
            }
            var i;
            var updatedActivities = [];//will store all the activities that are still active
            var count = 0;//just a count

            //will this scale efficiently?
            for(i = 0; i<activities.length; i++)//runs through the list of activites
            {
                if(activities[i].activity_datetime > new Date()){//if the activity is still in the future(fuckoff im tired)
                    updatedActivities[count] = activities[i];//add the active acticity to the list
                    count++;    
                }
            }
            
            res.json({
                success: true,
                info: "Successfully retrieved all current activities",
                activities: updatedActivities
            });
            
        });   
    },

    activityId: async (req, res, next) => {
        try {
            const query = {_id: new ObjectId(req.params.id)};
            await Activity.find(query, function (err, activity) {
                if (err) {
                    res.json({
                        success: false,
                        info: "Something went terribly wrong"
                    });
                    next();
                }
                res.json({
                    success: true,
                    info: "Successfully found required activity",
                    activity: activity[0]
                })
            })
        } catch(err){
            res.status(400).json({
                success: false,
                info: err.message,
                activity: null
            })
        }
    },

    activityCreateId: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const data = req.body;
            Activity.create(data, async function (db_err, db_response) {
                if(db_err) {
                    res.status(401).json({
                        success: false,
                        info: "Database error Adding the activity was unsuccessful."+db_err.message
                    });
                    next();
                }
                else if (err){
                    return res.status(500).json({
                        success:false,
                        info: err
                    });
                }
                else if (!user) {
                    return res.status(401).json({
                        success: false,
                        user: user,
                        info: info.message
                    });
                }
                else {
                    await User.updateOne(
                        { _id: user.id},
                        {$addToSet: {my_activities: db_response.id}});
                    res.json({
                        success: true,
                        info: "Activity added successfully",
                        activity: {id: db_response.id}
                    })
                }
            });
        })(req, res, next);
    },

    attendActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const activityId = req.params.id;
            const userId = user.id;
            Activity.findOneAndUpdate({_id: activityId},
                {$addToSet: {attendance_list: userId}},
                null, function (db_err, db_response) {
                if(db_err) {
                    res.status(500);
                    res.json({
                        success: false,
                        info: "Database error. \n"+db_err,
                    });
                    next();
                }
                else if (err){
                    return res.status(500).json({
                        success:false,
                        info: err
                    });
                }
                else if (!user) {
                    return res.status(401).json({
                        success: false,
                        user: user,
                        info: info.message
                    });
                }

                else if (db_response == null){
                    res.status(404).json({
                        success: false,
                        info: "Activity with that Id does not exits",
                        activity: null
                    })
                }
                else {
                    res.json({
                        success: true,
                        info: "Activity successfully attended.",
                        activity: {id: activityId}
                    })
                }
            })
        })(req, res, next);
    },

    unattendActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const activityId = req.params.id;
            const userId = user.id;
            Activity.updateOne({_id: activityId},
                {$pullAll: {attendance_list: [userId]}},
                null, function (db_err, db_response) {
                    if(db_err) {
                        res.status(500);
                        res.json({
                            success: false,
                            info: "Database error. \n"+db_err,
                        });
                        next();
                    }
                    else if (err){
                        return res.status(500).json({
                            success:false,
                            info: err
                        });
                    }
                    else if (!user) {
                        return res.status(401).json({
                            success: false,
                            user: user,
                            info: info.message
                        });
                    }

                    else if (db_response == null){
                        res.status(404).json({
                            success: false,
                            info: "Activity with that Id does not exits",
                            activity: null
                        })
                    }
                    else {
                        res.json({
                            success: true,
                            info: "Activity successfully unattended.",
                            activity: {id: activityId}
                        })
                    }
                })
        })(req, res, next);
    }, 

    sortByCategory: async (req, res, next) => {
        try{
            await Activity.find({category: req.params.category.toUpperCase()}, function(err, activities) {
                if(err) {
                    res.json({
                        success: false,
                        info: 'something went really wrong!'
                    });
                    next();
                }
                res.json({
                    success: true,
                    info: "Successfully retrieved all activities",
                    activities: activities
                });
            });
        } catch(err){
            res.status(400).json({
            success: false,
            info: err.message,
            activity: null
            })
        }
    },
}