import React, { useState } from "react";
import { Search, X } from "lucide-react";



export default function ProductFilters({
  search, onSearchChange,
  categoryFilter, onCategoryChange,
  categories = [],
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters = search || categoryFilter !== "all";

  const clearAll = () => {
    onSearchChange("");
    onCategoryChange("all");
  };

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" strokeWidth={2} />
        <input
          type="text"
          placeholder="Buscar por nome ou SKU..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full h-11 pl-10 pr-10 bg-white rounded-xl border border-black/[0.06] shadow-sm text-[13px] text-[#1d1d1f] placeholder:text-[#b0b0b5] focus:outline-none focus:ring-2 focus:ring-[#007aff]/20 focus:border-[#007aff]/40 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#e8e8ed] rounded-full flex items-center justify-center hover:bg-[#d2d2d7] transition-colors"
          >
            <X className="w-3 h-3 text-[#636366]" />
          </button>
        )}
      </div>

      {/* Status + Category Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide flex-1">
          <button
            onClick={() => onCategoryChange("all")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
              categoryFilter === "all"
                ? "bg-[#1d1d1f] text-white shadow-sm"
                : "bg-white text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] border border-black/[0.04]"
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.category_id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 ${
                categoryFilter === cat.category_id
                  ? "bg-[#1d1d1f] text-white shadow-sm"
                  : "bg-white text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] border border-black/[0.04]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="h-8 px-2.5 text-[11px] font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Limpar
            </button>
          )}

          <span className="text-[11px] text-[#b0b0b5] tabular-nums whitespace-nowrap">
            {filteredCount === totalCount ? `${totalCount} itens` : `${filteredCount} de ${totalCount}`}
          </span>
        </div>
      </div>
    </div>
  );
}