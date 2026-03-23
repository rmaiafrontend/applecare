import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '../services';
import type { CadastrarEtiquetaRequest, AtualizarEtiquetaRequest } from '../types';
import { useSlug } from './useSlug';

const KEYS = {
  all: (slug: string) => ['store', slug, 'tags'] as const,
};

export function useAdminTags() {
  const slug = useSlug();
  return useQuery({
    queryKey: KEYS.all(slug),
    queryFn: () => tagService.publicList(slug),
    enabled: !!slug,
  });
}

export function useCreateTag() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarEtiquetaRequest) => tagService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function useUpdateTag() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarEtiquetaRequest }) => tagService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function useDeactivateTag() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => tagService.deactivate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function usePublicTags(slug: string) {
  return useQuery({
    queryKey: KEYS.all(slug),
    queryFn: () => tagService.publicList(slug),
    enabled: !!slug,
  });
}
