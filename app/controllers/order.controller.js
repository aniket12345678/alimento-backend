const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { totalAmount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'INR',
            amount: totalAmount,
            automatic_payment_methods: { enabled: true },
            description: "for amazon-clone project",
            shipping: {
                name: "Random singh",
                address: {
                    line1: "510 Townsend St",
                    postal_code: "98140",
                    city: "San Francisco",
                    state: "CA",
                    country: "US",
                },
            },
        });

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