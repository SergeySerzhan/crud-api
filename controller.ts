import { db } from './db';
import { IUser } from './interfaces/IUser';
import { v4 } from 'uuid';

class Controller {
  getUsers(): IUser[] {
    return db.users;
  }

  getUserById(userId: string): IUser | undefined {
    return db.users.find((user: IUser) => user.userId === userId);
  }

  createUser(username: string, age: number, hobbies: string[]): IUser {
    const newUser = { username, age, hobbies, userId: v4() };
    db.users.push(newUser);
    return newUser;
  }

  updateUser(
    userId: string,
    username: string,
    age: number,
    hobbies: string[]
  ): IUser | undefined {
    let user = db.users.find((user: IUser) => user.userId === userId);

    if (!user) return user;

    const userIndex = db.users.findIndex(
      (user: IUser) => user.userId === userId
    );

    user = { userId, username, age, hobbies };
    db.users[userIndex] = user;

    return user;
  }

  deleteUser(userId: string): boolean {
    const userIndex = db.users.findIndex(
      (user: IUser) => user.userId === userId
    );

    if (userIndex === -1) return false;

    db.users.splice(userIndex - 1, 1);
    return true;
  }
}

export default new Controller();
