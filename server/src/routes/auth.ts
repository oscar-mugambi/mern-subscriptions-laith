import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',
  body('email').isEmail().withMessage('The email is invalid'),
  body('password')
    .isLength({
      min: 5,
    })
    .withMessage('The password is too short'),
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((err) => {
        return {
          message: err.msg,
        };
      });

      return res.json({ errors });
    }

    const { email, password } = req.body;

    res.json({
      email,
      password,
    });
    return;
  }
);

export default router;
