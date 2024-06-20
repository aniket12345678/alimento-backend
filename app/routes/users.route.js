const users_route = require('express')();

const { add, findAll, findOne } = require('../controllers/users.controller');

users_route.get('/add', add);
users_route.get('/find/all', findAll);
users_route.get('/find/one', findOne);

module.exports = { users_route };