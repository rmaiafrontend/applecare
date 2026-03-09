import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CompareFloatingBar from '@/components/compare/CompareFloatingBar';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Splash and Admin pages should not have the storefront layout
  if (currentPageName === 'Splash' || currentPageName === 'LandingPage') {
    return children;
  }

  if (currentPageName === 'Admin') {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        :root {
          --apple-black: #1d1d1f;
          --apple-dark: #000000;
          --apple-gray-dark: #333333;
          --apple-gray-medium: #6e6e73;
          --apple-gray-light: #f5f5f7;
          --apple-success: #10B981;
          --apple-error: #EF4444;
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        .safe-area-top {
          padding-top: env(safe-area-inset-top);
        }
        
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      {children}
      <CompareFloatingBar />
    </div>
  );
}