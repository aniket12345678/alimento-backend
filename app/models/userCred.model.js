const { Schema } = require('mongoose');

const UsersCredModel = new Schema({
    user_role: {
        type: Number, //1 - admin, 2 - user
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_email_verification: {
        type: Boolean,
        default: false
    },
    email_verification_code: {
        type: String,
        default: null
    }
});

module.exports = { UsersCredModel }