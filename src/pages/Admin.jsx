import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import ProductForm from './admin/ProductForm';
import Catalog from './admin/Catalog';
import Categories from './admin/Categories';
import Tags from './admin/Tags';
import HomeSettings from './admin/HomeSettings';
import StoreSettings from './admin/StoreSettings';
import ChatSettings from './admin/ChatSettings';
import BannerSettings from './admin/BannerSettings';
import CatalogSettings from './admin/CatalogSettings';
import PaymentSettings from './admin/PaymentSettings';

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || '';
  const id = searchParams.get('id') || '';
  const tab = searchParams.get('tab') || '';

  const onNavigate = useCallback((newView, params = {}) => {
    const p = {};
    if (newView) p.view = newView;
    Object.entries(params).forEach(([k, v]) => { if (v) p[k] = v; });
    setSearchParams(p);
  }, [setSearchParams]);

  const renderContent = () => {
    switch (view) {
      case 'products':
        return <Products onNavigate={onNavigate} />;
      case 'product-form':
        return <ProductForm onNavigate={onNavigate} productId={id || null} />;
      case 'catalog':
        return <Catalog onNavigate={onNavigate} />;
      case 'categories':
        return <Categories onNavigate={onNavigate} />;
      case 'tags':
        return <Tags onNavigate={onNavigate} />;
      case 'home-settings':
        return <HomeSettings onNavigate={onNavigate} />;
      case 'store-settings':
        return <StoreSettings onNavigate={onNavigate} tab={tab} />;
      case 'chat-settings':
        return <ChatSettings onNavigate={onNavigate} />;
      case 'banner-settings':
        return <BannerSettings onNavigate={onNavigate} />;
      case 'catalog-settings':
        return <CatalogSettings onNavigate={onNavigate} />;
      case 'payment-settings':
        return <PaymentSettings onNavigate={onNavigate} />;
      default:
        return <Dashboard onNavigate={onNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <AdminLayout currentView={view} onNavigate={onNavigate}>
        {renderContent()}
      </AdminLayout>
    </ThemeProvider>
  );
}
