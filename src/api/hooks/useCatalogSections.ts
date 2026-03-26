import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogSectionService } from '../services';
import type { CadastrarSecaoCatalogoRequest, AtualizarSecaoCatalogoRequest } from '../types';

const KEYS = {
  admin: ['admin', 'catalog-sections'] as const,
  public: (slug: string) => ['store', slug, 'catalog-sections'] as const,
};

export function useAdminCatalogSections() {
  return useQuery({
    queryKey: KEYS.admin,
    queryFn: () => catalogSectionService.list(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
}

export function useCreateCatalogSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarSecaoCatalogoRequest) => catalogSectionService.create(data),
    onSettled: () => {
      qc.refetchQueries({ queryKey: KEYS.admin });
      qc.invalidateQueries({ queryKey: ['store'] });
    },
  });
}

export function useUpdateCatalogSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarSecaoCatalogoRequest }) => catalogSectionService.update(id, data),
    onSettled: () => {
      qc.refetchQueries({ queryKey: KEYS.admin });
      qc.invalidateQueries({ queryKey: ['store'] });
    },
  });
}

export function useDeactivateCatalogSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => catalogSectionService.deactivate(id),
    onSettled: () => {
      qc.refetchQueries({ queryKey: KEYS.admin });
      qc.invalidateQueries({ queryKey: ['store'] });
    },
  });
}

export function usePublicCatalogSections(slug: string) {
  return useQuery({
    queryKey: KEYS.public(slug),
    queryFn: () => catalogSectionService.publicList(slug),
    enabled: !!slug,
  });
}
