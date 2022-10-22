import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(): Record<string, string | number>[] {
    return this.appService.getUsers();
  }

  @Get(':userId')
  getUserById(
    @Param('userId') userId: string,
  ): Record<string, string | number> {
    return this.appService.getUserById(Number(userId));
  }
}
