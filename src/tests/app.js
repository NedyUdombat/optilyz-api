import request from 'supertest';
import app from '../app';

export const appTests = () => {
  describe('Optilyz API tests (with jest)', () => {
    it('refers you to the versioned route', async done => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(
        'Welcome to Optilyz API, please visit /api/v1',
      );
      done();
    });

    it('shows a 404 JSON error without stack trace', async done => {
      const response = await request(app).get('/path/to/nowhere');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('A beast ate this page...');
      done();
    });

    it('starts and shows the index route', async done => {
      const response = await request(app).get('/api/v1');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Welcome to Optilyz API version 1');
      done();
    });
  });
};
