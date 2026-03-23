import { apiClient } from '../client';
import type {
  DesativarResponse,
  CadastrarBannerRequest,
  AtualizarBannerRequest,
  BannerResponse,
  BannerTipo,
} from '../types';

export const bannerService = {
  // Admin
  list: () =>
    apiClient<BannerResponse[]>({ method: 'GET', path: '/api/v1/admin/banners' }),

  create: (data: CadastrarBannerRequest) =>
    apiClient<BannerResponse>({ method: 'POST', path: '/api/v1/admin/banners', body: data }),

  update: (id: number, data: AtualizarBannerRequest) =>
    apiClient<BannerResponse>({ method: 'PUT', path: `/api/v1/admin/banners/${id}`, body: data }),

  deactivate: (id: number) =>
    apiClient<DesativarResponse>({ method: 'PATCH', path: `/api/v1/admin/banners/${id}/desativar` }),

  // Public
  publicList: (slug: string, tipo?: BannerTipo) =>
    apiClient<BannerResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/banners`, params: { tipo } }),
};
