import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
