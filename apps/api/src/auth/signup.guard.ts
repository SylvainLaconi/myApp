import { Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class SignUpGuard {
  constructor(private readonly usersService: UsersService) {}

  async isUsernameAvailable(username: SignUpAuthDto['username']) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      return true;
    }
    return false;
  }

  async isPasswordValid(password: SignUpAuthDto['password']) {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );

    const testPassword = regex.test(password);

    if (testPassword) {
      return true;
    }
    return false;
  }
}
