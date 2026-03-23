import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services';
import type {
  CadastrarCategoriaRequest,
  AtualizarCategoriaRequest,
  ReordenarCategoriasRequest,
} from '../types';
import { useSlug } from './useSlug';

const KEYS = {
  all: (slug: string) => ['store', slug, 'categories'] as const,
  detail: (slug: string, id: number) => ['store', slug, 'category', id] as const,
};

export function useAdminCategories() {
  const slug = useSlug();
  return useQuery({
    queryKey: KEYS.all(slug),
    queryFn: () => categoryService.publicList(slug),
    enabled: !!slug,
  });
}

export function useCreateCategory() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarCategoriaRequest) => categoryService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function useUpdateCategory() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarCategoriaRequest }) => categoryService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function useDeactivateCategory() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryService.deactivate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function useReorderCategories() {
  const slug = useSlug();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReordenarCategoriasRequest) => categoryService.reorder(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.all(slug) }),
  });
}

export function usePublicCategories(slug: string) {
  return useQuery({
    queryKey: KEYS.all(slug),
    queryFn: () => categoryService.publicList(slug),
    enabled: !!slug,
  });
}

export function usePublicCategory(slug: string, id: number) {
  return useQuery({
    queryKey: KEYS.detail(slug, id),
    queryFn: () => categoryService.publicGet(slug, id),
    enabled: !!slug && !!id,
  });
}
