import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, X } from "lucide-react";
import FieldRow from "./FieldRow";
import SuggestionPills from "./SuggestionPills";

const TEMPLATES = [
  { value: "launches", label: "Lançamentos", desc: "Produtos mais recentes do catálogo" },
  { value: "offers", label: "Ofertas", desc: "Produtos com desconto ativo" },
  { value: "curated", label: "Curadoria", desc: "Seleção manual de produtos" },
];

export default function ProductListSection({ form, updateField }) {
  const curatedIds = form.product_list_curated_ids || [];

  const addCuratedId = () => {
    updateField("product_list_curated_ids", [...curatedIds, ""]);
  };

  const updateCuratedId = (i, val) => {
    const updated = [...curatedIds];
    updated[i] = val;
    updateField("product_list_curated_ids", updated);
  };

  const removeCuratedId = (i) => {
    updateField("product_list_curated_ids", curatedIds.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-4">
      <FieldRow label="Título da seção">
        <Input value={form.product_list_title || ""} onChange={e => updateField("product_list_title", e.target.value)} placeholder="Novidades" className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
        <SuggestionPills suggestions={["Novidades", "Acabou de chegar", "Lançamentos", "Recém adicionados", "Produtos em destaque"]} onSelect={v => updateField("product_list_title", v)} currentValue={form.product_list_title} />
      </FieldRow>

      {/* Template */}
      <FieldRow label="Template" hint="Selecione como os produtos são populados">
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.value}
              onClick={() => updateField("product_list_template", t.value)}
              className={`text-left p-3 rounded-xl border transition-all ${
                (form.product_list_template || "launches") === t.value
                  ? "border-[#1d1d1f] dark:border-[#0a84ff] bg-[#1d1d1f]/[0.03] dark:bg-[#0a84ff]/[0.1]"
                  : "border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
              }`}
            >
              <p className={`text-[11px] font-semibold ${(form.product_list_template || "launches") === t.value ? "text-[#1d1d1f] dark:text-[#0a84ff]" : "text-[#86868b] dark:text-[#98989d]"}`}>{t.label}</p>
              <p className="text-[9px] text-[#c7c7cc] dark:text-[#636366] mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </FieldRow>

      {/* Max items */}
      <FieldRow label="Máximo de itens">
        <Input
          type="number"
          value={form.product_list_max_items || 6}
          onChange={e => updateField("product_list_max_items", parseInt(e.target.value) || 6)}
          min={2} max={12}
          className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] w-24"
        />
      </FieldRow>

      {/* Curated IDs */}
      {(form.product_list_template || "launches") === "curated" && (
        <FieldRow label="Produtos curados" hint="IDs dos produtos selecionados manualmente">
          <div className="space-y-2">
            {curatedIds.map((id, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <span className="text-[10px] text-[#c7c7cc] dark:text-[#636366] w-5 text-center font-mono">{i + 1}</span>
                <Input value={id} onChange={e => updateCuratedId(i, e.target.value)} placeholder="product_id" className="h-9 rounded-lg text-[12px] font-mono border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] flex-1" />
                <button onClick={() => removeCuratedId(i)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3 h-3 text-red-400" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addCuratedId} className="w-full h-9 border border-dashed border-black/[0.08] dark:border-white/[0.1] rounded-xl text-[12px] text-[#86868b] dark:text-[#98989d] font-medium hover:border-[#0071e3] dark:hover:border-[#0a84ff] hover:text-[#0071e3] dark:hover:text-[#0a84ff] transition-colors flex items-center justify-center gap-1.5 mt-2">
            <Plus className="w-3.5 h-3.5" /> Adicionar Produto
          </button>
        </FieldRow>
      )}

      {/* CTA */}
      <div className="bg-[#fafafa] dark:bg-[#1c1c1e] rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Botão "Ver todos"</p>
          <Switch checked={form.product_list_show_cta !== false} onCheckedChange={v => updateField("product_list_show_cta", v)} />
        </div>
        {form.product_list_show_cta !== false && (
          <>
            <Input value={form.product_list_cta_text || ""} onChange={e => updateField("product_list_cta_text", e.target.value)} placeholder="Ver todos os produtos" className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#2c2c2e] dark:text-[#f5f5f7]" />
            <SuggestionPills suggestions={["Ver todos os produtos", "Explorar catálogo", "Ver mais", "Mostrar tudo"]} onSelect={v => updateField("product_list_cta_text", v)} currentValue={form.product_list_cta_text} />
          </>
        )}
      </div>
    </div>
  );
}
