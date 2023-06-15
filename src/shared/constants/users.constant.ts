import {
  OccurencesResponses,
  UsersResponses,
} from 'src/interfaces/responses.interface';
export const USERS_RESPONSES: UsersResponses = {
  CREATION: {
    PROPERTY_MISSING: {
      message:
        'As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.',
      status: 400,
    },
    USER_ALREADY_EXISTS: {
      message: 'Usuário já existe no banco de dados',
      status: 422,
    },
    SERVER_ERROR: {
      message: 'Erro ao tentar cadastrar o usuário no servidor',
      status: 500,
    },
    SUCCESS: {
      message: 'Cadastro realizado com sucesso',
      status: 201,
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

  UPDATE: {
    PROPERTY_MISSING: {
      message:
        'As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.',
      status: 400,
    },
    USER_NOT_FOUND: {
      message: 'Usuário não encontrado',
      status: 400,
    },
    SERVER_ERROR: {
      message: 'Erro ao tentar atualizar o usuário no servidor',
      status: 500,
    },
    SUCCESS: {
      message: 'Usuário atualizado com sucesso',
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
    INVALID_NAME: {
      message: 'O nome informado não é válido',
      status: 400,
    },
    USER_EMAIL_ALREADY_EXISTS: {
      message: 'O email informado já está em uso',
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

  LOGIN: {
    SUCCESS: {
      message: 'Login realizado com sucesso',
      status: 200,
    },
    INVALID_DATA: {
      message: 'Senha ou email inválidos',
      status: 400,
    },
    INVALID_EMAIL: {
      message: 'O email informado não é válido',
      status: 400,
    },
    PROPERTY_MISSING: {
      message:
        'As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.',
      status: 400,
    },
    SERVER_ERROR: {
      message: 'Erro ao tentar realizar o login',
      status: 500,
    },
    USER_DOESNT_EXISTS: {
      message: 'Usuário informado não existe',
      status: 401,
    },
    INVALID_CREDENTIALS: {
      message: 'Credenciais inválidas',
      status: 401,
    },
    INVALID_TOKEN_REQUESTED: {
      message: 'O ID informado não corresponde ao ID do usuário solicitante ',
      status: 401,
    },
  },
};

export const minPasswordLength = 2;
export const maxPasswordLength = 125;
export const minNameLength = 2;
export const maxNameLength = 125;
export const minEmailLength = 10;
export const maxEmailLength = 125;
