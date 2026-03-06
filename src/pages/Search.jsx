import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon, Sparkles, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import ProductCard from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { smartSearch, suggestedQueries } from '@/lib/smartSearch';

export default function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  const { data: products = [] } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  // Debounce query
  useEffect(() => {
    if (!query.trim()) {
      setDebouncedQuery('');
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setTimeout(() => setIsSearching(false), 300);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Auto-focus input
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const searchResult = debouncedQuery
    ? smartSearch(debouncedQuery, products, categories)
    : { results: [], interpretation: [], query: '' };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showBack title="Busca Inteligente" />

      <main className="pt-14 w-full max-w-lg mx-auto px-4">
        {/* Search Input */}
        <div className="relative mt-2">
          <div className="relative flex items-center">
            <Sparkles className="absolute left-3.5 w-4 h-4 text-gray-400" strokeWidth={2} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Descreva o que voce procura..."
              className="w-full h-12 pl-10 pr-10 rounded-2xl bg-gray-100 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* AI Interpretation Chips */}
        <AnimatePresence>
          {searchResult.interpretation.length > 0 && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-wrap gap-1.5 mt-3"
            >
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> IA entendeu:
              </span>
              {searchResult.interpretation.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="inline-flex items-center bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-full"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isSearching && query.trim() && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Analisando sua busca...</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[3/4] rounded-2xl" />
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!isSearching && debouncedQuery && searchResult.results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5"
          >
            <p className="text-[12px] text-gray-400 mb-3">
              {searchResult.results.length} produto{searchResult.results.length !== 1 ? 's' : ''} encontrado{searchResult.results.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {searchResult.results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {!isSearching && debouncedQuery && searchResult.results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-7 h-7 text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-gray-900">Nenhum resultado</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[220px] mx-auto">
              Tente descrever o que voce precisa de outra forma
            </p>
          </motion.div>
        )}

        {/* Suggestions (empty state) */}
        {!query.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-gray-400" strokeWidth={2} />
              <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                Tente perguntar
              </span>
            </div>
            <div className="space-y-2">
              {suggestedQueries.map((suggestion, i) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors group"
                >
                  <SearchIcon className="w-4 h-4 text-gray-300 shrink-0" strokeWidth={2} />
                  <span className="text-[13px] text-gray-600 flex-1">{suggestion}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition-colors shrink-0" strokeWidth={2} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
