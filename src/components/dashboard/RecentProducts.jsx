import React from "react";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";
import { formatPrice } from '@/lib/format';

export default function RecentProducts({ products = [], onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden h-full"
    >
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Ultimos Produtos</h3>
        <button
          onClick={() => onNavigate('products')}
          className="text-[12px] font-medium text-[#0071e3] hover:text-[#0077ED] flex items-center gap-0.5 transition-colors"
        >
          Ver todos <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-2 pb-2">
        {products.slice(0, 6).map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f7] transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-[#f5f5f7] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <Package className="w-4 h-4 text-[#c7c7cc]" strokeWidth={1.5} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#1d1d1f] truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[12px] font-semibold text-[#1d1d1f]">{formatPrice(product.price)}</span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-[10px] text-[#86868b] line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              {(product.stock || 0) <= 0 ? (
                <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Esgotado</span>
              ) : (product.stock || 0) <= 2 ? (
                <span className="text-[10px] font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{product.stock} un.</span>
              ) : (
                <span className="text-[11px] text-[#b0b0b5] tabular-nums">{product.stock} un.</span>
              )}
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-8 h-8 text-[#d2d2d7] mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-[13px] text-[#86868b]">Nenhum produto cadastrado</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
