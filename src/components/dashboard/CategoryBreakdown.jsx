import React from "react";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";

const COLORS = [
  "#007aff",
  "#34c759",
  "#ff9500",
  "#af52de",
  "#ff3b30",
  "#5ac8fa",
  "#ff2d55",
];

export default function CategoryBreakdown({ categories = [], products = [] }) {
  const data = categories
    .map((cat, i) => {
      const count = products.filter(
        (p) => p.category_id === cat.category_id
      ).length;
      return { ...cat, count, color: COLORS[i % COLORS.length] };
    })
    .sort((a, b) => b.count - a.count);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="bg-white/70 dark:bg-[#2c2c2e]/70 backdrop-blur-xl rounded-2xl border border-black/[0.04] dark:border-white/[0.06] overflow-hidden h-full"
    >
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-[11px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-[0.06em]">
          Categorias
        </h3>
      </div>

      <div className="px-5 pb-5 space-y-4">
        {/* Animated progress bar */}
        {total > 0 && (
          <div className="flex h-[6px] rounded-full overflow-hidden bg-[#f5f5f7] dark:bg-[#3a3a3c]">
            {data.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ width: 0 }}
                animate={{ width: `${(item.count / total) * 100}%` }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.08,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="first:rounded-l-full last:rounded-r-full"
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="space-y-2">
          {data.map((item, i) => {
            const pct =
              total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + i * 0.05,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex items-center gap-2.5 group"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] text-[#1d1d1f] dark:text-[#f5f5f7] flex-1 truncate tracking-[-0.01em]">
                  {item.name}
                </span>
                <span className="text-[11px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tabular-nums">
                  {item.count}
                </span>
                <span className="text-[10px] text-[#b0b0b5] dark:text-[#636366] tabular-nums w-7 text-right">
                  {pct}%
                </span>
              </motion.div>
            );
          })}
        </div>

        {data.length === 0 && (
          <div className="py-10 text-center">
            <div className="w-12 h-12 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Grid3X3
                className="w-5 h-5 text-[#c7c7cc] dark:text-[#636366]"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-[12px] text-[#86868b] dark:text-[#98989d]">Nenhuma categoria</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
