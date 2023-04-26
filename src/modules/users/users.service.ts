import { Injectable } from '@nestjs/common';
import {
  UserDTO,
  UserFounded,
  UserCreationResponse,
} from '../../interfaces/users.interface';
import { PrismaService } from 'src/database/PrismaService';
import {
  USERS_RESPONSES,
  maxEmailLength,
  minEmailLength,
} from '../../shared/constants/users.constant';
import { isValidUserData } from '../../shared/utils/users.utils';
import { newError } from 'src/shared/responses';
import { isString, isValidNumber } from 'src/shared/utils/all.utils';

@Injectable()
export class UsersService {
  constructor(private _prisma: PrismaService) {}

  async createUser(data: UserDTO): Promise<UserCreationResponse> {
    const validUser = await this.isValidUser(data);
    if (validUser) {
      const userExists = await this.checkUserExistsByEmail(data.email);
      if (userExists) {
        throw newError(USERS_RESPONSES.CREATION.USER_ALREADY_EXISTS);
      }

      let userCreated = await this._prisma.user.create({ data });
      if (userCreated) {
        return {
          id: userCreated.id,
          email: userCreated.email,
          name: userCreated.name,
        } as UserCreationResponse;
      }
    } else {
      throw newError(USERS_RESPONSES.CREATION.INVALID_DATA);
    }
  }

  private async checkUserExistsByEmail(email: UserDTO['email']) {
    return await this._prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: number): Promise<UserFounded> {
    if (!this.isValidId(id)) {
      throw newError(USERS_RESPONSES.SEARCH.INVALID_ID);
    }
    id = Number(id);
    const userFounded = await this._prisma.user.findUnique({ where: { id } });
    if (!userFounded) {
      throw newError(USERS_RESPONSES.SEARCH.USER_NOT_FOUND);
    }
    const { name, email } = userFounded;
    return { id, name, email } as UserFounded;
  }

  isValidUser(data): Promise<boolean> {
    if (!isValidUserData(data)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_DATA);
    }
    if (!this.isValidEmail(data.email)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_EMAIL);
    }
    if (!this.isValidPassword(data.password)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_PASSWORD);
    }
    if (!this.isValidName(data.name)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_NAME);
    }
    return Promise.resolve(true);
  }

  isValidEmail(email: string) {
    console.log(email.includes('@'));
    return (
      email &&
      isString(email) &&
      email.includes('@') &&
      this.sizebetween(email, minEmailLength, maxEmailLength)
    );
  }

  sizebetween(value: string, min: number, max: number) {
    return value.length >= min && value.length <= max;
  }

  isValidPassword(password: string) {
    return password && isString(password);
  }

  isValidName(name: string) {
    return name && isString(name) && name.length >= 2 && name.length <= 125;
  }

  isValidId(id: any) {
    return id && isValidNumber(id);
  }
}
