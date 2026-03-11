import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, X, GripVertical } from "lucide-react";
import FieldRow from "./FieldRow";
import ImageUploadField from "./ImageUploadField";
import SuggestionPills from "./SuggestionPills";

const DAYS = [
  { key: "mon", label: "Segunda" },
  { key: "tue", label: "Terça" },
  { key: "wed", label: "Quarta" },
  { key: "thu", label: "Quinta" },
  { key: "fri", label: "Sexta" },
  { key: "sat", label: "Sábado" },
  { key: "sun", label: "Domingo" },
];

export default function HeaderLinktreeSection({ form, updateField }) {
  const hours = form.header_hours || {};
  const links = form.header_quick_links || [];

  const updateHour = (key, val) => updateField("header_hours", { ...hours, [key]: val });

  const addLink = () => {
    if (links.length >= 6) return;
    updateField("header_quick_links", [...links, { emoji: "🔗", label: "", url: "", is_highlight: false }]);
  };

  const updateLink = (i, field, val) => {
    const updated = [...links];
    updated[i] = { ...updated[i], [field]: val };
    updateField("header_quick_links", updated);
  };

  const removeLink = (i) => {
    updateField("header_quick_links", links.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      {/* 1.1 Identidade */}
      <div className="space-y-4">
        <p className="text-[12px] font-bold text-[#1d1d1f]">1.1 Identidade</p>
        <ImageUploadField
          value={form.header_logo_url}
          onChange={v => updateField("header_logo_url", v)}
          label="Logo da loja (200×200px)"
          aspect="aspect-square max-w-[120px]"
        />
        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Nome da loja" required>
            <Input value={form.header_store_name || ""} onChange={e => updateField("header_store_name", e.target.value)} placeholder="AppleLink Store" maxLength={40} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
            <SuggestionPills suggestions={["AppleLink Store", "AppleLink Tech", "AppleLink Apple", "AppleLink Shop"]} onSelect={v => updateField("header_store_name", v)} currentValue={form.header_store_name} />
          </FieldRow>
          <FieldRow label="Tagline">
            <Input value={form.header_tagline || ""} onChange={e => updateField("header_tagline", e.target.value)} placeholder="Produtos Apple Originais · SP" maxLength={60} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
            <SuggestionPills suggestions={["Produtos Apple Originais · SP", "Tecnologia com entrega rápida", "Apple · Acessórios · Entrega 1h", "Sua loja Apple favorita"]} onSelect={v => updateField("header_tagline", v)} currentValue={form.header_tagline} />
          </FieldRow>
        </div>
      </div>

      {/* 1.2 Horários */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold text-[#1d1d1f]">1.2 Horário de Funcionamento</p>
        <div className="bg-[#fafafa] rounded-xl p-3 space-y-2">
          {DAYS.map(d => (
            <div key={d.key} className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-[#86868b] w-16">{d.label}</span>
              <Input
                value={hours[d.key] || ""}
                onChange={e => updateHour(d.key, e.target.value)}
                placeholder="09:00 – 19:00 ou Fechado"
                className="h-8 rounded-lg text-[12px] border-black/[0.06] bg-white flex-1"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 1.3 Links Rápidos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold text-[#1d1d1f]">1.3 Links Rápidos</p>
          <span className="text-[10px] text-[#c7c7cc]">{links.length}/6</span>
        </div>
        <div className="space-y-2">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#fafafa] rounded-xl p-2.5 group">
              <Input value={link.emoji} onChange={e => updateLink(i, "emoji", e.target.value)} className="h-8 w-12 text-center rounded-lg text-[14px] border-black/[0.06] bg-white" maxLength={2} />
              <Input value={link.label} onChange={e => updateLink(i, "label", e.target.value)} placeholder="Label" className="h-8 rounded-lg text-[12px] border-black/[0.06] bg-white flex-1" maxLength={30} />
              <Input value={link.url} onChange={e => updateLink(i, "url", e.target.value)} placeholder="URL" className="h-8 rounded-lg text-[12px] border-black/[0.06] bg-white flex-1" />
              <div className="flex items-center gap-1">
                <div onClick={e => e.stopPropagation()} className="flex items-center gap-1">
                  <span className="text-[9px] text-[#c7c7cc]">★</span>
                  <Switch checked={link.is_highlight} onCheckedChange={v => updateLink(i, "is_highlight", v)} className="scale-75" />
                </div>
                <button onClick={() => removeLink(i)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3 h-3 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {links.length < 6 && (
          <button onClick={addLink} className="w-full h-9 border border-dashed border-black/[0.08] rounded-xl text-[12px] text-[#86868b] font-medium hover:border-[#0071e3] hover:text-[#0071e3] transition-colors flex items-center justify-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Adicionar Link
          </button>
        )}
      </div>

      {/* 1.4 Contatos */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold text-[#1d1d1f]">1.4 Contatos e Redes</p>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="WhatsApp" required>
            <Input value={form.header_whatsapp || ""} onChange={e => updateField("header_whatsapp", e.target.value)} placeholder="5583999999999" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
          <FieldRow label="Instagram">
            <Input value={form.header_instagram || ""} onChange={e => updateField("header_instagram", e.target.value)} placeholder="https://instagram.com/loja" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
          <FieldRow label="TikTok">
            <Input value={form.header_tiktok || ""} onChange={e => updateField("header_tiktok", e.target.value)} placeholder="https://tiktok.com/@loja" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
          <FieldRow label="YouTube">
            <Input value={form.header_youtube || ""} onChange={e => updateField("header_youtube", e.target.value)} placeholder="https://youtube.com/@loja" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
          <FieldRow label="Facebook">
            <Input value={form.header_facebook || ""} onChange={e => updateField("header_facebook", e.target.value)} placeholder="https://facebook.com/loja" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
        </div>
      </div>
    </div>
  );
}