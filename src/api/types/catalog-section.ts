import type { ProdutoResumoResponse } from './product';

export interface CadastrarSecaoCatalogoRequest {
  titulo: string;
  subtitulo?: string;
  ativo?: boolean;
  ordemExibicao?: number;
  maxItens?: number;
  tipoFiltro?: string;
  valorFiltro?: string;
}

export interface AtualizarSecaoCatalogoRequest {
  titulo?: string;
  subtitulo?: string;
  ativo?: boolean;
  ordemExibicao?: number;
  maxItens?: number;
  tipoFiltro?: string;
  valorFiltro?: string;
}

export interface SecaoCatalogoResponse {
  id: number;
  titulo: string;
  subtitulo?: string;
  ativo: boolean;
  ordemExibicao: number;
  maxItens: number;
  tipoFiltro?: string;
  valorFiltro?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface SecaoCatalogoPublicaResponse {
  id: number;
  titulo: string;
  subtitulo?: string;
  ordemExibicao: number;
  produtos: ProdutoResumoResponse[];
}
