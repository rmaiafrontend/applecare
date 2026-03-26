import type { PaginatedResponse } from './common';

export interface ItemPedidoRequest {
  produtoId: number;
  quantidade: number;
}

export interface CriarPedidoRequest {
  metodoPagamento?: string;
  paraEntrega?: boolean;
  enderecoCep?: string;
  enderecoRua?: string;
  enderecoNumero?: string;
  enderecoComplemento?: string;
  enderecoBairro?: string;
  enderecoCidade?: string;
  enderecoEstado?: string;
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
  paraEntrega?: boolean;
  enderecoCep?: string;
  enderecoRua?: string;
  enderecoNumero?: string;
  enderecoComplemento?: string;
  enderecoBairro?: string;
  enderecoCidade?: string;
  enderecoEstado?: string;
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
