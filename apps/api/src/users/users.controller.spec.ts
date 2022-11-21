import { Test, TestingModule } from '@nestjs/testing';
import { users } from '../../utils/test.data';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    findAll: jest.fn(() => {
      return users;
    }),
    findOne: jest.fn((id) => {
      return users.find((user) => user.id === id);
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      const userToUpdate = users.find((user) => user.id === id);
      return Object.assign(userToUpdate, dto);
    }),
    remove: jest.fn(() => {
      return {
        raw: [],
        affected: 1,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all users', async () => {
    await expect(controller.findAll()).resolves.toEqual({
      success: true,
      result: users,
    });
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should get one user by id', async () => {
    await expect(controller.getUserById(1)).resolves.toEqual({
      success: true,
      result: users[0],
    });
    expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const dto = { firstName: 'Billy', lastName: 'The Cat' };
    await expect(controller.update(2, dto)).resolves.toEqual({
      success: true,
      result: {
        id: 2,
        username: 'BillyCat',
        password:
          '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
        firstName: 'Billy',
        lastName: 'The Cat',
        email: null,
        isActive: true,
        isAdmin: false,
      },
    });
    expect(mockUsersService.update).toHaveBeenCalledWith(2, dto);
  });

  it('should delete a user', async () => {
    await expect(controller.remove(3)).resolves.toEqual({
      success: true,
      result: {
        raw: [],
        affected: 1,
      },
    });
    expect(mockUsersService.remove).toHaveBeenCalledWith(3);
  });
});
