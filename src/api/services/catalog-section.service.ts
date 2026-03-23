import { apiClient } from '../client';
import type {
  DesativarResponse,
  CadastrarSecaoCatalogoRequest,
  AtualizarSecaoCatalogoRequest,
  SecaoCatalogoResponse,
  SecaoCatalogoPublicaResponse,
} from '../types';

export const catalogSectionService = {
  // Admin
  list: () =>
    apiClient<SecaoCatalogoResponse[]>({ method: 'GET', path: '/api/v1/admin/secoes-catalogo' }),

  create: (data: CadastrarSecaoCatalogoRequest) =>
    apiClient<SecaoCatalogoResponse>({ method: 'POST', path: '/api/v1/admin/secoes-catalogo', body: data }),

  update: (id: number, data: AtualizarSecaoCatalogoRequest) =>
    apiClient<SecaoCatalogoResponse>({ method: 'PUT', path: `/api/v1/admin/secoes-catalogo/${id}`, body: data }),

  deactivate: (id: number) =>
    apiClient<DesativarResponse>({ method: 'PATCH', path: `/api/v1/admin/secoes-catalogo/${id}/desativar` }),

  // Public
  publicList: (slug: string) =>
    apiClient<SecaoCatalogoPublicaResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/secoes-catalogo` }),
};
