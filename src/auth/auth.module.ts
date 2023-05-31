import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserTypeORMRepository } from './repository/user.typeorm.repository';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { PasswordService } from './services/password.service';

dotenv.config();

@Module({
  exports: [{ provide: 'UserRepository', useClass: UserTypeORMRepository }],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    PasswordService,
    AuthService,
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserTypeORMRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
