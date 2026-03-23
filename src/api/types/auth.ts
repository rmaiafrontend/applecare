export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegistroRequest {
  nomeLoja: string;
  slug: string;
  emailLoja?: string;
  telefoneLoja?: string;
  nomeUsuario: string;
  emailUsuario: string;
  senha: string;
}

export interface UsuarioAuthResponse {
  id: number;
  nome: string;
  email: string;
  papel: string;
  lojaId: number;
}

export interface TokenAuthResponse {
  token: string;
  usuario: UsuarioAuthResponse;
}

export interface LojaResumoResponse {
  id: number;
  nome: string;
  slug: string;
}

export interface RegistroResponse {
  token: string;
  usuario: UsuarioAuthResponse;
  loja: LojaResumoResponse;
}
