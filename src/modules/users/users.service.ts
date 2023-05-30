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
import * as bcrypt from 'bcrypt';
import { newError } from 'src/shared/responses';
import {
  isString,
  isValidNumber,
  sizeBetween,
} from 'src/shared/utils/all.utils';

@Injectable()
export class UsersService {
  constructor(private _prisma: PrismaService) {}

  async createUser(userDTO: UserDTO): Promise<UserCreationResponse> {
    const isValidUser = await this._isValidUser(userDTO);
    if (isValidUser) {
      const data = {
        ...userDTO,
        password: await bcrypt.hash(userDTO.password, 10),
      };

      const createdUser = await this._prisma.user.create({ data });

      if (createdUser) {
        return {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
        } as UserCreationResponse;
      }
    }
  }

  async getUserById(id: number): Promise<UserFounded> {
    const isValidId = this.isValidId(id);
    if (isValidId) {
      id = Number(id);
      const userFounded = await this._prisma.user.findUnique({ where: { id } });
      if (!userFounded) {
        throw newError(USERS_RESPONSES.SEARCH.USER_NOT_FOUND);
      }
      const { name, email } = userFounded;
      return { id, name, email } as UserFounded;
    }
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const userFounded = await this._prisma.user.findUnique({
      where: { email },
    });
    if (!userFounded) {
      throw newError(USERS_RESPONSES.SEARCH.USER_NOT_FOUND);
    }
    return userFounded;
  }

  async getAllUsers(): Promise<UserFounded[]> {
    const users = await this._prisma.user.findMany();
    if (users) {
      return users.map((user) => {
        const { id, name, email } = user;
        return { id, name, email } as UserFounded;
      });
    }
  }

  private async _isValidUser(user: UserDTO): Promise<boolean> {
    if (!isValidUserData(user)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_DATA);
    }
    if (!this.isValidEmail(user.email)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_EMAIL);
    }
    if (!this.isValidPassword(user.password)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_PASSWORD);
    }
    if (!this.isValidName(user.name)) {
      throw newError(USERS_RESPONSES.CREATION.INVALID_NAME);
    }
    const { email } = user;
    const userExists = await this._prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw newError(USERS_RESPONSES.CREATION.USER_ALREADY_EXISTS);
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

  // TODO: move this to a shared file
  isValidPassword(password: string) {
    return password && isString(password);
  }

  isValidName(name: string) {
    return name && isString(name) && name.length >= 2 && name.length <= 125;
  }

  async isValidId(id: any): Promise<boolean> {
    if (!id || !isValidNumber(id)) {
      throw newError(USERS_RESPONSES.SEARCH.INVALID_ID);
    }
    return Promise.resolve(true);
  }
}
