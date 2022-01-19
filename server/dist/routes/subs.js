"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middleware/checkAuth");
const stripe_1 = require("../utils/stripe");
const router = express_1.default.Router();
router.get('/prices', checkAuth_1.checkAuth, async (_req, res) => {
    const prices = await stripe_1.stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY,
    });
    return res.send(prices);
});
router.post('/session', checkAuth_1.checkAuth, async (req, res) => {
    const session = await stripe_1.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: req.body.priceId, quantity: 1 }],
        success_url: 'http://localhost:3000/articles',
        cancel_url: 'http://localhost:3000/articles-plans',
    }, {
        apiKey: process.env.STRIPE_SECRET_KEY,
    });
});
exports.default = router;
//# sourceMappingURL=subs.js.map