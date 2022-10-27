import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(newUser: CreateUserDto): Promise<User> {
    console.log(this.usersRepository);

    console.log(newUser);

    const user = new User();

    console.log(user);

    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;

    console.log(user);

    return this.usersRepository.save(user);
  }
}
