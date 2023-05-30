import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { AuthModule } from 'src/core/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/database/PrismaService';
import { LogoutController } from './logout.controller';

@Module({
  controllers: [LogoutController],
  providers: [LogoutService, PrismaService],
  imports: [AuthModule, UsersModule],
})
export class LogoutModule {}
