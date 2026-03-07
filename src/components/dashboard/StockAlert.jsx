import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight } from "lucide-react";

export default function StockAlert({ products = [], onNavigate }) {
  const lowStock = products.filter(p => (p.stock || 0) <= 2 && p.is_active !== false);

  if (lowStock.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-orange-200/60 bg-gradient-to-r from-orange-50/80 to-amber-50/40 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4 h-4 text-orange-500" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-[#1d1d1f]">
            Estoque baixo — {lowStock.length} {lowStock.length === 1 ? "produto" : "produtos"}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lowStock.slice(0, 5).map(p => (
              <span key={p.id} className="text-[11px] font-medium bg-white/80 text-[#1d1d1f] px-2.5 py-1 rounded-full truncate max-w-[160px] border border-orange-100">
                {p.name} <span className="text-orange-500">({p.stock || 0})</span>
              </span>
            ))}
            {lowStock.length > 5 && (
              <span className="text-[11px] font-medium bg-white/60 text-[#86868b] px-2.5 py-1 rounded-full">
                +{lowStock.length - 5} mais
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="flex-shrink-0 mt-1 w-8 h-8 rounded-xl bg-white/80 border border-orange-100 flex items-center justify-center text-orange-400 hover:text-orange-600 hover:bg-white transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
