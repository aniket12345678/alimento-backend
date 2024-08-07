const Joi = require("joi");

const validateCategory = {
    delete: Joi.object({
        id: Joi.number().required(),
    }),
    add: Joi.object({
        data: Joi.string().required(),
    }),
    update: Joi.object({
        data: Joi.string().required(),
        attachments: Joi.optional(),
    }),
    findAll: Joi.object({
        data: Joi.string().required(),
        attachments: Joi.optional(),
    })
}

const validateAuth = {
    user: {
        signIn: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
        signUp: Joi.object({
            data: Joi.string().required(),
        })
    },
    admin: {
        signIn: Joi.object({
            id: Joi.number().required(),
        }),
        signUp: Joi.object({
            data: Joi.string().required(),
        })
    },
}

module.exports = { validateCategory, validateAuth }