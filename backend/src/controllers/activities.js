const JWT = require('jsonwebtoken');
const User = require('../models/users');
const Activity = require('../models/activities');
const { JWT_SECRET } = require('../configuration');
const passport = require('passport');

const ObjectId = require('mongoose').Types.ObjectId;


module.exports = {

    activities: async (req, res , next) => {
        let currentTime = new Date();
        await Activity.find({activity_datetime: {$gte: currentTime}}, null,{sort: {activity_datetime: 1}},
            function(err, activities) {
            console.log("Returned a total of " +activities.length+" activities");
            console.log("Activities must be after"+ currentTime);
            if(err) {
                res.status(500).json({
                    success: false,
                    info: 'something went really wrong! '+err.message,
                    activities: null
                });
                next();
            }
            else {
                res.status(200).json({
                    success: true,
                    info: "Successfully retrieved all current activities",
                    activities: activities
                });
            }
        });   
    },

    activityId: async (req, res, next) => {
        try {
            const testId = new ObjectId(req.params.id);
            if (testId.toString() != (req.params.id).toString()){
                res.status(400).json({
                    success: false,
                    info: "Invalid Id provided",
                    activity: null
                })
            }
            const query = {_id: new ObjectId(req.params.id)};
            await Activity.find(query, function (err, activity) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        info: "Something went terribly wrong. "+err.message,
                        activity: null
                    });
                    next();
                }else if (activity.length < 1 ){
                    res.status(404).json({
                        success: true,
                        info: "Activity with that Id was not found",
                        activity: null
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        info: "Successfully found required activity",
                        activity: activity[0]
                    })
                }
            })
        } catch(err){
            res.status(500).json({
                success: false,
                info: err.message,
                activity: null
            })
        }
    },

    activityCreateId: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    info: "User not found. " + info.message,
                    activity: null
                });
            }
            else{
                try {
                    const data = {
                        activity_datetime: req.body.activity_datetime,
                        category: req.body.category,
                        description: req.body.description,
                        max_attendance: req.body.max_attendance,
                        title: req.body.title,
                        location: req.body.location
                    };
                    Activity.create(data, async function (db_err, db_response) {
                        if (db_err) {
                            res.status(400).json({
                                success: false,
                                info: "Database error Adding the activity was unsuccessful. " + db_err.message,
                                activity: null
                            });
                            next();
                        } else if (err) {
                            return res.status(500).json({
                                success: false,
                                info: err,
                                activity: null
                            });
                        } else {
                            await User.updateOne(
                                {_id: user.id},
                                {$addToSet: {my_activities: db_response.id}});
                            res.status(200).json({
                                success: true,
                                info: "Activity added successfully",
                                activity: {id: db_response.id}
                            })
                        }
                    });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        info: error+" "+info,
                        activity: null
                    })
                }
            }
        })(req, res, next);
    },

    attendActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    user: user,
                    info: info.message
                });
            }
            else {
                try{
                const activityId = req.params.id;
                const userId = user.id;
                Activity.findOneAndUpdate({_id: activityId},
                    {$addToSet: {attendance_list: userId}},
                    null, function (db_err, db_response) {
                        if (db_err) {
                            res.status(500);
                            res.json({
                                success: false,
                                info: "Database error. \n" + db_err,
                            });
                            next();
                        } else if (err) {
                            return res.status(500).json({
                                success: false,
                                info: err
                            });
                        }
                        else if (db_response == null) {
                            res.status(404).json({
                                success: false,
                                info: "Activity with that Id does not exits",
                                activity: null
                            })
                        } else {
                            res.status(200).json({
                                success: true,
                                info: "Activity successfully attended.",
                                activity: {id: activityId}
                            })
                        }
                    })
                }catch (error){
                    res.status(500).json({
                        success: false,
                        info: error,
                        activity: null
                    })
                }
            }
        })(req, res, next);
    },

    unattendActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    user: user,
                    info: info.message
                });
            }
            else {
                try {
                    const activityId = req.params.id;
                    const userId = user.id;
                    Activity.updateOne({_id: activityId},
                        {$pullAll: {attendance_list: [userId]}},
                        null, function (db_err, db_response) {
                            if (db_err) {
                                res.status(500);
                                res.json({
                                    success: false,
                                    info: "Database error. \n" + db_err,
                                });
                                next();
                            } else if (err) {
                                return res.status(500).json({
                                    success: false,
                                    info: err
                                });
                            } else if (db_response == null) {
                                res.status(404).json({
                                    success: false,
                                    info: "Activity with that Id does not exits",
                                    activity: null
                                })
                            } else {
                                res.status(200).json({
                                    success: true,
                                    info: "Activity successfully unattended.",
                                    activity: {id: activityId}
                                })
                            }
                        })
                } catch (error){
                    res.status(500).json({
                        success: false,
                        info: error,
                        activity: null
                    })
                }
            }
        })(req, res, next);
    }, 

    sortByCategory: async (req, res, next) => {
        try{
            await Activity.find({category: req.params.category.toUpperCase()}, function(err, activities) {
                if(err) {
                    res.status(400).json({
                        success: false,
                        info: 'Something went really wrong when searching the database. '+err.message,
                        activities: null
                    });
                    next();
                }
                else {
                    res.json({
                        success: true,
                        info: "Successfully retrieved all activities.",
                        activities: activities
                    });
                }
            });
        } catch(err){
            res.status(500).json({
                success: false,
                info: err,
                activities: null
            })
        }
    },
}