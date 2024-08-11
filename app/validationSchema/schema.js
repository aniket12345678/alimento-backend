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
            user_role: Joi.number().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            phone_number: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            confirm_password: Joi.string().required(),
            conditions: Joi.boolean().required(),
        }),
        emailVerify: Joi.object({
            email: Joi.string().required()
        }),
        confirmEmailVerify: Joi.object({
            code: Joi.string().required(),
            user_id: Joi.string().required()
        }),
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

const validateOrder = {
    createPaymetIntent: Joi.object({
        totalAmount: Joi.number().required(),
    }),
}

module.exports = { validateCategory, validateAuth, validateOrder }