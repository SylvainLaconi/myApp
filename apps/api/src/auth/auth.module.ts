import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import constants from 'utils/constants';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { SignUpGuard } from './signup.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: constants.JWT_SECRET,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SignUpGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
