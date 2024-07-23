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
    }),
}

module.exports = { validateCategory }