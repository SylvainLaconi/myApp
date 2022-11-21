import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpGuard } from './signup.guard';

describe('AuthController', () => {
  let controller: AuthController;
  const mockUsersService = {
    signUp: jest.fn((dto) => {
      return {
        id: Math.floor(Math.random() * 100),
        ...dto,
        isActive: true,
        isAdmin: false,
      };
    }),
    findOne: jest.fn(() => {
      return {
        id: 123,
        username: 'johndoe',
        password: 'Password123!',
        firstName: null,
        lastName: null,
        email: null,
        isActive: false,
        isAdmin: true,
      };
    }),
  };

  const mockAuthService = {
    login: jest.fn(() => {
      return {
        access_token: 'dummyaccesstoken',
      };
    }),
  };
  const mockSignUpGuard = {
    isUsernameAvailable: jest.fn(() => {
      return true;
    }),
    isPasswordValid: jest.fn(() => {
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [UsersService, AuthService, SignUpGuard],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(SignUpGuard)
      .useValue(mockSignUpGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const signupDto = {
      username: 'johndoe',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    await expect(controller.signUp(signupDto)).resolves.toEqual({
      success: true,
      result: {
        id: expect.any(Number),
        isAdmin: false,
        isActive: true,
        ...signupDto,
      },
    });
    expect(mockSignUpGuard.isUsernameAvailable).toHaveBeenCalledWith(
      signupDto.username,
    );
    expect(mockSignUpGuard.isPasswordValid).toHaveBeenCalledWith(
      signupDto.password,
    );
    expect(mockUsersService.signUp).toHaveBeenCalledWith(signupDto);
  });

  it('should log user in', async () => {
    const userReq = {
      user: {
        username: 'johndoe',
        password: 'Password123!',
      },
    };

    await expect(controller.login(userReq)).resolves.toEqual({
      success: true,
      result: {
        access_token: expect.any(String),
      },
    });
    expect(mockAuthService.login).toHaveBeenCalledWith(userReq.user);
  });

  it('should get the user profile', async () => {
    const userReq = {
      user: {
        id: Math.floor(Math.random() * 100),
      },
    };
    await expect(controller.getProfile(userReq)).resolves.toEqual({
      success: true,
      result: {
        id: 123,
        username: 'johndoe',
        firstName: null,
        lastName: null,
        email: null,
        isActive: false,
        isAdmin: true,
      },
    });
    expect(mockUsersService.findOne).toHaveBeenCalledWith(userReq.user.id);
  });
});
