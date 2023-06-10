import {
  OccurenceCreationResponse,
  OccurencesResponses,
} from 'src/interfaces/responses.interface';

export const OCCURENCES_RESPONSES: OccurencesResponses = {
  CREATION: {
    PROPERTY_MISSING: {
      message:
        'As credenciais informadas não correspondem ao modelo correto da requisição. Por favor verifique os dados informados e tente novamente.',
      status: 400,
    },
    SERVER_ERROR: {
      message: 'Erro ao tentar cadastrar a ocorrência no servidor',
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
    INVALID_DATE: {
      message: 'A data informada não é válida. Use o formato ISO 8601',
      status: 400,
    },
    INVALID_FUTURE_DATE: {
      message:
        'Você está planejando um acidente? A data informada deve ser anterior a data atual',
      status: 400,
    },
    INVALID_KM: {
      message: 'O KM informado não é válido',
      status: 400,
    },
    INVALID_USER_ID: {
      message: 'O id do usuário informado não é válido',
      status: 400,
    },
    INVALID_OCCURENCE_TYPE_ID: {
      message: 'O id do tipo de ocorrência informado não é válido',
      status: 400,
    },
    INVALID_LOCAL: {
      message: 'O local informado não é válido',
      status: 400,
    },
    USER_NOT_FOUND: {
      message: 'Usuário não encontrado',
      status: 400,
    },
  },
};

export const OCCURRENCES_CREATION: OccurenceCreationResponse =
  OCCURENCES_RESPONSES.CREATION;
