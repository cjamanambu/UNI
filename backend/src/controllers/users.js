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
}

module.exports = {
    //exports a username,  email and password from all new users
    signUp: async (req, res , next) => {
        
       const {username, email, password}= req.value.body;

        //check for users with the same email
        //check for users with the same email
        const foundUserName = await User.findOne({ username: username});
        const foundUserEmail = await User.findOne({ email: email});

        if(foundUserName && foundUserEmail) {
            return res.status(403).json({
                success: false,
                info: 'Username annd Email address already exist'});

        } else if(foundUserName) {
            return res.status(403).json({
                success: false,
                info: 'Select a new username, this username already exist'});
        } else if(foundUserEmail) {
            return res.status(403).json({
                success: false,
                info: 'Email address already exist'});
        } 

       //create new user if username and email is specific
       const newUser = new User({
           username: username,
           email: email,
           password: password
       });


       await newUser.save();

       //respond with token instead of json
       //generate the token
       const token = signToken(newUser);
       res.status(200).json({
            success: true,
            info: 'new user successfully created',
            token: token,
            user: {username, email}
        });
    },

    signIn: async (req, res , next) => {
        passport.authenticate('local', {session: false}, (err, user, info)=>{
            if (err){
                return res.status(500).json({
                   success:false,
                   info: err
                });
            }
            else if (!user){
                return res.status(400).json({
                    success: false,
                    info: info.message,
                    user   : null,
                });
            }else{
                //generate a token to validate
                const token = signToken(user);
                res.status(200).json({
                    token,
                    success: true,
                    user: { _id: user.id}
                });
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
                    info: info.message,
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
                            return res.status(400).json({
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
            const query = {_id: new ObjectId(req.params.id)};

            await Activity.find(query, function (err, activities) {

                const attendanceListIds = activities[0].attendance_list;
                let actualAttendanceListIds = attendanceListIds.map(s =>ObjectId(s));

                User.find({_id:{$in: actualAttendanceListIds}}, async function (db_err, users) {
                    var i;
                    var userList = [];
                    for (i = 0; i < users.length; i++)
                    {
                        userList[i] = {
                            Name:   users[i].username,
                            Email: users[i].email
                        };
                    }

                    if (db_err) {
                        res.status(500).json({
                            success: false,
                            info: "Database error occurred. "+db_err
                        });
                    }else if (err){
                        res.status(500).json({
                            success: false,
                            info: err
                        });
                    }else if (!user){
                        res.status(401).json({
                            success: false,
                            user: user,
                            info: info.message
                        });
                    }else{
                        // Return the details about the activity for the user
                        res.status(200).json({
                            success: true,
                            info: "Details of the user's activities sucessfully retrieved.",
                            users: userList
                        })
                    }

                })
            })
        })(req, res, next);
    },

    deleteMyActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    user: user,
                    info: info.message
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
                                info: "Details of the user's activities sucessfully retrieved.",
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
                                info: err,
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
}


