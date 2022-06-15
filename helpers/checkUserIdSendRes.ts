import { ServerResponse } from 'http';

import { checkUserId } from './checkUserId';
import { sendRes } from './sendRes';
import { IUser } from '../interfaces/IUser';

export function checkUserIdSendRes(
  userId: string,
  user: IUser | undefined,
  res: ServerResponse
): void {
  if (checkUserId(userId)) {
    // Check if user with this userId exist
    if (!user) {
      sendRes(res, 404, { message: "User with this id doesn't exist" });
    } else {
      sendRes(res, 200, { user });
    }
  } else {
    sendRes(res, 400, { message: 'Invalid userId' });
  }
}
