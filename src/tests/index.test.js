import mongoose from 'mongoose';

import app from '../app';
import config from '../configs/variables';
import { appTests } from './app';

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

  describe('App', appTests);
});
