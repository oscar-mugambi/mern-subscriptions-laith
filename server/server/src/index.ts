import express from 'express';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('hello world');
});

app.listen(4000, () => {
  console.log('running on port 4000');
});
