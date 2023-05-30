import { Prisma } from '@prisma/client';

export type TokenDTO = Prisma.TokenCreateInput;

export type TokenWithId = {
  id?: number;
  token: string;
  isValid: boolean;
};

// Token creation validation types
export type TokenCreationValidated = {
  token: string;
};
