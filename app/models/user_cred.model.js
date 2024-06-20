const { Schema } = require('mongoose');

const UsersCred_model = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = { UsersCred_model }