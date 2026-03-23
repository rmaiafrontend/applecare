import type { ProdutoCarrinhoResponse } from './product';

export interface AdicionarItemCarrinhoRequest {
  produtoId: number;
  quantidade?: number;
}

export interface AtualizarItemCarrinhoRequest {
  quantidade: number;
}

export interface ItemCarrinhoResponse {
  id: number;
  produtoId: number;
  quantidade: number;
  produto: ProdutoCarrinhoResponse;
  criadoEm: string;
}
