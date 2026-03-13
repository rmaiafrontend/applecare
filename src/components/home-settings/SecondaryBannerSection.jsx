import React from "react";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import FieldRow from "./FieldRow";
import SuggestionPills from "./SuggestionPills";

export default function SecondaryBannerSection({ form, updateField }) {
  const ids = form.secondary_banner_product_ids || [];

  const addId = () => {
    if (ids.length >= 4) return;
    updateField("secondary_banner_product_ids", [...ids, ""]);
  };

  const updateId = (i, val) => {
    const updated = [...ids];
    updated[i] = val;
    updateField("secondary_banner_product_ids", updated);
  };

  const removeId = (i) => {
    updateField("secondary_banner_product_ids", ids.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-4">
      <FieldRow label="Título da seção">
        <Input value={form.secondary_banner_title || ""} onChange={e => updateField("secondary_banner_title", e.target.value)} placeholder="Destaques" className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
        <SuggestionPills suggestions={["Destaques", "Mais vendidos", "Seleção especial", "Top da semana", "Escolhas do editor"]} onSelect={v => updateField("secondary_banner_title", v)} currentValue={form.secondary_banner_title} />
      </FieldRow>

      <FieldRow label="Produtos (até 4)" hint="IDs dos produtos que aparecem no grid">
        <div className="space-y-2">
          {ids.map((id, i) => (
            <div key={i} className="flex items-center gap-2 group">
              <span className="text-[10px] text-[#c7c7cc] dark:text-[#636366] w-5 text-center font-mono">{i + 1}</span>
              <Input value={id} onChange={e => updateId(i, e.target.value)} placeholder="product_id" className="h-9 rounded-lg text-[12px] font-mono border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] flex-1" />
              <button onClick={() => removeId(i)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}
        </div>
        {ids.length < 4 && (
          <button onClick={addId} className="w-full h-9 border border-dashed border-black/[0.08] dark:border-white/[0.1] rounded-xl text-[12px] text-[#86868b] dark:text-[#98989d] font-medium hover:border-[#0071e3] dark:hover:border-[#0a84ff] hover:text-[#0071e3] dark:hover:text-[#0a84ff] transition-colors flex items-center justify-center gap-1.5 mt-2">
            <Plus className="w-3.5 h-3.5" /> Adicionar Produto
          </button>
        )}
      </FieldRow>
    </div>
  );
}
