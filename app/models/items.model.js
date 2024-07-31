const { Schema } = require('mongoose');

const ItemsModel = new Schema({
    id: {
        type: Number,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    item_img: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = { ItemsModel }