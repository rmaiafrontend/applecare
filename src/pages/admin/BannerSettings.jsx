import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, Check, AlertCircle, ImagePlay, Lightbulb } from "lucide-react";
import BannerPreviewCard from "@/components/banners/BannerPreviewCard";
import BannerFormFields from "@/components/banners/BannerFormFields";

const BANNER_KEYS = ["hero_banner", "promo_banner"];

export default function BannerSettings() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [form, setForm] = useState({});

  const { data: configs = [] } = useQuery({
    queryKey: ["catalog_configs"],
    queryFn: () => base44.entities.CatalogConfig.list("display_order"),
  });

  const banners = configs.filter(c => BANNER_KEYS.includes(c.config_key));

  React.useEffect(() => {
    if (banners.length > 0 && !selected) {
      selectBanner(banners[0]);
    }
  }, [banners.length]);

  const selectBanner = (banner) => {
    setSelected(banner);
    setForm({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      banner_image_url: banner.banner_image_url || "",
      banner_link: banner.banner_link || "",
      banner_cta_text: banner.banner_cta_text || "",
      banner_text_color: banner.banner_text_color || "light",
      banner_overlay_opacity: banner.banner_overlay_opacity ?? 40,
      is_active: banner.is_active !== false,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, banner_image_url: file_url }));
    setUploading(false);
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    await base44.entities.CatalogConfig.update(selected.id, form);
    queryClient.invalidateQueries({ queryKey: ["catalog_configs"] });
    setSaving(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
    setSelected(prev => ({ ...prev, ...form }));
  };

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Top bar: Tabs + Save */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Banner Selector */}
        <div className="flex items-center gap-1.5 bg-[#f5f5f7] p-1 rounded-xl">
          {banners.map(banner => {
            const isActive = selected?.id === banner.id;
            return (
              <button
                key={banner.id}
                onClick={() => selectBanner(banner)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#1d1d1f] shadow-sm"
                    : "text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                <ImagePlay className="w-4 h-4" strokeWidth={1.8} />
                <span>{banner.title || banner.config_key}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${banner.is_active !== false ? "bg-emerald-400" : "bg-[#c7c7cc]"}`} />
              </button>
            );
          })}
        </div>

        {/* Save button */}
        {selected && (
          <button
            onClick={handleSave}
            disabled={saving || savedFeedback}
            className={`h-9 px-5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all disabled:opacity-70 ${
              savedFeedback ? "bg-emerald-500 text-white" : "bg-[#1d1d1f] hover:bg-black text-white"
            }`}
          >
            {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Salvando...</>
             : savedFeedback ? <><Check className="w-3.5 h-3.5" /> Salvo!</>
             : <><Save className="w-3.5 h-3.5" strokeWidth={1.8} /> Salvar</>}
          </button>
        )}
      </div>

      {/* Empty state */}
      {banners.length === 0 && (
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-medium text-amber-800">Nenhum banner configurado</p>
            <p className="text-[12px] text-amber-600 mt-0.5">Crie seções com chave "hero_banner" ou "promo_banner" em Configurações do Catálogo.</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-12 gap-5"
          >
            {/* Form Column */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_6px_-2px_rgba(0,0,0,0.05)] p-5">
                <BannerFormFields
                  form={form}
                  setForm={setForm}
                  uploading={uploading}
                  onUpload={handleUpload}
                />
              </div>

              {/* Tip */}
              <div className="mt-4 flex items-start gap-2.5 bg-[#f5f5f7] rounded-xl p-3.5">
                <Lightbulb className="w-4 h-4 text-[#ff9500] flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  Recomendado: <span className="font-semibold text-[#1d1d1f]">1440×400</span> para desktop e <span className="font-semibold text-[#1d1d1f]">800×600</span> para mobile. PNG, JPG ou WebP.
                </p>
              </div>
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-8">
              <div className="lg:sticky lg:top-20">
                <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest mb-3">Pré-visualização</p>
                <BannerPreviewCard form={form} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}