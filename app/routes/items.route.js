const items_route = require('express')();

const { add } = require('../controllers/items.controller');

items_route.post('/add', add);

module.exports = { items_route }