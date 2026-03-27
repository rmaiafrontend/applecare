import React, { createContext, useContext, useEffect } from 'react';
import { usePublicStore } from '@/api/hooks';
import { useSlug } from '@/api/hooks';

const StoreThemeContext = createContext(null);

const CSS_VAR_MAP = {
  corPrimaria: 'store-primary',
  corSecundaria: 'store-secondary',
  corDestaque: 'store-accent',
  corFundo: 'store-bg',
  corTexto: 'store-text',
};

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

export function StoreThemeProvider({ children }) {
  const slug = useSlug();
  const { data: store } = usePublicStore(slug);
  const config = store?.configuracao;

  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;

    for (const [apiKey, varName] of Object.entries(CSS_VAR_MAP)) {
      const value = config[apiKey];
      if (value) {
        // Set RGB format for Tailwind opacity support (bg-store-primary/50)
        root.style.setProperty(`--${varName}`, hexToRgb(value));
        // Also set hex for direct usage in inline styles
        root.style.setProperty(`--${varName}-hex`, value);
      }
    }

    return () => {
      for (const varName of Object.values(CSS_VAR_MAP)) {
        root.style.removeProperty(`--${varName}`);
        root.style.removeProperty(`--${varName}-hex`);
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
