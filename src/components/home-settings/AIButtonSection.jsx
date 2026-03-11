import React from "react";
import { Input } from "@/components/ui/input";
import FieldRow from "./FieldRow";
import SuggestionPills from "./SuggestionPills";

export default function AIButtonSection({ form, updateField }) {
  return (
    <div className="space-y-4">
      <FieldRow label="Título" required>
        <Input value={form.ai_button_title || ""} onChange={e => updateField("ai_button_title", e.target.value)} placeholder="Busca inteligente" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        <SuggestionPills suggestions={["Busca inteligente", "Assistente IA", "Encontre o ideal", "Pergunte ao AppleLink"]} onSelect={v => updateField("ai_button_title", v)} currentValue={form.ai_button_title} />
      </FieldRow>
      <FieldRow label="Subtítulo">
        <Input value={form.ai_button_subtitle || ""} onChange={e => updateField("ai_button_subtitle", e.target.value)} placeholder="Descreva o que procura e encontramos pra você" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        <SuggestionPills suggestions={["Descreva o que procura e encontramos pra você", "Diga o que precisa, a IA resolve", "Não sabe qual escolher? Pergunte!", "Recomendações personalizadas por IA"]} onSelect={v => updateField("ai_button_subtitle", v)} currentValue={form.ai_button_subtitle} />
      </FieldRow>
      <FieldRow label="Texto do CTA">
        <Input value={form.ai_button_cta_text || ""} onChange={e => updateField("ai_button_cta_text", e.target.value)} placeholder="Pergunte à IA" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        <SuggestionPills suggestions={["Pergunte à IA", "Buscar com IA", "Me ajude a escolher", "Iniciar conversa"]} onSelect={v => updateField("ai_button_cta_text", v)} currentValue={form.ai_button_cta_text} />
      </FieldRow>
      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Gradiente início">
          <div className="flex items-center gap-2 bg-[#fafafa] border border-black/[0.06] rounded-xl px-3 py-2">
            <input type="color" value={form.ai_button_gradient_from || "#6366f1"} onChange={e => updateField("ai_button_gradient_from", e.target.value)} className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent p-0" />
            <input type="text" value={form.ai_button_gradient_from || "#6366f1"} onChange={e => updateField("ai_button_gradient_from", e.target.value)} className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] outline-none uppercase" maxLength={7} />
          </div>
        </FieldRow>
        <FieldRow label="Gradiente fim">
          <div className="flex items-center gap-2 bg-[#fafafa] border border-black/[0.06] rounded-xl px-3 py-2">
            <input type="color" value={form.ai_button_gradient_to || "#a855f7"} onChange={e => updateField("ai_button_gradient_to", e.target.value)} className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent p-0" />
            <input type="text" value={form.ai_button_gradient_to || "#a855f7"} onChange={e => updateField("ai_button_gradient_to", e.target.value)} className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] outline-none uppercase" maxLength={7} />
          </div>
        </FieldRow>
      </div>

      {/* Preview */}
      <div className="bg-[#fafafa] rounded-xl p-3">
        <p className="text-[10px] text-[#c7c7cc] uppercase tracking-wider font-semibold mb-2">Preview</p>
        <div
          className="rounded-xl p-4 text-white"
          style={{ background: `linear-gradient(135deg, ${form.ai_button_gradient_from || "#6366f1"}, ${form.ai_button_gradient_to || "#a855f7"})` }}
        >
          <p className="text-[13px] font-bold">{form.ai_button_title || "Busca inteligente"}</p>
          <p className="text-[11px] opacity-80 mt-0.5">{form.ai_button_subtitle || "Descreva o que procura"}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-semibold">
            {form.ai_button_cta_text || "Pergunte à IA"}
          </span>
        </div>
      </div>
    </div>
  );
}