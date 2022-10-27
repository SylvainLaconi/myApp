import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import constants from '../utils/constants';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: constants.POSTGRES_HOST,
  port: constants.POSTGRES_PORT,
  username: constants.POSTGRES_USER,
  password: constants.POSTGRES_PASSWORD,
  database: constants.POSTGRES_DATABASE,
  entities: [User],
  synchronize: true, //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  autoLoadEntities: true,
};

export default config;
