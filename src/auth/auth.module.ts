import { Module } from '@nestjs/common';
import { AuthController } from './interface/auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepositoryImplement } from './infrastructure/repository/user.repository-implement';
import { UserSignUpHandler } from './application/command/sign-up/sign-up.handler';
import { InjectionToken } from './application/inject-token';

@Module({
  imports:[CqrsModule],
  controllers: [AuthController],
  providers: [
    {
      provide:InjectionToken.USER_REPOSITORY,
      useClass:UserRepositoryImplement
    },
    UserSignUpHandler]
})
export class AuthModule {}
