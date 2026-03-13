import React from "react";

export default function FormSection({ title, subtitle, icon: Icon, children, accent }) {
  return (
    <div className="space-y-3.5">
      <div className="flex flex-col gap-1.5">
        {Icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: (accent || "#86868b") + "14" }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: accent || "#86868b" }} strokeWidth={2} />
          </div>
        )}
        <div>
          <h3 className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{title}</h3>
          {subtitle && <p className="text-[10px] text-[#86868b] dark:text-[#98989d]">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
