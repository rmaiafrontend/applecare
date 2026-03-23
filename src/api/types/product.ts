import type { PaginatedResponse } from './common';

export interface ImagemProdutoRequest {
  imagemUrl: string;
  ordemExibicao: number;
}

export interface EspecificacaoProdutoRequest {
  rotulo: string;
  valor: string;
  ordemExibicao: number;
}

export interface ChecklistCondicaoRequest {
  rotulo: string;
  marcado: boolean;
  ordemExibicao: number;
}

export interface CadastrarProdutoRequest {
  nome: string;
  sku: string;
  preco: number;
  precoOriginal?: number;
  estoque?: number;
  entregaExpressa?: boolean;
  condicao?: string;
  descricao?: string;
  fichaTecnicaUrl?: string;
  destaque?: boolean;
  ativo?: boolean;
  categoriaId: number;
  imagens?: ImagemProdutoRequest[];
  especificacoes?: EspecificacaoProdutoRequest[];
  etiquetaIds?: number[];
  checklistCondicao?: ChecklistCondicaoRequest[];
}

export interface AtualizarProdutoRequest {
  nome?: string;
  sku?: string;
  preco?: number;
  precoOriginal?: number;
  estoque?: number;
  entregaExpressa?: boolean;
  condicao?: string;
  descricao?: string;
  fichaTecnicaUrl?: string;
  destaque?: boolean;
  ativo?: boolean;
  categoriaId?: number;
  imagens?: ImagemProdutoRequest[];
  especificacoes?: EspecificacaoProdutoRequest[];
  etiquetaIds?: number[];
  checklistCondicao?: ChecklistCondicaoRequest[];
}

export interface ImagemProdutoResponse {
  id: number;
  imagemUrl: string;
  ordemExibicao: number;
}

export interface EspecificacaoProdutoResponse {
  id: number;
  rotulo: string;
  valor: string;
  ordemExibicao: number;
}

export interface ChecklistCondicaoResponse {
  id: number;
  rotulo: string;
  marcado: boolean;
  ordemExibicao: number;
}

export interface EtiquetaProdutoResponse {
  id: number;
  nome: string;
  slug: string;
  cor: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface ProdutoListagemResponse {
  id: number;
  nome: string;
  sku: string;
  preco: number;
  precoOriginal?: number;
  estoque: number;
  entregaExpressa: boolean;
  condicao?: string;
  descricao?: string;
  destaque: boolean;
  ativo: boolean;
  categoriaId: number;
  categoriaNome: string;
  imagens: ImagemProdutoResponse[];
  etiquetas: EtiquetaProdutoResponse[];
  criadoEm: string;
}

export interface ProdutoDetalheResponse {
  id: number;
  nome: string;
  sku: string;
  preco: number;
  precoOriginal?: number;
  estoque: number;
  entregaExpressa: boolean;
  condicao?: string;
  descricao?: string;
  fichaTecnicaUrl?: string;
  destaque: boolean;
  ativo: boolean;
  categoriaId: number;
  categoriaNome: string;
  imagens: ImagemProdutoResponse[];
  especificacoes: EspecificacaoProdutoResponse[];
  etiquetas: EtiquetaProdutoResponse[];
  checklistCondicao: ChecklistCondicaoResponse[];
  criadoEm: string;
}

export interface ProdutoResumoResponse {
  id: number;
  nome: string;
  preco: number;
  imagemUrl: string;
}

export interface ProdutoCarrinhoResponse {
  id: number;
  nome: string;
  preco: number;
  precoOriginal?: number;
  estoque: number;
  entregaExpressa: boolean;
  imagemUrl: string;
}

export type ProdutoPaginadoResponse = PaginatedResponse<ProdutoListagemResponse>;

export interface ProdutoListParams {
  busca?: string;
  categoriaId?: number;
  etiquetaSlug?: string;
  condicao?: string;
  entregaExpressa?: boolean;
  emEstoque?: boolean;
  destaque?: boolean;
  precoMin?: number;
  precoMax?: number;
  ordenacao?: string;
  pagina?: number;
  tamanho?: number;
}

export interface AdminProdutoListParams {
  busca?: string;
  categoriaId?: number;
  status?: string;
  ordenacao?: string;
  pagina?: number;
  tamanho?: number;
}

export interface CompararProdutosRequest {
  produtoIds: number[];
}

export interface EspecificacaoComparacaoResponse {
  rotulo: string;
  valores: string[];
}

export interface DestaqueComparacaoResponse {
  tipo: string;
  produtoId: number;
  texto: string;
}

export interface ComparacaoProdutoResponse {
  produtos: ProdutoResumoResponse[];
  tabelaEspecificacoes: EspecificacaoComparacaoResponse[];
  recomendacao: string;
  melhorValor: ProdutoResumoResponse;
  destaques: DestaqueComparacaoResponse[];
}
