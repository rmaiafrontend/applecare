import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StoreConfig } from "@/api/dataService";
import { Save, Loader2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StoreSettingsSection from "../store/StoreSettingsSection";
import LogoUploader from "../store/LogoUploader";
import ColorPicker from "../store/ColorPicker";
import ThemePreview from "../store/ThemePreview";
import { QUERY_KEYS } from '@/lib/constants';

const defaultConfig = {
  config_key: "general",
  store_name: "", store_slogan: "",
  logo_url: "", logo_dark_url: "", favicon_url: "",
  primary_color: "#1d1d1f", secondary_color: "#f5f5f7",
  accent_color: "#0071e3", background_color: "#ffffff", text_color: "#1d1d1f",
  whatsapp_number: "", instagram_url: "", email_contact: "", phone_number: "",
  address: "", footer_text: "", seo_title: "", seo_description: "",
};

export default function StoreSettingsTab() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [configId, setConfigId] = useState(null);

  const { data: configs = [] } = useQuery({
    queryKey: QUERY_KEYS.storeConfig,
    queryFn: () => StoreConfig.list(),
  });

  useEffect(() => {
    const general = configs.find(c => c.config_key === "general");
    if (general) {
      setConfigId(general.id);
      setForm(prev => ({
        ...prev,
        ...Object.fromEntries(Object.entries(general).filter(([_, v]) => v != null && v !== "")),
      }));
    }
  }, [configs]);

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    if (configId) {
      await StoreConfig.update(configId, form);
    } else {
      await StoreConfig.create(form);
    }
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.storeConfig });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className={`h-9 px-5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all disabled:opacity-70 ${
            saved ? "bg-emerald-500 text-white" : "bg-[#007aff] dark:bg-[#0a84ff] hover:bg-[#0071e3] dark:hover:bg-[#409cff] text-white"
          }`}
        >
          {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Salvando...</>
           : saved ? <><Check className="w-3.5 h-3.5" /> Salvo!</>
           : <><Save className="w-3.5 h-3.5" strokeWidth={1.8} /> Salvar</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-5">
          <StoreSettingsSection title="Identidade da Loja" subtitle="Nome, slogan e logotipos">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Nome da Loja</Label>
                <Input value={form.store_name} onChange={e => updateField("store_name", e.target.value)} placeholder="aLink Fast Delivery" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Slogan</Label>
                <Input value={form.store_slogan} onChange={e => updateField("store_slogan", e.target.value)} placeholder="Entrega rápida, preço justo" className={inputCls} />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <LogoUploader label="Logo Principal" value={form.logo_url} onChange={v => updateField("logo_url", v)} />
              <LogoUploader label="Logo (Dark)" value={form.logo_dark_url} onChange={v => updateField("logo_dark_url", v)} />
              <LogoUploader label="Favicon" value={form.favicon_url} onChange={v => updateField("favicon_url", v)} />
            </div>
          </StoreSettingsSection>

          <StoreSettingsSection title="Tema e Cores" subtitle="Personalize a aparência do catálogo">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <ColorPicker label="Primária" value={form.primary_color} onChange={v => updateField("primary_color", v)} />
              <ColorPicker label="Secundária" value={form.secondary_color} onChange={v => updateField("secondary_color", v)} />
              <ColorPicker label="Destaque" value={form.accent_color} onChange={v => updateField("accent_color", v)} />
              <ColorPicker label="Fundo" value={form.background_color} onChange={v => updateField("background_color", v)} />
              <ColorPicker label="Texto" value={form.text_color} onChange={v => updateField("text_color", v)} />
            </div>
          </StoreSettingsSection>

          <StoreSettingsSection title="Contato e Redes Sociais" subtitle="Informações de contato exibidas no catálogo">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">WhatsApp</Label>
                <Input value={form.whatsapp_number} onChange={e => updateField("whatsapp_number", e.target.value)} placeholder="(85) 99999-9999" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Telefone</Label>
                <Input value={form.phone_number} onChange={e => updateField("phone_number", e.target.value)} placeholder="(85) 3333-3333" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Email</Label>
                <Input value={form.email_contact} onChange={e => updateField("email_contact", e.target.value)} placeholder="contato@applelink.com" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Instagram</Label>
                <Input value={form.instagram_url} onChange={e => updateField("instagram_url", e.target.value)} placeholder="https://instagram.com/applelink" className={inputCls} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Endereço</Label>
              <Input value={form.address} onChange={e => updateField("address", e.target.value)} placeholder="Rua tal, 123 - Fortaleza/CE" className={inputCls} />
            </div>
          </StoreSettingsSection>

          <StoreSettingsSection title="SEO e Rodapé" subtitle="Metadados e texto do rodapé">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Título SEO</Label>
                <Input value={form.seo_title} onChange={e => updateField("seo_title", e.target.value)} placeholder="aLink - Apple Store Delivery" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Descrição SEO</Label>
                <Textarea value={form.seo_description} onChange={e => updateField("seo_description", e.target.value)} placeholder="A melhor loja de produtos Apple com entrega rápida..." className="rounded-xl text-[13px] min-h-[70px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Texto do Rodapé</Label>
                <Input value={form.footer_text} onChange={e => updateField("footer_text", e.target.value)} placeholder="© 2026 aLink. Todos os direitos reservados." className={inputCls} />
              </div>
            </div>
          </StoreSettingsSection>
        </div>

        <div className="hidden lg:block">
          <ThemePreview config={form} />
        </div>
      </div>
    </div>
  );
}
