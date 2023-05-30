import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/core/auth/auth.service';
import { responseData } from 'src/shared/responses';
import { LogoutService } from './logout.service';
import { TokenService } from 'src/core/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Controller('logout')
export class LogoutController {
  constructor(
    private _authService: AuthService,
    private _logoutService: LogoutService,
    private _tokenService: TokenService,
    private _jwtService: JwtService,
  ) {}

  @Post()
  async logout(@Body() body, @Res() res: Response, @Req() req: any) {
    console.log('logout');

    try {
      const { id } = body;
      const token = req.headers.authorization.split(' ')[1];

      // 10.1 - Validar o tipo do campo id, campo inválido? Erro 400
      if (!id) {
        return responseData(res, 400, { message: 'Informe um ID válido' });
      }
      let idNumber = Number(id);
      if (isNaN(idNumber)) {
        return responseData(res, 400, { message: 'Informe um ID válido' });
      }

      // 10.2 - O usuário solicitante está autenticado? Erro 401
      const tokenData = await this._tokenService.getToken(token);
      const { isValid } = tokenData;
      if (!isValid) {
        return responseData(res, 401, {
          message: 'O usuário solicitante não está autenticado',
        });
      }

      // 10.3 - O usuário informado existe? (URL) Erro 401
      const UserFounded = await this._authService.validateUserById(idNumber);
      if (!UserFounded) {
        return responseData(res, 401, {
          message: 'O usuário informado não existe',
        });
      }

      // 10.4 - O ID informado no body da requisição corresponde ao ID do usuário solicitante (ID armazenado no token)? Erro 401
      const tokenDecoded = await this._jwtService.decode(token);
      if (
        tokenDecoded['id'] &&
        Number(tokenDecoded['id']) !== Number(idNumber)
      ) {
        return responseData(res, 401, {
          message:
            'O ID informado não corresponde ao ID do usuário solicitante',
        });
      }

      if (UserFounded) {
        await this._logoutService.logout(token);
        return responseData(res, 200, {
          message: 'Logout realizado com sucesso',
        });
      }
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }
}
