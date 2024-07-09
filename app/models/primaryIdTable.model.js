const { Schema } = require("mongoose");

const PrimaryIdTable_model = new Schema({
    id: {
        type: Number,
        required: true
    },
    table_name: {
        type: String,
        required: true
    }
})

module.exports = { PrimaryIdTable_model }