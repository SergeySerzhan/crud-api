import { v4 } from 'uuid';

import { db } from './db';
import { IUser } from './interfaces/IUser';
import { ICreateNewUserDto } from './interfaces/ICreateNewUserDto';

class Controller {
  getUsers(): IUser[] {
    return db.users;
  }

  getUserById(userId: string): IUser | undefined {
    return db.users.find((user: IUser) => user.userId === userId);
  }

  createUser(body: ICreateNewUserDto): IUser {
    const newUser = { userId: v4(), ...body };
    db.users.push(newUser);
    return newUser;
  }

  updateUser(userId: string, body: ICreateNewUserDto): IUser | undefined {
    let user = db.users.find((user: IUser) => user.userId === userId);

    if (!user) return user;

    const userIndex = db.users.findIndex(
      (user: IUser) => user.userId === userId
    );

    user = { userId, ...body };
    db.users[userIndex] = user;

    return user;
  }

  deleteUser(userId: string): boolean {
    const userIndex = db.users.findIndex(
      (user: IUser) => user.userId === userId
    );

    if (userIndex === -1) return false;

    db.users.splice(userIndex, 1);
    return true;
  }
}

export default new Controller();
