import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FieldRow from "./FieldRow";
import SuggestionPills from "./SuggestionPills";

export default function InfoCardSection({ form, updateField }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <FieldRow label="Emoji/Ícone">
          <Input value={form.info_card_emoji || ""} onChange={e => updateField("info_card_emoji", e.target.value)} placeholder="🚚" className="h-10 rounded-xl text-[16px] text-center border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" maxLength={2} />
        </FieldRow>
        <div className="col-span-2">
          <FieldRow label="Título" required>
            <Input value={form.info_card_title || ""} onChange={e => updateField("info_card_title", e.target.value)} placeholder="Frete grátis para SP" className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
            <SuggestionPills suggestions={["Frete grátis para SP", "Entrega expressa disponível", "Garantia estendida", "Programa de fidelidade"]} onSelect={v => updateField("info_card_title", v)} currentValue={form.info_card_title} />
          </FieldRow>
        </div>
      </div>

      <FieldRow label="Descrição">
        <Textarea value={form.info_card_description || ""} onChange={e => updateField("info_card_description", e.target.value)} placeholder="Texto descritivo do card..." className="rounded-xl text-[13px] min-h-[70px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
      </FieldRow>

      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Texto do CTA">
          <Input value={form.info_card_cta_text || ""} onChange={e => updateField("info_card_cta_text", e.target.value)} placeholder="Saiba mais" className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
          <SuggestionPills suggestions={["Saiba mais", "Ver detalhes", "Aproveitar", "Conferir"]} onSelect={v => updateField("info_card_cta_text", v)} currentValue={form.info_card_cta_text} />
        </FieldRow>
        <FieldRow label="Link do CTA">
          <Input value={form.info_card_cta_link || ""} onChange={e => updateField("info_card_cta_link", e.target.value)} placeholder="/frete ou URL" className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
        </FieldRow>
      </div>

      <FieldRow label="Cor de fundo">
        <div className="flex items-center gap-2 bg-[#fafafa] dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.06] rounded-xl px-3 py-2">
          <input type="color" value={form.info_card_bg_color || "#f5f5f7"} onChange={e => updateField("info_card_bg_color", e.target.value)} className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent p-0" />
          <input type="text" value={form.info_card_bg_color || "#f5f5f7"} onChange={e => updateField("info_card_bg_color", e.target.value)} className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] dark:text-[#f5f5f7] outline-none uppercase" maxLength={7} />
        </div>
      </FieldRow>

      {/* Preview */}
      <div className="bg-[#fafafa] dark:bg-[#1c1c1e] rounded-xl p-3">
        <p className="text-[10px] text-[#c7c7cc] dark:text-[#636366] uppercase tracking-wider font-semibold mb-2">Preview</p>
        <div className="rounded-xl p-4" style={{ backgroundColor: form.info_card_bg_color || "#f5f5f7" }}>
          <span className="text-2xl">{form.info_card_emoji || "📦"}</span>
          <p className="text-[14px] font-bold text-[#1d1d1f] mt-2">{form.info_card_title || "Título"}</p>
          {form.info_card_description && <p className="text-[12px] text-[#86868b] mt-1">{form.info_card_description}</p>}
          {form.info_card_cta_text && (
            <span className="inline-block mt-3 px-3 py-1.5 bg-[#1d1d1f] text-white rounded-full text-[11px] font-medium">
              {form.info_card_cta_text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
