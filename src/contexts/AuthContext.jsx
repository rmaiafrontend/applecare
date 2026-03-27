import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '@/api/services';
import { getToken, setToken, clearToken } from '@/lib/tokenStore';

const AuthContext = createContext();

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    clearToken();
    try {
      sessionStorage.removeItem('auth_user');
      localStorage.removeItem('store_slug');
    } catch (_) {}
  }, []);

  // Restaurar sessão do tokenStore (memória + sessionStorage)
  // Apenas id e nome são persistidos — o objeto completo vive só em memória
  useEffect(() => {
    try {
      const token = getToken();
      const savedMinimal = sessionStorage.getItem('auth_user');

      if (token && !isTokenExpired(token) && savedMinimal) {
        setUser(JSON.parse(savedMinimal));
        setIsAuthenticated(true);
      } else if (token) {
        logout();
      }
    } catch {
      logout();
    }
    setIsLoadingAuth(false);
  }, [logout]);

  // Agendar logout por expiração do JWT + escutar evento de logout forçado (401)
  useEffect(() => {
    const handleForceLogout = () => logout();

    let expiryTimeout;
    if (isAuthenticated) {
      const token = getToken();
      if (!token) {
        logout();
      } else {
        const payload = decodeToken(token);
        if (payload?.exp) {
          const msUntilExpiry = payload.exp * 1000 - Date.now();
          if (msUntilExpiry <= 0) {
            logout();
          } else {
            expiryTimeout = setTimeout(logout, Math.min(msUntilExpiry, 2147483647));
          }
        }
      }
    }

    window.addEventListener('auth:logout', handleForceLogout);
    return () => {
      window.removeEventListener('auth:logout', handleForceLogout);
      if (expiryTimeout) clearTimeout(expiryTimeout);
    };
  }, [logout, isAuthenticated]);

  const login = async (email, senha) => {
    setAuthError(null);
    try {
      const response = await authService.login({ email, senha });
      setToken(response.token);
      const { id, nome } = response.usuario;
      sessionStorage.setItem('auth_user', JSON.stringify({ id, nome }));
      if (response.loja?.slug) {
        localStorage.setItem('store_slug', response.loja.slug);
        window.dispatchEvent(new Event('auth:slug-changed'));
      }
      setUser(response.usuario);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setAuthError(error.message || 'Erro ao fazer login');
      throw error;
    }
  };

  const registro = async (data) => {
    setAuthError(null);
    try {
      const response = await authService.registro(data);
      setToken(response.token);
      const { id, nome } = response.usuario;
      sessionStorage.setItem('auth_user', JSON.stringify({ id, nome }));
      if (response.loja?.slug) {
        localStorage.setItem('store_slug', response.loja.slug);
        window.dispatchEvent(new Event('auth:slug-changed'));
      }
      setUser(response.usuario);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setAuthError(error.message || 'Erro ao registrar');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      authError,
      login,
      registro,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
