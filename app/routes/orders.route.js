const ordersRoute = require('express')();
const { verifyToken, joiMiddleware } = require('../enum/commonFunctions');
const { createPaymentIntent } = require('../controllers/order.controller');
const { validateOrder } = require('../validationSchema/schema');

ordersRoute.post(
    '/create-payment-intent',
    [
        joiMiddleware(validateOrder.createPaymetIntent),
        verifyToken
    ],
    createPaymentIntent
);

module.exports = { ordersRoute };