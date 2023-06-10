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
import { OccurrencesService } from './occurrences.service';
import { responseData } from 'src/shared/responses';
import { Response } from 'express';
import { TokenService } from 'src/core/token/token.service';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

@Controller('occurrences')
export class OccurrencesController {
  constructor(
    private _occurrencesService: OccurrencesService,
    private _tokenService: TokenService,
  ) {}

  // EP 2
  @Get()
  async getAllOccurrences(@Res() res: Response) {
    try {
      // TODO: CHECK STATUS CODE
      const occurences = await this._occurrencesService.getAllOccurrences();
      return responseData(res, 200, occurences);
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }
  // EP 3
  @Get('/id')
  async getOccurrenceById() {
    console.log('get occurrence by id');
  }

  @Get('/users/:id')
  async getOccurrencesByUserId(@Req() req, @Res() res: Response) {
    try {
      const userId = Number(req.params.id);
      const occurrences = await this._occurrencesService.getOccurrencesByUserId(
        userId,
      );
      return responseData(res, 200, occurrences);
    } catch (error) {
      console.log(error);
      return responseData(res, 500, { message: 'Internal server error' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOccurrence(@Req() req, @Body() body, @Res() res: Response) {
    try {
      // 10.2 - O usuário solicitante está autenticado? Erro 401
      const token = req.headers.authorization.split(' ')[1];
      const tokenData = await this._tokenService.getToken(token);
      const { isValid } = tokenData;
      if (!isValid) {
        return responseData(res, 401, {
          message: 'O usuário solicitante não está autenticado',
        });
      }

      const createdOccurence = await this._occurrencesService.createOccurrence(
        body,
      );
      return responseData(res, 201, createdOccurence);
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateOccurrence(
    @Param() param,
    @Req() req,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const { id } = param;
      const userTokenId = await this._tokenService.getUserTokenId(req);
      const { user_id } = body;
      if (Number(userTokenId) !== Number(user_id)) {
        return responseData(res, 401, {
          message:
            'O usuário solicitante não corresponde ao usuário autenticado',
        });
      }

      const updatedOccurence = await this._occurrencesService.updateOccurrence(
        body,
        Number(id),
      );
      return responseData(res, 200, updatedOccurence);
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteOccurente(@Param() param, @Req() req, @Res() res: Response) {
    try {
      const { id } = param;
      const userTokenId = await this._tokenService.getUserTokenId(req);

      const occurrence = await this._occurrencesService.getOccurrenceById(
        Number(id),
      );

      if (occurrence.user_id !== userTokenId) {
        return responseData(res, 401, {
          message:
            'O usuário solicitante não corresponde ao usuário do registro',
        });
      }

      const deletedOccurence = await this._occurrencesService.deleteOccurrence(
        Number(id),
      );
      if (deletedOccurence) {
        return responseData(res, 200, {
          message: 'Ocorrencia excluída com sucesso',
        });
      } else {
        return responseData(res, 500, {
          message: 'Não foi possível excluir a ocorrência',
        });
      }
    } catch (error) {
      const { message, status } = error;
      return responseData(res, status, { message });
    }
  }
}
