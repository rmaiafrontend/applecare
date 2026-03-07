import React from "react";
import { Pencil, Trash2, Star, Eye, EyeOff, Package } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

export default function ProductTable({ products = [], categories = [], onDelete, onToggleActive, onToggleFeatured, onEdit }) {
  const getCategoryName = (catId) => categories.find(c => c.category_id === catId)?.name || catId;

  return (
    <div className="bg-white rounded-2xl border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header */}
      <div className="hidden lg:grid grid-cols-[1fr_110px_110px_70px_130px_110px] gap-2 px-5 py-2.5 bg-[#fafafa] border-b border-black/[0.04]">
        {["Produto", "Categoria", "Preço", "Estoque", "Status", "Ações"].map((h, i) => (
          <p key={h} className={`text-[10px] font-semibold text-[#86868b] uppercase tracking-[0.08em] ${i === 5 ? "text-right" : ""}`}>{h}</p>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-black/[0.03]">
        {products.map((product) => {
          const discount = product.original_price && product.original_price > product.price
            ? Math.round((1 - product.price / product.original_price) * 100) : 0;
          const isActive = product.is_active !== false;
          const lowStock = (product.stock || 0) <= 2;

          return (
            <div key={product.id} className="grid grid-cols-1 lg:grid-cols-[1fr_110px_110px_70px_130px_110px] gap-2 px-5 py-3 items-center hover:bg-[#fafafa] transition-colors duration-150 group">
              {/* Product */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-[#f5f5f7] rounded-xl flex-shrink-0 overflow-hidden ring-1 ring-black/[0.04]">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-[#d2d2d7]" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#1d1d1f] truncate">{product.name}</p>
                  <p className="text-[10px] text-[#b0b0b5] font-mono">{product.sku || product.product_id}</p>
                </div>
              </div>

              {/* Category */}
              <p className="text-[12px] text-[#86868b] truncate hidden lg:block">{getCategoryName(product.category_id)}</p>

              {/* Price */}
              <div className="hidden lg:block">
                <p className="text-[13px] font-semibold text-[#1d1d1f] tabular-nums">{formatPrice(product.price)}</p>
                {discount > 0 && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] text-[#b0b0b5] line-through tabular-nums">{formatPrice(product.original_price)}</span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">-{discount}%</span>
                  </div>
                )}
              </div>

              {/* Stock */}
              <p className={`text-[12px] font-semibold tabular-nums hidden lg:block ${
                (product.stock || 0) <= 0 ? "text-red-500" : lowStock ? "text-orange-500" : "text-[#1d1d1f]"
              }`}>
                {product.stock || 0}
              </p>

              {/* Status */}
              <div className="hidden lg:flex flex-wrap gap-1">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${isActive ? "bg-emerald-50 text-emerald-600" : "bg-[#f5f5f7] text-[#86868b]"}`}>
                  {isActive ? "Ativo" : "Inativo"}
                </span>
                {product.express_delivery && (
                  <span className="text-[10px] font-semibold bg-violet-50 text-violet-600 px-2 py-0.5 rounded-md">Express</span>
                )}
                {product.is_featured && (
                  <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md">★</span>
                )}
              </div>

              {/* Actions */}
              <div className="hidden lg:flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={() => onToggleFeatured(product)} className="w-7 h-7 rounded-lg hover:bg-[#f0f0f2] flex items-center justify-center transition-colors">
                  <Star className={`w-3.5 h-3.5 ${product.is_featured ? "fill-amber-400 text-amber-400" : "text-[#b0b0b5]"}`} />
                </button>
                <button onClick={() => onToggleActive(product)} className="w-7 h-7 rounded-lg hover:bg-[#f0f0f2] flex items-center justify-center transition-colors">
                  {isActive ? <Eye className="w-3.5 h-3.5 text-[#b0b0b5]" /> : <EyeOff className="w-3.5 h-3.5 text-[#b0b0b5]" />}
                </button>
                <button onClick={() => onEdit(product)} className="w-7 h-7 rounded-lg hover:bg-[#f0f0f2] flex items-center justify-center transition-colors">
                  <Pencil className="w-3.5 h-3.5 text-[#b0b0b5]" />
                </button>
                <button onClick={() => onDelete(product)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors">
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