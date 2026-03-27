import React, { createContext, useContext, useEffect } from 'react';
import { usePublicStore } from '@/api/hooks';
import { useSlug } from '@/api/hooks';

const StoreThemeContext = createContext(null);

const CSS_VAR_MAP = {
  corPrimaria: '--store-primary',
  corSecundaria: '--store-secondary',
  corDestaque: '--store-accent',
  corFundo: '--store-bg',
  corTexto: '--store-text',
};

export function StoreThemeProvider({ children }) {
  const slug = useSlug();
  const { data: store } = usePublicStore(slug);
  const config = store?.configuracao;

  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;

    for (const [apiKey, cssVar] of Object.entries(CSS_VAR_MAP)) {
      const value = config[apiKey];
      if (value) {
        root.style.setProperty(cssVar, value);
      }
    }

    return () => {
      for (const cssVar of Object.values(CSS_VAR_MAP)) {
        root.style.removeProperty(cssVar);
      }
    };
  }, [config]);

  return (
    <StoreThemeContext.Provider value={config || null}>
      {children}
    </StoreThemeContext.Provider>
  );
}

export const useStoreTheme = () => useContext(StoreThemeContext);
