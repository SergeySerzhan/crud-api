import { ServerResponse } from 'http';
import { getUserId } from '../helpers/getUserId';
import { checkUserId } from '../helpers/checkUserId';
import controller from '../controller';
import { sendRes } from '../helpers/sendRes';

export function deleteHandler(url: string, res: ServerResponse): void {
  const userId = getUserId(url);

  if (checkUserId(userId)) {
    const isDeleted = controller.deleteUser(userId);

    if (isDeleted) {
      sendRes(res, 204);
    } else {
      sendRes(res, 404, { message: "User with this id doesn't exist" });
    }
  } else {
    sendRes(res, 400, { message: 'Invalid userId' });
  }
}
