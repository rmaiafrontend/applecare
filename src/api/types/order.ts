import type { PaginatedResponse } from './common';

export interface ItemPedidoRequest {
  produtoId: number;
  quantidade: number;
}

export interface CriarPedidoRequest {
  metodoPagamento?: string;
  observacao?: string;
  itens: ItemPedidoRequest[];
}

export interface ItemPedidoResponse {
  id: number;
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
}

export interface PedidoResponse {
  id: number;
  numeroPedido: string;
  metodoPagamento?: string;
  subtotal: number;
  custoFrete: number;
  total: number;
  observacao?: string;
  enviadoWhatsappEm?: string;
  urlWhatsapp?: string;
  itens: ItemPedidoResponse[];
  criadoEm: string;
}

export type PedidoPaginadoResponse = PaginatedResponse<PedidoResponse>;
