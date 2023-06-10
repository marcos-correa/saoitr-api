import { Injectable } from '@nestjs/common';
import { Occurrence } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import {
  OccurenceCreation,
  OccurrenceDTO,
} from 'src/interfaces/occurences.interface';
import {
  isString,
  isValidDate,
  isValidIsoDate,
  isValidNumber,
  sizeBetween,
} from 'src/shared/utils/all.utils';
import { UsersService } from '../users/users.service';
import { newError } from 'src/shared/responses';
import { OCCURRENCES_CREATION } from 'src/shared/constants/occurrences.response';

@Injectable()
export class OccurrencesService {
  constructor(
    private _prisma: PrismaService,
    private _userService: UsersService,
  ) {}

  async getAllOccurrences(): Promise<Occurrence[]> {
    const occurrences = await this._prisma.occurrence.findMany();
    return occurrences;
  }

  async getOccurrencesByUserId(user_id: number): Promise<Occurrence[]> {
    const occurrences = await this._prisma.occurrence.findMany({
      where: {
        user_id,
      },
    });
    return occurrences;
  }

  async getOccurrenceById(occurrenceId: number): Promise<Occurrence> {
    const occurrence = await this._prisma.occurrence.findUnique({
      where: {
        id: occurrenceId,
      },
    });
    return occurrence;
  }

  async createOccurrence(occurrenceDTO: OccurrenceDTO): Promise<Occurrence> {
    const isValidOccurrence = await this._isValidOccurrence(occurrenceDTO);
    if (isValidOccurrence) {
      const createdOccurence = await this._prisma.occurrence.create({
        data: occurrenceDTO,
      });
      if (!createdOccurence) {
        throw new Error('Error creating occurrence');
      } else {
        return createdOccurence;
      }
    }
  }

  async updateOccurrence(
    occurrenceDTO: OccurrenceDTO,
    occurrenceId: number,
  ): Promise<Occurrence> {
    const isValidOccurrence = await this._isValidOccurrence(occurrenceDTO);
    if (isValidOccurrence) {
      const updatedOccurence = await this._prisma.occurrence.update({
        where: { id: occurrenceId },
        data: occurrenceDTO,
      });
      if (!updatedOccurence) {
        throw new Error('Error updating occurrence');
      } else {
        return updatedOccurence;
      }
    }
  }

  private async _isValidOccurrence(
    occurrenceDTO: any,
  ): Promise<OccurenceCreation> {
    const { registered_at, local, occurrence_type, user_id, km } =
      occurrenceDTO;
    if (!isValidIsoDate(registered_at)) {
      throw newError(OCCURRENCES_CREATION.INVALID_DATE);
    }
    if (!isValidDate(registered_at)) {
      throw newError(OCCURRENCES_CREATION.INVALID_FUTURE_DATE);
    }
    if (!sizeBetween(occurrence_type, 1, 10)) {
      throw newError(OCCURRENCES_CREATION.INVALID_OCCURENCE_TYPE_ID);
    }
    if (!sizeBetween(km, 1, 9999)) {
      throw newError(OCCURRENCES_CREATION.INVALID_KM);
    }
    if (!isString(local)) {
      throw newError(OCCURRENCES_CREATION.INVALID_LOCAL);
    }
    if (!isValidNumber(user_id)) {
      throw newError(OCCURRENCES_CREATION.INVALID_USER_ID);
    }
    const userExists = await this._userService.getUserById(user_id);
    if (!userExists) {
      throw newError(OCCURRENCES_CREATION.USER_NOT_FOUND);
    }
    return Promise.resolve(occurrenceDTO);
  }

  async deleteOccurrence(occurrenceId: number): Promise<Occurrence> {
    const deletedOccurence = await this._prisma.occurrence.delete({
      where: { id: occurrenceId },
    });
    if (!deletedOccurence) {
      throw new Error('Error deleting occurrence');
    } else {
      return deletedOccurence;
    }
  }
}
