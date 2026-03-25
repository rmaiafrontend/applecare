import { apiClient } from '../client';
import type {
  SalvarConfiguracaoLojaRequest,
  ConfiguracaoLojaResponse,
  SalvarConfiguracaoHomeRequest,
  ConfiguracaoHomeResponse,
  SalvarConfiguracaoChatRequest,
  ConfiguracaoChatResponse,
  SalvarConfiguracaoPagamentoRequest,
  ConfiguracaoPagamentoResponse,
} from '../types';

export const configService = {
  // Public Home
  getPublicHome: (slug: string) =>
    apiClient<ConfiguracaoHomeResponse>({ method: 'GET', path: `/api/v1/lojas/${slug}/configuracoes/home` }),

  // Loja
  getLoja: () =>
    apiClient<ConfiguracaoLojaResponse>({ method: 'GET', path: '/api/v1/admin/configuracoes/loja' }),

  saveLoja: (data: SalvarConfiguracaoLojaRequest) =>
    apiClient<ConfiguracaoLojaResponse>({ method: 'PUT', path: '/api/v1/admin/configuracoes/loja', body: data }),

  // Home
  getHome: () =>
    apiClient<ConfiguracaoHomeResponse>({ method: 'GET', path: '/api/v1/admin/configuracoes/home' }),

  saveHome: (data: SalvarConfiguracaoHomeRequest) =>
    apiClient<ConfiguracaoHomeResponse>({ method: 'PUT', path: '/api/v1/admin/configuracoes/home', body: data }),

  // Chat
  getChat: () =>
    apiClient<ConfiguracaoChatResponse>({ method: 'GET', path: '/api/v1/admin/configuracoes/chat' }),

  saveChat: (data: SalvarConfiguracaoChatRequest) =>
    apiClient<ConfiguracaoChatResponse>({ method: 'PUT', path: '/api/v1/admin/configuracoes/chat', body: data }),

  // Pagamento
  getPagamento: () =>
    apiClient<ConfiguracaoPagamentoResponse>({ method: 'GET', path: '/api/v1/admin/configuracoes/pagamento' }),

  savePagamento: (data: SalvarConfiguracaoPagamentoRequest) =>
    apiClient<ConfiguracaoPagamentoResponse>({ method: 'PUT', path: '/api/v1/admin/configuracoes/pagamento', body: data }),
};
