import express from 'express';
import cors from 'cors';
import volleyball from 'volleyball';

import utils from './utils/helpers';

const app = express();

const {
  jsonResponse: { sendSuccess, sendError },
} = utils;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(volleyball);

app.get('/', (req, res) =>
  sendSuccess(res, 200, 'Welcome to Optilyz API, please visit /api/v1'),
);

app.all('*', (req, res) => sendError(res, 404, 'A beast ate this page...'));

export default app;
