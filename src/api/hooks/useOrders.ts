import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services';
import type { CriarPedidoRequest, PaginationParams } from '../types';

const KEYS = {
  list: (slug: string, params?: PaginationParams) => ['store', slug, 'orders', params] as const,
  detail: (slug: string, id: number) => ['store', slug, 'order', id] as const,
  byNumber: (slug: string, numero: string) => ['store', slug, 'order', 'numero', numero] as const,
  adminList: (params?: PaginationParams) => ['admin', 'orders', params] as const,
  adminDetail: (id: number) => ['admin', 'order', id] as const,
};

export function useOrders(slug: string, params?: PaginationParams) {
  return useQuery({
    queryKey: KEYS.list(slug, params),
    queryFn: () => orderService.list(slug, params),
    enabled: !!slug,
  });
}

export function useOrderById(slug: string, id: number) {
  return useQuery({
    queryKey: KEYS.detail(slug, id),
    queryFn: () => orderService.getById(slug, id),
    enabled: !!slug && !!id,
  });
}

export function useOrderByNumber(slug: string, numeroPedido: string) {
  return useQuery({
    queryKey: KEYS.byNumber(slug, numeroPedido),
    queryFn: () => orderService.getByNumber(slug, numeroPedido),
    enabled: !!slug && !!numeroPedido,
  });
}

export function useCreateOrder(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CriarPedidoRequest) => orderService.create(slug, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['store', slug, 'orders'] }),
  });
}

export function useAdminOrders(params?: PaginationParams) {
  return useQuery({
    queryKey: KEYS.adminList(params),
    queryFn: () => orderService.adminList(params),
  });
}

export function useAdminOrderById(id: number) {
  return useQuery({
    queryKey: KEYS.adminDetail(id),
    queryFn: () => orderService.adminGetById(id),
    enabled: !!id,
  });
}
