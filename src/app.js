import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import volleyball from 'volleyball';

import utils from './utils/helpers';
import variables from './configs/variables';

const app = express();

const {
  jsonResponse: { sendSuccess, sendError },
} = utils;

const connectDB = async () => {
  try {
    mongoose.connect(variables.DATABASE_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection error: ', error);
  }
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(volleyball);
connectDB();

app.get('/', (req, res) =>
  sendSuccess(res, 200, 'Welcome to Optilyz API, please visit /api/v1'),
);

app.all('*', (req, res) => sendError(res, 404, 'A beast ate this page...'));

export default app;
