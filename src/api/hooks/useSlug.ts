import { useSyncExternalStore } from 'react';

function getSlug() {
  return localStorage.getItem('store_slug') || '';
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('auth:slug-changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('auth:slug-changed', callback);
  };
}

export function useSlug() {
  return useSyncExternalStore(subscribe, getSlug);
}
