import React from "react";
import { Upload, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LogoUploader({ label, value, onChange }) {
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(file_url);
  };

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] text-[#86868b] font-medium">{label}</p>
      {value ? (
        <div className="relative w-full h-24 bg-[#f5f5f7] rounded-xl overflow-hidden ring-1 ring-black/[0.04] group flex items-center justify-center">
          <img src={value} alt={label} className="max-h-full max-w-full object-contain p-2" />
          <button
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      ) : (
        <label className="w-full h-24 rounded-xl border-2 border-dashed border-black/[0.08] flex flex-col items-center justify-center cursor-pointer hover:border-[#0071e3]/40 hover:bg-blue-50/30 transition-all gap-1">
          <Upload className="w-4 h-4 text-[#86868b]" />
          <span className="text-[10px] text-[#86868b]">Upload</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      )}
    </div>
  );
}