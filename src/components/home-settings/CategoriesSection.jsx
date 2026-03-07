import React from "react";
import { Input } from "@/components/ui/input";
import FieldRow from "./FieldRow";
import SuggestionPills from "./SuggestionPills";

export default function CategoriesSection({ form, updateField }) {
  return (
    <div className="space-y-4">
      <FieldRow label="Título da seção">
        <Input value={form.categories_title || ""} onChange={e => updateField("categories_title", e.target.value)} placeholder="Categorias" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        <SuggestionPills suggestions={["Categorias", "Explore por tipo", "O que você procura?", "Departamentos"]} onSelect={v => updateField("categories_title", v)} currentValue={form.categories_title} />
      </FieldRow>

      <FieldRow label="Layout" hint="Como as categorias são exibidas">
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "carousel", label: "Carrossel", desc: "Scroll horizontal" },
            { value: "grid", label: "Grid", desc: "2 colunas fixas" },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => updateField("categories_layout", opt.value)}
              className={`text-left p-3 rounded-xl border transition-all ${
                (form.categories_layout || "carousel") === opt.value
                  ? "border-[#1d1d1f] bg-[#1d1d1f]/[0.03]"
                  : "border-black/[0.04] hover:border-black/[0.08]"
              }`}
            >
              <p className={`text-[12px] font-medium ${(form.categories_layout || "carousel") === opt.value ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>{opt.label}</p>
              <p className="text-[10px] text-[#c7c7cc] mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
      </FieldRow>

      <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3">
        <p className="text-[11px] text-amber-700">As categorias são gerenciadas em <span className="font-semibold">Catálogo → Categorias</span>. Aqui você controla apenas a exibição na Home.</p>
      </div>
    </div>
  );
}