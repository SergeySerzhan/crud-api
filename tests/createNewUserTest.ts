import request from 'supertest';

import { server } from '../index';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { user } from './validUser';

export let userId: string | undefined;
export async function createNewUser() {
  const res = await request(server).post('/api/users').send(user);
  expect(res.status).toBe(statusCodeEnum.created);
  expect(res.body.user).toHaveProperty('username', 'Sergey');
  expect(res.body.user).toHaveProperty('age', 25);
  expect(res.body.user.hobbies).toContain('coding');

  userId = res.body.user.userId;
}
