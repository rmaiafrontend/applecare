import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services';
import type {
  CadastrarCategoriaRequest,
  AtualizarCategoriaRequest,
  ReordenarCategoriasRequest,
} from '../types';
import { useSlug } from './useSlug';

const KEYS = {
  admin: () => ['admin', 'categories'] as const,
  public: (slug: string) => ['store', slug, 'categories'] as const,
  detail: (slug: string, id: number) => ['store', slug, 'category', id] as const,
};

export function useAdminCategories() {
  return useQuery({
    queryKey: KEYS.admin(),
    queryFn: () => categoryService.adminList(),
    staleTime: 30_000,
  });
}

function invalidateCategoryQueries(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: KEYS.admin() });
  qc.invalidateQueries({ predicate: (q) => {
    const key = q.queryKey as string[];
    return key[0] === 'store' && (key[2] === 'categories' || key[2] === 'category');
  }});
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarCategoriaRequest) => categoryService.create(data),
    onSettled: () => invalidateCategoryQueries(qc),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarCategoriaRequest }) => categoryService.update(id, data),
    onSettled: () => invalidateCategoryQueries(qc),
  });
}

export function useDeactivateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryService.deactivate(id),
    onSettled: () => invalidateCategoryQueries(qc),
  });
}

export function useReorderCategories() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReordenarCategoriasRequest) => categoryService.reorder(data),
    onSettled: () => invalidateCategoryQueries(qc),
  });
}

export function usePublicCategories(slug: string) {
  return useQuery({
    queryKey: KEYS.public(slug),
    queryFn: () => categoryService.publicList(slug),
    enabled: !!slug,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}

export function usePublicCategory(slug: string, id: number) {
  return useQuery({
    queryKey: KEYS.detail(slug, id),
    queryFn: () => categoryService.publicGet(slug, id),
    enabled: !!slug && !!id,
  });
}
