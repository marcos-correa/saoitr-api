import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserFounded } from '../../interfaces/users.interface';
import { Response } from 'express';
import { responseData, responseError } from 'src/shared/responses';
import { USERS_RESPONSES } from 'src/shared/constants/users.constant';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

// This is the controller, so it's the endpoint /users
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() data: UserDTO, @Res() res: Response) {
    console.log('create');
    console.table(data);
    try {
      const userCreated = await this.userService.createUser(data);
      return responseData(
        res,
        USERS_RESPONSES.CREATION.SUCCESS.status,
        userCreated,
      );
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return responseData(res, 200, users);
    } catch (error) {
      return responseError(res, error);
    }
  }

  @Get(':id')
  async getUserById(@Param() param, @Res() res: Response) {
    try {
      const userFounded: UserFounded = await this.userService.getUserById(
        param.id,
      );
      if (userFounded) {
        return responseData(res, 200, userFounded);
      }
    } catch (error) {
      return responseError(res, error);
    }
  }
}
