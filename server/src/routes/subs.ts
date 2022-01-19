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

export default router;
