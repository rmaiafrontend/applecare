import { apiClient } from '../client';
import type {
  CriarPedidoRequest,
  PedidoResponse,
  PedidoPaginadoResponse,
  PaginationParams,
} from '../types';

export const orderService = {
  // Public
  list: (slug: string, params?: PaginationParams) =>
    apiClient<PedidoPaginadoResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/pedidos`, params: params as Record<string, string | number | boolean | undefined> }),

  getById: (slug: string, id: number) =>
    apiClient<PedidoResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/pedidos/${id}` }),

  getByNumber: (slug: string, numeroPedido: string) =>
    apiClient<PedidoResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/pedidos/numero/${numeroPedido}` }),

  create: (slug: string, data: CriarPedidoRequest) =>
    apiClient<PedidoResponse>({ method: 'POST', path: `/api/v1/lojas/${slug}/pedidos`, body: data }),

  // Admin
  adminList: (params?: PaginationParams) =>
    apiClient<PedidoPaginadoResponse>({ method: 'GET', path: '/api/v1/admin/pedidos', params: params as Record<string, string | number | boolean | undefined> }),

  adminGetById: (id: number) =>
    apiClient<PedidoResponse>({ method: 'GET', path: `/api/v1/admin/pedidos/${id}` }),
};
