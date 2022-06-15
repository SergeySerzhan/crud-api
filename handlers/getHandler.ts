import { IncomingMessage, ServerResponse } from 'http';

import { getUserId } from '../helpers/getUserId';
import controller from '../controller';
import { sendRes } from '../helpers/sendRes';
import { checkUserId } from '../helpers/checkUserId';
import { checkUserIdSendRes } from '../helpers/checkUserIdSendRes';

export function getHandler(url: string, res: ServerResponse): void {
  const userId = getUserId(url);
  // Get all users
  if (userId === 'users') {
    const users = controller.getUsers();
    return sendRes(res, 200, { users });
  }

  const user = controller.getUserById(userId);
  // Check userId validity
  checkUserIdSendRes(userId, user, res);
}
