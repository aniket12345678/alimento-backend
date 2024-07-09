const { Schema } = require('mongoose');

const Users_model = new Schema({
    id: {
        type: Number,
        required: true,
    },
    user_id: {
        // type: Number,
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user_cred'
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

module.exports = { Users_model }