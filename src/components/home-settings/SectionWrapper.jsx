import React from "react";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SectionWrapper({
  number,
  icon: Icon,
  title,
  subtitle,
  color = "#1d1d1f",
  hasToggle = false,
  isActive,
  onToggleActive,
  isOpen,
  onToggleOpen,
  fixed = false,
  children
}) {
  const inactive = hasToggle && !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-2xl transition-all duration-500 ${
        inactive ? "opacity-50" : ""
      }`}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]"
        style={{ background: `linear-gradient(135deg, ${color}15, transparent 60%)` }}
      />

      <div className={`relative bg-white/80 dark:bg-[#2c2c2e]/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-black/[0.08] dark:border-white/[0.1] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]"
          : "border-black/[0.04] dark:border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)] hover:border-black/[0.06] dark:hover:border-white/[0.08]"
      }`}>
        {/* Header */}
        <div
          role="button"
          tabIndex={0}
          onClick={onToggleOpen}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleOpen(); } }}
          className="w-full flex items-center gap-3.5 px-5 py-[18px] text-left transition-colors cursor-pointer"
        >
          {!fixed && (
            <GripVertical className="w-3.5 h-3.5 text-black/10 dark:text-white/10 flex-shrink-0 cursor-grab hover:text-black/30 dark:hover:text-white/30 transition-colors" />
          )}

          {/* Icon with gradient bg */}
          <div className="relative flex-shrink-0">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${color}18, ${color}08)`,
                boxShadow: `0 2px 8px ${color}12`
              }}
            >
              <Icon className="w-[18px] h-[18px]" style={{ color }} strokeWidth={1.8} />
            </div>
            {hasToggle && (
              <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#2c2c2e] transition-colors duration-300 ${
                isActive ? "bg-emerald-400" : "bg-black/10 dark:bg-white/15"
              }`} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-mono font-bold text-black/15 dark:text-white/15 tracking-tight">{number}</span>
              <h3 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate tracking-[-0.01em]">{title}</h3>
            </div>
            <p className="text-[11px] text-black/35 dark:text-white/35 mt-0.5 truncate leading-tight">{subtitle}</p>
          </div>

          {hasToggle && (
            <div onClick={e => e.stopPropagation()} className="flex-shrink-0">
              <Switch checked={isActive} onCheckedChange={onToggleActive} />
            </div>
          )}

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.03] dark:bg-white/[0.06] group-hover:bg-black/[0.05] dark:group-hover:bg-white/[0.1] transition-colors flex-shrink-0"
          >
            <ChevronDown className="w-3.5 h-3.5 text-black/30 dark:text-white/30" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mx-5 mb-5 pt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
                <div className="space-y-4">
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
