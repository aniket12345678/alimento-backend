const { userSignin, userSignup, userEmailVerify } = require('../../controllers/auth/userAuth.controller');
const { joiMiddleware } = require('../../enum/commonFunctions');
const { validateAuth } = require('../../validationSchema/schema');

const userAuth = require('express')();

userAuth.post('/signin', [joiMiddleware(validateAuth.user.signIn)], userSignin);
userAuth.post('/signup', [joiMiddleware(validateAuth.user.signUp)], userSignup);
userAuth.post('/email-verify', userEmailVerify);

module.exports = { userAuth };