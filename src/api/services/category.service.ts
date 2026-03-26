import { apiClient } from '../client';
import type {
  DesativarResponse,
  MensagemResponse,
  CadastrarCategoriaRequest,
  AtualizarCategoriaRequest,
  ReordenarCategoriasRequest,
  CategoriaResponse,
} from '../types';

export const categoryService = {
  // Admin
  adminList: () =>
    apiClient<CategoriaResponse[]>({ method: 'GET', path: '/api/v1/admin/categorias' }),

  create: (data: CadastrarCategoriaRequest) =>
    apiClient<CategoriaResponse>({ method: 'POST', path: '/api/v1/admin/categorias', body: data }),

  update: (id: number, data: AtualizarCategoriaRequest) =>
    apiClient<CategoriaResponse>({ method: 'PUT', path: `/api/v1/admin/categorias/${id}`, body: data }),

  deactivate: (id: number) =>
    apiClient<DesativarResponse>({ method: 'PATCH', path: `/api/v1/admin/categorias/${id}/desativar` }),

  reorder: (data: ReordenarCategoriasRequest) =>
    apiClient<MensagemResponse>({ method: 'PUT', path: '/api/v1/admin/categorias/reordenar', body: data }),

  // Public
  publicList: (slug: string) =>
    apiClient<CategoriaResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/categorias` }),

  publicGet: (slug: string, id: number) =>
    apiClient<CategoriaResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/categorias/${id}` }),
};
