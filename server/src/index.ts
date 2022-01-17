import express from 'express';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('connected to mongo db');
  })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use('/auth', authRoutes);
    app.get('/', (_req, res) => {
      res.send('hello world');
    });
    app.listen(4000, () => {
      console.log('running on port 4000');
    });
  })
  .catch((err) => {
    throw err;
  });
