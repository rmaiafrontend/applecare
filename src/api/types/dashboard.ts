export interface ProdutoEstoqueBaixoResponse {
  id: number;
  nome: string;
  estoque: number;
}

export interface ProdutoRecenteResponse {
  id: number;
  nome: string;
  preco: number;
  criadoEm: string;
}

export interface CategoriaResumoResponse {
  id: number;
  nome: string;
  totalProdutos: number;
}

export interface EstatisticasDashboardResponse {
  totalProdutos: number;
  produtosAtivos: number;
  produtosDestaque: number;
  produtosExpressa: number;
  produtosComDesconto: number;
  valorTotalEstoque: number;
  unidadesEmEstoque: number;
  totalPedidos: number;
  produtosEstoqueBaixo: ProdutoEstoqueBaixoResponse[];
  categoriasResumo: CategoriaResumoResponse[];
  produtosRecentes: ProdutoRecenteResponse[];
}
