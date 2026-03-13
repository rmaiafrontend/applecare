import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, GripVertical } from "lucide-react";

export default function CarouselsSection({ form, updateField }) {
  const carousels = form.carousels || [];

  const addCarousel = () => {
    updateField("carousels", [...carousels, { title: "", source_type: "tag", source_value: "", is_active: true }]);
  };

  const updateCarousel = (i, field, val) => {
    const updated = [...carousels];
    updated[i] = { ...updated[i], [field]: val };
    updateField("carousels", updated);
  };

  const removeCarousel = (i) => {
    updateField("carousels", carousels.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-3">
      <p className="text-[11px] text-[#86868b] dark:text-[#98989d]">Adicione quantos carrosseis quiser. Cada um exibe produtos por tag ou categoria.</p>

      <div className="space-y-3">
        {carousels.map((carousel, i) => (
          <div key={i} className="bg-[#fafafa] dark:bg-[#1c1c1e] rounded-xl p-4 space-y-3 group relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-[#d1d1d6] dark:text-[#48484a]" />
                <span className="text-[11px] font-bold text-[#c7c7cc] dark:text-[#636366]">#{i + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={carousel.is_active !== false}
                  onCheckedChange={v => updateCarousel(i, "is_active", v)}
                  className="scale-75"
                />
                <button onClick={() => removeCarousel(i)} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  <X className="w-3 h-3 text-red-400" />
                </button>
              </div>
            </div>

            <Input
              value={carousel.title}
              onChange={e => updateCarousel(i, "title", e.target.value)}
              placeholder="Título do carrossel"
              className="h-9 rounded-lg text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#2c2c2e] dark:text-[#f5f5f7]"
            />

            <div className="grid grid-cols-2 gap-2">
              <Select value={carousel.source_type} onValueChange={v => updateCarousel(i, "source_type", v)}>
                <SelectTrigger className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#2c2c2e] dark:text-[#f5f5f7]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tag">Por Tag</SelectItem>
                  <SelectItem value="category">Por Categoria</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={carousel.source_value}
                onChange={e => updateCarousel(i, "source_value", e.target.value)}
                placeholder={carousel.source_type === "tag" ? "Nome da tag" : "ID da categoria"}
                className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#2c2c2e] dark:text-[#f5f5f7]"
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={addCarousel} className="w-full h-10 border border-dashed border-black/[0.08] dark:border-white/[0.1] rounded-xl text-[12px] text-[#86868b] dark:text-[#98989d] font-medium hover:border-[#0071e3] dark:hover:border-[#0a84ff] hover:text-[#0071e3] dark:hover:text-[#0a84ff] transition-colors flex items-center justify-center gap-1.5">
        <Plus className="w-3.5 h-3.5" /> Adicionar Carrossel
      </button>
    </div>
  );
}
