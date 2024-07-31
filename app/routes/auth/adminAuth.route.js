const adminAuth = require('express')();

const { adminSignIn, adminSignUp } = require('../../controllers/auth/adminAuth.controller');

adminAuth.post('/signin', adminSignIn);
adminAuth.post('/signup', adminSignUp);

module.exports = { adminAuth };