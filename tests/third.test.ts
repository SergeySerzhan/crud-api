import request from 'supertest';

import { server } from '../index';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';
import { userId } from './createNewUserTest';
import { createNewUser } from './createNewUserTest';

describe('Scenario 3', () => {
  test('get non-existing route', async () => {
    const res = await request(server).get('/api/route');
    expect(res.status).toBe(statusCodeEnum.notFound);
    expect(res.body.message).toBe(errMsgEnum.validAddr);
  });

  test('update user with not valid uuid', async () => {
    const res = await request(server)
      .put('/api/users/123e4567-e89b-12d3-a456-4266523400001')
      .send({
        username: 'Sergey Serzhan',
        age: 25,
        hobbies: ['playing computer games'],
      });
    expect(res.status).toBe(statusCodeEnum.badReq);
    expect(res.body.message).toBe(errMsgEnum.badReq);
  });

  test('delete user with invalid uuid', async () => {
    const res = await request(server).delete(
      '/api/users/123e4567-e89b-12d3-a456-4266523400001'
    );
    expect(res.status).toBe(statusCodeEnum.badReq);
    expect(res.body.message).toBe(errMsgEnum.badReq);
  });

  test('create new user', createNewUser);

  test('update user with not valid body', async () => {
    const res = await request(server).put(`/api/users/${userId}`).send({
      username: 'Sergey Serzhan',
      age: 25,
    });
    expect(res.status).toBe(statusCodeEnum.badReq);
    expect(res.body.message).toBe(errMsgEnum.validBody);
  });

  test('delete user by id', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.status).toBe(statusCodeEnum.noContent);
  });
});
