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
    url: process.env.POSTGRES_URL || '',
    entities: [`${process.cwd()}/dist/src/**/*.entity{ .ts,.js}`],
    synchronize: process.env.NODE_ENV === 'development' ? true : true, //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    autoLoadEntities: true,
    seeds: [process.env.TYPEORM_SEEDING_SEEDS],
    factories: [process.env.TYPEORM_SEEDING_FACTORIES],
    migrations: [' dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_typeorm',
    ssl: process.env.NODE_ENV === 'development' ? false : true,
  },
});
