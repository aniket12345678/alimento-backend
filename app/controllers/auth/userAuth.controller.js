require('dotenv').config();

const { randomCodeGenerator } = require("../../enum/commonFunctions");
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

            const response = await UsersCred.create(store);
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
        const store = req.body;
        const checkEmail = await UsersCred.findOne({ email: store.email });
        if (checkEmail) {
            if (checkEmail.is_email_verification) {
                return res.status(200).send({
                    message: 'Your email is already verified',
                    code: 500
                });
            }
            let randomCode = randomCodeGenerator(6);
            let verifyURL = `${process.env.FRONT_END_URL}confirm/email/${checkEmail['_id']}/${randomCode}`;
            await UsersCred.updateOne({ email: store.email }, { email_verification_code: randomCode });
            emailVerificationMail(checkEmail.email, verifyURL);
            return res.status(200).send({
                message: 'Check your mail',
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

const userConfirmEmail = async (req, res) => {
    try {
        const { code, user_id } = req.body;

        const checkUserExists = await UsersCred.findOne({
            email_verification_code: code,
            _id: user_id,
        });
        if (checkUserExists) {
            if (checkUserExists.is_email_verification) {
                return res.status(200).send({
                    message: 'Your email has already verified',
                    code: 200
                });
            } else {
                await UsersCred.updateOne({
                    _id: user_id,
                }, {
                    is_email_verification: true,
                    email_verification_code: ''
                });
                return res.status(200).send({
                    message: 'Your email has been verified',
                    code: 200
                });
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

module.exports = { userSignin, userSignup, userEmailVerify, userConfirmEmail }