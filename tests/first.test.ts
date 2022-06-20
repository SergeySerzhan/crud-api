import request from 'supertest';

import { server } from '../index';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';
import { userId } from './createNewUserTest';
import { createNewUser } from './createNewUserTest';

describe('Scenario 1', () => {
  test('get all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(statusCodeEnum.ok);
    expect(res.body.users instanceof Array).toEqual(true);
  });

  test('get user with invalid userId', async () => {
    const res = await request(server).get(
      '/api/users/123e4567-e89b-12d3-a456-4266523400001'
    );
    expect(res.status).toBe(statusCodeEnum.badReq);
    expect(res.body.message).toBe(errMsgEnum.badReq);
  });

  test('create new user', createNewUser);

  test('update user', async () => {
    const res = await request(server)
      .put(`/api/users/${userId}`)
      .send({
        username: 'Sergey Serzhan',
        age: 25,
        hobbies: ['coding'],
      });
    expect(res.status).toBe(statusCodeEnum.ok);
    expect(res.body.user).toHaveProperty('username', 'Sergey Serzhan');
  });

  test('get user by id', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.status).toBe(statusCodeEnum.ok);
    expect(res.body.user).toHaveProperty('userId', userId);
  });

  test('delete user by id', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.status).toBe(statusCodeEnum.noContent);
  });
});
