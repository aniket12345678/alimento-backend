const { Schema } = require('mongoose');

const UsersModel = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user_cred'
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    address: {
        type: BigInt,
        required: false
    },
    phone_number: {
        type: BigInt,
        required: false
    }
});

module.exports = { UsersModel }