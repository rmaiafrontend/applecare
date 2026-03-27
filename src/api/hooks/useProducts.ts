import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services';
import type {
  CadastrarProdutoRequest,
  AtualizarProdutoRequest,
  ProdutoListParams,
  AdminProdutoListParams,
  CompararProdutosRequest,
} from '../types';

const KEYS = {
  admin: (params?: AdminProdutoListParams) => ['admin', 'products', params] as const,
  public: (slug: string, params?: ProdutoListParams) => ['store', slug, 'products', params] as const,
  detail: (slug: string, id: number) => ['store', slug, 'product', id] as const,
  related: (slug: string, id: number) => ['store', slug, 'product', id, 'related'] as const,
};

// Admin
export function useAdminProducts(params?: AdminProdutoListParams) {
  return useQuery({
    queryKey: KEYS.admin(params),
    queryFn: () => productService.list(params),
    staleTime: 30_000,
  });
}

function invalidateProductQueries(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ['admin', 'products'] });
  qc.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
  // Invalidate public product lists (not all store queries)
  qc.invalidateQueries({ predicate: (q) => {
    const key = q.queryKey as string[];
    return key[0] === 'store' && (key[2] === 'products' || key[2] === 'product');
  }});
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CadastrarProdutoRequest) => productService.create(data),
    onSettled: () => invalidateProductQueries(qc),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarProdutoRequest }) => productService.update(id, data),
    onSettled: () => invalidateProductQueries(qc),
  });
}

export function useDeactivateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productService.deactivate(id),
    onSettled: () => invalidateProductQueries(qc),
  });
}

// Public
export function usePublicProducts(slug: string, params?: ProdutoListParams) {
  return useQuery({
    queryKey: KEYS.public(slug, params),
    queryFn: () => productService.publicList(slug, params),
    enabled: !!slug,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}

export function useProductDetail(slug: string, id: number) {
  return useQuery({
    queryKey: KEYS.detail(slug, id),
    queryFn: () => productService.publicDetail(slug, id),
    enabled: !!slug && !!id,
  });
}

export function useRelatedProducts(slug: string, id: number, limite?: number) {
  return useQuery({
    queryKey: KEYS.related(slug, id),
    queryFn: () => productService.publicRelated(slug, id, limite),
    enabled: !!slug && !!id,
  });
}

export function useCompareProducts(slug: string) {
  return useMutation({
    mutationFn: (data: CompararProdutosRequest) => productService.compare(slug, data),
  });
}
