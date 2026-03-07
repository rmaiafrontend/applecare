import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdminLayout({ currentView, onNavigate, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-shrink-0 h-screen sticky top-0 border-r border-white/[0.06]">
        <AdminSidebar currentView={currentView} onNavigate={onNavigate} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[280px] bg-[#0a0a0b] border-none">
          <AdminSidebar currentView={currentView} onNavigate={onNavigate} onClose={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative">
        {/* Ambient background effects */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

        {/* Mobile Topbar */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-none">WEGX</h1>
              <p className="text-[9px] text-white/35 font-medium tracking-wide uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="relative p-4 lg:p-8 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
