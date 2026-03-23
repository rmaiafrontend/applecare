import { apiClient } from '../client';
import type { LojaPublicaResponse, BuscaInteligenteResponse } from '../types';

export const storeService = {
  get: (slug: string) =>
    apiClient<LojaPublicaResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}` }),

  search: (slug: string, q: string, limite?: number) =>
    apiClient<BuscaInteligenteResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/busca`, params: { q, limite } }),
};
