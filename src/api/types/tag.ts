export interface CadastrarEtiquetaRequest {
  nome: string;
  slug?: string;
  cor?: string;
  ativo?: boolean;
}

export interface AtualizarEtiquetaRequest {
  nome?: string;
  slug?: string;
  cor?: string;
  ativo?: boolean;
}

export interface EtiquetaResponse {
  id: number;
  nome: string;
  slug: string;
  cor: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}
