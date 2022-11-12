import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import ormconfig from './type-orm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import constants from '../utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${constants.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
