import React from "react";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import SuggestionPills from "./SuggestionPills";

const PRESET_DIFFERENTIALS = [
  { emoji: "⚡", text: "Entrega em 1 hora" },
  { emoji: "🛡️", text: "Garantia de 1 ano" },
  { emoji: "💳", text: "12x sem juros" },
  { emoji: "🚚", text: "Frete grátis" },
  { emoji: "✅", text: "Produtos originais" },
  { emoji: "🔄", text: "Troca em 7 dias" },
  { emoji: "📦", text: "Embalagem premium" },
  { emoji: "🎧", text: "Suporte 24h" },
];

export default function DifferentialsSection({ form, updateField }) {
  const items = form.differentials_items || [];

  const addItem = () => {
    if (items.length >= 4) return;
    updateField("differentials_items", [...items, { emoji: "✅", text: "" }]);
  };

  const updateItem = (i, field, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: val };
    updateField("differentials_items", updated);
  };

  const removeItem = (i) => {
    updateField("differentials_items", items.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-3">
      <p className="text-[11px] text-[#86868b]">Até 4 pills horizontais com ícone e texto curto</p>
      
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#fafafa] rounded-xl p-2.5 group">
            <Input value={item.emoji} onChange={e => updateItem(i, "emoji", e.target.value)} className="h-8 w-12 text-center rounded-lg text-[14px] border-black/[0.06] bg-white" maxLength={2} />
            <Input value={item.text} onChange={e => updateItem(i, "text", e.target.value)} placeholder="Entrega em 1 hora" className="h-8 rounded-lg text-[12px] border-black/[0.06] bg-white flex-1" maxLength={40} />
            <button onClick={() => removeItem(i)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
              <X className="w-3 h-3 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {items.length < 4 && (
        <>
          <button onClick={addItem} className="w-full h-9 border border-dashed border-black/[0.08] rounded-xl text-[12px] text-[#86868b] font-medium hover:border-[#0071e3] hover:text-[#0071e3] transition-colors flex items-center justify-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Adicionar Diferencial
          </button>

          {/* Presets */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-black/25 uppercase tracking-wider">Sugestões rápidas</p>
            <div className="flex gap-1.5 flex-wrap">
              {PRESET_DIFFERENTIALS.filter(p => !items.some(it => it.text === p.text)).slice(0, 6).map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (items.length >= 4) return;
                    updateField("differentials_items", [...items, preset]);
                  }}
                  className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-black/[0.03] text-black/40 hover:bg-violet-50 hover:text-violet-600 border border-transparent hover:border-violet-200 transition-all duration-200"
                >
                  {preset.emoji} {preset.text}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Preview */}
      {items.length > 0 && (
        <div className="bg-[#fafafa] rounded-xl p-3">
          <p className="text-[10px] text-[#c7c7cc] uppercase tracking-wider font-semibold mb-2">Preview</p>
          <div className="flex gap-2 flex-wrap">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-[11px] font-medium text-[#1d1d1f] border border-black/[0.04] shadow-sm">
                {item.emoji} {item.text}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}