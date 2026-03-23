import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bannerService } from '../services';
import type { CadastrarBannerRequest, AtualizarBannerRequest, BannerTipo } from '../types';

const KEYS = {
  admin: ['admin', 'banners'] as const,
  public: (slug: string, tipo?: BannerTipo) => ['store', slug, 'banners', tipo] as const,
};

export function useAdminBanners() {
  return useQuery({
    queryKey: KEYS.admin,
    queryFn: () => bannerService.list(),
  });
}

export function useCreateBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarBannerRequest) => bannerService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.admin }),
  });
}

export function useUpdateBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarBannerRequest }) => bannerService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.admin }),
  });
}

export function useDeactivateBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => bannerService.deactivate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.admin }),
  });
}

export function usePublicBanners(slug: string, tipo?: BannerTipo) {
  return useQuery({
    queryKey: KEYS.public(slug, tipo),
    queryFn: () => bannerService.publicList(slug, tipo),
    enabled: !!slug,
  });
}
