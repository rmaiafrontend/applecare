import React from "react";

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] text-[#86868b] font-medium">{label}</p>
      <div className="flex items-center gap-2 bg-[#f5f5f7]/50 border border-black/[0.06] rounded-xl px-3 py-2">
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
          className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}