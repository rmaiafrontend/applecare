export type BannerTipo = 'HERO' | 'PROMO' | 'SECUNDARIO';

export interface CadastrarBannerRequest {
  tipo?: string;
  imagemUrl?: string;
  link?: string;
  textoCta?: string;
  corTexto?: string;
  opacidadeOverlay?: number;
  ativo?: boolean;
  ordemExibicao?: number;
}

export interface AtualizarBannerRequest {
  tipo?: string;
  imagemUrl?: string;
  link?: string;
  textoCta?: string;
  corTexto?: string;
  opacidadeOverlay?: number;
  ativo?: boolean;
  ordemExibicao?: number;
}

export interface BannerResponse {
  id: number;
  tipo: string;
  imagemUrl: string;
  link?: string;
  textoCta?: string;
  corTexto?: string;
  opacidadeOverlay: number;
  ativo: boolean;
  ordemExibicao: number;
  criadoEm: string;
  atualizadoEm: string;
}
