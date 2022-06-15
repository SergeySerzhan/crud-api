import { validate } from 'uuid';

export function checkUserId(userId: string): boolean {
  return validate(userId);
}
