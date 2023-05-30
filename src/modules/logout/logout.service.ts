import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/core/token/token.service';

@Injectable()
export class LogoutService {
  constructor(private _tokenService: TokenService) {}

  async logout(token: any) {
    await this._tokenService.invalidateToken(token);
  }
}
