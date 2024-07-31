require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { fetchAutoincrementKey } = require('../../enum/commonFunctions');
const { UsersCred, Users } = require('../../models/index.model');

const adminSignUp = async (req, res) => {
    try {
        const store = req.body;
        const findUserRecord = await UsersCred.countDocuments({ email: store.email });

        if (findUserRecord > 0) {
            return res.status(200).send({
                message: 'User already exist',
                code: 400
            })
        } else {
            store.password = bcrypt.hashSync(store.password, 10);

            const userCredAutoIncrementId = await fetchAutoincrementKey('user_cred');
            store.id = userCredAutoIncrementId;

            const response = await UsersCred.create(store);

            const userAutoIncrementId = await fetchAutoincrementKey('users');
            store.id = userAutoIncrementId;
            store.user_id = response.id;

            await Users.create(store);

            return res.status(200).send({
                message: 'User created successfully',
                code: 200
            });
        }

    } catch (error) {
        return res.status(500).send({
            message: 'Facing some technical issue during adminSignup',
            code: 500
        });
    }
};

const adminSignIn = async (req, res) => {
    try {
        const store = req.body;
        const checkEmail = await UsersCred.findOne({ email: store.email });
        if (checkEmail) {
            const checkPassword = bcrypt.compareSync(store.password, checkEmail.password);
            if (checkPassword) {
                const token = jwt.sign({ checkEmail }, process.env.JWTKEY);
                return res.status(200).send({
                    message: 'Successfully logged in',
                    user_id: checkEmail.id,
                    auth_token: token,
                    code: 200
                });
            } else {
                return res.status(200).send({
                    message: 'Password is incorrect',
                    code: 400
                })
            }
        } else {
            return res.status(200).send({
                message: 'User does not exist',
                code: 500
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Facing some technical issue during adminSignup',
            code: 500
        });
    }
};

module.exports = { adminSignIn, adminSignUp }