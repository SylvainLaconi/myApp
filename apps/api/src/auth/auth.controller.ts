import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
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
    const isUsernameAvailable = await this.signUpGuard.isUsernameAvailable(
      newUser.username,
    );
    if (!isUsernameAvailable) {
      return 'Username is not available';
    }

    const isPasswordValid = await this.signUpGuard.isPasswordValid(
      newUser.password,
    );

    if (!isPasswordValid) {
      return 'The string must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, 1 special character, be eight characters or longer';
    }
    return this.usersService.signUp(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
