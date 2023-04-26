import { UsersResponses } from "src/interfaces/responses.interface";
export const USERS_RESPONSES: UsersResponses = {
  CREATION: {
    PROPERTY_MISSING: {
      message:
        'As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.',
      status: 400,
    },
    USER_ALREADY_EXISTS: {
      message: 'Usuário já existe no banco de dados',
      status: 400,
    },
    SERVER_ERROR: {
      message: 'Erro ao tentar cadastrar o usuário no servidor',
      status: 500,
    },
    SUCCESS: {
      message: 'Cadastro realizado com sucesso',
      status: 200,
    },
    INVALID_DATA: {
      message:
        'As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.',
      status: 400,
    },
    INVALID_EMAIL: {
      message: 'O email informado não é válido',
      status: 400,
    },
    INVALID_PASSWORD: {
      message: 'A senha informada não é válida',
      status: 400,
    },
    INVALID_NAME: {
      message: 'O nome informado não é válido',
      status: 400,
    },
  },

  SEARCH: {
    SUCCESS: {
      message: 'Usuário encontrado com sucesso',
      status: 200,
    },
    USER_NOT_FOUND: {
      message: 'Usuário não encontrado',
      status: 400,
    },
    SERVER_ERROR: {
      message: 'Erro ao tentar buscar o usuário no servidor',
      status: 500,
    },
    INVALID_ID: {
      message: 'O id informado não é válido',
      status: 400,
    },
  },
};

export const minPasswordLength = 2;
export const maxPasswordLength = 125;
export const minNameLength = 2;
export const maxNameLength = 125;
export const minEmailLength = 10;
export const maxEmailLength = 125;
