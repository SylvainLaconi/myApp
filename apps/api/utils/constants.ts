import * as dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const HOST = process.env.API_HOST || '0.0.0.0';
const PORT = parseInt(process.env.API_PORT || '', 10) || 8080;
const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '', 10) || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || '';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || '';
const JWT_SECRET = process.env.JWT_SECRET;
const TYPEORM_SEEDING_FACTORIES = process.env.TYPEORM_SEEDING_FACTORIES;
const TYPEORM_SEEDING_SEEDS = process.env.TYPEORM_SEEDING_SEEDS;

export default {
  NODE_ENV,
  HOST,
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  JWT_SECRET,
  TYPEORM_SEEDING_FACTORIES,
  TYPEORM_SEEDING_SEEDS,
};
