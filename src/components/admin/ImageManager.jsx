import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Star, ArrowUp, ArrowDown } from 'lucide-react';

const inputClass = "bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 focus:border-violet-500/30 focus:ring-violet-500/10";

export default function ImageManager({ images = [], onChange }) {
  const addImage = () => onChange([...images, '']);
  const removeImage = (index) => onChange(images.filter((_, i) => i !== index));
  const updateImage = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    onChange(updated);
  };
  const moveImage = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    const updated = [...images];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {images.map((url, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-xl border border-white/[0.06] bg-white/[0.03] flex-shrink-0 overflow-hidden">
            {url ? (
              <img src={url} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/15 text-[10px]">Sem img</div>
            )}
            {index === 0 && url && (
              <div className="absolute top-0.5 left-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </div>
            )}
          </div>
          <Input
            value={url}
            onChange={(e) => updateImage(index, e.target.value)}
            placeholder="URL da imagem..."
            className={`flex-1 text-sm ${inputClass}`}
          />
          <div className="flex items-center gap-0.5">
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-white hover:bg-white/[0.06]" onClick={() => moveImage(index, -1)} disabled={index === 0}>
              <ArrowUp className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-white hover:bg-white/[0.06]" onClick={() => moveImage(index, 1)} disabled={index === images.length - 1}>
              <ArrowDown className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-red-400 hover:bg-red-500/10" onClick={() => removeImage(index)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addImage}
        className="w-full border-dashed border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12]"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Imagem
      </Button>
    </div>
  );
}
