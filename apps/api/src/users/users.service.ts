import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../../utils/hash';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

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

  async create(newUser: CreateUserDto): Promise<User> {
    const user = new User();

    user.username = newUser.username;
    user.password = await hashPassword(newUser.password);

    return this.usersRepository.save(user);
  }
}
