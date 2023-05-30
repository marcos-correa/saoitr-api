import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from 'src/interfaces/users.interface';
import { newError, responseData, responseError } from 'src/shared/responses';
import { USERS_RESPONSES } from 'src/shared/constants/users.constant';
import { TokenService } from '../token/token.service';
import { hasAllKeysOfType } from 'src/shared/utils/all.utils';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService,
    private _tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userFounded = await this._usersService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, userFounded.password);

    if (userFounded && isMatch) {
      return {
        ...userFounded,
        password: undefined,
      };
    }
    return null;
  }

  async validateUserById(id: number): Promise<any> {
    const userFounded = await this._usersService.getUserById(id);
    if (userFounded) {
      return {
        ...userFounded,
        password: undefined,
      };
    }
    return null;
  }

  // async login(user: UserLogin) {
  //   const validUser = await this.validateUser(user.email, user.password);
  //   const payload = { username: user.email };
  //   const token = this._jwtService.sign(payload);
  //   await this._tokenService.addToken(token);
  //   if (validUser) {
  //     return {
  //       ...validUser,
  //       password: undefined,
  //       token,
  //     };
  //   } else {
  //     throw newError(USERS_RESPONSES.LOGIN.INVALID_DATA);
  //   }
  // }
}
