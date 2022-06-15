import { ServerResponse } from 'http';

import { isICreateNewUserDto } from '../helpers/isICreateNewUserDto';
import { sendRes } from '../helpers/sendRes';
import { getUserId } from '../helpers/getUserId';
import controller from '../controller';
import { checkUserIdSendRes } from '../helpers/checkUserIdSendRes';

export function putHandler(url: string, body: any, res: ServerResponse): void {
  if (body && isICreateNewUserDto(body)) {
    const userId = getUserId(url);

    const user = controller.updateUser(userId, body);

    checkUserIdSendRes(userId, user, res);
  } else {
    sendRes(res, 400, {
      message: 'Body should contain username, age and hobbies fields',
    });
  }
}
