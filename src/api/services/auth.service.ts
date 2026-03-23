import { apiClient } from '../client';
import type { LoginRequest, TokenAuthResponse, RegistroRequest, RegistroResponse } from '../types';

export const authService = {
  login: (data: LoginRequest) =>
    apiClient<TokenAuthResponse>({ method: 'POST', path: '/api/v1/auth/login', body: data }),

  registro: (data: RegistroRequest) =>
    apiClient<RegistroResponse>({ method: 'POST', path: '/api/v1/auth/registro', body: data }),
};
