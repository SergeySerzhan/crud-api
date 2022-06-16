import { ServerResponse } from 'http';

import { getUserId } from '../helpers/getUserId';
import controller from '../controller';
import { sendRes } from '../helpers/sendRes';
import { checkUserId } from '../helpers/checkUserId';
import { CustomError } from '../helpers/CustomError';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';

export function getHandler(url: string, res: ServerResponse): void {
  const userId = getUserId(url);
  // Get all users
  if (userId === 'users') {
    const users = controller.getUsers();
    return sendRes(res, statusCodeEnum.ok, { users });
  }

  checkUserId(userId);
  const user = controller.getUserById(userId);
  if (!user)
    throw new CustomError(statusCodeEnum.notFound, errMsgEnum.notFound);
  sendRes(res, statusCodeEnum.ok, { user });
}
