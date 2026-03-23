import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services';
import type { AdicionarItemCarrinhoRequest, AtualizarItemCarrinhoRequest } from '../types';

const KEYS = {
  cart: (slug: string) => ['store', slug, 'cart'] as const,
};

export function useCart(slug: string) {
  return useQuery({
    queryKey: KEYS.cart(slug),
    queryFn: () => cartService.list(slug),
    enabled: !!slug,
  });
}

export function useAddToCart(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AdicionarItemCarrinhoRequest) => cartService.add(slug, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.cart(slug) }),
  });
}

export function useUpdateCartItem(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarItemCarrinhoRequest }) => cartService.update(slug, id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.cart(slug) }),
  });
}

export function useRemoveCartItem(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => cartService.remove(slug, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.cart(slug) }),
  });
}

export function useClearCart(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => cartService.clear(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.cart(slug) }),
  });
}
