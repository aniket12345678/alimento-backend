const { Schema } = require('mongoose');

const Categories_mdodel = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = { Categories_mdodel }