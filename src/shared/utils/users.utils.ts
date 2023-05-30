import { UserCreationValidated } from '../../interfaces/users.interface';
import { hasAllKeysOfType } from './all.utils';

// Function to test if the data is valid
export function isValidUserData(data: any) {
  if (
    hasAllKeysOfType<UserCreationValidated, keyof UserCreationValidated>(data, [
      'name',
      'email',
      'password',
    ])
  ) {
    return true;
  }
  return false;
}

export function isValidLoginUserData(data: any) {
  if (
    hasAllKeysOfType<UserCreationValidated, keyof UserCreationValidated>(data, [
      'email',
      'password',
    ])
  ) {
    return true;
  }
  return false;
}
