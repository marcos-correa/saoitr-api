import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TokenDTO } from 'src/interfaces/token.interface';
import { newError } from 'src/shared/responses';

@Injectable()
export class TokenService {
  token: string = '';
  constructor(private prisma: PrismaService) {}

  async getToken(token: string): Promise<TokenDTO> {
    const tokenFounded = await this.prisma.token.findUnique({
      where: {
        token,
      },
    });
    if (!tokenFounded) {
      const errorToken = {
        message: 'Token not found',
        status: 404,
      };
      throw newError(errorToken);
    }

    return tokenFounded as TokenDTO;
  }

  async addToken(token: string) {
    const tokenFounded = await this.prisma.token.findUnique({
      where: {
        token,
      },
    });
    if (!tokenFounded) {
      await this.prisma.token.create({
        data: {
          token,
        },
      });
    } else {
      const errorToken = {
        message: 'Token already exists',
        status: 400,
      };
      throw newError(errorToken);
    }
  }

  async invalidateToken(token: string) {
    await this.prisma.token.update({
      where: {
        token,
      },
      data: {
        isValid: false,
      },
    });
  }

  setSessionToken(token: string) {
    this.token = token;
  }

  getSessionToken() {
    return this.token;
  }
}
