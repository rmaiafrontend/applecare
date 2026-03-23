export interface PaginatedResponse<T> {
  conteudo: T[];
  pagina: number;
  tamanho: number;
  totalElementos: number;
  totalPaginas: number;
}

export interface IdResponse {
  id: number;
}

export interface DesativarResponse {
  id: number;
  ativo: boolean;
  atualizadoEm: string;
}

export interface MensagemResponse {
  mensagem: string;
}

export interface PaginationParams {
  pagina?: number;
  tamanho?: number;
}
