import request from 'supertest';
import app from '../app';

import { deleteTasks, deleteUsers } from './test-utils';
import {
  task,
  anotherTask,
  taskWithoutTitle,
  taskWithoutDescription,
  taskWithoutDeadline,
  taskWithoutNotificationTime,
} from './mockData/task';
import { anotherUser } from './mockData/user';

export const taskTests = () => {
  let token = '';
  let taskId = '';

  describe('User Module Registration & Authentication & Password Block', () => {
    beforeAll(() => {
      jest.setTimeout(15000);
      deleteUsers();
    });

    it('should return an object of a registered user', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/register')
        .send(anotherUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Your account has been successfully created.',
      );
      expect(response.body).toHaveProperty('user');
      expect(typeof response.body.user).toBe('object');
      expect(response.body.user.name).toEqual(anotherUser.name);
      expect(response.body.user.email).toEqual(anotherUser.email);
      done();
    });

    it('should return an object of an authenticated user', async done => {
      const response = await request(app)
        .post('/api/v1/accounts/authenticate')
        .send(anotherUser);

      token = response.body.token;

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successfully Logged In');
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body).toHaveProperty('user');
      expect(typeof response.body.user).toBe('object');
      expect(response.body.user.name).toEqual(anotherUser.name);
      expect(response.body.user.email).toEqual(anotherUser.email);
      done();
    });
  });

  describe('Task Module Creation Block', () => {
    beforeAll(() => {
      jest.setTimeout(15000);
      deleteTasks();
    });

    it('should return an object of a created task', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(task);

      taskId = response.body.task._id;

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Your task has been successfully created.',
      );
      expect(response.body).toHaveProperty('task');
      expect(typeof response.body.task).toBe('object');
      expect(response.body.task.title).toEqual(task.title);
      expect(response.body.task.description).toEqual(task.description);
      expect(new Date(response.body.task.deadline)).toEqual(task.deadline);
      expect(new Date(response.body.task.notificationTime)).toEqual(
        task.notificationTime,
      );
      expect(typeof response.body.task.isCompleted).toEqual('boolean');
      done();
    });

    it('should return an object of another created task', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(anotherTask);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Your task has been successfully created.',
      );
      expect(response.body).toHaveProperty('task');
      expect(typeof response.body.task).toBe('object');
      expect(response.body.task.title).toEqual(anotherTask.title);
      expect(response.body.task.description).toEqual(anotherTask.description);
      expect(new Date(response.body.task.deadline)).toEqual(
        anotherTask.deadline,
      );
      expect(new Date(response.body.task.notificationTime)).toEqual(
        anotherTask.notificationTime,
      );
      expect(typeof response.body.task.isCompleted).toEqual('boolean');
      done();
    });

    it('should return a duplicate error if tasks already exists', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(task);

      expect(response.statusCode).toBe(409);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('This tasks already exists.');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Please provide a JWT token');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3NzE5MjU0NGNkNWMwMWQ2ZjVhZDEiLCJuYW1lIjoiTmVkeSBVZG9tYmF0IiwiZW1haWwiOiJuZWR5QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsIl9fdiI6MCwiaWF0IjoxNjM0MTY5MjQ0LCJleHAiOjE2MzY4NDc2NDR9.O4m8YdJXRO1h6b9un7A_BVk-CSJaNW23zuh2fm0VSl3`,
        )
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe(
        'Token is invalid, please provide a valid token',
      );
      done();
    });

    it('should return a validation error is a required property title is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskWithoutTitle);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid title is required',
      ]);
      done();
    });

    it('should return a validation error is a required property description is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskWithoutDescription);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid description is required',
      ]);
      done();
    });

    it('should return a validation error is a required property deadline is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskWithoutDeadline);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid deadline is required',
      ]);
      done();
    });

    it('should return a validation error is a required property notification Time is not provided', async done => {
      const response = await request(app)
        .post('/api/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(taskWithoutNotificationTime);

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toStrictEqual([
        'A valid notification time is required',
      ]);
      done();
    });
  });

  describe('Task Module Update Block', () => {
    it('should return an object of an updated task', async done => {
      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'new title',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Your task has been successfully updated.',
      );
      expect(response.body).toHaveProperty('task');
      expect(typeof response.body.task).toBe('object');
      expect(response.body.task.title).toEqual('new title');
      expect(response.body.task.description).toEqual(task.description);
      expect(new Date(response.body.task.deadline)).toEqual(task.deadline);
      expect(new Date(response.body.task.notificationTime)).toEqual(
        task.notificationTime,
      );
      expect(typeof response.body.task.isCompleted).toEqual('boolean');
      done();
    });

    it('should return an object of a completed task', async done => {
      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          isCompleted: true,
          ...task,
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Your task has been successfully updated.',
      );
      expect(response.body).toHaveProperty('task');
      expect(typeof response.body.task).toBe('object');
      expect(response.body.task.title).toEqual(task.title);
      expect(response.body.task.description).toEqual(task.description);
      expect(new Date(response.body.task.deadline)).toEqual(task.deadline);
      expect(new Date(response.body.task.notificationTime)).toEqual(
        task.notificationTime,
      );
      expect(typeof response.body.task.isCompleted).toEqual('boolean');
      expect(response.body.task.isCompleted).toEqual(true);
      done();
    });

    it('should return a not found error if tasks does not exists', async done => {
      const response = await request(app)
        .put('/api/v1/tasks/61677f13a62f94cde0ef3252')
        .set('Authorization', `Bearer ${token}`)
        .send(task);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('This task does not exist.');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Please provide a JWT token');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3NzE5MjU0NGNkNWMwMWQ2ZjVhZDEiLCJuYW1lIjoiTmVkeSBVZG9tYmF0IiwiZW1haWwiOiJuZWR5QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsIl9fdiI6MCwiaWF0IjoxNjM0MTY5MjQ0LCJleHAiOjE2MzY4NDc2NDR9.O4m8YdJXRO1h6b9un7A_BVk-CSJaNW23zuh2fm0VSl3`,
        )
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe(
        'Token is invalid, please provide a valid token',
      );
      done();
    });
  });

  describe('Task Module Find Block', () => {
    it('should return an array of tasks', async done => {
      const response = await request(app)
        .get(`/api/v1/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe(
        'Successfully retrieved all your tasks',
      );
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app).get(`/api/v1/tasks`);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Please provide a JWT token');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .get(`/api/v1/tasks`)
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3NzE5MjU0NGNkNWMwMWQ2ZjVhZDEiLCJuYW1lIjoiTmVkeSBVZG9tYmF0IiwiZW1haWwiOiJuZWR5QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsIl9fdiI6MCwiaWF0IjoxNjM0MTY5MjQ0LCJleHAiOjE2MzY4NDc2NDR9.O4m8YdJXRO1h6b9un7A_BVk-CSJaNW23zuh2fm0VSl3`,
        );

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe(
        'Token is invalid, please provide a valid token',
      );
      done();
    });

    it('should return an object of a single task', async done => {
      const response = await request(app)
        .get(`/api/v1/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successfully retrieved task');
      expect(response.body).toHaveProperty('task');
      expect(typeof response.body.task).toBe('object');
      expect(response.body.task.title).toEqual(task.title);
      expect(response.body.task.description).toEqual(task.description);
      expect(new Date(response.body.task.deadline)).toEqual(task.deadline);
      expect(new Date(response.body.task.notificationTime)).toEqual(
        task.notificationTime,
      );
      expect(typeof response.body.task.isCompleted).toEqual('boolean');
      expect(response.body.task.isCompleted).toEqual(true);
      done();
    });

    it('should return a not found error id task does not exist', async done => {
      const response = await request(app)
        .get('/api/v1/tasks/61277f13a62f94cde0ef3252')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('This task does not exist');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app).get(`/api/v1/tasks/${taskId}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Please provide a JWT token');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .get(`/api/v1/tasks/${taskId}`)
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3NzE5MjU0NGNkNWMwMWQ2ZjVhZDEiLCJuYW1lIjoiTmVkeSBVZG9tYmF0IiwiZW1haWwiOiJuZWR5QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsIl9fdiI6MCwiaWF0IjoxNjM0MTY5MjQ0LCJleHAiOjE2MzY4NDc2NDR9.O4m8YdJXRO1h6b9un7A_BVk-CSJaNW23zuh2fm0VSl3`,
        );

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe(
        'Token is invalid, please provide a valid token',
      );
      done();
    });
  });

  describe('Task Module Delete Block', () => {
    it('should return no response and 204 status code and delete a task', async () => {
      const response = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(204);
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Please provide a JWT token');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .delete(`/api/v1/tasks/${taskId}`)
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3NzE5MjU0NGNkNWMwMWQ2ZjVhZDEiLCJuYW1lIjoiTmVkeSBVZG9tYmF0IiwiZW1haWwiOiJuZWR5QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsIl9fdiI6MCwiaWF0IjoxNjM0MTY5MjQ0LCJleHAiOjE2MzY4NDc2NDR9.O4m8YdJXRO1h6b9un7A_BVk-CSJaNW23zuh2fm0VSl3`,
        )
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe(
        'Token is invalid, please provide a valid token',
      );
      done();
    });

    it('should throw an interal server error if something goes wrong during deletion', async () => {
      const response = await request(app)
        .delete('/api/v1/tasks/3edd78d213a7f725e1ecad0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(500);
      expect(response.body.status).toBe('fail');
      expect(response.body).toHaveProperty('message');
    });

    it('should return no response and 204 status code and delete all meditations', async () => {
      const response = await request(app)
        .delete('/api/v1/tasks/')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(204);
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .delete('/api/v1/tasks/')
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Please provide a JWT token');
      done();
    });

    it('should return an unauthorized error if user is not authenticated', async done => {
      const response = await request(app)
        .delete('/api/v1/tasks/')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3NzE5MjU0NGNkNWMwMWQ2ZjVhZDEiLCJuYW1lIjoiTmVkeSBVZG9tYmF0IiwiZW1haWwiOiJuZWR5QGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsInVwZGF0ZWRBdCI6IjIwMjEtMTAtMTNUMjM6NTM6NTQuNjE4WiIsIl9fdiI6MCwiaWF0IjoxNjM0MTY5MjQ0LCJleHAiOjE2MzY4NDc2NDR9.O4m8YdJXRO1h6b9un7A_BVk-CSJaNW23zuh2fm0VSl3`,
        )
        .send(task);

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe(
        'Token is invalid, please provide a valid token',
      );
      done();
    });
  });

  describe('Task Module - Empty tasks block', () => {
    it('should return an empty error if tasks is found', async () => {
      const response = await request(app)
        .get(`/api/v1/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(
        'You do not have any tasks, please add tasks to start',
      );
    });
  });
};
