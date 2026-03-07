import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { searchAppleCatalog } from './appleProductCatalog';

export default function SmartProductSearch({ onSelect, categories }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (query.length >= 2) {
      const grouped = searchAppleCatalog(query);
      setResults(grouped);
      setOpen(grouped.length > 0);
      setActiveIndex(-1);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  // Flatten items for keyboard navigation
  const flatItems = results.flatMap((g) => g.items);

  const handleSelect = (product) => {
    // Find matching category
    const matchedCategory = categories?.find(
      (c) => c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
             product.category_match.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );

    onSelect({
      name: product.name,
      sku: product.sku,
      description: product.description,
      category_id: matchedCategory?.id || '',
      price: product.price,
      specs: product.specs,
      condition: 'new',
      express_delivery: true,
      stock: 0,
      images: [],
      original_price: '',
      datasheet_url: '',
    });

    setQuery('');
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(flatItems[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleFillClick = () => {
    if (flatItems.length > 0) {
      const idx = activeIndex >= 0 ? activeIndex : 0;
      handleSelect(flatItems[idx]);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (listRef.current && !listRef.current.contains(e.target) && !inputRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  let flatIndex = -1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.02, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/[0.04] via-white/[0.02] to-blue-500/[0.04] overflow-visible">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.04]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/15">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/90">Cadastro Inteligente</h3>
            <p className="text-[11px] text-white/30">Digite o nome do produto e preencha tudo automaticamente</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-5">
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-white/20" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => query.length >= 2 && results.length > 0 && setOpen(true)}
                  placeholder="Buscar produto Apple..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-violet-500/30 focus:ring-2 focus:ring-violet-500/10 transition-all"
                />
              </div>
              <Button
                onClick={handleFillClick}
                disabled={flatItems.length === 0}
                className="h-11 px-5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20 rounded-xl font-semibold text-[13px] gap-2 disabled:opacity-30 disabled:shadow-none"
              >
                <Zap className="h-3.5 w-3.5" />
                Preencher
              </Button>
            </div>

            {/* Dropdown Results */}
            <AnimatePresence>
              {open && results.length > 0 && (
                <motion.div
                  ref={listRef}
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 left-0 right-0 mt-2 rounded-xl border border-white/[0.08] bg-[#141416] shadow-2xl shadow-black/40 overflow-hidden max-h-[320px] overflow-y-auto"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {results.map((group) => (
                    <div key={group.category}>
                      {/* Category Header */}
                      <div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
                        <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.12em]">{group.category}</span>
                      </div>
                      {/* Items */}
                      {group.items.map((item) => {
                        flatIndex++;
                        const idx = flatIndex;
                        const isActive = activeIndex === idx;
                        return (
                          <button
                            key={item.sku}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => handleSelect(item)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                              isActive
                                ? 'bg-violet-500/10 text-white'
                                : 'text-white/60 hover:bg-white/[0.03] hover:text-white/80'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-violet-400' : 'bg-white/10'}`} />
                              <span className="text-[13px] font-medium truncate">{item.name}</span>
                            </div>
                            <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${isActive ? 'text-violet-400' : 'text-white/10'}`} />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
