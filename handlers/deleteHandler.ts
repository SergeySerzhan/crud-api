import { ServerResponse } from 'http';

import { getUserId } from '../helpers/getUserId';
import { checkUserId } from '../helpers/checkUserId';
import controller from '../controller';
import { sendRes } from '../helpers/sendRes';
import { CustomError } from '../helpers/CustomError';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';

export function deleteHandler(url: string, res: ServerResponse): void {
  const userId = getUserId(url);

  if (checkUserId(userId)) {
    const isDeleted = controller.deleteUser(userId);

    if (isDeleted) {
      sendRes(res, statusCodeEnum.noContent);
    } else {
      throw new CustomError(statusCodeEnum.notFound, errMsgEnum.notFound);
    }
  } else {
    throw new CustomError(statusCodeEnum.badReq, errMsgEnum.badReq);
  }
}
