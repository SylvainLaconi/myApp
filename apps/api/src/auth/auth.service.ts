import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'utils/BcryptService';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: User['username'],
    pass: User['password'],
  ): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isMatch = await comparePassword(pass, user.password);

      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }
      return null;
    } catch (error) {
      throw new BadRequestException('AuthService - validateUser()');
    }
  }

  async login(user: any) {
    try {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error('AuthService - login()');
    }
  }
}
