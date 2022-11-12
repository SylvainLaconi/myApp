import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { hashPassword } from '../../utils/BcryptService';
import { SignUpAuthDto } from '../auth/dto/signup-auth.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new Error('UsersService - findAll()');
    }
  }

  async findOne(id: User['id']): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('UsersService - findOne()');
    }
  }

  async findOneByUsername(
    username: User['username'],
  ): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOneBy({ username });
    } catch (error) {
      throw new Error('UsersService - findOneByUsername()');
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new Error('UsersService - remove()');
    }
  }

  async signUp(newUser: SignUpAuthDto): Promise<User> {
    try {
      const user = new User();

      user.username = newUser.username;
      user.firstName = newUser.firstName;
      user.lastName = newUser.lastName;
      user.email = newUser.email;
      user.password = await hashPassword(newUser.password);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error('UsersService - signUp()');
    }
  }

  async update(
    userId: User['id'],
    updatedUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      return await this.usersRepository.update(userId, updatedUser);
    } catch (error) {
      throw new Error('UsersService - update()');
    }
  }
}
