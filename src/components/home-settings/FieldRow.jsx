import React from "react";
import { Label } from "@/components/ui/label";

export default function FieldRow({ label, hint, required, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-semibold uppercase tracking-wider">{label}</Label>
        {required && <span className="text-[9px] text-red-400 font-bold">*</span>}
      </div>
      {hint && <p className="text-[10px] text-[#c7c7cc] dark:text-[#636366] -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}
