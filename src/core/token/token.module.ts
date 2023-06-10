import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TokenController],
  providers: [TokenService, PrismaService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
