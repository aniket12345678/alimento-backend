const allRoutes = require('express')();

const { adminAuth } = require('./auth/adminAuth.route');
const { userAuth } = require('./auth/userAuth.route');
const { itemsRoute } = require('./items.route');
const { users_route } = require('./users.route');
const { categoriesRoute } = require('./categories.route');
const { ordersRoute } = require('./orders.route');


allRoutes.use('/categories', categoriesRoute);
allRoutes.use('/orders', ordersRoute);
allRoutes.use('/items', itemsRoute);
allRoutes.use('/users', users_route);
allRoutes.use('/admin/auth', adminAuth);
allRoutes.use('/user/auth', userAuth);

module.exports = { allRoutes }