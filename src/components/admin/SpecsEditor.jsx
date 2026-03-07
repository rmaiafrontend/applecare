import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

const inputClass = "bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 focus:border-violet-500/30 focus:ring-violet-500/10";

export default function SpecsEditor({ specs = [], onChange }) {
  const addSpec = () => onChange([...specs, { label: '', value: '' }]);
  const removeSpec = (index) => onChange(specs.filter((_, i) => i !== index));
  const updateSpec = (index, field, value) => {
    const updated = [...specs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {specs.length === 0 && (
        <p className="text-[13px] text-white/20 text-center py-6">Nenhuma especificacao adicionada</p>
      )}
      {specs.map((spec, index) => (
        <div key={index} className="flex items-center gap-3">
          <Input
            value={spec.label}
            onChange={(e) => updateSpec(index, 'label', e.target.value)}
            placeholder="Ex: Processador"
            className={`flex-1 text-sm ${inputClass}`}
          />
          <Input
            value={spec.value}
            onChange={(e) => updateSpec(index, 'value', e.target.value)}
            placeholder="Ex: Apple M3 Pro"
            className={`flex-1 text-sm ${inputClass}`}
          />
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0" onClick={() => removeSpec(index)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addSpec}
        className="w-full border-dashed border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12]"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Especificacao
      </Button>
    </div>
  );
}
