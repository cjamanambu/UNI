const JWT = require('jsonwebtoken');
const User = require('../models/users');
const Activity = require('../models/activities');
const { JWT_SECRET } = require('../configuration');
const passport = require('passport');

const ObjectId = require('mongoose').Types.ObjectId;


signToken = user => {
    return JWT.sign({
        iss: 'UNI', //issuer
        sub: user.id, //subject
        iat: new Date().getTime(), //(issued at) current time
        exp: new Date().setDate(new Date().getDate() + 1) // ( expiry date) current time + 1 day
    }, JWT_SECRET);
};

module.exports = {
    //exports a username,  email and password from all new users
    signUp: async (req, res , next) => {

       try {
           const {username, email, password} = req.value.body;

           //check for users with the same email
           const foundUserName = await User.findOne({username: username});
           const foundUserEmail = await User.findOne({email: email});

           if (foundUserName && foundUserEmail) {
               return res.status(403).json({
                   success: false,
                   info: 'Username and Email address already exist',
                   token: null,
                   user: null
               });

           } else if (foundUserName) {
               return res.status(403).json({
                   success: false,
                   info: 'Select a new username, this username already exist',
                   token: null,
                   user: null
               });
           } else if (foundUserEmail) {
               return res.status(403).json({
                   success: false,
                   info: 'Email address already exist',
                   token: null,
                   user: null
               });
           }

           //create new user if username and email is unique
           const newUser = new User({
               username: username,
               email: email,
               password: password
           });

           await newUser.save();

           //Generate and send token
           const token = signToken(newUser);
           res.status(200).json({
               success: true,
               info: 'new user successfully created',
               token: token,
               user: {username, email}
           });
       } catch(err) {
           res.status(500).json({
               success: true,
               info: 'Error occured during signup process '+err,
               token: null,
               user: null
           });
       }
    },

    signIn: async (req, res , next) => {
        passport.authenticate('local', {session: false}, (err, user, info)=>{
            if (!user) {
                return res.status(401).json({
                    success: false,
                    info: "User not found "+info.message,
                    user: null,
                    token: null
                });
            }
            else if (err){
                return res.status(500).json({
                    success:false,
                    info: err,
                    token: null,
                    user: null
                });
            }
            else {
                try{
                    //generate a token to validate
                    const token = signToken(user);
                    res.status(200).json({
                        token: token,
                        success: true,
                        user: { _id: user.id}
                    });
                } catch (error) {
                    return res.status(500).json({
                        success:false,
                        info: err,
                        token: null,
                        user: null
                    });
                }

            }
        })(req, res, next);
    },

     userAttendingActivities: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const data = req.body;
            const userId = user.id;
            const query = { attendance_list: { $all: [userId] } };

            if (!user) {
                return res.status(401).json({
                    success: false,
                    info: "User not found "+info.message,
                    activities: null
                });
            }else{
                try {
                    Activity.find(query, async function (db_err, activities) {
                        if (db_err) {
                            res.status(400).json({
                                success: false,
                                info: "Could not find the user's activities.",
                                activities: null
                            });
                            next();
                        } else if (err) {
                            return res.status(500).json({
                                success: false,
                                info: err,
                                activities: null
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                info: "Found activities that the user is interested in...",
                                activities: activities
                            });
                        }
                    });
                }catch (err) {
                    res.status(500).json({
                        success: false,
                        info: err,
                        activities: null
                    });
                }
            }
        })(req, res, next);
    },


    attendanceList: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    info: "User authentication failed "+info.message,
                    users: null
                });
            }
            else {
                try {
                    const query = {_id: new ObjectId(req.params.id)};
                    await Activity.find(query, function (err, activities) {

                        const attendanceListIds = activities[0].attendance_list;
                        let actualAttendanceListIds = attendanceListIds.map(s => ObjectId(s));

                        User.find({_id: {$in: actualAttendanceListIds}}, async function (db_err, users) {
                            var i;
                            var userList = [];
                            for (i = 0; i < users.length; i++) {
                                userList[i] = {
                                    Name: users[i].username,
                                    Email: users[i].email
                                };
                            }

                            if (db_err) {
                                res.status(400).json({
                                    success: false,
                                    info: "Database error occurred. " + db_err,
                                    users: null
                                });
                            } else if (err) {
                                res.status(500).json({
                                    success: false,
                                    info: err,
                                    users: null
                                });
                            } else {
                                // Return the details about the activity for the user
                                res.status(200).json({
                                    success: true,
                                    info: "Details of the users attending the activity successfully retrieved.",
                                    users: userList
                                })
                            }

                        })
                    })
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        info: "Internal error occurred. " + error,
                        users: null
                    });
                }
            }
        })(req, res, next);
    },

    deleteMyActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    activity: null,
                    info: "User authentication failed" +info.message
                });
            } else {
                try {
                    const activityId = ObjectId(req.params.id);
                    // look for the activity by id
                    Activity.find({_id: activityId}, async function (db_err, db_response) {
                        if (db_err) {
                            res.status(400).json({
                                success: false,
                                info: "Database error deleting the activity. "+db_err,
                                activity: null
                            });
                            next();
                        } else if (err) {
                            return res.status(500).json({
                                success: false,
                                info: err,
                                activity: null
                            });
                        }else {
                            // delete the activity
                            await Activity.remove({_id: activityId},
                                async function(db_err, db_response_outer){
                                    if (db_err){
                                        res.status(400).json({
                                            success: false,
                                            info: "Database error deleting the activity. "+db_err,
                                            activity: null
                                        });
                                        next();
                                    } else{
                                        var userId = ObjectId(user.id);
                                        await User.updateOne({_id:userId},
                                            {$pull:{my_activities:activityId.toString()}},
                                            async function(db_err, db_response_inner){
                                                if (db_err){
                                                    res.status(500).json({
                                                        success: false,
                                                        info: "Activity removal unsuccessful.",
                                                        activity: null
                                                    });
                                                }else {
                                                    res.status(200).json({
                                                        success: true,
                                                        info: "Activity removed successfully.",
                                                        activity: db_response
                                                    });
                                                }
                                            })
                                    }
                            });
                        }
                    });
                }catch (err){
                    res.status(500).json({
                        success: false,
                        info: err,
                        activity: null
                    })
                }
            }
        })(req, res, next);
    },

    myActivities: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const userActivities = user.my_activities;
            let actualActivityIds = userActivities.map(s => ObjectId(s));

            if (!user) {
                res.status(401).json({
                    success: false,
                    info: info.message,
                    my_activities: null
                });
            } else {
                try {
                    Activity.find({_id: {$in: actualActivityIds}}, async function (db_err, db_response) {
                        if (db_err) {
                            res.status(400).json({
                                success: false,
                                info: "Database error occurred. " + db_err,
                                my_activities: null
                            });
                        } else if (err) {
                            res.status(500).json({
                                success: false,
                                info: err,
                                my_activities: null
                            });
                        } else {
                            // Return the details about the activity for the user
                            res.status(200).json({
                                success: true,
                                info: "Details of the user's activities successfully retrieved.",
                                my_activities: db_response
                            })
                        }
                    });
                }catch (err) {
                    res.status(500).json({
                        success:false,
                        info: err,
                        my_activities: null
                    })
                }
            }
        })(req, res, next);
    },

    creatorInformation: async(req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user){
                res.status(401).json({
                    success: false,
                    user: user,
                    owner: null
                });
            }else{
                try {
                    const activityId = req.params.activityId;
                    User.find({my_activities: activityId}, async function (db_err, db_response) {
                        if (db_err) {
                            res.status(400).json({
                                success: false,
                                info: "Database error occurred. " + db_err,
                                owner: null
                            });
                        } else if (err) {
                            res.status(500).json({
                                success: false,
                                info: err + info,
                                owner:null
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                info: "Details of the User who owns the specified activity retrieved.",
                                owner: {
                                    id: db_response[0].id,
                                    username: db_response[0].username,
                                    email: db_response[0].email
                                }
                            });
                        }
                    })
                }catch (err) {
                    res.status(500).json({
                        success: false,
                        info: err,
                        owner: null
                    })
                }
            }
        })(req, res, next)
    }
};