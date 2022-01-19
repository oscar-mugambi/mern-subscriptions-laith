import express from 'express';
// import dotenv from 'dotenv';
import { checkAuth } from '../middleware/checkAuth';
import { stripe } from '../utils/stripe';

const router = express.Router();

router.get('/prices', checkAuth, async (_req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.send(prices);
});

router.post('/session', checkAuth, async (req, res) => {
  const session = await stripe.checkout.sessions.create(
    {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: req.body.priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/articles',
      cancel_url: 'http://localhost:3000/articles-plans',
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
});

export default router;
