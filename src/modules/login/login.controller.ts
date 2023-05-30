import { Body, Controller, Post, Res } from '@nestjs/common';
import { responseData } from 'src/shared/responses';
import { Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private _loginService: LoginService) {}

  @Post()
  async login(@Body() req, @Res() res: Response) {
    console.log('login');
    console.table(req);
    try {
      const validUserWithToken = await this._loginService.login(req);
      return responseData(res, 200, validUserWithToken);
    } catch (error) {
      console.log(error);
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }
}
