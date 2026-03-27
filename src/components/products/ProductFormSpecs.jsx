import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductFormSpecs({ specs, onChange }) {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const addSpec = () => {
    if (label && value) {
      onChange([...specs, { label, value }]);
      setLabel("");
      setValue("");
    }
  };

  const removeSpec = (i) => onChange(specs.filter((_, idx) => idx !== i));

  const inputSmall = "h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]";

  return (
    <>
      {specs.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#fafafa] dark:bg-[#1c1c1e] rounded-lg px-3 py-2 group border border-black/[0.03] dark:border-white/[0.04]">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#86868b] dark:text-[#98989d] font-medium leading-tight">{spec.label}</p>
                <p className="text-[12px] text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold truncate">{spec.value}</p>
              </div>
              <button onClick={() => removeSpec(i)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 w-5 h-5 rounded flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/[0.12]">
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input value={label} onChange={e => setLabel(e.target.value)} placeholder="Label (ex: Tela)" className={inputSmall} />
        <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor (ex: 6.7 polegadas)" className={inputSmall}
          onKeyDown={e => { if (e.key === "Enter") addSpec(); }}
        />
        <button onClick={addSpec} disabled={!label || !value} className="h-9 w-9 bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 flex-shrink-0 border border-black/[0.04] dark:border-white/[0.06]">
          <Plus className="w-3.5 h-3.5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
        </button>
      </div>
    </>
  );
}
