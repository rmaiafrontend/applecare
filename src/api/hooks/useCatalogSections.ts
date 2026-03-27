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
    staleTime: 30_000,
  });
}

function invalidateCatalogSectionQueries(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: KEYS.admin });
  qc.invalidateQueries({ predicate: (q) => {
    const key = q.queryKey as string[];
    return key[0] === 'store' && key[2] === 'catalog-sections';
  }});
}

export function useCreateCatalogSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarSecaoCatalogoRequest) => catalogSectionService.create(data),
    onSettled: () => invalidateCatalogSectionQueries(qc),
  });
}

export function useUpdateCatalogSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarSecaoCatalogoRequest }) => catalogSectionService.update(id, data),
    onSettled: () => invalidateCatalogSectionQueries(qc),
  });
}

export function useDeactivateCatalogSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => catalogSectionService.deactivate(id),
    onSettled: () => invalidateCatalogSectionQueries(qc),
  });
}

export function usePublicCatalogSections(slug: string) {
  return useQuery({
    queryKey: KEYS.public(slug),
    queryFn: () => catalogSectionService.publicList(slug),
    enabled: !!slug,
  });
}
