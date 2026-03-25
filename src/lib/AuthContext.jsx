import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '@/api/services';

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
    try {
      localStorage.removeItem('app_access_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('store_slug');
    } catch (_) {}
  }, []);

  // Restaurar sessão do localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('app_access_token');
      const savedUser = localStorage.getItem('auth_user');

      if (token && !isTokenExpired(token) && savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } else if (token) {
        // Token expirado
        logout();
      }
    } catch {
      logout();
    }
    setIsLoadingAuth(false);
  }, [logout]);

  // Escutar evento de logout forçado (401 do apiClient)
  // e mudanças no localStorage (outra aba ou remoção manual via DevTools)
  useEffect(() => {
    const handleForceLogout = () => logout();

    const handleStorageChange = (e) => {
      if (e.key === 'app_access_token' && !e.newValue) {
        logout();
      }
    };

    // Agendar logout baseado no exp do JWT (em vez de polling a cada 2s)
    let expiryTimeout;
    if (isAuthenticated) {
      const token = localStorage.getItem('app_access_token');
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
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('auth:logout', handleForceLogout);
      window.removeEventListener('storage', handleStorageChange);
      if (expiryTimeout) clearTimeout(expiryTimeout);
    };
  }, [logout, isAuthenticated]);

  const login = async (email, senha) => {
    setAuthError(null);
    try {
      const response = await authService.login({ email, senha });
      localStorage.setItem('app_access_token', response.token);
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.usuario));
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
      localStorage.setItem('app_access_token', response.token);
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.usuario));
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
