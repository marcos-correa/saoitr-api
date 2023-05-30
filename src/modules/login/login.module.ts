import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthModule } from 'src/core/auth/auth.module';
import { PrismaService } from 'src/database/PrismaService';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [LoginController],
  imports: [AuthModule, UsersModule],
  providers: [LoginService, PrismaService],
})
export class LoginModule {}
