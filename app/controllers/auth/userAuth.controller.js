require('dotenv').config();

const { fetchAutoincrementKey } = require("../../enum/commonFunctions");
const { emailVerificationMail } = require('../../enum/mail');
const { UsersCred, Users } = require("../../models/index.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSignup = async (req, res) => {
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
            store.user_id = response['_id'];

            await Users.create(store);

            return res.status(200).send({
                message: 'User created successfully',
                code: 200
            });
        }
    } catch (error) {
        console.log('error:- ', error);
        return res.status(500).send({
            message: 'Facing some technical issue during userSignup',
            code: 500
        });
    }
};

const userSignin = async (req, res) => {
    try {
        const store = req.body;
        const checkEmail = await UsersCred.findOne({ email: store.email });
        if (checkEmail) {
            const checkPassword = bcrypt.compareSync(store.password, checkEmail.password);
            if (checkPassword) {
                if (checkEmail.is_email_verification) {
                    const token = jwt.sign({ checkEmail }, process.env.JWTKEY);
                    return res.status(200).send({
                        message: 'Successfully logged in',
                        user_id: checkEmail.id,
                        auth_token: token,
                        code: 200
                    });
                } else {
                    return res.status(200).send({
                        message: 'Email verification is pending',
                        code: 600
                    });
                }
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
            message: 'Facing some technical issue during userSignup',
            code: 500
        });
    }
};

const userEmailVerify = async (req, res) => {
    try {
        console.log('req.body:- ', req.body);
        return false;
        const store = req.body;
        const checkEmail = await UsersCred.findOne({ email: store.email });
        if (checkEmail) {
            emailVerificationMail(checkEmail.email);
            return res.status(200).send({
                message: 'Successfully logged in',
                user_id: checkEmail.id,
                auth_token: token,
                code: 200
            });
        } else {
            return res.status(200).send({
                message: 'User does not exist',
                code: 500
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Facing some technical issue during userSignup',
            code: 500
        });
    }
};

module.exports = { userSignin, userSignup, userEmailVerify }