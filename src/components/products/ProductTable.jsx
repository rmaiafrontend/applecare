import React from "react";
import { Pencil, Trash2, Star, Eye, EyeOff, Package } from "lucide-react";
import { formatPrice } from '@/lib/format';

export default function ProductTable({ products = [], categories = [], onDelete, onToggleActive, onToggleFeatured, onEdit }) {
  const getCategoryName = (catId) => categories.find(c => c.category_id === catId)?.name || catId;

  return (
    <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.05] dark:border-white/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)] overflow-hidden">
      {/* Header */}
      <div className="hidden lg:grid grid-cols-[1fr_110px_110px_70px_130px_110px] gap-2 px-5 py-2.5 bg-[#fafafa] dark:bg-[#1c1c1e] border-b border-black/[0.04] dark:border-white/[0.06]">
        {["Produto", "Categoria", "Preço", "Estoque", "Status", "Ações"].map((h, i) => (
          <p key={h} className={`text-[10px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-[0.08em] ${i === 5 ? "text-right" : ""}`}>{h}</p>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-black/[0.03] dark:divide-white/[0.04]">
        {products.map((product) => {
          const discount = product.original_price && product.original_price > product.price
            ? Math.round((1 - product.price / product.original_price) * 100) : 0;
          const isActive = product.is_active !== false;
          const lowStock = (product.stock || 0) <= 2;

          return (
            <div key={product.id} className="grid grid-cols-1 lg:grid-cols-[1fr_110px_110px_70px_130px_110px] gap-2 px-5 py-3 items-center hover:bg-[#fafafa] dark:hover:bg-white/[0.03] transition-colors duration-150 group">
              {/* Product */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-xl flex-shrink-0 overflow-hidden ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-[#d2d2d7] dark:text-[#636366]" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">{product.name}</p>
                  <p className="text-[10px] text-[#b0b0b5] dark:text-[#636366] font-mono">{product.sku || product.product_id}</p>
                </div>
              </div>

              {/* Category */}
              <p className="text-[12px] text-[#86868b] dark:text-[#98989d] truncate hidden lg:block">{getCategoryName(product.category_id)}</p>

              {/* Price */}
              <div className="hidden lg:block">
                <p className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tabular-nums">{formatPrice(product.price)}</p>
                {discount > 0 && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] text-[#b0b0b5] dark:text-[#636366] line-through tabular-nums">{formatPrice(product.original_price)}</span>
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/[0.12] px-1.5 rounded">-{discount}%</span>
                  </div>
                )}
              </div>

              {/* Stock */}
              <p className={`text-[12px] font-semibold tabular-nums hidden lg:block ${
                (product.stock || 0) <= 0 ? "text-red-500 dark:text-red-400" : lowStock ? "text-orange-500 dark:text-orange-400" : "text-[#1d1d1f] dark:text-[#f5f5f7]"
              }`}>
                {product.stock || 0}
              </p>

              {/* Status */}
              <div className="hidden lg:flex flex-wrap gap-1">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${isActive ? "bg-emerald-50 dark:bg-emerald-500/[0.12] text-emerald-600 dark:text-emerald-400" : "bg-[#f5f5f7] dark:bg-[#3a3a3c] text-[#86868b] dark:text-[#98989d]"}`}>
                  {isActive ? "Ativo" : "Inativo"}
                </span>
                {product.express_delivery && (
                  <span className="text-[10px] font-semibold bg-violet-50 dark:bg-violet-500/[0.12] text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md">Express</span>
                )}
                {product.is_featured && (
                  <span className="text-[10px] font-semibold bg-amber-50 dark:bg-amber-500/[0.12] text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md">★</span>
                )}
              </div>

              {/* Actions */}
              <div className="hidden lg:flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={() => onToggleFeatured(product)} className="w-7 h-7 rounded-lg hover:bg-[#f0f0f2] dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors">
                  <Star className={`w-3.5 h-3.5 ${product.is_featured ? "fill-amber-400 text-amber-400" : "text-[#b0b0b5] dark:text-[#636366]"}`} />
                </button>
                <button onClick={() => onToggleActive(product)} className="w-7 h-7 rounded-lg hover:bg-[#f0f0f2] dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors">
                  {isActive ? <Eye className="w-3.5 h-3.5 text-[#b0b0b5] dark:text-[#636366]" /> : <EyeOff className="w-3.5 h-3.5 text-[#b0b0b5] dark:text-[#636366]" />}
                </button>
                <button onClick={() => onEdit(product)} className="w-7 h-7 rounded-lg hover:bg-[#f0f0f2] dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors">
                  <Pencil className="w-3.5 h-3.5 text-[#b0b0b5] dark:text-[#636366]" />
                </button>
                <button onClick={() => onDelete(product)} className="w-7 h-7 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/[0.12] flex items-center justify-center transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
