const { Schema } = require('mongoose');

const Categories_mdodel = new Schema({
    id: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    category_img: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = { Categories_mdodel }