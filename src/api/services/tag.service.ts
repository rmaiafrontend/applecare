import { apiClient } from '../client';
import type {
  DesativarResponse,
  CadastrarEtiquetaRequest,
  AtualizarEtiquetaRequest,
  EtiquetaResponse,
} from '../types';

export const tagService = {
  // Admin
  create: (data: CadastrarEtiquetaRequest) =>
    apiClient<EtiquetaResponse>({ method: 'POST', path: '/api/v1/admin/etiquetas', body: data }),

  update: (id: number, data: AtualizarEtiquetaRequest) =>
    apiClient<EtiquetaResponse>({ method: 'PUT', path: `/api/v1/admin/etiquetas/${id}`, body: data }),

  deactivate: (id: number) =>
    apiClient<DesativarResponse>({ method: 'PATCH', path: `/api/v1/admin/etiquetas/${id}/desativar` }),

  // Public
  publicList: (slug: string) =>
    apiClient<EtiquetaResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/etiquetas` }),
};
