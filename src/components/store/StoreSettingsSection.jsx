import React from "react";

export default function StoreSettingsSection({ title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.04] dark:border-white/[0.06] p-5 space-y-4">
      <div>
        <h3 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{title}</h3>
        {subtitle && <p className="text-[11px] text-[#86868b] dark:text-[#98989d] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
