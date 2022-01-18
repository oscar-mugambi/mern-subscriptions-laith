import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }

  token = token.split(' ')[1];

  try {
    const user = (await jwt.verify(token, process.env.JWT_SECRET as string)) as { email: string };
    if (!user) {
      return res.status(403).json({
        errors: [
          {
            msg: 'unauthorized',
          },
        ],
      });
    }

    req.user = user.email;

    next();
    return;
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }
};
