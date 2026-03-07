import React from "react";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon: Icon, subtitle, compact, accent = "#86868b" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 sm:p-5 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">{title}</p>
          <p className={`${compact ? "text-[20px] sm:text-[22px]" : "text-[26px] sm:text-[30px]"} font-bold text-[#1d1d1f] leading-none tracking-tight truncate`}>
            {value}
          </p>
          {subtitle && !compact && (
            <p className="text-[11px] text-[#86868b] mt-0.5">{subtitle}</p>
          )}
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: accent + '12' }}
        >
          <Icon className="w-[16px] h-[16px]" style={{ color: accent }} strokeWidth={1.8} />
        </div>
      </div>
    </motion.div>
  );
}