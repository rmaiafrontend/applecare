import { apiClient } from '../client';
import type {
  IdResponse,
  DesativarResponse,
  CadastrarProdutoRequest,
  AtualizarProdutoRequest,
  ProdutoPaginadoResponse,
  ProdutoDetalheResponse,
  ProdutoResumoResponse,
  ProdutoListParams,
  AdminProdutoListParams,
  CompararProdutosRequest,
  ComparacaoProdutoResponse,
} from '../types';

export const productService = {
  // Admin
  list: (params?: AdminProdutoListParams) =>
    apiClient<ProdutoPaginadoResponse>({ method: 'GET', path: '/api/v1/admin/produtos', params: params as Record<string, string | number | boolean | undefined> }),

  create: (data: CadastrarProdutoRequest) =>
    apiClient<IdResponse>({ method: 'POST', path: '/api/v1/admin/produtos', body: data }),

  update: (id: number, data: AtualizarProdutoRequest) =>
    apiClient<IdResponse>({ method: 'PUT', path: `/api/v1/admin/produtos/${id}`, body: data }),

  deactivate: (id: number) =>
    apiClient<DesativarResponse>({ method: 'PATCH', path: `/api/v1/admin/produtos/${id}/desativar` }),

  // Public
  publicList: (slug: string, params?: ProdutoListParams) =>
    apiClient<ProdutoPaginadoResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/produtos`, params: params as Record<string, string | number | boolean | undefined> }),

  publicDetail: (slug: string, id: number) =>
    apiClient<ProdutoDetalheResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/produtos/${id}` }),

  publicRelated: (slug: string, id: number, limite?: number) =>
    apiClient<ProdutoResumoResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/produtos/${id}/relacionados`, params: { limite } }),

  compare: (slug: string, data: CompararProdutosRequest) =>
    apiClient<ComparacaoProdutoResponse>({ method: 'POST', path: `/api/v1/lojas/${slug}/produtos/comparar`, body: data }),
};
