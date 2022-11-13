import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get()
  get(): string {
    return `API is running ❤ on ${this.configService.get<string>('NODE_ENV')}`;
  }
}
