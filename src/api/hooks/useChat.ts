import { useQuery, useMutation } from '@tanstack/react-query';
import { chatService } from '../services';
import type { IniciarSessaoChatRequest, EnviarMensagemChatRequest } from '../types';

export function useStartChatSession(slug: string) {
  return useMutation({
    mutationFn: (data: IniciarSessaoChatRequest) => chatService.startSession(slug, data),
  });
}

export function useSendChatMessage(slug: string, sessaoId: number) {
  return useMutation({
    mutationFn: (data: EnviarMensagemChatRequest) => chatService.sendMessage(slug, sessaoId, data),
  });
}

export function useChatHistory(slug: string, sessaoId: number) {
  return useQuery({
    queryKey: ['store', slug, 'chat', sessaoId, 'messages'],
    queryFn: () => chatService.getHistory(slug, sessaoId),
    enabled: !!slug && !!sessaoId,
  });
}
