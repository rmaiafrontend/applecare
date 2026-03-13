import React, { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { uploadFile } from "@/lib/fileUpload";
import { Input } from "@/components/ui/input";

export default function ImageUploadField({ value, onChange, label, hint, aspect = "aspect-[16/9]" }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await uploadFile(file);
    onChange(file_url);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className={`relative w-full ${aspect} rounded-xl overflow-hidden bg-[#f5f5f7] dark:bg-[#3a3a3c] group`}>
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <button
              onClick={() => onChange("")}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-[#2c2c2e]/90 hover:bg-white dark:hover:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <label className={`flex items-center justify-center w-full h-16 border border-dashed rounded-xl cursor-pointer transition-all ${
        uploading ? "border-[#0071e3] dark:border-[#0a84ff] bg-blue-50/50 dark:bg-blue-500/[0.08]" : "border-black/[0.08] dark:border-white/[0.1] hover:border-[#0071e3] dark:hover:border-[#0a84ff] hover:bg-blue-50/20 dark:hover:bg-blue-500/[0.06]"
      }`}>
        {uploading ? (
          <div className="flex items-center gap-2 text-[#0071e3] dark:text-[#0a84ff]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-[12px] font-medium">Enviando...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 text-[#86868b] dark:text-[#98989d]">
            <Upload className="w-4 h-4" />
            <span className="text-[12px] font-medium">{label || "Upload"}</span>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>

      <Input
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder="Ou cole a URL..."
        className="h-9 rounded-xl text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]"
      />
    </div>
  );
}
