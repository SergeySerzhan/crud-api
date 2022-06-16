import { ServerResponse } from 'http';

import { isICreateNewUserDto } from '../helpers/isICreateNewUserDto';
import { sendRes } from '../helpers/sendRes';
import controller from '../controller';
import { CustomError } from '../helpers/CustomError';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';

export function postHandler(body: any, res: ServerResponse): void {
  if (body && isICreateNewUserDto(body)) {
    const user = controller.createUser(body);
    sendRes(res, statusCodeEnum.created, { user });
  } else {
    throw new CustomError(statusCodeEnum.badReq, errMsgEnum.validBody);
  }
}
