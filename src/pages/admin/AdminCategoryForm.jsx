import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, Smartphone, Laptop, Tablet, Watch, Headphones, Monitor, Cable, Package, Gift, Tag, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const { Category } = base44.entities;

const iconOptions = [
  { name: 'Smartphone', icon: Smartphone },
  { name: 'Laptop', icon: Laptop },
  { name: 'Tablet', icon: Tablet },
  { name: 'Watch', icon: Watch },
  { name: 'Headphones', icon: Headphones },
  { name: 'Monitor', icon: Monitor },
  { name: 'Cable', icon: Cable },
  { name: 'Package', icon: Package },
  { name: 'Gift', icon: Gift },
  { name: 'Tag', icon: Tag },
  { name: 'Star', icon: Star },
  { name: 'Zap', icon: Zap },
];

const defaultForm = { name: '', icon: 'Package', order: 1, is_promotion: false };

export default function AdminCategoryForm({ categoryId, onNavigate }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!categoryId;

  const { data: existing } = useQuery({
    queryKey: ['admin-category', categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      const results = await Category.filter({ id: categoryId });
      return results[0] || null;
    },
    enabled: !!categoryId,
  });

  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        icon: existing.icon || 'Package',
        order: existing.order ?? 1,
        is_promotion: existing.is_promotion ?? false,
      });
    }
  }, [existing]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Nome obrigatorio', description: 'Preencha o nome da categoria.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      if (isEditing) {
        await Category.update(categoryId, form);
        toast({ title: 'Categoria atualizada' });
      } else {
        await Category.create(form);
        toast({ title: 'Categoria criada' });
      }
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      onNavigate('categories');
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 focus:border-violet-500/30 focus:ring-violet-500/10";
  const labelClass = "text-[13px] font-medium text-white/50";

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-xl"
          onClick={() => onNavigate('categories')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </h1>
          <p className="text-sm text-white/30 mt-0.5">
            {isEditing ? `Editando "${existing?.name || ''}"` : 'Preencha os dados da nova categoria'}
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <Package className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="text-sm font-semibold text-white/80">Informacoes da Categoria</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label className={labelClass}>Nome *</Label>
              <Input
                className={inputClass}
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ex: iPhone, MacBook..."
              />
            </div>

            {/* Icon Picker */}
            <div className="space-y-3">
              <Label className={labelClass}>Icone</Label>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                {iconOptions.map((opt) => {
                  const I = opt.icon;
                  const isSelected = form.icon === opt.name;
                  return (
                    <motion.button
                      key={opt.name}
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      onClick={() => updateField('icon', opt.name)}
                      className={`relative flex items-center justify-center w-full aspect-square rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'border-violet-500/40 bg-violet-500/15 text-violet-300 shadow-lg shadow-violet-500/10'
                          : 'border-white/[0.06] bg-white/[0.02] text-white/30 hover:text-white/60 hover:border-white/[0.1] hover:bg-white/[0.04]'
                      }`}
                      title={opt.name}
                    >
                      <I className="h-4.5 w-4.5" />
                      {isSelected && (
                        <motion.div
                          layoutId="icon-selected"
                          className="absolute inset-0 rounded-xl border-2 border-violet-500/50"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-[11px] text-white/20">{form.icon} selecionado</p>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label className={labelClass}>Ordem de exibicao</Label>
              <Input
                type="number"
                min="1"
                value={form.order}
                onChange={(e) => updateField('order', parseInt(e.target.value) || 1)}
                className={`${inputClass} w-32`}
              />
            </div>

            {/* Promotion */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div>
                <Label className="text-[13px] font-medium text-white/60">Categoria em promocao</Label>
                <p className="text-[11px] text-white/25 mt-0.5">Destaca a categoria com estilo especial</p>
              </div>
              <Switch
                checked={form.is_promotion}
                onCheckedChange={(v) => updateField('is_promotion', v)}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <Button
          variant="outline"
          className="bg-white/[0.02] border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06]"
          onClick={() => onNavigate('categories')}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar Alteracoes' : 'Criar Categoria'}
        </Button>
      </div>
    </div>
  );
}
