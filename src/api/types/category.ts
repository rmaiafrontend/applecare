export interface CadastrarCategoriaRequest {
  nome: string;
  icone?: string;
  imagemUrl?: string;
  ordemExibicao?: number;
  temPromocao?: boolean;
  ativo?: boolean;
}

export interface AtualizarCategoriaRequest {
  nome?: string;
  icone?: string;
  imagemUrl?: string;
  ordemExibicao?: number;
  temPromocao?: boolean;
  ativo?: boolean;
}

export interface ReordenarCategoriasRequest {
  idsOrdenados: number[];
}

export interface CategoriaResponse {
  id: number;
  nome: string;
  icone?: string;
  imagemUrl?: string;
  ordemExibicao: number;
  temPromocao: boolean;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CategoriaResumoResponse {
  id: number;
  nome: string;
  totalProdutos: number;
}
