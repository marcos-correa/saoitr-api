import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from 'src/core/token/token.service';
import { responseData } from 'src/shared/responses';

@Injectable()
export class BlacklistTokenMiddleware implements NestMiddleware {
  constructor(private _tokenService: TokenService) {}
  async use(req: any, res: Response, next: () => void) {
    const token = req.headers.authorization.split(' ')[1];
    this._tokenService.setSessionToken(token);
    if (!token || token === 'null') {
      throw new responseData(res, 400, { message: 'Token is required' });
    }

    try {
      const tokenFounded = await this._tokenService.getToken(token);
      if (tokenFounded.isValid) {
        next();
      } else {
        throw new responseData(res, 400, { message: 'Token is invalid' });
      }
    } catch (error) {
      const { message, status } = error;
      throw new responseData(res, status, { message });
    }
  }
}
