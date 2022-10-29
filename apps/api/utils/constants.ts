import * as dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.API_HOST || '0.0.0.0';
const PORT = parseInt(process.env.API_PORT || '', 10) || 3000;
const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '', 10) || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || '';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || '';
const JWT_SECRET = process.env.JWT_SECRET;

export default {
  HOST,
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  JWT_SECRET,
};
