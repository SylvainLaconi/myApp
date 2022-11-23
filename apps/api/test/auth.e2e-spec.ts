import * as request from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

describe('AuthController (e2e)', () => {
  const URL = process.env.API_URL;

  const mockValidUser = {
    username: `Test${Date.now()}`,
    password: 'Test123!',
  };

  const mockInvalidUser = {
    username: `Test${Date.now()}1`,
    password: 'test',
  };

  let mockUserId: number;
  let mockUserAccessToken: string;

  afterAll(async () => {
    await request(URL)
      .delete(`/users/${mockUserId}`)
      .auth(mockUserAccessToken, { type: 'bearer' });
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user', async () => {
      const response = await request(URL)
        .post('/auth/signup')
        .send(mockValidUser)
        .set('Accept', 'application/json');

      mockUserId = response.body.result.id;

      expect(response.status).toEqual(201);
      expect(response.body).toEqual({
        success: true,
        result: {
          username: mockValidUser.username,
          firstName: null,
          lastName: null,
          email: null,
          password: expect.any(String),
          id: expect.any(Number),
          isActive: true,
          isAdmin: false,
        },
      });
    });

    it('should reject if username already exists', async () => {
      const response = await request(URL)
        .post('/auth/signup')
        .send(mockValidUser)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        success: false,
        name: 'NotAcceptableException',
        error: 'Username is not available',
      });
    });

    it('should reject if password does not respect policy', async () => {
      const response = await request(URL)
        .post('/auth/signup')
        .send(mockInvalidUser)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        success: false,
        name: 'NotAcceptableException',
        error:
          'The string must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, 1 special character, be eight characters or longer',
      });
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login if correct credentials', async () => {
      const response = await request(URL)
        .post('/auth/login')
        .send(mockValidUser)
        .set('Accept', 'application/json');

      mockUserAccessToken = response.body.result.access_token;

      expect(response.status).toEqual(201);
      expect(response.body).toEqual({
        success: true,
        result: {
          access_token: expect.any(String),
        },
      });
    });

    it('should reject if incorrect credentials', async () => {
      const response = await request(URL)
        .post('/auth/login')
        .send({
          username: mockValidUser.username,
          password: 'WrongPassword',
        })
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    it('should reject if username does not exist', async () => {
      const response = await request(URL)
        .post('/auth/login')
        .send(mockInvalidUser)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: 'User not found',
        error: 'Bad Request',
      });
    });
  });

  describe('/auth/profile (GET)', () => {
    it('should return user profile', async () => {
      const response = await request(URL)
        .get('/auth/profile')
        .auth(mockUserAccessToken, { type: 'bearer' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        result: {
          id: mockUserId,
          username: mockValidUser.username,
          firstName: null,
          lastName: null,
          email: null,
          isActive: true,
          isAdmin: false,
        },
      });
    });

    it('should reject if no token provided', async () => {
      const response = await request(URL)
        .get('/auth/profile')
        .auth('WrongToken', { type: 'bearer' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    it('should reject if wrong token provided', async () => {
      const response = await request(URL).get('/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: 'Unauthorized',
      });
    });
  });
});
