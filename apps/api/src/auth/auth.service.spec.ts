import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUsers } from '../../utils/test.data';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = {
    findOneByUsername: jest.fn((username) => {
      return mockUsers.find((user) => user.username === username);
    }),
  };
  const mockJwtService = {
    sign: jest.fn(() => {
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbG91OTIiLCJpYXQiOjE2NjkwMzM3MjcsImV4cCI6MTY2OTAzNzMyN30.9mC-UL-px54Fie9PTjbp1PNLmAAIIQqAHu7kMzDZvGs';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user infos if username and password are valid', async () => {
      await expect(
        service.validateUser('johndoe', 'Password123!'),
      ).resolves.toEqual({
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        isActive: true,
        isAdmin: true,
      });
    });

    it('should reject error if user does not exist', async () => {
      await expect(
        service.validateUser('unknownuser', 'password'),
      ).rejects.toMatchObject({
        response: {
          statusCode: 400,
          message: 'User not found',
          error: 'Bad Request',
        },
        status: 400,
        options: {},
      });
    });

    it('should return null if password is not valid', async () => {
      await expect(
        service.validateUser('johndoe', 'WrongPassword!'),
      ).resolves.toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token if user exists', async () => {
      const user = {
        username: 'johndoe',
        userId: 1,
      };
      await expect(service.login(user)).resolves.toEqual({
        access_token: expect.any(String),
      });
    });
  });
});
