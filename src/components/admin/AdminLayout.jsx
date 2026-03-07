import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Settings,
  Menu,
  X,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Home
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const navSections = [
  {
    label: "GERAL",
    items: [
      { name: "Dashboard", view: "", icon: LayoutDashboard },
      { name: "Produtos", view: "products", icon: Package },
      { name: "Catalogo", view: "catalog", icon: Grid3X3 },
    ],
  },
  {
    label: "CONFIGURACAO",
    items: [
      { name: "Layout da Home", view: "home-settings", icon: Home },
      { name: "Chat IA", view: "chat-settings", icon: MessageCircle },
      { name: "Configuracoes", view: "store-settings", icon: Settings },
    ],
  },
];

const viewTitles = {
  "": "Dashboard",
  "products": "Produtos",
  "product-form": "Novo Produto",
  "catalog": "Catalogo",
  "categories": "Categorias",
  "tags": "Tags",
  "home-settings": "Layout da Home",
  "store-settings": "Configuracoes",
  "chat-settings": "Chat IA",
  "banner-settings": "Banners",
  "catalog-settings": "Catalogo Config",
  "payment-settings": "Pagamentos",
};

export default function AdminLayout({ currentView, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f1f3]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a1d23] px-4 h-14 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
          <Menu className="w-[18px] h-[18px] text-white/70" strokeWidth={1.8} />
        </button>
        <span className="font-bold text-white text-[15px] tracking-tight">WEGX</span>
        <div className="w-9" />
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-[240px] bg-[#1a1d23]
        transition-transform duration-300 ease-out flex flex-col
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#1a1d23] text-[13px] font-bold">W</span>
            </div>
            <span className="font-bold text-white text-[16px] tracking-tight">WEGX</span>
          </div>
          <button className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4 text-white/50" strokeWidth={1.8} />
          </button>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 px-3">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] px-3 mb-2">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentView === item.view;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.view}
                      onClick={() => {
                        onNavigate(item.view);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px]
                        transition-all duration-200 group text-left
                        ${isActive
                          ? 'bg-white/10 text-white font-medium'
                          : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
                        }
                      `}
                    >
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/50'}`} strokeWidth={isActive ? 2 : 1.6} />
                      <span className="flex-1">{item.name}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/40" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Bottom section */}
        <div className="flex-shrink-0 border-t border-white/[0.06]">
          <a
            href={createPageUrl("Home")}
            className="flex items-center gap-2.5 mx-3 mt-3 mb-2 px-3 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-all"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" strokeWidth={1.6} />
            <span>Ver Catalogo</span>
          </a>

          <div className="px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[12px] font-bold text-white/70">
                {user?.full_name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-white/80 truncate">{user?.full_name || "Admin"}</p>
              <p className="text-[10px] text-white/30 truncate">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[240px] pt-14 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between h-14 px-8 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <h1 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
            {viewTitles[currentView] || currentView}
          </h1>
          <div className="flex items-center gap-3">
            <a
              href={createPageUrl("Home")}
              className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Catalogo
            </a>
            <div className="w-7 h-7 bg-[#f5f5f7] rounded-full flex items-center justify-center">
              <span className="text-[11px] font-bold text-[#86868b]">
                {user?.full_name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
          </div>
        </header>

        <div className="p-5 lg:px-8 lg:py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
