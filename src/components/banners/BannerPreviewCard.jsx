import React from "react";
import { ChevronRight, Monitor, Smartphone, Maximize2 } from "lucide-react";

export default function BannerPreviewCard({ form }) {
  const textColor = form.banner_text_color === "light" ? "text-white" : "text-gray-900";
  const overlayBg = form.banner_text_color === "light"
    ? `rgba(0,0,0,${(form.banner_overlay_opacity ?? 40) / 100})`
    : `rgba(255,255,255,${(form.banner_overlay_opacity ?? 40) / 100})`;

  const Preview = ({ aspect, className }) => (
    <div className={`relative w-full ${aspect} rounded-2xl overflow-hidden bg-[#f5f5f7] ${className || ""}`}>
      {form.banner_image_url ? (
        <img src={form.banner_image_url} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#c7c7cc] to-[#aeaeb2] flex items-center justify-center">
          <div className="text-center">
            <Maximize2 className="w-6 h-6 text-white/40 mx-auto mb-1" />
            <p className="text-[11px] text-white/50 font-medium">Adicione uma imagem</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0" style={{ backgroundColor: overlayBg }} />
      <div className={`absolute inset-0 flex flex-col justify-end p-5 ${textColor}`}>
        {form.title && <p className="font-bold text-sm leading-tight drop-shadow-sm">{form.title}</p>}
        {form.subtitle && <p className="text-xs opacity-80 mt-0.5 drop-shadow-sm">{form.subtitle}</p>}
        {form.banner_cta_text && (
          <div className="mt-2.5">
            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-full ${
              form.banner_text_color === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
            }`}>
              {form.banner_cta_text}
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
      <div className="absolute top-2.5 right-2.5">
        {form.is_active ? (
          <span className="text-[9px] font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-sm">Ativo</span>
        ) : (
          <span className="text-[9px] font-semibold bg-gray-400/80 text-white px-2 py-0.5 rounded-full">Inativo</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Desktop Preview */}
      <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_6px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.03]">
          <Monitor className="w-3.5 h-3.5 text-[#86868b]" strokeWidth={1.8} />
          <span className="text-[11px] font-medium text-[#86868b]">Desktop</span>
          <span className="text-[10px] text-[#c7c7cc]">1440 × 400</span>
        </div>
        <div className="p-3">
          <Preview aspect="aspect-[21/6]" />
        </div>
      </div>

      {/* Mobile Preview */}
      <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_6px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.03]">
          <Smartphone className="w-3.5 h-3.5 text-[#86868b]" strokeWidth={1.8} />
          <span className="text-[11px] font-medium text-[#86868b]">Mobile</span>
          <span className="text-[10px] text-[#c7c7cc]">800 × 600</span>
        </div>
        <div className="p-3 flex justify-center">
          <div className="w-full max-w-[280px]">
            <Preview aspect="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </div>
  );
}