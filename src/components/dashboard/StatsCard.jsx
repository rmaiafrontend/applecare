import React from "react";
import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  subtitle,
  compact,
  accent = "#86868b",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 1, 0.5, 1] }}
      className="group relative bg-white/70 dark:bg-[#2c2c2e]/70 backdrop-blur-xl rounded-2xl border border-black/[0.04] dark:border-white/[0.06] p-4 sm:p-5 hover:bg-white dark:hover:bg-[#2c2c2e] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)] hover:border-black/[0.06] dark:hover:border-white/[0.1] transition-all duration-500 cursor-default overflow-hidden"
    >
      {/* Subtle gradient glow on hover */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ backgroundColor: accent + "18" }}
      />

      <div className="flex items-start justify-between gap-3 relative">
        <div className="space-y-1.5 min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-[0.06em]">
            {title}
          </p>
          <p
            className={`${
              compact
                ? "text-[20px] sm:text-[22px]"
                : "text-[28px] sm:text-[32px]"
            } font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-none tracking-[-0.03em] truncate`}
          >
            {value}
          </p>
          {subtitle && !compact && (
            <p className="text-[11px] text-[#86868b] dark:text-[#98989d] tracking-[-0.01em]">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: accent + "0d" }}
        >
          <Icon
            className="w-[16px] h-[16px]"
            style={{ color: accent }}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </motion.div>
  );
}
