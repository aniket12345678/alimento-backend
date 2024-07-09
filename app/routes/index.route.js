const allRoutes = require('express')();

const { auth_route } = require('./auth.route');
const { categories_route } = require('./categories.route');
const { items_route } = require('./items.route');
const { users_route } = require('./users.route');


allRoutes.use('/categories', categories_route);
allRoutes.use('/items', items_route);
allRoutes.use('/users', users_route);
allRoutes.use('/auth', auth_route);

module.exports = { allRoutes }