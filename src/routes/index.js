import { Router } from 'express';

import authRouter from './auth';
import utils from '../utils/helpers';

const {
  jsonResponse: { sendSuccess },
} = utils;

const routes = Router();

routes.get('/', (req, res) =>
  sendSuccess(res, 200, 'Welcome to Optilyz API version 1'),
);

routes.use('/accounts', authRouter);

export default routes;
