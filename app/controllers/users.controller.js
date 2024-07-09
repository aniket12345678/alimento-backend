const { UsersCred, Users } = require("../models/index.model");

const add = (req, res) => {
    console.log('this is an add function');
    console.log('req.body:- ', req.body);
};

const findAll = async (req, res) => {
    try {
        const response = await UsersCred.find({ user_role: 2 });
        const allIds = response.map((x) => x.id);
        const allUsers = await Users.find({ user_id: { $in: allIds } }).populate('user_id');
        return res.status(200).send({
            code: 200,
            data: allUsers
        });
    } catch (err) {
        console.log('err:- ', err);
    }
};

const findOne = (req, res) => {
    console.log('this is a findone function');
    console.log('req.body:- ', req.body);
};

module.exports = { add, findAll, findOne };