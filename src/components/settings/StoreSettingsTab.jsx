import { useState, useEffect, useMemo } from "react";
import { Save, Loader2, Check, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StoreSettingsSection from "../store/StoreSettingsSection";
import LogoUploader from "../store/LogoUploader";
import ColorPicker from "../store/ColorPicker";
import HomePreview from "../home-settings/HomePreview";
import { useConfigLoja, useSaveConfigLoja } from "@/api/hooks";
import { storeThemes } from "@/lib/storeThemes";

const defaultConfig = {
  store_name: "", store_slogan: "",
  logo_url: "", logo_dark_url: "", favicon_url: "",
  primary_color: "#1d1d1f", secondary_color: "#f5f5f7",
  accent_color: "#0071e3", background_color: "#ffffff", text_color: "#1d1d1f",
  whatsapp_number: "", instagram_url: "", email_contact: "", phone_number: "",
  address: "", footer_text: "", seo_title: "", seo_description: "",
};

function fromApi(data) {
  if (!data) return {};
  return {
    store_name: data.nomeLoja || "",
    store_slogan: data.sloganLoja || "",
    logo_url: data.logoUrl || "",
    logo_dark_url: data.logoEscuroUrl || "",
    favicon_url: data.faviconUrl || "",
    primary_color: data.corPrimaria || "#1d1d1f",
    secondary_color: data.corSecundaria || "#f5f5f7",
    accent_color: data.corDestaque || "#0071e3",
    background_color: data.corFundo || "#ffffff",
    text_color: data.corTexto || "#1d1d1f",
    whatsapp_number: data.numeroWhatsapp || "",
    phone_number: data.numeroTelefone || "",
    instagram_url: data.urlInstagram || "",
    email_contact: data.emailContato || "",
    address: data.endereco || "",
    footer_text: data.textoRodape || "",
    seo_title: data.tituloSeo || "",
    seo_description: data.descricaoSeo || "",
  };
}

function toApi(form) {
  return {
    nomeLoja: form.store_name,
    sloganLoja: form.store_slogan,
    logoUrl: form.logo_url,
    logoEscuroUrl: form.logo_dark_url,
    faviconUrl: form.favicon_url,
    corPrimaria: form.primary_color,
    corSecundaria: form.secondary_color,
    corDestaque: form.accent_color,
    corFundo: form.background_color,
    corTexto: form.text_color,
    numeroWhatsapp: form.whatsapp_number,
    numeroTelefone: form.phone_number,
    urlInstagram: form.instagram_url,
    emailContato: form.email_contact,
    endereco: form.address,
    textoRodape: form.footer_text,
    tituloSeo: form.seo_title,
    descricaoSeo: form.seo_description,
  };
}

export default function StoreSettingsTab() {
  const [form, setForm] = useState(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { data: lojaConfig } = useConfigLoja();
  const saveMutation = useSaveConfigLoja();

  useEffect(() => {
    if (lojaConfig) {
      setForm(prev => ({ ...prev, ...fromApi(lojaConfig) }));
    }
  }, [lojaConfig]);

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveMutation.mutateAsync(toApi(form));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
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

      <div className="grid xl:grid-cols-[1fr_390px] gap-6">
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
            {/* Theme presets */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d]" strokeWidth={1.8} />
                <span className="text-[11px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider">Temas</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {storeThemes.map((theme) => {
                  const c = theme.colors;
                  const isActive =
                    form.primary_color === c.primary_color &&
                    form.accent_color === c.accent_color &&
                    form.background_color === c.background_color;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setForm(prev => ({ ...prev, ...c }))}
                      className={`group relative rounded-xl border-2 p-2.5 transition-all hover:scale-[1.03] active:scale-[0.97] ${
                        isActive
                          ? "border-[#007aff] dark:border-[#0a84ff] shadow-[0_0_0_1px_rgba(0,122,255,0.3)]"
                          : "border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15]"
                      }`}
                    >
                      {/* Color swatches */}
                      <div className="flex gap-1 mb-2 justify-center">
                        {[c.primary_color, c.accent_color, c.background_color, c.text_color].map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] block text-center leading-tight">
                        {theme.name}
                      </span>
                      {isActive && (
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#007aff] dark:bg-[#0a84ff] rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom color pickers */}
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

        <div className="hidden xl:block">
          <HomePreview
            form={{}}
            storeInfo={{
              name: form.store_name,
              logo: form.logo_url,
              whatsapp: form.whatsapp_number,
              instagram: form.instagram_url,
            }}
          />
        </div>
      </div>
    </div>
  );
}
