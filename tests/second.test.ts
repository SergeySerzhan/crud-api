import request from 'supertest';

import { server } from '../index';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';
import { userId } from './createNewUserTest';
import { createNewUser } from './createNewUserTest';

describe('Scenario 2', () => {
  test('create new user', createNewUser);

  test('delete user by id', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.status).toBe(statusCodeEnum.noContent);
  });

  test('get user with non-existing id', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.status).toBe(statusCodeEnum.notFound);
    expect(res.body.message).toBe(errMsgEnum.notFound);
  });

  test('create new user with not valid body', async () => {
    const res = await request(server).post('/api/users').send({
      username: 'Sergey',
      age: 25,
    });
    expect(res.status).toBe(statusCodeEnum.badReq);
    expect(res.body.message).toBe(errMsgEnum.validBody);
  });

  test('update user with non-existing uuid', async () => {
    const res = await request(server)
      .put(`/api/users/${userId}`)
      .send({
        username: 'Sergey Serzhan',
        age: 25,
        hobbies: ['coding'],
      });
    expect(res.status).toBe(statusCodeEnum.notFound);
    expect(res.body.message).toBe(errMsgEnum.notFound);
  });

  test('delete user with non-existing uuid', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.status).toBe(statusCodeEnum.notFound);
    expect(res.body.message).toBe(errMsgEnum.notFound);
  });
});
