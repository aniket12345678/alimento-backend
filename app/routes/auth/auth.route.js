const auth_route = require('express')();

const { signin, signup } = require('../../controllers/auth.controller');

auth_route.post('/signin', signin);
auth_route.post('/signup', signup);

module.exports = { auth_route };