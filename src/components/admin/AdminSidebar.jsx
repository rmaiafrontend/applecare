import React from 'react';
import { LayoutDashboard, Package, Grid3X3, ArrowLeft, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: null },
  { id: 'products', label: 'Produtos', icon: Package, view: 'products' },
  { id: 'categories', label: 'Categorias', icon: Grid3X3, view: 'categories' },
];

export default function AdminSidebar({ currentView, onNavigate, onClose }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0b] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-violet-500/8 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative p-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-none">WEGX</h1>
              <p className="text-[11px] text-white/40 font-medium mt-0.5 tracking-wide uppercase">Admin Panel</p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 lg:hidden h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 relative">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-3">Menu</p>
        {navItems.map((item) => {
          const isActive = currentView === (item.view || '');
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onNavigate(item.view);
                onClose?.();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative group ${
                isActive
                  ? 'text-white'
                  : 'text-white/45 hover:text-white/80'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.04] border border-white/[0.06]"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative flex items-center gap-3">
                <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-violet-400' : 'text-white/40 group-hover:text-white/60'} transition-colors`} />
                {item.label}
              </span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-gradient-to-b from-violet-400 to-blue-500" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative p-3 mt-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />
        <a
          href={createPageUrl('Home')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
          Voltar para Loja
        </a>
      </div>
    </div>
  );
}
