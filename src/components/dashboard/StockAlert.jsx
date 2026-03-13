import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight } from "lucide-react";

export default function StockAlert({ products = [], onNavigate }) {
  const lowStock = products.filter(
    (p) => (p.stock || 0) <= 2 && p.is_active !== false
  );

  if (lowStock.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      className="rounded-2xl bg-[#ff9500]/[0.04] dark:bg-[#ff9f0a]/[0.08] border border-[#ff9500]/[0.12] dark:border-[#ff9f0a]/[0.15] p-4 sm:p-5 backdrop-blur-xl"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[#ff9500]/[0.08] dark:bg-[#ff9f0a]/[0.12]">
          <AlertTriangle
            className="w-4 h-4 text-[#ff9500] dark:text-[#ff9f0a]"
            strokeWidth={2}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-[-0.01em]">
            Estoque baixo — {lowStock.length}{" "}
            {lowStock.length === 1 ? "produto" : "produtos"}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {lowStock.slice(0, 5).map((p) => (
              <span
                key={p.id}
                className="text-[11px] font-medium bg-white/80 dark:bg-white/[0.08] backdrop-blur-sm text-[#1d1d1f] dark:text-[#f5f5f7] px-2.5 py-1 rounded-full truncate max-w-[160px] border border-[#ff9500]/[0.1] dark:border-[#ff9f0a]/[0.15]"
              >
                {p.name}{" "}
                <span className="text-[#ff9500] dark:text-[#ff9f0a] font-semibold">
                  ({p.stock || 0})
                </span>
              </span>
            ))}
            {lowStock.length > 5 && (
              <span className="text-[11px] font-medium bg-white/50 dark:bg-white/[0.05] text-[#86868b] dark:text-[#98989d] px-2.5 py-1 rounded-full">
                +{lowStock.length - 5} mais
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onNavigate("products")}
          className="flex-shrink-0 mt-1 w-8 h-8 rounded-[10px] bg-white/60 dark:bg-white/[0.08] backdrop-blur-sm border border-[#ff9500]/[0.1] dark:border-[#ff9f0a]/[0.15] flex items-center justify-center text-[#ff9500] dark:text-[#ff9f0a] hover:bg-white dark:hover:bg-white/[0.12] hover:shadow-sm transition-all group"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
