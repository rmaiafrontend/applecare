import { apiClient } from '../client';

export interface CepResponse {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export const utilsService = {
  consultarCep: (cep: string) =>
    apiClient<CepResponse>({ method: 'GET', path: `/api/v1/utils/cep/${cep}` }),
};
