import React from "react";

export default function SuggestionPills({ suggestions, onSelect, currentValue }) {
  const filtered = suggestions.filter(s => s !== currentValue);
  if (filtered.length === 0) return null;

  return (
    <div className="flex gap-1.5 flex-wrap mt-1.5">
      {filtered.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(s)}
          className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-black/[0.03] text-black/40 hover:bg-violet-50 hover:text-violet-600 border border-transparent hover:border-violet-200 transition-all duration-200 cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  );
}