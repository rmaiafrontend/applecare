import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import * as tokenStore from '@/lib/tokenStore';

// Mock authService
vi.mock('@/api/services', () => ({
  authService: {
    login: vi.fn(),
    registro: vi.fn(),
  },
}));

import { authService } from '@/api/services';

// Helper to build a fake JWT with exp
function fakeJwt(expInSeconds) {
  const header = btoa(JSON.stringify({ alg: 'HS256' }));
  const payload = btoa(JSON.stringify({ sub: '1', exp: expInSeconds }));
  return `${header}.${payload}.signature`;
}

function TestConsumer() {
  const { user, isAuthenticated, isLoadingAuth, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(isLoadingAuth)}</span>
      <span data-testid="auth">{String(isAuthenticated)}</span>
      <span data-testid="user">{user ? JSON.stringify(user) : 'null'}</span>
      <button onClick={() => login('test@test.com', '123456')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tokenStore.clearToken();
    sessionStorage.clear();
    localStorage.clear();
  });

  it('starts unauthenticated when no stored session', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('logs in successfully and stores token', async () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600; // 1h from now
    const token = fakeJwt(futureExp);

    authService.login.mockResolvedValue({
      token,
      usuario: { id: 1, nome: 'Test User', email: 'test@test.com', papel: 'ADMIN', lojaId: 1 },
      loja: { id: 1, nome: 'Test Store', slug: 'test-store' },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('Login'));
    });

    expect(screen.getByTestId('auth').textContent).toBe('true');
    expect(tokenStore.getToken()).toBe(token);
    expect(localStorage.getItem('store_slug')).toBe('test-store');

    // sessionStorage should have minimal user (id + nome only)
    const stored = JSON.parse(sessionStorage.getItem('auth_user'));
    expect(stored).toEqual({ id: 1, nome: 'Test User' });
  });

  it('logs out and clears all storage', async () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    const token = fakeJwt(futureExp);

    authService.login.mockResolvedValue({
      token,
      usuario: { id: 1, nome: 'Test', email: 't@t.com', papel: 'ADMIN', lojaId: 1 },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Login first
    await act(async () => {
      await userEvent.click(screen.getByText('Login'));
    });
    expect(screen.getByTestId('auth').textContent).toBe('true');

    // Logout
    await act(async () => {
      await userEvent.click(screen.getByText('Logout'));
    });

    expect(screen.getByTestId('auth').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(tokenStore.getToken()).toBeNull();
    expect(sessionStorage.getItem('auth_user')).toBeNull();
  });

  it('restores session from tokenStore on mount', () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    tokenStore.setToken(fakeJwt(futureExp));
    sessionStorage.setItem('auth_user', JSON.stringify({ id: 1, nome: 'Restored' }));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('true');
    expect(screen.getByTestId('user').textContent).toContain('Restored');
  });

  it('does not restore session with expired token', () => {
    const pastExp = Math.floor(Date.now() / 1000) - 100; // expired
    tokenStore.setToken(fakeJwt(pastExp));
    sessionStorage.setItem('auth_user', JSON.stringify({ id: 1, nome: 'Expired' }));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('false');
    expect(tokenStore.getToken()).toBeNull();
  });

  it('reacts to auth:logout event', async () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    tokenStore.setToken(fakeJwt(futureExp));
    sessionStorage.setItem('auth_user', JSON.stringify({ id: 1, nome: 'Test' }));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('true');

    // Simulate 401 event from apiClient
    await act(async () => {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    });

    expect(screen.getByTestId('auth').textContent).toBe('false');
  });
});
