import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminProductForm from './admin/AdminProductForm';
import AdminCategories from './admin/AdminCategories';
import AdminCategoryForm from './admin/AdminCategoryForm';

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || '';
  const action = searchParams.get('action') || '';
  const id = searchParams.get('id') || '';

  const onNavigate = useCallback((newView, newAction, newId) => {
    const params = {};
    if (newView) params.view = newView;
    if (newAction) params.action = newAction;
    if (newId) params.id = newId;
    setSearchParams(params);
  }, [setSearchParams]);

  const renderContent = () => {
    if (view === 'products' && (action === 'new' || action === 'edit')) {
      return <AdminProductForm productId={action === 'edit' ? id : null} onNavigate={onNavigate} />;
    }
    if (view === 'products') {
      return <AdminProducts onNavigate={onNavigate} />;
    }
    if (view === 'categories' && (action === 'new' || action === 'edit')) {
      return <AdminCategoryForm categoryId={action === 'edit' ? id : null} onNavigate={onNavigate} />;
    }
    if (view === 'categories') {
      return <AdminCategories onNavigate={onNavigate} />;
    }
    return <AdminDashboard onNavigate={onNavigate} />;
  };

  return (
    <AdminLayout currentView={view} onNavigate={(v) => onNavigate(v)}>
      {renderContent()}
    </AdminLayout>
  );
}
