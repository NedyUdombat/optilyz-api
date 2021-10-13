import mongoose from 'mongoose';

import app from '../app';
import config from '../configs/variables';
import { appTests } from './app';
import { authTests } from './auth';
import { utilityTests } from './utils';

describe('All Tests', () => {
  let server;

  beforeAll(done => {
    server = app.listen(config.PORT);
    server.once('listening', () => {
      done();
    });
  });

  afterAll(done => {
    mongoose.disconnect();
    server.close(done);
  });

  jest.setTimeout(15000);

  describe('App', appTests);
  describe('Auth', authTests);
  describe('Utility', utilityTests);
});
