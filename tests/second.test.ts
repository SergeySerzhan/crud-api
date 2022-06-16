import request from 'supertest';

import { server } from '../index';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';

describe('Scenario 2', () => {
  let userId: string | undefined;

  test('create new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Sergey',
        age: 25,
        hobbies: ['coding'],
      });
    expect(res.status).toBe(statusCodeEnum.created);
    userId = res.body.user.userId;
    expect(res.body.user).toHaveProperty('username', 'Sergey');
    expect(res.body.user).toHaveProperty('age', 25);
    expect(res.body.user.hobbies).toContain('coding');
  });

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
