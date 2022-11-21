import { comparePassword, hashPassword } from './BcryptService';

describe('BcryptService', () => {
  it('should return hashed password', async () => {
    const hashed = await hashPassword('Password123!');
    expect(hashed).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it('should return true if password is valid', async () => {
    const isValid = await comparePassword(
      'Password123!',
      '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
    );
    expect(isValid).toBeTruthy();
  });

  it('should return false if password is not valid', async () => {
    const isValid = await comparePassword(
      'NotValidPassword',
      '$2b$10$sX24aPy.9edZkAHTpTbf0OFG3oUgxBXv/7rEN26fCN4B.CZcfpi0a',
    );
    expect(isValid).toBeFalsy();
  });
});
