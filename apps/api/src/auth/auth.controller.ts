import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ResponseError, ResponseSuccess } from 'utils/ApiResponses';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpGuard } from './signup.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private readonly signUpGuard: SignUpGuard,
  ) {}

  @Post('signup')
  async signUp(@Body() newUser: SignUpAuthDto) {
    try {
      const isUsernameAvailable = await this.signUpGuard.isUsernameAvailable(
        newUser.username,
      );
      if (!isUsernameAvailable) {
        throw new NotAcceptableException('Username is not available');
      }

      const isPasswordValid = await this.signUpGuard.isPasswordValid(
        newUser.password,
      );

      if (!isPasswordValid) {
        throw new NotAcceptableException(
          'The string must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, 1 special character, be eight characters or longer',
        );
      }
      const result = await this.usersService.signUp(newUser);

      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      const result = await this.authService.login(req.user);

      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      const data = await this.usersService.findOne(req.user.id);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = data;
      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }
}
