import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv'
import path from 'path';
dotenv.config({ path: './.env' });
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);


const router = express.Router();

console.log(process.env.BACKEND_URL);


router.post('/create-checkout-session', async (req, res) => {

    try {
        const body = req.body.body;
        const { products } = JSON.parse(body);



        const lineItems = products.map((product) => (
            {

                price_data: {
                    currency: "cad",
                    product_data: {
                        name: product.name.toUpperCase(),
                        // path doesn't work image doesn't display will try hosting images on firebase
                        images: [`${product.image}`]
                    },
                    unit_amount: Math.round(product.price.orgPrice * 100)
                },
                quantity: product.quantity
            }
        ))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
        })

        console.log(session);
        res.json({ id: session.id });
    } catch (error) {

    }

})




export default router;