import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResponseError, ResponseSuccess } from 'utils/ApiResponses';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      const result = await this.usersService.findAll();

      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: User['id']) {
    try {
      const result = await this.usersService.findOne(id);

      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: User['id'],
    @Body() updatedUser: UpdateUserDto,
  ) {
    try {
      const result = await this.usersService.update(id, updatedUser);

      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: User['id']) {
    try {
      const result = await this.usersService.remove(id);

      return ResponseSuccess(result);
    } catch (error) {
      throw new BadRequestException(ResponseError(error));
    }
  }
}
