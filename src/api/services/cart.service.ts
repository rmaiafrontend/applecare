import { apiClient } from '../client';
import type {
  AdicionarItemCarrinhoRequest,
  AtualizarItemCarrinhoRequest,
  ItemCarrinhoResponse,
} from '../types';

export const cartService = {
  list: (slug: string) =>
    apiClient<ItemCarrinhoResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/carrinho` }),

  add: (slug: string, data: AdicionarItemCarrinhoRequest) =>
    apiClient<ItemCarrinhoResponse>({ method: 'POST', path: `/api/v1/lojas/${slug}/carrinho`, body: data }),

  update: (slug: string, id: number, data: AtualizarItemCarrinhoRequest) =>
    apiClient<ItemCarrinhoResponse>({ method: 'PUT', path: `/api/v1/lojas/${slug}/carrinho/${id}`, body: data }),

  remove: (slug: string, id: number) =>
    apiClient<void>({ method: 'DELETE', path: `/api/v1/lojas/${slug}/carrinho/${id}` }),

  clear: (slug: string) =>
    apiClient<void>({ method: 'DELETE', path: `/api/v1/lojas/${slug}/carrinho` }),
};
