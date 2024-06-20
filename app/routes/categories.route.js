const categories_route = require('express')();

const { add, findAll, findOne } = require('../controllers/categories.controller');

categories_route.get('/add', add);
categories_route.get('/find/all', findAll);
categories_route.get('/find/one', findOne);
categories_route.get('/delete', findOne);

module.exports = { categories_route };