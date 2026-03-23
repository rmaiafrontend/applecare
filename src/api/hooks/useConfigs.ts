import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { configService } from '../services';
import type {
  SalvarConfiguracaoLojaRequest,
  SalvarConfiguracaoHomeRequest,
  SalvarConfiguracaoChatRequest,
  SalvarConfiguracaoPagamentoRequest,
} from '../types';

const KEYS = {
  loja: ['admin', 'config', 'loja'] as const,
  home: ['admin', 'config', 'home'] as const,
  chat: ['admin', 'config', 'chat'] as const,
  pagamento: ['admin', 'config', 'pagamento'] as const,
};

// Loja
export function useConfigLoja() {
  return useQuery({ queryKey: KEYS.loja, queryFn: () => configService.getLoja() });
}

export function useSaveConfigLoja() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SalvarConfiguracaoLojaRequest) => configService.saveLoja(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.loja }),
  });
}

// Home
export function useConfigHome() {
  return useQuery({ queryKey: KEYS.home, queryFn: () => configService.getHome() });
}

export function useSaveConfigHome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SalvarConfiguracaoHomeRequest) => configService.saveHome(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.home }),
  });
}

// Chat
export function useConfigChat() {
  return useQuery({ queryKey: KEYS.chat, queryFn: () => configService.getChat() });
}

export function useSaveConfigChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SalvarConfiguracaoChatRequest) => configService.saveChat(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.chat }),
  });
}

// Pagamento
export function useConfigPagamento() {
  return useQuery({ queryKey: KEYS.pagamento, queryFn: () => configService.getPagamento() });
}

export function useSaveConfigPagamento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SalvarConfiguracaoPagamentoRequest) => configService.savePagamento(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.pagamento }),
  });
}
