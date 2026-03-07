/**
 * Cliente de API: backend local (JSON + localStorage).
 * Produtos e categorias em public/data/products.json; carrinho e pedidos em localStorage.
 */

import { localApi } from './localApi';

export const base44 = {
  entities: {
    Category: localApi.Category,
    Product: localApi.Product,
    CartItem: localApi.CartItem,
    Order: localApi.Order,
    Tag: localApi.Tag,
    StoreConfig: localApi.StoreConfig,
    ChatConfig: localApi.ChatConfig,
    CatalogConfig: localApi.CatalogConfig,
    PaymentConfig: localApi.PaymentConfig,
  },
  auth: {
    me: () => Promise.reject(Object.assign(new Error('Não autenticado'), { status: 401 })),
    logout: (redirectUrl) => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem('app_access_token');
          window.localStorage.removeItem('access_token');
        } catch (_) {}
        if (redirectUrl) window.location.href = redirectUrl;
      }
    },
    redirectToLogin: () => {
      // No-op: evita loop de reload quando não há página de login (mock/local).
    },
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        // Mock: convert file to data URL for local preview
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ file_url: reader.result });
          reader.readAsDataURL(file);
        });
      },
      InvokeLLM: async () => {
        // Mock: LLM not available in local mode
        return { result: '' };
      },
    },
  },
  appLogs: {
    logUserInApp: () => Promise.resolve(),
  },
};
