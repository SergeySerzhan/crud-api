import { IUser } from '../interfaces/IUser';
import { ServerResponse } from 'http';

export function sendRes(
  res: ServerResponse,
  code: number,
  body?: { user: IUser } | { users: IUser[] } | { message: string }
): void {
  if (body) {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  } else {
    // For delete request (204 No Content)
    res.writeHead(code);
    res.end();
  }
}
