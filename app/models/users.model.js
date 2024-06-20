const { Schema } = require('mongoose');

const Users_model = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = { Users_model }