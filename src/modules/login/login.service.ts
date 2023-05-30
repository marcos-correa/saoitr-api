import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from 'src/interfaces/users.interface';
import { AuthService } from 'src/core/auth/auth.service';
import { newError } from 'src/shared/responses';
import {
  USERS_RESPONSES,
  maxEmailLength,
  minEmailLength,
} from 'src/shared/constants/users.constant';
import { TokenService } from 'src/core/token/token.service';
import { isValidLoginUserData } from 'src/shared/utils/users.utils';
import { isString, sizeBetween } from 'src/shared/utils/all.utils';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class LoginService {
  constructor(
    private _tokenService: TokenService,
    private _jwtService: JwtService,
    private _authService: AuthService,
    private _prisma: PrismaService,
  ) {}

  async login(user: UserLogin) {
    // 2.1 - Validate user data from request
    // 2.2 - Validate user exists in database
    const isValidUserData = await this._isValidLoginData(user);
    if (isValidUserData) {
      // 2.3 - Validate password matches with database
      const validUser = await this._authService.validateUser(
        user.email,
        user.password,
      );
      if (validUser) {
        const payload = { username: user.email, id: validUser.id };
        const token = this._jwtService.sign(payload);
        await this._tokenService.addToken(token);
        return {
          ...validUser,
          password: undefined,
          token,
        };
      } else {
        throw newError(USERS_RESPONSES.LOGIN.INVALID_CREDENTIALS);
      }
    }
  }

  private async _isValidLoginData(user: UserLogin): Promise<boolean> {
    if (!isValidLoginUserData(user)) {
      throw newError(USERS_RESPONSES.LOGIN.PROPERTY_MISSING);
    }
    if (!this.isValidEmail(user.email)) {
      throw newError(USERS_RESPONSES.LOGIN.INVALID_EMAIL);
    }
    const userExists = await this._prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!userExists) {
      throw newError(USERS_RESPONSES.LOGIN.USER_DOESNT_EXISTS);
    }
    return Promise.resolve(true);
  }

  // TODO: move this to a shared file
  isValidEmail(email: string) {
    return (
      email &&
      isString(email) &&
      email.includes('@') &&
      sizeBetween(email, minEmailLength, maxEmailLength)
    );
  }
}
