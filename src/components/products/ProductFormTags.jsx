import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductFormTags({ selectedTags, availableTags, onChange }) {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      onChange([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag) => onChange(selectedTags.filter(t => t !== tag));

  const inputSmall = "h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]";

  return (
    <>
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedTags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#f5f5f7] dark:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] pl-2.5 pr-1.5 py-1 rounded-lg group border border-black/[0.03] dark:border-white/[0.04]">
              {tag}
              <button onClick={() => removeTag(tag)} className="w-4 h-4 rounded flex items-center justify-center opacity-40 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-500/[0.12] transition-all">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Select value="" onValueChange={v => { if (!selectedTags.includes(v)) onChange([...selectedTags, v]); }}>
          <SelectTrigger className={`${inputSmall}`}><SelectValue placeholder="Selecionar tag..." /></SelectTrigger>
          <SelectContent className="dark:bg-[#2c2c2e] dark:border-white/[0.08]">
            {availableTags.filter(t => !selectedTags.includes(t.slug)).map(t => <SelectItem key={t.id} value={t.slug}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Ou digite..." className={inputSmall} onKeyDown={e => { if (e.key === "Enter") addTag(); }} />
        <button onClick={addTag} disabled={!newTag} className="h-9 px-3.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-30 flex-shrink-0">
          Add
        </button>
      </div>
    </>
  );
}
