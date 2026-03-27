import React, { useState, useEffect } from "react";
import { createPageUrl } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/lib/AuthContext";
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Settings,
  Menu,
  X,
  MessageCircle,
  ExternalLink,
  Home,
  Search,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

const navSections = [
  {
    label: "Geral",
    items: [
      { name: "Dashboard", view: "", icon: LayoutDashboard },
      { name: "Produtos", view: "products", icon: Package },
      { name: "Catálogo", view: "catalog", icon: Grid3X3 },
    ],
  },
  {
    label: "Configuração",
    items: [
      { name: "Vitrine", view: "home-settings", icon: Home },
      { name: "Chat IA", view: "chat-settings", icon: MessageCircle },
      { name: "Configurações", view: "store-settings", icon: Settings },
    ],
  },
];

const viewTitles = {
  "": "Dashboard",
  "products": "Produtos",
  "product-form": "Novo Produto",
  "catalog": "Catálogo",
  "categories": "Categorias",
  "tags": "Tags",
  "home-settings": "Vitrine",
  "store-settings": "Configurações",
  "chat-settings": "Chat IA",
  "banner-settings": "Banners",
  "catalog-settings": "Catálogo Config",
  "payment-settings": "Pagamentos",
};

export default function AdminLayout({ currentView, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  useEffect(() => {
    setUser(null);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handler = () => setProfileOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [profileOpen]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#1c1c1e] transition-colors duration-300">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-4 bg-white/70 dark:bg-[#2c2c2e]/80 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06]">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:bg-black/[0.08] transition-all"
        >
          <Menu className="w-[18px] h-[18px] text-[#1d1d1f] dark:text-[#f5f5f7]" strokeWidth={1.8} />
        </button>
        <img src="/logo-alink.png" alt="aLink" className="h-6 object-contain" />
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-[#ff9f0a]" strokeWidth={1.8} />
          ) : (
            <Moon className="w-4 h-4 text-[#86868b]" strokeWidth={1.8} />
          )}
        </button>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          sidebarOpen
            ? "bg-black/20 dark:bg-black/40 backdrop-blur-sm pointer-events-auto"
            : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px]
          bg-white/60 dark:bg-[#2c2c2e]/80 backdrop-blur-2xl
          border-r border-black/[0.06] dark:border-white/[0.06]
          transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          flex flex-col
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Area */}
        <div className="h-14 px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <img src="/logo-alink.png" alt="aLink" className="w-[30px] h-[30px] object-contain" />
            </div>
          </div>
          <button
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d]" strokeWidth={2} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 mb-1">
          <div className="flex items-center gap-2 h-[32px] px-2.5 rounded-[8px] bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.04] transition-colors focus-within:bg-white dark:focus-within:bg-white/[0.1] focus-within:border-black/[0.08] dark:focus-within:border-white/[0.12] focus-within:shadow-sm">
            <Search className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d] flex-shrink-0" strokeWidth={2} />
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-[12px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b]/60 dark:placeholder:text-[#98989d]/60 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = e.target.value.toLowerCase();
                  const all = navSections.flatMap((s) => s.items);
                  const match = all.find((i) => i.name.toLowerCase().includes(q));
                  if (match) {
                    onNavigate(match.view);
                    e.target.value = "";
                    setSidebarOpen(false);
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-[11px] font-medium text-[#86868b] dark:text-[#98989d] px-2 mb-1 select-none">
                {section.label}
              </p>
              <div className="space-y-[2px]">
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
                        w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[8px] text-[13px]
                        transition-all duration-200 group text-left relative
                        ${
                          isActive
                            ? "bg-[#007aff]/[0.08] dark:bg-[#0a84ff]/[0.15] text-[#007aff] dark:text-[#0a84ff] font-medium"
                            : "text-[#1d1d1f]/70 dark:text-[#f5f5f7]/70 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
                        }
                      `}
                    >
                      <Icon
                        className={`w-[17px] h-[17px] flex-shrink-0 transition-colors duration-200 ${
                          isActive
                            ? "text-[#007aff] dark:text-[#0a84ff]"
                            : "text-[#86868b] dark:text-[#98989d] group-hover:text-[#1d1d1f]/60 dark:group-hover:text-[#f5f5f7]/60"
                        }`}
                        strokeWidth={isActive ? 2 : 1.6}
                      />
                      <span className="flex-1 tracking-[-0.01em]">{item.name}</span>
                      {isActive && (
                        <div className="w-[3px] h-[14px] rounded-full bg-[#007aff] dark:bg-[#0a84ff] absolute right-0 translate-x-[1px]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 p-3 space-y-1">
          {/* View Catalog Link */}
          <a
            href={createPageUrl("Home")}
            className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-[8px] text-[12px] text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all group"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:text-[#1d1d1f]/60 dark:group-hover:text-[#f5f5f7]/60" strokeWidth={1.6} />
            <span>Ver Catálogo</span>
          </a>

          {/* Separator */}
          <div className="h-px bg-black/[0.04] dark:bg-white/[0.06] mx-1" />

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen(!profileOpen);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all group"
            >
              <div className="w-[30px] h-[30px] bg-gradient-to-br from-[#007aff] to-[#5856d6] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-[11px] font-semibold text-white">
                  {user?.full_name?.[0]?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate leading-tight">
                  {user?.full_name || "Admin"}
                </p>
                <p className="text-[10px] text-[#86868b] dark:text-[#98989d] truncate leading-tight">
                  {user?.email || "admin@applelink.com"}
                </p>
              </div>
              <ChevronDown
                className={`w-3 h-3 text-[#86868b] dark:text-[#98989d] transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute bottom-full left-2 right-2 mb-1 bg-white/90 dark:bg-[#3a3a3c]/90 backdrop-blur-2xl rounded-[10px] border border-black/[0.06] dark:border-white/[0.08] shadow-lg shadow-black/[0.06] dark:shadow-black/[0.3] overflow-hidden">
                <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] text-[#ff3b30] dark:text-[#ff453a] hover:bg-[#ff3b30]/[0.06] dark:hover:bg-[#ff453a]/[0.1] transition-colors">
                  <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[260px] pt-12 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between h-12 px-8 bg-white/60 dark:bg-[#2c2c2e]/60 backdrop-blur-2xl border-b border-black/[0.04] dark:border-white/[0.06] sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <h1 className="text-[15px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-[-0.02em]">
              {viewTitles[currentView] || currentView}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
              title={theme === "dark" ? "Tema claro" : "Tema escuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#ff9f0a]" strokeWidth={1.8} />
              ) : (
                <Moon className="w-4 h-4 text-[#86868b]" strokeWidth={1.8} />
              )}
            </button>
            <a
              href={createPageUrl("Home")}
              className="text-[12px] text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
            >
              <ExternalLink className="w-3 h-3" strokeWidth={2} />
              <span>Catálogo</span>
            </a>
            <div className="w-px h-4 bg-black/[0.06] dark:bg-white/[0.08]" />
            <div className="w-[26px] h-[26px] bg-gradient-to-br from-[#007aff] to-[#5856d6] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-semibold text-white">
                {user?.full_name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
          </div>
        </header>

        <div className="p-5 lg:px-8 lg:py-6">{children}</div>
      </main>
    </div>
  );
}
