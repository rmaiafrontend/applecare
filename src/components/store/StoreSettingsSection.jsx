import React from "react";

export default function StoreSettingsSection({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.04] p-5 space-y-4">
      <div>
        <h3 className="text-[14px] font-semibold text-[#1d1d1f]">{title}</h3>
        {subtitle && <p className="text-[11px] text-[#86868b] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}