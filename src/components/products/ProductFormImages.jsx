import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/lib/fileUpload";

export default function ProductFormImages({ images, onChange, inputClass }) {
  const removeImage = (i) => onChange(images.filter((_, idx) => idx !== i));

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { file_url } = await uploadFile(file);
    onChange([...images, file_url]);
  };

  const addImageUrl = (url) => {
    if (url) onChange([...images, url]);
  };

  return (
    <ImageUrlAdder onAdd={addImageUrl} inputClass={inputClass}>
      <div className="flex flex-wrap gap-2.5">
        {images.map((img, i) => (
          <div key={i} className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#f5f5f7] dark:bg-[#3a3a3c] ring-1 ring-black/[0.06] dark:ring-white/[0.06] group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <X className="w-4 h-4 text-white" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 text-[8px] font-bold bg-white/90 dark:bg-[#2c2c2e]/90 text-[#1d1d1f] dark:text-[#f5f5f7] px-1.5 py-0.5 rounded">Principal</span>
            )}
          </div>
        ))}
        <label className="w-[72px] h-[72px] rounded-xl border-2 border-dashed border-black/[0.08] dark:border-white/[0.1] flex flex-col items-center justify-center cursor-pointer hover:border-[#007aff]/40 dark:hover:border-[#0a84ff]/40 hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.06] transition-all gap-1">
          <Upload className="w-4 h-4 text-[#b0b0b5] dark:text-[#636366]" strokeWidth={1.8} />
          <span className="text-[9px] text-[#b0b0b5] dark:text-[#636366] font-medium">Upload</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>
    </ImageUrlAdder>
  );
}

function ImageUrlAdder({ onAdd, inputClass, children }) {
  const [url, setUrl] = useState("");
  return (
    <>
      {children}
      <div className="flex gap-2">
        <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="Ou cole a URL da imagem..." className="h-9 rounded-xl text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
        <button onClick={() => { onAdd(url); setUrl(""); }} disabled={!url} className="h-9 px-3.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-30">
          Adicionar
        </button>
      </div>
    </>
  );
}
