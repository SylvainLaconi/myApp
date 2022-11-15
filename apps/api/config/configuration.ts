export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  host: process.env.API_HOST,
  port: parseInt(process.env.PORT, 10) || 8080,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  db: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '',
    extra: {
      socketPath: process.env.POSTGRES_HOST,
    },
    port: parseInt(process.env.POSTGRES_PORT || '', 10) || 5432,
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    entities: [`${process.cwd()}/dist/src/**/*.entity{ .ts,.js}`],
    synchronize: process.env.NODE_ENV === 'development' ? true : false, //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    autoLoadEntities: true,
    seeds: [process.env.TYPEORM_SEEDING_SEEDS],
    factories: [process.env.TYPEORM_SEEDING_FACTORIES],
    migrations: [' dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_typeorm',
  },
});
