export interface SalvarConfiguracaoLojaRequest {
  nomeLoja?: string;
  sloganLoja?: string;
  logoUrl?: string;
  logoEscuroUrl?: string;
  faviconUrl?: string;
  corPrimaria?: string;
  corSecundaria?: string;
  corDestaque?: string;
  corFundo?: string;
  corTexto?: string;
  numeroWhatsapp?: string;
  numeroTelefone?: string;
  urlInstagram?: string;
  emailContato?: string;
  endereco?: string;
  textoRodape?: string;
  tituloSeo?: string;
  descricaoSeo?: string;
}

export interface ConfiguracaoLojaResponse {
  id: number;
  nomeLoja?: string;
  sloganLoja?: string;
  logoUrl?: string;
  logoEscuroUrl?: string;
  faviconUrl?: string;
  corPrimaria?: string;
  corSecundaria?: string;
  corDestaque?: string;
  corFundo?: string;
  corTexto?: string;
  numeroWhatsapp?: string;
  numeroTelefone?: string;
  urlInstagram?: string;
  emailContato?: string;
  endereco?: string;
  textoRodape?: string;
  tituloSeo?: string;
  descricaoSeo?: string;
}

export interface SalvarConfiguracaoHomeRequest {
  configCabecalho?: string;
  configHero?: string;
  configDiferenciais?: string;
  configBotaoIa?: string;
  configSecaoCategorias?: string;
  configBannerSecundario?: string;
  configCardsInfo?: string;
  configListaProdutos?: string;
  ordenacaoSecoes?: string;
}

export interface ConfiguracaoHomeResponse {
  id: number;
  configCabecalho?: string;
  configHero?: string;
  configDiferenciais?: string;
  configBotaoIa?: string;
  configSecaoCategorias?: string;
  configBannerSecundario?: string;
  configCardsInfo?: string;
  configListaProdutos?: string;
  ordenacaoSecoes?: string;
}

export interface PerguntaSugeridaRequest {
  pergunta: string;
  ordemExibicao: number;
}

export interface SalvarConfiguracaoChatRequest {
  nomeAssistente?: string;
  mensagemBoasVindas?: string;
  tom?: string;
  corPrimaria?: string;
  posicaoChat?: string;
  ativo?: boolean;
  mostrarSugestoesProdutos?: boolean;
  maxMensagensPorSessao?: number;
  perguntasSugeridas?: PerguntaSugeridaRequest[];
}

export interface PerguntaSugeridaResponse {
  id: number;
  pergunta: string;
  ordemExibicao: number;
}

export interface ConfiguracaoChatResponse {
  id: number;
  nomeAssistente?: string;
  mensagemBoasVindas?: string;
  tom?: string;
  corPrimaria?: string;
  posicaoChat?: string;
  ativo: boolean;
  mostrarSugestoesProdutos: boolean;
  maxMensagensPorSessao: number;
  perguntasSugeridas: PerguntaSugeridaResponse[];
}

export interface SalvarConfiguracaoPagamentoRequest {
  pixHabilitado?: boolean;
  cartaoHabilitado?: boolean;
  dinheiroHabilitado?: boolean;
}

export interface ConfiguracaoPagamentoResponse {
  id: number;
  pixHabilitado: boolean;
  cartaoHabilitado: boolean;
  dinheiroHabilitado: boolean;
}
