import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

import constants from '../utils/constants';

const ormconfig: TypeOrmModuleOptions & DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: constants.POSTGRES_HOST,
  extra: {
    socketPath: constants.POSTGRES_HOST,
  },
  port: constants.POSTGRES_PORT,
  username: constants.POSTGRES_USER,
  password: constants.POSTGRES_PASSWORD,
  database: constants.POSTGRES_DATABASE,
  entities: [`${__dirname}/**/*.entity{ .ts,.js}`],
  synchronize: true, //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
  autoLoadEntities: true,
  seeds: [constants.TYPEORM_SEEDING_SEEDS],
  factories: [constants.TYPEORM_SEEDING_FACTORIES],
  migrations: [' dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  envFilePath: [`env.${process.env.NODE_ENV}`],
};

export const dataSource = new DataSource(ormconfig);

export default ormconfig;
