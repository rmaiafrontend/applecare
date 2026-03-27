import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '../services';
import type { CadastrarEtiquetaRequest, AtualizarEtiquetaRequest } from '../types';
import { useSlug } from './useSlug';

const KEYS = {
  admin: () => ['admin', 'tags'] as const,
  public: (slug: string) => ['store', slug, 'tags'] as const,
};

export function useAdminTags() {
  return useQuery({
    queryKey: KEYS.admin(),
    queryFn: () => tagService.adminList(),
    staleTime: 30_000,
  });
}

function invalidateTagQueries(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: KEYS.admin() });
  qc.invalidateQueries({ predicate: (q) => {
    const key = q.queryKey as string[];
    return key[0] === 'store' && key[2] === 'tags';
  }});
}

export function useCreateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarEtiquetaRequest) => tagService.create(data),
    onSettled: () => invalidateTagQueries(qc),
  });
}

export function useUpdateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarEtiquetaRequest }) => tagService.update(id, data),
    onSettled: () => invalidateTagQueries(qc),
  });
}

export function useDeactivateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => tagService.deactivate(id),
    onSettled: () => invalidateTagQueries(qc),
  });
}

export function usePublicTags(slug: string) {
  return useQuery({
    queryKey: KEYS.public(slug),
    queryFn: () => tagService.publicList(slug),
    enabled: !!slug,
  });
}
