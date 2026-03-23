import { useState, useEffect } from "react";
import { uploadFile } from "@/lib/fileUpload";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, Check, AlertCircle, ImagePlay, Lightbulb, Plus } from "lucide-react";
import BannerPreviewCard from "@/components/banners/BannerPreviewCard";
import BannerFormFields from "@/components/banners/BannerFormFields";
import {
  useAdminBanners,
  useCreateBanner,
  useUpdateBanner,
} from "@/api/hooks";

const EMPTY_FORM = {
  tipo: "HERO", imagemUrl: "", link: "", textoCta: "",
  corTexto: "light", opacidadeOverlay: 40, ativo: true, ordemExibicao: 0,
};

export default function BannerSettings() {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: banners = [] } = useAdminBanners();
  const createMutation = useCreateBanner();
  const updateMutation = useUpdateBanner();

  useEffect(() => {
    if (banners.length > 0 && !selected) {
      selectBanner(banners[0]);
    }
  }, [banners.length]);

  const selectBanner = (banner) => {
    setSelected(banner);
    setForm({
      tipo: banner.tipo || "HERO",
      imagemUrl: banner.imagemUrl || "",
      link: banner.link || "",
      textoCta: banner.textoCta || "",
      corTexto: banner.corTexto || "light",
      opacidadeOverlay: banner.opacidadeOverlay ?? 40,
      ativo: banner.ativo !== false,
      ordemExibicao: banner.ordemExibicao || 0,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await uploadFile(file);
    setForm(f => ({ ...f, imagemUrl: file_url }));
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (selected === 'new') {
        const created = await createMutation.mutateAsync(form);
        setSelected(created);
      } else {
        await updateMutation.mutateAsync({ id: selected.id, data: form });
        setSelected(prev => ({ ...prev, ...form }));
      }
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleNew = () => {
    setSelected('new');
    setForm({ ...EMPTY_FORM, ordemExibicao: banners.length });
  };

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 bg-[#f5f5f7] p-1 rounded-xl">
          {banners.map(banner => {
            const isActive = selected?.id === banner.id;
            const tipoLabel = banner.tipo === "HERO" ? "Hero" : banner.tipo === "PROMO" ? "Promo" : "Secundário";
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
                <span>{tipoLabel}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${banner.ativo !== false ? "bg-emerald-400" : "bg-[#c7c7cc]"}`} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNew}
            className="h-9 px-4 rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f]"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.2} /> Novo Banner
          </button>
          {selected && (
            <button
              onClick={handleSave}
              disabled={saving || savedFeedback}
              className={`h-9 px-5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all disabled:opacity-70 ${
                savedFeedback ? "bg-emerald-500 text-white" : "bg-[#007aff] hover:bg-[#0071e3] text-white"
              }`}
            >
              {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Salvando...</>
               : savedFeedback ? <><Check className="w-3.5 h-3.5" /> Salvo!</>
               : <><Save className="w-3.5 h-3.5" strokeWidth={1.8} /> Salvar</>}
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {banners.length === 0 && !selected && (
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-medium text-amber-800">Nenhum banner configurado</p>
            <p className="text-[12px] text-amber-600 mt-0.5">Crie banners do tipo Hero, Promo ou Secundário para personalizar sua loja.</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected === 'new' ? 'new' : selected.id}
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
