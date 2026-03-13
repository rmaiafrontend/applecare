import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, Search, Zap, ChevronRight, Cpu } from "lucide-react";

const appleProducts = {
  "iPhone": [
    "iPhone 16e",
    "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
    "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
    "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
    "iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max",
    "iPhone SE (3ª geração)",
  ],
  "iPad": [
    "iPad Pro M4 11\"", "iPad Pro M4 13\"",
    "iPad Air M3 11\"", "iPad Air M3 13\"",
    "iPad (10ª geração)",
    "iPad Mini (A17 Pro)",
  ],
  "MacBook": [
    "MacBook Air M4 13\"", "MacBook Air M4 15\"",
    "MacBook Air M3 13\"", "MacBook Air M3 15\"",
    "MacBook Pro M4 14\"", "MacBook Pro M4 16\"",
    "MacBook Pro M4 Pro 14\"", "MacBook Pro M4 Pro 16\"",
    "MacBook Pro M4 Max 14\"", "MacBook Pro M4 Max 16\"",
  ],
  "iMac": [
    "iMac M4 24\"",
  ],
  "Mac": [
    "Mac Mini M4", "Mac Mini M4 Pro",
    "Mac Studio M4 Max", "Mac Studio M4 Ultra",
    "Mac Pro M2 Ultra",
  ],
  "Apple Watch": [
    "Apple Watch Series 10 42mm", "Apple Watch Series 10 46mm",
    "Apple Watch Ultra 2",
    "Apple Watch SE (2ª geração) 40mm", "Apple Watch SE (2ª geração) 44mm",
  ],
  "AirPods": [
    "AirPods 4", "AirPods 4 com ANC",
    "AirPods Pro 2 (USB-C)",
    "AirPods Max (USB-C)",
  ],
  "Apple TV": [
    "Apple TV 4K (Wi-Fi)", "Apple TV 4K (Wi-Fi + Ethernet)",
  ],
  "HomePod": [
    "HomePod (2ª geração)", "HomePod Mini",
  ],
  "Acessórios": [
    "Apple Pencil Pro", "Apple Pencil (USB-C)",
    "Magic Keyboard", "Magic Keyboard com Touch ID",
    "Magic Mouse", "Magic Trackpad",
    "AirTag", "AirTag (4 unidades)",
  ],
};

const allProducts = Object.values(appleProducts).flat();

function groupSuggestions(query) {
  const q = query.toLowerCase().trim();
  if (!q) return {};

  const groups = {};
  for (const [family, models] of Object.entries(appleProducts)) {
    const matches = models.filter(m => m.toLowerCase().includes(q));
    if (matches.length > 0) {
      groups[family] = matches;
    }
  }
  return groups;
}

export default function SmartProductSearch({ onProductData, categories = [] }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const grouped = groupSuggestions(query);
  const hasResults = Object.keys(grouped).length > 0;
  const totalResults = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchProductData = async (productName) => {
    setQuery(productName);
    setShowDropdown(false);
    setLoading(true);

    const catNames = categories.map(c => c.name).join(", ");

    const result = { result: '' };

    setLoading(false);
    onProductData(result);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Main container */}
      <div className={`relative rounded-2xl transition-all duration-300 ${
        focused
          ? "bg-white dark:bg-[#2c2c2e] shadow-[0_0_0_1px_rgba(0,122,255,0.2),0_8px_40px_-12px_rgba(0,122,255,0.12)] dark:shadow-[0_0_0_1px_rgba(10,132,255,0.3),0_8px_40px_-12px_rgba(10,132,255,0.15)]"
          : "bg-white/70 dark:bg-[#2c2c2e]/70 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/[0.06]"
      }`}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            focused
              ? "bg-[#007aff] shadow-lg shadow-[#007aff]/20"
              : "bg-gradient-to-br from-[#007aff]/10 to-violet-500/10"
          }`}>
            {focused ? (
              <Cpu className="w-[18px] h-[18px] text-white" strokeWidth={1.8} />
            ) : (
              <Sparkles className="w-[18px] h-[18px] text-[#007aff]" strokeWidth={1.8} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-[-0.01em]">Cadastro Inteligente</h2>
            <p className="text-[11px] text-[#86868b] dark:text-[#98989d] leading-tight">A IA preenche os dados automaticamente</p>
          </div>
          {loading && (
            <div className="flex items-center gap-1.5 bg-[#007aff]/[0.08] dark:bg-[#0a84ff]/[0.12] px-2.5 py-1 rounded-full">
              <Loader2 className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff] animate-spin" />
              <span className="text-[10px] font-medium text-[#007aff] dark:text-[#0a84ff]">Buscando</span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="mx-5 h-px bg-black/[0.04] dark:bg-white/[0.06]" />

        {/* Input area */}
        <div className="relative px-3 py-3">
          <div className="relative flex items-center">
            <Search className={`absolute left-3 w-[18px] h-[18px] transition-colors duration-200 z-10 ${
              focused ? "text-[#007aff] dark:text-[#0a84ff]" : "text-[#c7c7cc] dark:text-[#636366]"
            }`} strokeWidth={2} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => { setFocused(true); if (query.length > 0) setShowDropdown(true); }}
              placeholder="Buscar produto Apple..."
              disabled={loading}
              className={`w-full h-12 pl-10 pr-28 rounded-xl text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#c7c7cc] dark:placeholder:text-[#48484a] focus:outline-none transition-all disabled:opacity-50 ${
                focused
                  ? "bg-[#f5f5f7]/60 dark:bg-[#1c1c1e]/60"
                  : "bg-[#f5f5f7]/80 dark:bg-[#1c1c1e]/80"
              }`}
              onKeyDown={e => { if (e.key === "Enter" && query.trim()) fetchProductData(query.trim()); }}
            />
            <button
              onClick={() => query.trim() && fetchProductData(query.trim())}
              disabled={loading || !query.trim()}
              className="absolute right-1.5 h-9 px-4 bg-[#007aff] hover:bg-[#0071e3] dark:bg-[#0a84ff] dark:hover:bg-[#409cff] text-white rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  Preencher
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading bar */}
        {loading && (
          <div className="mx-5 mb-3">
            <div className="h-1 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#007aff] to-violet-500 rounded-full animate-pulse" style={{ width: "65%" }} />
            </div>
            <p className="text-[11px] text-[#86868b] dark:text-[#98989d] mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff]" />
              Buscando especificações, preços e detalhes...
            </p>
          </div>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {showDropdown && !loading && query.trim().length > 0 && hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] z-50 max-h-[320px] overflow-y-auto styled-scrollbar">
          {/* Results count */}
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#b0b0b5] dark:text-[#636366]">{totalResults} modelo{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}</span>
          </div>

          {Object.entries(grouped).map(([family, models]) => (
            <div key={family}>
              <div className="px-4 pt-2 pb-1 flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#86868b] dark:text-[#98989d] uppercase tracking-widest">{family}</span>
                <div className="flex-1 h-px bg-black/[0.03] dark:bg-white/[0.04]" />
                <span className="text-[9px] text-[#c7c7cc] dark:text-[#48484a] tabular-nums">{models.length}</span>
              </div>
              {models.map((model) => {
                const idx = model.toLowerCase().indexOf(query.toLowerCase().trim());
                const before = model.slice(0, idx);
                const match = model.slice(idx, idx + query.trim().length);
                const after = model.slice(idx + query.trim().length);

                return (
                  <button
                    key={model}
                    onClick={() => fetchProductData(model)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#6e6e73] dark:text-[#98989d] hover:bg-[#007aff]/[0.06] dark:hover:bg-[#0a84ff]/[0.08] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors flex items-center gap-2.5 group"
                  >
                    <span className="w-6 h-6 bg-[#f5f5f7] dark:bg-[#3a3a3c] group-hover:bg-[#007aff]/10 dark:group-hover:bg-[#0a84ff]/15 rounded-md flex items-center justify-center flex-shrink-0 transition-colors">
                      <Sparkles className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff]" />
                    </span>
                    <span className="flex-1 truncate">
                      {idx >= 0 ? (
                        <>{before}<span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold">{match}</span>{after}</>
                      ) : model}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#d2d2d7] dark:text-[#48484a] group-hover:text-[#007aff] dark:group-hover:text-[#0a84ff] flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showDropdown && !loading && query.trim().length > 0 && !hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] z-50">
          <div className="px-5 py-5 text-center space-y-2">
            <div className="w-10 h-10 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-xl flex items-center justify-center mx-auto">
              <Search className="w-4 h-4 text-[#c7c7cc] dark:text-[#636366]" />
            </div>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d]">Nenhum modelo encontrado</p>
            <p className="text-[11px] text-[#c7c7cc] dark:text-[#636366]">
              Pressione <kbd className="px-1.5 py-0.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded text-[10px] font-medium text-[#86868b] dark:text-[#98989d] border border-black/[0.04] dark:border-white/[0.06]">Enter</kbd> para buscar com IA
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
