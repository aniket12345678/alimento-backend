const mongoose = require('mongoose');

const newConnection = async () => {
    let output = await mongoose.connect('mongodb://0.0.0.0:27017/db_food');
    return output;
}
module.exports = {newConnection}
