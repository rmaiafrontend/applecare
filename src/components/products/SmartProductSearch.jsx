import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, Search, Zap, ChevronRight } from "lucide-react";

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

// Group suggestions by family for display
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
  const containerRef = useRef(null);

  const grouped = groupSuggestions(query);
  const hasResults = Object.keys(grouped).length > 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
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
    <div ref={containerRef} className="relative bg-white/70 dark:bg-[#2c2c2e]/70 backdrop-blur-xl rounded-3xl p-6 overflow-visible border border-white/50 dark:border-white/[0.06] shadow-[0_2px_20px_-6px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_-6px_rgba(0,0,0,0.3)]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold text-[15px]">Cadastro Inteligente</h2>
            <p className="text-[#86868b] dark:text-[#98989d] text-[12px]">Digite o nome do produto e a IA preenche tudo automaticamente</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b] dark:text-[#98989d] z-10" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => { if (query.length > 0) setShowDropdown(true); }}
            placeholder="Ex: iPhone 16, MacBook Air, AirPods Pro..."
            disabled={loading}
            className="w-full h-14 pl-12 pr-36 bg-[#f5f5f7]/80 dark:bg-[#1c1c1e]/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.06] rounded-2xl text-[#1d1d1f] dark:text-[#f5f5f7] text-[15px] placeholder:text-[#86868b] dark:placeholder:text-[#636366] focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/20 transition-all disabled:opacity-50"
            onKeyDown={e => { if (e.key === "Enter" && query.trim()) fetchProductData(query.trim()); }}
          />
          <button
            onClick={() => query.trim() && fetchProductData(query.trim())}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white rounded-xl text-[13px] font-semibold flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg z-10"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Buscando...</>
            ) : (
              <><Zap className="w-4 h-4" /> Preencher</>
            )}
          </button>

          {/* Autocomplete dropdown */}
          {showDropdown && !loading && query.trim().length > 0 && hasResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-[#2c2c2e]/95 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-50 max-h-80 overflow-y-auto">
              {Object.entries(grouped).map(([family, models]) => (
                <div key={family}>
                  {/* Family header */}
                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#86868b] dark:text-[#98989d] uppercase tracking-widest">{family}</span>
                    <div className="flex-1 h-px bg-black/[0.04] dark:bg-white/[0.06]" />
                  </div>
                  {/* Model items */}
                  {models.map((model) => {
                    // Highlight the matching part
                    const idx = model.toLowerCase().indexOf(query.toLowerCase().trim());
                    const before = model.slice(0, idx);
                    const match = model.slice(idx, idx + query.trim().length);
                    const after = model.slice(idx + query.trim().length);

                    return (
                      <button
                        key={model}
                        onClick={() => fetchProductData(model)}
                        className="w-full text-left px-4 py-2.5 text-[13px] text-[#6e6e73] dark:text-[#98989d] hover:bg-[#f5f5f7] dark:hover:bg-white/[0.06] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors flex items-center gap-3 group"
                      >
                        <span className="w-7 h-7 bg-[#f5f5f7] dark:bg-[#3a3a3c] group-hover:bg-violet-500/15 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                          <Sparkles className="w-3 h-3 text-violet-500 dark:text-violet-400" />
                        </span>
                        <span className="flex-1 truncate">
                          {idx >= 0 ? (
                            <>{before}<span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold">{match}</span>{after}</>
                          ) : model}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#d2d2d7] dark:text-[#48484a] group-hover:text-[#86868b] dark:group-hover:text-[#98989d] flex-shrink-0 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* No results hint */}
          {showDropdown && !loading && query.trim().length > 0 && !hasResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-[#2c2c2e]/95 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-50">
              <div className="px-4 py-4 text-center space-y-1">
                <p className="text-[13px] text-[#86868b] dark:text-[#98989d]">Nenhum modelo encontrado para "{query}"</p>
                <p className="text-[11px] text-[#b0b0b5] dark:text-[#636366]">Pressione <kbd className="px-1.5 py-0.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded text-[10px] text-[#86868b] dark:text-[#98989d]">Enter</kbd> para buscar com IA mesmo assim</p>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-[#86868b] dark:text-[#98989d] text-[12px]">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            Buscando especificações, preços e detalhes do produto...
          </div>
        )}
      </div>
    </div>
  );
}
