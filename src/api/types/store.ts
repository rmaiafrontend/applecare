import type { ConfiguracaoLojaResponse, ConfiguracaoPagamentoResponse } from './config';

export interface LojaPublicaResponse {
  id: number;
  nome: string;
  slug: string;
  email?: string;
  telefone?: string;
  configuracao: ConfiguracaoLojaResponse;
  configuracaoPagamento: ConfiguracaoPagamentoResponse;
}

export interface BuscaInteligenteResponse {
  consulta: string;
  interpretacao: string;
  total: number;
  resultados: Array<{ id: number; nome: string; preco: number; imagemUrl: string }>;
}
