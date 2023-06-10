import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../database/PrismaService';
import { TokenService } from 'src/core/token/token.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, TokenService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
