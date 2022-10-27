import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import config from 'src/type-orm.config';
import { User } from './users/user.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: ['.env'],
    // }),
    TypeOrmModule.forRoot(config),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
