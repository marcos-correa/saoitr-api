import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/PrismaService';
import { TokenDTO } from 'src/interfaces/token.interface';
import { newError } from 'src/shared/responses';

@Injectable()
export class TokenService {
  token: string = '';
  userTokenId: number = null;
  constructor(private prisma: PrismaService, private _jwtService: JwtService) {}

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

  getTokenFromRequest(req) {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  async getUserTokenId(req) {
    // Getting the token from the request
    const token = req.headers.authorization.split(' ')[1];

    // Getting the token from the database
    const tokenFounded = await this.getToken(token);

    // Checking if the token is valid
    const { isValid } = tokenFounded;

    if (!isValid) {
      const errorToken = {
        message: 'O usuário não está autenticado',
        status: 401,
      };
      throw newError(errorToken);
    }

    // Getting the user id from the token
    const tokenDecoded = await this._jwtService.decode(token);
    const id = tokenDecoded['id'];
    this.userTokenId = Number(id);

    // Returning the user id from the token
    return this.userTokenId;
  }
}
