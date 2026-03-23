import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import type { LoginRequest, RegistroRequest } from '../types';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
}

export function useRegistro() {
  return useMutation({
    mutationFn: (data: RegistroRequest) => authService.registro(data),
  });
}
