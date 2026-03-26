import React from "react";
import { Pencil, Trash2, Star, Eye, EyeOff, Truck, Package } from "lucide-react";
import { formatPrice } from '@/lib/format';

export default function AdminProductCard({ product, categoryName, onDelete, onToggleActive, onToggleFeatured, onEdit }) {
  const discount = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;
  const isActive = product.is_active !== false;
  const lowStock = (product.stock || 0) <= 2;

  return (
    <div className={`group relative bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.05] dark:border-white/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)] transition-all duration-400 overflow-hidden ${!isActive ? "opacity-55" : ""}`}>
      {/* Image */}
      <div className="relative aspect-square bg-[#f8f8fa] dark:bg-[#1c1c1e] overflow-hidden">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-10 h-10 text-[#d8d8dc] dark:text-[#48484a]" strokeWidth={1.4} />
          </div>
        )}

        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {discount > 0 && (
            <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-md shadow-sm">
              -{discount}%
            </span>
          )}
          {product.express_delivery && (
            <span className="text-[10px] font-bold bg-violet-500 text-white px-2 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
              <Truck className="w-2.5 h-2.5" /> Express
            </span>
          )}
          {product.condition === "USADO" && (
            <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-md shadow-sm">Usado</span>
          )}
        </div>

        {/* Actions top-right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 opacity-0 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all duration-250">
          <button
            onClick={() => onToggleFeatured(product)}
            className="w-7 h-7 bg-white/90 dark:bg-[#2c2c2e]/90 backdrop-blur rounded-lg flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-[#3a3a3c] transition-colors"
          >
            <Star className={`w-3 h-3 ${product.is_featured ? "fill-amber-400 text-amber-400" : "text-[#86868b] dark:text-[#98989d]"}`} />
          </button>
          <button
            onClick={() => onToggleActive(product)}
            className="w-7 h-7 bg-white/90 dark:bg-[#2c2c2e]/90 backdrop-blur rounded-lg flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-[#3a3a3c] transition-colors"
          >
            {isActive ? <Eye className="w-3 h-3 text-[#86868b] dark:text-[#98989d]" /> : <EyeOff className="w-3 h-3 text-[#86868b] dark:text-[#98989d]" />}
          </button>
          <button
            onClick={() => onEdit(product)}
            className="w-7 h-7 bg-white/90 dark:bg-[#2c2c2e]/90 backdrop-blur rounded-lg flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-[#3a3a3c] transition-colors"
          >
            <Pencil className="w-3 h-3 text-[#86868b] dark:text-[#98989d]" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="w-7 h-7 bg-white/90 dark:bg-[#2c2c2e]/90 backdrop-blur rounded-lg flex items-center justify-center shadow-md hover:bg-red-50 dark:hover:bg-red-500/[0.15] transition-colors"
          >
            <Trash2 className="w-3 h-3 text-red-400 dark:text-red-400" />
          </button>
        </div>

        {/* Featured badge bottom */}
        {product.is_featured && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="text-[10px] font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-amber-900" /> Destaque
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 space-y-1.5">
        <div>
          <p className="text-[10px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-[0.05em]">{categoryName}</p>
          <p className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight mt-0.5 line-clamp-2">{product.name}</p>
        </div>

        <div className="flex items-end justify-between pt-0.5">
          <div>
            <p className="text-[17px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight leading-none">{formatPrice(product.price)}</p>
            {discount > 0 && (
              <p className="text-[11px] text-[#b0b0b5] dark:text-[#636366] line-through mt-0.5">{formatPrice(product.original_price)}</p>
            )}
          </div>
          <div className="text-right">
            <p className={`text-[11px] font-semibold tabular-nums ${
              (product.stock || 0) <= 0 ? "text-red-500 dark:text-red-400" : lowStock ? "text-orange-500 dark:text-orange-400" : "text-[#86868b] dark:text-[#98989d]"
            }`}>
              {product.stock || 0} un.
            </p>
          </div>
        </div>

        <p className="text-[9px] text-[#d2d2d7] dark:text-[#48484a] font-mono tracking-wide pt-0.5">{product.sku || product.product_id}</p>
      </div>
    </div>
  );
}
