export class ErrorCode extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type GenericResponseKey = 'SERVER_ERROR' | 'SUCCESS';
type GenericDataResponseKey = 'INVALID_DATA' | 'SUCCESS' | 'PROPERTY_MISSING';

// User Responses
type UserSearchResponseKey = 'USER_NOT_FOUND' | 'INVALID_ID';
type UserCreationResponseKey =
  | 'USER_ALREADY_EXISTS'
  | 'INVALID_EMAIL'
  | 'INVALID_PASSWORD'
  | 'INVALID_NAME';

type LoginResponsesKeys =
  | 'INVALID_EMAIL'
  | 'USER_DOESNT_EXISTS'
  | 'INVALID_CREDENTIALS';

type UserLoginResponse = {
  [key in
    | GenericResponseKey
    | GenericDataResponseKey
    | LoginResponsesKeys]: MessageStatus;
};

type UserCreationResponse = {
  [key in
    | UserCreationResponseKey
    | GenericResponseKey
    | GenericDataResponseKey]: MessageStatus;
};

export type MessageStatus = {
  message: string;
  status: number;
};

type UserSearchResponse = {
  [key in UserSearchResponseKey | GenericResponseKey]: MessageStatus;
};

export type UsersResponses = {
  CREATION: UserCreationResponse;
  SEARCH: UserSearchResponse;
  LOGIN: UserLoginResponse;
};
