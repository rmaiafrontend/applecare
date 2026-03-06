import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '@/lib/CompareContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function CompareFloatingBar() {
  const navigate = useNavigate();
  const { compareIds, removeFromCompare, clearCompare } = useCompare();

  const { data: products = [] } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => base44.entities.Product.list(),
  });

  const selectedProducts = compareIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {compareIds.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-[68px] left-0 right-0 z-40"
        >
          <div className="max-w-lg mx-auto px-4 pb-2">
            <div className="bg-gray-900 rounded-2xl p-3 shadow-xl flex items-center gap-3">
              {/* Product Thumbnails */}
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                {selectedProducts.map(product => (
                  <div key={product.id} className="relative shrink-0">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop'}
                      alt={product.name}
                      className="w-10 h-10 rounded-xl object-cover border-2 border-gray-700"
                    />
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center"
                    >
                      <X className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </button>
                  </div>
                ))}
                <span className="text-[11px] text-gray-400 ml-1 truncate">
                  {compareIds.length}/3 selecionado{compareIds.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={clearCompare}
                  className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Limpar
                </button>
                <button
                  onClick={() => navigate('/Compare')}
                  disabled={compareIds.length < 2}
                  className="flex items-center gap-1.5 bg-white text-gray-900 text-[12px] font-semibold px-3.5 py-2 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  Comparar
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
