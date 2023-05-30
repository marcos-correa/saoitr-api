import { Prisma } from '@prisma/client';

export type UserDTO = Prisma.UserCreateInput;

export type UserWithId = {
  id?: number;
  name?: string;
  email: string;
  password: string;
};

// User creation validation types
export type UserCreationValidated = {
  name: string;
  email: string;
  password: string;
};
export type UserCreationValidatedKeys = keyof UserCreationValidated;

// User creation response type

export type UserResponse = {
  id: number;
  name: string;
  email: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserCreationResponse = UserResponse;
export type UserFounded = UserResponse;
