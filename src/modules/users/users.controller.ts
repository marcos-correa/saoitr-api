import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserFounded } from '../../interfaces/users.interface';
import { Response } from 'express';
import { responseData, responseError } from 'src/shared/responses';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { TokenService } from 'src/core/token/token.service';
import { USERS_RESPONSES } from 'src/shared/constants/users.constant';

// This is the controller, so it's the endpoint /users
@Controller('users')
export class UsersController {
  constructor(
    private _userService: UsersService,
    private _tokenService: TokenService,
  ) {}

  @Post()
  async createUser(@Body() data: UserDTO, @Res() res: Response) {
    console.log('create');
    console.table(data);
    try {
      const userCreated = await this._userService.createUser(data);
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
      const users = await this._userService.getAllUsers();
      return responseData(res, 200, users);
    } catch (error) {
      return responseError(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param() param, @Res() res: Response, @Req() req: any) {
    try {
      const userTokenId = await this._tokenService.getUserTokenId(req);

      if (Number(userTokenId) !== Number(param.id)) {
        return responseData(res, 401, {
          message:
            'O usuário solicitante não corresponde ao usuário autenticado.',
        });
      }

      const userFounded: UserFounded = await this._userService.getUserById(
        param.id,
      );
      if (userFounded) {
        return responseData(res, 200, userFounded);
      }
    } catch (error) {
      return responseError(res, error);
    }
  }

  // EP 2
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserById(
    @Param() param,
    @Body() body,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const { id } = param;

      // Verioficar se há token de autenticação, se não houver, erro 401
      const userTokenId = await this._tokenService.getUserTokenId(req);

      // Verificar se o usuário solicitante é o mesmo usuário autenticado, se não for, erro 401
      if (Number(userTokenId) !== Number(id)) {
        return responseData(res, 401, {
          message:
            'O usuário solicitante não corresponde ao usuário autenticado.',
        });
      }

      // Verificar se o usuário existe, se não existir, erro 404
      if (await this._userService.getUserById(id)) {
        // Validar todos os campos (tipo, mínimo, máximo, obrigatoriedade, extras), campos são válidos? Erro 400
        const updatedUser = await this._userService.updateUser(id, body);
        if (!updatedUser) {
          return responseData(res, 400, { message: 'Usuário não atualizado' });
        }
        return responseData(res, 200, updatedUser);
      } else {
        return responseData(res, 404, { message: 'Usuário não encontrado' });
      }
    } catch (error) {
      return responseError(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Param() param, @Req() req, @Res() res: Response) {
    try {
      const { id } = param;

      const userTokenId = await this._tokenService.getUserTokenId(req);

      const user = await this._userService.getUserById(Number(id));

      if (user.id !== userTokenId) {
        return responseData(res, 401, {
          message: 'O usuário solicitante não corresponde da solicitação',
        });
      }

      const deletedUser = await this._userService.deleteUserById(Number(id));
      if (deletedUser) {
        await this.invalidateToken(req);
        return responseData(res, 200, {
          message: 'Usuário excluido com sucesso',
        });
      } else {
        return responseData(res, 500, {
          message: 'Não foi possível excluir o usuário',
        });
      }
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }

  async invalidateToken(@Req() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    await this._tokenService.invalidateToken(token);
  }
}
