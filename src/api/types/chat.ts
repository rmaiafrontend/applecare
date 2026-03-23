import type { ProdutoResumoResponse } from './product';

export interface IniciarSessaoChatRequest {
  clienteId?: number;
}

export interface EnviarMensagemChatRequest {
  conteudo: string;
}

export interface SessaoChatResponse {
  id: number;
  mensagemBoasVindas: string;
  nomeAssistente: string;
  perguntasSugeridas: string[];
  iniciadoEm: string;
}

export interface MensagemChatResponse {
  id: number;
  papel: string;
  conteudo: string;
  sugestoesProdutos?: ProdutoResumoResponse[];
  respostasRapidas?: string[];
  criadoEm: string;
}

export interface HistoricoMensagemResponse {
  id: number;
  papel: string;
  conteudo: string;
  sugestoesProdutos?: string;
  criadoEm: string;
}
