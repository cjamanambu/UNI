const Joi = require('joi');
module.exports = {
    validateBody: (schema) => {
        return(req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            }
            //req.value.body instead of req.body
            //reason being this is a validated body
            if(!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        authSchema: Joi.object().keys(),
            username: Joi.string().required(),
            email: Joi.string().email().regex(/myumanitoba\.ca$/).required(),
            password: Joi.string().required()
     },

    activitySchema: {
            authSchema: Joi.object().keys(),
                activity_datetime: Joi.date().iso().required(),
                location: Joi.string().required(),
                attendance_list: Joi.array().required(),
                category: Joi.string().required(),
                description: Joi.string().required(),
                max_attendance: Joi.number().integer(),
                title: Joi.string().required(),
    }
}