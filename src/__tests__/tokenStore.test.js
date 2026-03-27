import { describe, it, expect, beforeEach } from 'vitest';
import { getToken, setToken, clearToken } from '@/lib/tokenStore';

describe('tokenStore', () => {
  beforeEach(() => {
    clearToken();
    sessionStorage.clear();
  });

  it('returns null when no token is stored', () => {
    expect(getToken()).toBeNull();
  });

  it('stores and retrieves a token', () => {
    setToken('abc123');
    expect(getToken()).toBe('abc123');
  });

  it('persists token in sessionStorage for refresh resilience', () => {
    setToken('abc123');
    // sessionStorage should have the token as backup
    expect(sessionStorage.getItem('__at')).toBe('abc123');
  });

  it('clears token from both memory and sessionStorage', () => {
    setToken('abc123');
    clearToken();
    expect(getToken()).toBeNull();
    expect(sessionStorage.getItem('__at')).toBeNull();
  });

  it('falls back to sessionStorage when in-memory token is null', () => {
    sessionStorage.setItem('__at', 'from-session');
    // Force clear in-memory only by directly accessing module state
    // getToken should fall back to sessionStorage
    expect(getToken()).toBe('from-session');
  });

  it('overwrites previous token', () => {
    setToken('first');
    setToken('second');
    expect(getToken()).toBe('second');
  });
});
