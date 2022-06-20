import { ICreateNewUserDto } from '../interfaces/ICreateNewUserDto';

export function isICreateNewUserDto(obj: any): obj is ICreateNewUserDto {
  return obj && 'username' in obj && 'age' in obj && 'hobbies' in obj;
}
