import { ServerResponse } from 'http';

import { isICreateNewUserDto } from '../helpers/isICreateNewUserDto';
import { getUserId } from '../helpers/getUserId';
import controller from '../controller';
import { checkUserId } from '../helpers/checkUserId';
import { CustomError } from '../helpers/CustomError';
import { sendRes } from '../helpers/sendRes';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';

export function putHandler(url: string, body: any, res: ServerResponse): void {
  if (body && isICreateNewUserDto(body)) {
    const userId = getUserId(url);

    checkUserId(userId);
    const user = controller.updateUser(userId, body);
    if (!user)
      throw new CustomError(statusCodeEnum.notFound, errMsgEnum.notFound);
    sendRes(res, statusCodeEnum.ok, { user });
  } else {
    throw new CustomError(statusCodeEnum.badReq, errMsgEnum.validBody);
  }
}
