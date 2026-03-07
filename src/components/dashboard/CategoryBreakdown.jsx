import React from "react";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";

const COLORS = ["#007aff", "#34c759", "#ff9500", "#af52de", "#ff3b30", "#5ac8fa", "#ff2d55"];

export default function CategoryBreakdown({ categories = [], products = [] }) {
  const data = categories.map((cat, i) => {
    const count = products.filter(p => p.category_id === cat.category_id).length;
    return { ...cat, count, color: COLORS[i % COLORS.length] };
  }).sort((a, b) => b.count - a.count);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden h-full"
    >
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Categorias</h3>
      </div>

      <div className="px-5 pb-5 space-y-4">
        {total > 0 && (
          <div className="flex h-2.5 rounded-full overflow-hidden bg-[#f5f5f7]">
            {data.map((item) => (
              <div
                key={item.id}
                className="transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                style={{ width: `${(item.count / total) * 100}%`, backgroundColor: item.color }}
              />
            ))}
          </div>
        )}

        <div className="space-y-2.5">
          {data.map((item) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={item.id} className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[12px] text-[#1d1d1f] flex-1 truncate">{item.name}</span>
                <span className="text-[11px] font-semibold text-[#1d1d1f] tabular-nums">{item.count}</span>
                <span className="text-[10px] text-[#b0b0b5] tabular-nums w-8 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <div className="py-8 text-center">
            <Grid3X3 className="w-8 h-8 text-[#d2d2d7] mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-[12px] text-[#86868b]">Nenhuma categoria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}