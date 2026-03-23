import { apiClient } from '../client';
import type {
  IdentificarClienteRequest,
  AtualizarClienteRequest,
  ClienteResponse,
} from '../types';

export const customerService = {
  identify: (slug: string, data: IdentificarClienteRequest) =>
    apiClient<ClienteResponse>({ method: 'POST', path: `/api/v1/lojas/${slug}/clientes/identificar`, body: data }),

  update: (slug: string, id: number, data: AtualizarClienteRequest) =>
    apiClient<ClienteResponse>({ method: 'PUT', path: `/api/v1/lojas/${slug}/clientes/${id}`, body: data }),
};
