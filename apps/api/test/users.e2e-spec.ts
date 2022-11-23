import * as request from 'supertest';
import * as dotenv from 'dotenv';
import 'jest-extended';

dotenv.config();

describe('UserController (e2e)', () => {
  const URL = process.env.API_URL;
  let mockUserId: number;
  let mockUserAccessToken: string;

  const mockValidUser = {
    username: `Test${Date.now()}`,
    password: 'Test123!',
  };

  beforeAll(async () => {
    const signupResponse = await request(URL)
      .post('/auth/signup')
      .send(mockValidUser);

    mockUserId = signupResponse.body.result.id;

    const loginResponse = await request(URL)
      .post('/auth/login')
      .send(mockValidUser);

    mockUserAccessToken = loginResponse.body.result.access_token;
  });

  afterAll(async () => {
    await request(URL)
      .delete(`/users/${mockUserId}`)
      .auth(mockUserAccessToken, { type: 'bearer' });
  });

  describe('/users (GET)', () => {
    it('should return all users', async () => {
      const response = await request(URL)
        .get('/users')
        .auth(mockUserAccessToken, { type: 'bearer' });

      expect(response.status).toBe(200);

      const { success, result } = response.body;

      expect(success).toBeTruthy;

      result.forEach((user: any) => {
        expect(typeof user.id).toEqual('number');
        expect(typeof user.username).toEqual('string');
        expect(typeof user.password).toEqual('string');
        expect(typeof user.isAdmin).toEqual('boolean');
        expect(typeof user.isActive).toEqual('boolean');
        expect(user.firstName).toBeDefined;
        expect(user.lastName).toBeDefined;
        expect(user.email).toBeDefined;
      });
    });

    it('should reject if no token provided', async () => {
      const response = await request(URL).get('/users');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user by id', async () => {
      const response = await request(URL)
        .get(`/users/${mockUserId}`)
        .auth(mockUserAccessToken, { type: 'bearer' });

      expect(response.status).toBe(200);

      const { success, result } = response.body;

      expect(success).toBeTruthy;

      expect(typeof result.id).toEqual('number');
      expect(typeof result.username).toEqual('string');
      expect(typeof result.password).toEqual('string');
      expect(typeof result.isAdmin).toEqual('boolean');
      expect(typeof result.isActive).toEqual('boolean');
      expect(result.firstName).toBeDefined;
      expect(result.lastName).toBeDefined;
      expect(result.email).toBeDefined;
    });

    it('should reject if no token provided', async () => {
      const response = await request(URL).get(`/users/${mockUserId}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update and return a user', async () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };
      const response = await request(URL)
        .put(`/users/${mockUserId}`)
        .auth(mockUserAccessToken, { type: 'bearer' })
        .send(payload);

      expect(response.status).toBe(200);

      const { success, result } = response.body;

      expect(success).toBeTruthy;

      expect(result).toEqual({
        id: mockUserId,
        username: mockValidUser.username,
        password: expect.any(String),
        isAdmin: expect.any(Boolean),
        isActive: expect.any(Boolean),
        ...payload,
      });
    });

    it('should reject if no token provided', async () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };
      const response = await request(URL)
        .put(`/users/${mockUserId}`)
        .send(payload);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete and return a user', async () => {
      const response = await request(URL)
        .delete(`/users/${mockUserId}`)
        .auth(mockUserAccessToken, { type: 'bearer' });

      expect(response.status).toBe(200);

      const { success, result } = response.body;

      expect(success).toBeTruthy;

      expect(typeof result.id).toEqual('number');
      expect(typeof result.username).toEqual('string');
      expect(typeof result.password).toEqual('string');
      expect(typeof result.isAdmin).toEqual('boolean');
      expect(typeof result.isActive).toEqual('boolean');
      expect(result.firstName).toBeDefined;
      expect(result.lastName).toBeDefined;
      expect(result.email).toBeDefined;
    });

    it('should reject if no token provided', async () => {
      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };
      const response = await request(URL)
        .delete(`/users/${mockUserId}`)
        .send(payload);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });
});
