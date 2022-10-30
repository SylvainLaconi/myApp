import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { hashPassword } from '../../utils/hash';
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
    return await this.usersRepository.find();
  }

  async findOne(id: User['id']): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(
    username: User['username'],
  ): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async signUp(newUser: SignUpAuthDto): Promise<User> {
    const user = newUser;

    user.username = newUser.username;
    user.password = await hashPassword(newUser.password);

    return this.usersRepository.save(user);
  }

  async update(
    userId: User['id'],
    updatedUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(userId, updatedUser);
  }
}
