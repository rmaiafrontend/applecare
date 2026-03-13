import React from "react";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format";

export default function RecentProducts({ products = [], onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="bg-white/70 dark:bg-[#2c2c2e]/70 backdrop-blur-xl rounded-2xl border border-black/[0.04] dark:border-white/[0.06] overflow-hidden h-full"
    >
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-[0.06em]">
          Últimos Produtos
        </h3>
        <button
          onClick={() => onNavigate("products")}
          className="text-[12px] font-medium text-[#007aff] dark:text-[#0a84ff] hover:text-[#0056b3] dark:hover:text-[#409cff] flex items-center gap-0.5 transition-colors group"
        >
          Ver todos
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="px-2 pb-2">
        {products.slice(0, 6).map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.2 + i * 0.04,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f7]/80 dark:hover:bg-white/[0.04] active:bg-[#ebebed] dark:active:bg-white/[0.08] transition-all duration-200 group cursor-default"
          >
            <div className="w-10 h-10 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-black/[0.02] dark:border-white/[0.04] group-hover:shadow-sm transition-shadow">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package
                  className="w-4 h-4 text-[#c7c7cc] dark:text-[#636366]"
                  strokeWidth={1.5}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate tracking-[-0.01em]">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[12px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.original_price &&
                  product.original_price > product.price && (
                    <span className="text-[10px] text-[#86868b] dark:text-[#98989d] line-through tabular-nums">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
              </div>
            </div>
            <div className="flex-shrink-0">
              {(product.stock || 0) <= 0 ? (
                <span className="text-[10px] font-semibold text-[#ff3b30] dark:text-[#ff453a] bg-[#ff3b30]/[0.06] dark:bg-[#ff453a]/[0.12] px-2 py-0.5 rounded-full">
                  Esgotado
                </span>
              ) : (product.stock || 0) <= 2 ? (
                <span className="text-[10px] font-semibold text-[#ff9500] dark:text-[#ff9f0a] bg-[#ff9500]/[0.06] dark:bg-[#ff9f0a]/[0.12] px-2 py-0.5 rounded-full tabular-nums">
                  {product.stock} un.
                </span>
              ) : (
                <span className="text-[11px] text-[#86868b] dark:text-[#98989d] tabular-nums">
                  {product.stock} un.
                </span>
              )}
            </div>
          </motion.div>
        ))}
        {products.length === 0 && (
          <div className="py-14 text-center">
            <div className="w-12 h-12 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Package
                className="w-5 h-5 text-[#c7c7cc] dark:text-[#636366]"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d]">
              Nenhum produto cadastrado
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
