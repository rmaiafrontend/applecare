import React from "react";

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">{label}</p>
      <div className="flex items-center gap-2 bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-xl px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent p-0"
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] dark:text-[#f5f5f7] outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}
