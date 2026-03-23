import { apiClient } from '../client';
import type {
  IniciarSessaoChatRequest,
  EnviarMensagemChatRequest,
  SessaoChatResponse,
  MensagemChatResponse,
  HistoricoMensagemResponse,
} from '../types';

export const chatService = {
  startSession: (slug: string, data: IniciarSessaoChatRequest) =>
    apiClient<SessaoChatResponse>({ method: 'POST', path: `/api/v1/lojas/${slug}/chat/sessoes`, body: data }),

  sendMessage: (slug: string, sessaoId: number, data: EnviarMensagemChatRequest) =>
    apiClient<MensagemChatResponse>({ method: 'POST', path: `/api/v1/lojas/${slug}/chat/sessoes/${sessaoId}/mensagens`, body: data }),

  getHistory: (slug: string, sessaoId: number) =>
    apiClient<HistoricoMensagemResponse[]>({ method: 'GET', path: `/api/v1/lojas/${slug}/chat/sessoes/${sessaoId}/mensagens` }),
};
