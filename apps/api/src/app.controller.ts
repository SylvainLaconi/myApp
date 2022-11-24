import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  get(): string {
    return `API is running ❤ on ${this.configService.get<string>('NODE_ENV')}`;
  }
}
