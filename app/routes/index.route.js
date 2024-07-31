const allRoutes = require('express')();

const { adminAuth } = require('./auth/adminAuth.route');
const { userAuth } = require('./auth/userAuth.route');
const { items_route } = require('./items.route');
const { users_route } = require('./users.route');
const { categories_route } = require('./categories.route');


allRoutes.use('/categories', categories_route);
allRoutes.use('/items', items_route);
allRoutes.use('/users', users_route);
allRoutes.use('/admin/auth', adminAuth);
allRoutes.use('/user/auth', userAuth);

module.exports = { allRoutes }