import React, { useState } from "react";
import { Plus, X, CircleCheck, CircleAlert, CircleMinus, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEFAULT_ITEMS = [
  "Tela / Display",
  "Bateria (saúde)",
  "Câmera traseira",
  "Câmera frontal",
  "Alto-falante",
  "Microfone",
  "Botões físicos",
  "Face ID / Touch ID",
  "Wi-Fi / Bluetooth",
  "Carregamento",
  "Carcaça / Estrutura",
  "Sensor de proximidade",
];

const STATUS_CONFIG = {
  ok: { label: "Perfeito", icon: CircleCheck, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200/60" },
  minor: { label: "Detalhe leve", icon: CircleMinus, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200/60" },
  issue: { label: "Problema", icon: CircleAlert, color: "text-red-500", bg: "bg-red-50", border: "border-red-200/60" },
};

export default function ConditionChecklist({ checklist = [], onChange }) {
  const [customItem, setCustomItem] = useState("");

  const addItem = (itemName) => {
    if (!itemName.trim()) return;
    if (checklist.some(c => c.item === itemName)) return;
    onChange([...checklist, { item: itemName, status: "ok", note: "" }]);
  };

  const addCustom = () => {
    addItem(customItem);
    setCustomItem("");
  };

  const updateItem = (index, field, value) => {
    const updated = checklist.map((c, i) => i === index ? { ...c, [field]: value } : c);
    onChange(updated);
  };

  const removeItem = (index) => {
    onChange(checklist.filter((_, i) => i !== index));
  };

  const unusedDefaults = DEFAULT_ITEMS.filter(d => !checklist.some(c => c.item === d));

  return (
    <div className="space-y-4">
      {/* Quick add buttons */}
      {unusedDefaults.length > 0 && (
        <div>
          <p className="text-[11px] text-[#86868b] font-medium mb-2">Adicionar itens rapidamente:</p>
          <div className="flex flex-wrap gap-1.5">
            {unusedDefaults.map(item => (
              <button
                key={item}
                onClick={() => addItem(item)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#f5f5f7] text-[#86868b] hover:bg-[#e8e8ed] hover:text-[#1d1d1f] transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Checklist items */}
      {checklist.length > 0 && (
        <div className="space-y-2">
          {checklist.map((entry, i) => {
            const cfg = STATUS_CONFIG[entry.status] || STATUS_CONFIG.ok;
            const Icon = cfg.icon;
            return (
              <div key={i} className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-3 space-y-2 group`}>
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${cfg.color} flex-shrink-0`} />
                  <span className="flex-1 text-[13px] font-medium text-[#1d1d1f]">{entry.item}</span>
                  <Select value={entry.status} onValueChange={v => updateItem(i, "status", v)}>
                    <SelectTrigger className={`h-7 w-[130px] rounded-lg text-[11px] font-semibold border-0 ${cfg.bg} ${cfg.color}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ok">
                        <span className="flex items-center gap-1.5 text-emerald-600"><CircleCheck className="w-3 h-3" /> Perfeito</span>
                      </SelectItem>
                      <SelectItem value="minor">
                        <span className="flex items-center gap-1.5 text-amber-600"><CircleMinus className="w-3 h-3" /> Detalhe leve</span>
                      </SelectItem>
                      <SelectItem value="issue">
                        <span className="flex items-center gap-1.5 text-red-500"><CircleAlert className="w-3 h-3" /> Problema</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <button onClick={() => removeItem(i)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
                {(entry.status === "minor" || entry.status === "issue") && (
                  <Input
                    value={entry.note}
                    onChange={e => updateItem(i, "note", e.target.value)}
                    placeholder="Descreva o detalhe..."
                    className="h-8 rounded-xl text-[12px] border-black/[0.06] bg-white/80 focus:bg-white"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Custom item input */}
      <div className="flex gap-2">
        <Input
          value={customItem}
          onChange={e => setCustomItem(e.target.value)}
          placeholder="Adicionar item personalizado..."
          className="h-10 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white"
          onKeyDown={e => { if (e.key === "Enter") addCustom(); }}
        />
        <button
          onClick={addCustom}
          disabled={!customItem.trim()}
          className="h-10 px-4 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-2xl text-[12px] font-medium transition-colors disabled:opacity-40 flex-shrink-0"
        >
          Adicionar
        </button>
      </div>

      {/* Summary */}
      {checklist.length > 0 && (
        <div className="flex items-center gap-3 bg-[#f5f5f7] rounded-2xl p-3">
          <ShieldCheck className="w-4 h-4 text-[#86868b]" />
          <div className="flex gap-3 text-[11px] font-medium">
            <span className="text-emerald-600">{checklist.filter(c => c.status === "ok").length} perfeitos</span>
            <span className="text-amber-600">{checklist.filter(c => c.status === "minor").length} detalhes</span>
            <span className="text-red-500">{checklist.filter(c => c.status === "issue").length} problemas</span>
          </div>
        </div>
      )}
    </div>
  );
}