const {
    userSignin, userSignup,
    userEmailVerify, userConfirmEmail
} = require('../../controllers/auth/userAuth.controller');
const { joiMiddleware } = require('../../enum/commonFunctions');
const { validateAuth } = require('../../validationSchema/schema');

const userAuth = require('express')();

userAuth.post(
    '/signin',
    [joiMiddleware(validateAuth.user.signIn)],
    userSignin
);
userAuth.post(
    '/signup',
    [joiMiddleware(validateAuth.user.signUp)],
    userSignup
);
userAuth.post(
    '/email-verify',
    [joiMiddleware(validateAuth.user.emailVerify)],
    userEmailVerify
);
userAuth.post(
    '/confirm/email',
    [joiMiddleware(validateAuth.user.confirmEmailVerify)],
    userConfirmEmail
);

module.exports = { userAuth };