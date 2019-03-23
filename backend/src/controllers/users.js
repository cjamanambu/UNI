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

    secret: async (req, res , next) => {
         passport.authenticate('jwt', {session: false}, (err, user, info) => {
             if (err){
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
             }else{
                 return res.status(200).json({
                     success: true,
                     secret: "resource"});
             }
         })(req, res, next);
    },

     userAttendingActivities: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const data = req.body;
            const userId = user.id;
            const query = { attendance_list: { $all: [userId] } };

            Activity.find(query, async function (db_err, activities) {
                if(db_err) {
                    res.json({
                        success: false,
                        info: "Could not find the user's activities."
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
                    res.json({
                        success: true,
                        info: "Found activities that the user is interested in...",
                        activities: activities
                        // activity: {id: db_response.id}
                    });
                }
            });
        })(req, res, next);
    },
    attendanceList: async (req, res, next) => {
        try {
            const query = {_id: new ObjectId(req.params.id)};
            //const query = { attendance_list: { $all: [] } };

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
                    info: "Successfully found attendance list of required activity",
                    attendanceList: activity[0].attendance_list
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

    deleteMyActivity: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const data = req.body;
            const activityId = req.params.id;
            console.log("\n\nMy activity id is:" + activityId);
            // look for the activity by id
            Activity.find({_id: activityId}, async function (db_err, db_response) {
                if(db_err) {
                    res.json({
                        success: false,
                        info: "Database error deleting the activity."
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
                    // delete the activity
                    await Activity.remove({_id: activityId});
                    res.json({
                        success: true,
                        info: "Activity removed successfully"
                    })
                }
            });
        })(req, res, next);
    },

    myActivities: async (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const userActivities = user.my_activities;
            let actualActivityIds = userActivities.map(s =>ObjectId(s));

            Activity.find({_id:{$in: actualActivityIds}}, async function (db_err, db_response) {
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
                        my_activities: db_response
                    })
                }

            })
        })(req, res, next);
    },

    creatorInformation: async(req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            const activityId = req.params.activityId;

            User.find({my_activities: activityId}, async function (db_err, db_response) {
                if (db_err){
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
        })(req, res, next)
    }
}
