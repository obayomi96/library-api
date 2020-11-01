import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import volleyball from 'volleyball';

import config from './config';
import routes from './routes';

const app = express();

const connectDB = async () => {
  try {
    mongoose.connect(config.DATABASE_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection error: ', error);
  }
};

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(volleyball); // Log requests to the console.
connectDB();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Books, please visit /api/v1',
  });
});

app.use('/api/v1', routes);

app.all('*', (req, res) =>
  res.status(404).json({
    message: 'A beast ate this page...',
  }),
);

export default app;
