import request from 'supertest';
import app from '../app';

import { deleteUsers } from './test-utils';
import {
  user,
  nonExistentUser,
  userWithoutName,
  userWithoutEmail,
  userWithoutPassword,
} from './mockData/user';

let token = '';
let userToken = '';
let userId = '';
export const authTests = () => {
  describe('User Module Registration & Authentication & Password Block', () => {
    beforeAll(async () => {
      jest.setTimeout(15000);
      await deleteUsers();
    });

    it('should return an object of a registered user', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/register')
        .send(user);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Your account has been successfully created.',
      );
      expect(response.body).toHaveProperty('user');
      expect(typeof response.body.user).toBe('object');
      expect(response.body.user.name).toEqual(user.name);
      expect(response.body.user.email).toEqual(user.email);
      expect(response.body.user.hasOwnProperty('password')).toEqual(false);
      done();
    });

    it('should return a duplicate error if user already exists', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/register')
        .send(user);

      expect(response.statusCode).toBe(409);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('This user already exists.');
      done();
    });

    it('should return a validation error is a required property name is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/register')
        .send(userWithoutName);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid full name is required',
      ]);
      done();
    });

    it('should return a validation error is a required property email is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/register')
        .send(userWithoutEmail);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid email is required',
      ]);
      done();
    });

    it('should return a validation error is a required property password is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/register')
        .send(userWithoutPassword);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid password is required',
      ]);
      done();
    });

    it('should return an object of an authenticated user', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/authenticate')
        .send(user);

      userToken = response.body.token;
      userId = response.body.user._id;

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successfully Logged In');
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body).toHaveProperty('user');
      expect(typeof response.body.user).toBe('object');
      expect(response.body.user.fullname).toEqual(user.fullname);
      expect(response.body.user.email).toEqual(user.email);
      expect(response.body.user.hasOwnProperty('password')).toEqual(false);
      done();
    });

    it('should return a not found error if user does not exist', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/authenticate')
        .send(nonExistentUser);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual(
        'This user does not exist, please create an account',
      );
      done();
    });

    it('should return an unathorized error if passsword is incorrect', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/authenticate')
        .send({
          ...user,
          password: 'wrongpassword',
        });

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Password is incorrect');
      done();
    });

    it('should return a validation error is a required property email is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/authenticate')
        .send(userWithoutEmail);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid email is required',
      ]);
      done();
    });

    it('should return a validation error is a required property password is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/authenticate')
        .send(userWithoutPassword);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid password is required',
      ]);
      done();
    });
  });
};
