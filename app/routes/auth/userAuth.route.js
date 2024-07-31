const { userSignin, userSignup } = require('../../controllers/auth/userAuth.controller');

const userAuth = require('express')();

userAuth.post('/signin', userSignin);
userAuth.post('/signup', userSignup);

module.exports = { userAuth };