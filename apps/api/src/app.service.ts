import { Injectable } from '@nestjs/common';
import * as data from '../db/users.json';

@Injectable()
export class AppService {
  getUsers() {
    return data;
  }

  getUserById(userId: number) {
    const user = data.find((user) => user.id === userId);

    return user;
  }
}
