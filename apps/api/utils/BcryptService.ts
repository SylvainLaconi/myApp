import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltOrRounds);
  } catch (error) {
    throw new Error('BcryptService - hashPassword()');
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error('BcryptService - comparePassword()');
  }
};
