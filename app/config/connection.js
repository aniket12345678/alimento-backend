const mongoose = require('mongoose');

const newConnection = async () => {
    let output = await mongoose.connect(process.env.CONNECTION_STRING);
    return output;
}
module.exports = { newConnection }
