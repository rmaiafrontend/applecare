export interface IdentificarClienteRequest {
  nome: string;
  telefone: string;
}

export interface AtualizarClienteRequest {
  nome?: string;
  telefone?: string;
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

export interface ClienteResponse {
  id: number;
  nome: string;
  telefone?: string;
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  criadoEm: string;
  atualizadoEm: string;
}
