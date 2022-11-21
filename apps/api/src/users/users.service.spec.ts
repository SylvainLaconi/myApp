import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { users } from '../../utils/test.data';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUsersRepository = {
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: Math.floor(Math.random() * 100),
        ...user,
        isActive: true,
        isAdmin: false,
      }),
    ),
    find: jest.fn(() => {
      return users;
    }),
    findOneBy: jest
      .fn()
      .mockImplementation(({ id, username }) =>
        Promise.resolve(
          users.find((user) => user.id === id || user.username === username),
        ),
      ),
    delete: jest.fn(() => {
      return {
        raw: [],
        affected: 1,
      };
    }),
    update: jest.fn((id, dto) => {
      const userToUpdate = users.find((user) => user.id === id);
      return Object.assign(userToUpdate, dto);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const dto = {
      username: 'johndoe',
      password: 'Password123!',
      firstName: null,
      lastName: null,
      email: null,
    };
    await expect(service.signUp(dto)).resolves.toEqual({
      username: 'johndoe',
      firstName: null,
      lastName: null,
      email: null,
      password: expect.any(String),
      id: expect.any(Number),
      isActive: true,
      isAdmin: false,
    });
    expect(mockUsersRepository.save).toHaveBeenCalled();
  });

  it('should return all users', async () => {
    await expect(service.findAll()).resolves.toEqual(users);
    expect(mockUsersRepository.find).toHaveBeenCalled();
  });

  it('should return one user by id', async () => {
    await expect(service.findOne(1)).resolves.toEqual(
      users.find((user) => user.id === 1),
    );
    expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should return one user by username', async () => {
    await expect(service.findOneByUsername('johndoe')).resolves.toEqual(
      users.find((user) => user.username === 'johndoe'),
    );
    expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
      username: 'johndoe',
    });
  });

  it('should delete the user by id and return response', async () => {
    await expect(service.remove(1)).resolves.toEqual({
      raw: [],
      affected: 1,
    });
    expect(mockUsersRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should update the user', async () => {
    const dto = { firstName: 'Billy', lastName: 'The Cat' };
    await expect(service.update(2, dto)).resolves.toEqual({
      id: 2,
      username: 'BillyCat',
      password: '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
      firstName: 'Billy',
      lastName: 'The Cat',
      email: null,
      isActive: true,
      isAdmin: false,
    });
    expect(mockUsersRepository.update).toHaveBeenCalledWith(2, dto);
  });
});
