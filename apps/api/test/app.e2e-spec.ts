import * as request from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

describe('AppController (e2e)', () => {
  const URL = process.env.API_URL;

  describe('/ (GET)', () => {
    it("should return 'API is running ❤ on development'", async () => {
      const response = await request(URL).get('/');

      expect(response.status).toBe(200);

      expect(response.text).toEqual('API is running ❤ on development');
    });
  });
});
