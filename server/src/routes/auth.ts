import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const User = require('../models/User');

dotenv.config();
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

      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.json({
        errors: { msg: 'Email already in use', data: null },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    );

    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
    });
    return;
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      errors: [{ msg: 'Invalid credentials' }],
      data: null,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      errors: [{ msg: 'Invalid credentials' }],
      data: null,
    });
  }

  const token = await jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000,
    }
  );

  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

export default router;
