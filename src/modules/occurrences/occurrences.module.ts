import { PrismaService } from './../../database/PrismaService';
import { Module } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { OccurrencesController } from './occurrences.controller';
import { UsersModule } from '../users/users.module';
import { TokenModule } from 'src/core/token/token.module';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
  controllers: [OccurrencesController],
  providers: [OccurrencesService, PrismaService],
  imports: [AuthModule, UsersModule, TokenModule],
  exports: [OccurrencesService],
})
export class OccurrencesModule {}
