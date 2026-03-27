/**
 * Token store seguro — mantém o JWT em memória (variável JS) com
 * sessionStorage como fallback para sobreviver a refresh na mesma aba.
 *
 * Vantagens sobre localStorage:
 * - Não acessível por scripts injetados via XSS persistente (a menos que
 *   o atacante execute código na mesma sessão JS).
 * - sessionStorage é isolado por aba e limpo ao fechar.
 * - Não é compartilhado entre abas/janelas como localStorage.
 */

const SESSION_KEY = '__at';

let inMemoryToken = null;

export function getToken() {
  if (inMemoryToken) return inMemoryToken;
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      inMemoryToken = stored;
      return stored;
    }
  } catch (_) {}
  return null;
}

export function setToken(token) {
  inMemoryToken = token;
  try {
    sessionStorage.setItem(SESSION_KEY, token);
  } catch (_) {}
}

export function clearToken() {
  inMemoryToken = null;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_) {}
}
