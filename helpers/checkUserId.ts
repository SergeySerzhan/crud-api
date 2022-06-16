import { validate } from 'uuid';

import { CustomError } from './CustomError';
import { statusCodeEnum } from '../enums/statusCodeEnum';
import { errMsgEnum } from '../enums/errMsgEnum';

export function checkUserId(userId: string): boolean {
  if (!validate(userId))
    throw new CustomError(statusCodeEnum.badReq, errMsgEnum.badReq);
  else return true;
}
