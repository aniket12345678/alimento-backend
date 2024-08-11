const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { totalAmount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: totalAmount,
            automatic_payment_methods: { enabled: true }
        });

        console.log('paymentIntent:- ', paymentIntent);

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
}

module.exports = { createPaymentIntent }