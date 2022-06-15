import { ServerResponse } from 'http';

import { isICreateNewUserDto } from '../helpers/isICreateNewUserDto';
import { sendRes } from '../helpers/sendRes';
import controller from '../controller';

export function postHandler(body: any, res: ServerResponse): void {
  if (body && isICreateNewUserDto(body)) {
    const user = controller.createUser(body);
    sendRes(res, 201, { user });
  } else {
    sendRes(res, 400, {
      message: 'Body should contain username, age and hobbies fields',
    });
  }
}
