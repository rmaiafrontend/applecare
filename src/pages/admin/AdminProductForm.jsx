import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Percent, FileText, Image, Settings2, DollarSign, Package as PackageIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import ImageManager from '@/components/admin/ImageManager';
import SpecsEditor from '@/components/admin/SpecsEditor';
import SmartProductSearch from '@/components/admin/SmartProductSearch';

const { Product, Category } = base44.entities;

const defaultForm = {
  name: '',
  sku: '',
  description: '',
  category_id: '',
  condition: 'new',
  price: '',
  original_price: '',
  stock: 0,
  express_delivery: false,
  images: [],
  specs: [],
  datasheet_url: '',
};

function SectionCard({ icon: Icon, title, children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.04]">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <Icon className="h-4 w-4 text-violet-400" />
          </div>
          <h3 className="text-sm font-semibold text-white/80">{title}</h3>
        </div>
        <div className="p-6 space-y-5">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminProductForm({ productId, onNavigate }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!productId;

  const { data: categories = [] } = useQuery({ queryKey: ['admin-categories'], queryFn: () => Category.list() });
  const { data: existing } = useQuery({
    queryKey: ['admin-product', productId],
    queryFn: async () => {
      if (!productId) return null;
      const results = await Product.filter({ id: productId });
      return results[0] || null;
    },
    enabled: !!productId,
  });

  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || '',
        sku: existing.sku || '',
        description: existing.description || '',
        category_id: existing.category_id || '',
        condition: existing.condition || 'new',
        price: existing.price ?? '',
        original_price: existing.original_price ?? '',
        stock: existing.stock ?? 0,
        express_delivery: existing.express_delivery ?? false,
        images: existing.images || [],
        specs: existing.specs || [],
        datasheet_url: existing.datasheet_url || '',
      });
    }
  }, [existing]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const discountPercent = form.original_price && form.price && Number(form.original_price) > Number(form.price)
    ? Math.round(((Number(form.original_price) - Number(form.price)) / Number(form.original_price)) * 100)
    : 0;

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Nome obrigatorio', description: 'Preencha o nome do produto.', variant: 'destructive' });
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      toast({ title: 'Preco invalido', description: 'Informe um preco valido.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const data = {
        ...form,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : undefined,
        stock: Number(form.stock),
        condition: form.condition === 'new' ? undefined : form.condition,
      };

      if (isEditing) {
        await Product.update(productId, data);
        toast({ title: 'Produto atualizado' });
      } else {
        await Product.create(data);
        toast({ title: 'Produto criado' });
      }
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      onNavigate('products');
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 focus:border-violet-500/30 focus:ring-violet-500/10";
  const labelClass = "text-[13px] font-medium text-white/50";

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-xl"
            onClick={() => onNavigate('products')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? 'Editar Produto' : 'Novo Produto'}
            </h1>
            <p className="text-sm text-white/30 mt-0.5">
              {isEditing ? `Editando "${existing?.name || ''}"` : 'Preencha todos os campos do produto'}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="hidden sm:flex bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar Alteracoes' : 'Criar Produto'}
        </Button>
      </motion.div>

      {/* Smart Product Search - only for new products */}
      {!isEditing && (
        <SmartProductSearch
          categories={categories}
          onSelect={(data) => {
            setForm((prev) => ({ ...prev, ...data }));
            toast({ title: 'Produto preenchido', description: `"${data.name}" foi selecionado. Revise os campos e salve.` });
          }}
        />
      )}

      {/* Section 1: Basic Info */}
      <SectionCard icon={Info} title="Informacoes Basicas" index={0}>
        <div className="space-y-2">
          <Label className={labelClass}>Nome do produto *</Label>
          <Input className={inputClass} value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Ex: iPhone 15 Pro Max 256GB" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={labelClass}>SKU</Label>
            <Input className={inputClass} value={form.sku} onChange={(e) => updateField('sku', e.target.value)} placeholder="Ex: IP15PM-256-BLK" />
          </div>
          <div className="space-y-2">
            <Label className={labelClass}>Categoria</Label>
            <Select value={form.category_id} onValueChange={(v) => updateField('category_id', v)}>
              <SelectTrigger className={inputClass}>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent className="bg-[#18181b] border-white/[0.08] text-white">
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className={labelClass}>Descricao</Label>
          <Textarea
            className={`${inputClass} min-h-[100px]`}
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Descreva o produto em detalhes..."
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label className={labelClass}>Condicao</Label>
          <RadioGroup value={form.condition} onValueChange={(v) => updateField('condition', v)} className="flex gap-3">
            <label className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${form.condition === 'new' ? 'border-violet-500/30 bg-violet-500/10 text-violet-300' : 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/[0.1]'}`}>
              <RadioGroupItem value="new" id="cond-new" className="border-white/20" />
              <span className="text-[13px] font-medium">Novo</span>
            </label>
            <label className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${form.condition === 'used' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/[0.1]'}`}>
              <RadioGroupItem value="used" id="cond-used" className="border-white/20" />
              <span className="text-[13px] font-medium">Usado</span>
            </label>
          </RadioGroup>
        </div>
      </SectionCard>

      {/* Section 2: Pricing */}
      <SectionCard icon={DollarSign} title="Precos" index={1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={labelClass}>Preco atual (R$) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/20">R$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className={labelClass}>Preco original (R$)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/20">R$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.original_price}
                onChange={(e) => updateField('original_price', e.target.value)}
                className={`${inputClass} pl-10`}
                placeholder="Opcional"
              />
            </div>
          </div>
        </div>
        {discountPercent > 0 && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-green-500/10 border border-green-500/15">
            <Percent className="h-4 w-4 text-green-400" />
            <p className="text-[13px] text-green-300 font-medium">
              Desconto de {discountPercent}% — Economia de R$ {(Number(form.original_price) - Number(form.price)).toLocaleString('pt-BR')}
            </p>
          </div>
        )}
      </SectionCard>

      {/* Section 3: Inventory & Delivery */}
      <SectionCard icon={PackageIcon} title="Estoque & Entrega" index={2}>
        <div className="space-y-2">
          <Label className={labelClass}>Quantidade em estoque</Label>
          <Input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => updateField('stock', parseInt(e.target.value) || 0)}
            className={`${inputClass} w-40`}
          />
        </div>
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/10">
              <Truck className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <Label className="text-[13px] font-medium text-white/60">Entrega Express</Label>
              <p className="text-[11px] text-white/25 mt-0.5">Disponivel para entrega em 1 hora</p>
            </div>
          </div>
          <Switch
            checked={form.express_delivery}
            onCheckedChange={(v) => updateField('express_delivery', v)}
          />
        </div>
        {form.express_delivery && (
          <Badge className="bg-green-500/10 border border-green-500/15 text-green-400 hover:bg-green-500/15">
            <Truck className="h-3 w-3 mr-1" /> Entrega 1h ativada
          </Badge>
        )}
      </SectionCard>

      {/* Section 4: Images */}
      <SectionCard icon={Image} title="Imagens" index={3}>
        <ImageManager images={form.images} onChange={(imgs) => updateField('images', imgs)} />
      </SectionCard>

      {/* Section 5: Specs */}
      <SectionCard icon={Settings2} title="Especificacoes" index={4}>
        <SpecsEditor specs={form.specs} onChange={(s) => updateField('specs', s)} />
      </SectionCard>

      {/* Section 6: Datasheet */}
      <SectionCard icon={FileText} title="Datasheet" index={5}>
        <div className="space-y-2">
          <Label className={labelClass}>URL do Datasheet (opcional)</Label>
          <Input
            className={inputClass}
            value={form.datasheet_url}
            onChange={(e) => updateField('datasheet_url', e.target.value)}
            placeholder="https://..."
          />
          {form.datasheet_url && (
            <a href={form.datasheet_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
              Visualizar datasheet
            </a>
          )}
        </div>
      </SectionCard>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end pb-8">
        <Button
          variant="outline"
          className="bg-white/[0.02] border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06]"
          onClick={() => onNavigate('products')}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar Alteracoes' : 'Criar Produto'}
        </Button>
      </div>

      {/* Mobile sticky save */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#09090b]/90 backdrop-blur-xl border-t border-white/[0.06] z-40">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0"
        >
          {saving ? 'Salvando...' : isEditing ? 'Salvar Alteracoes' : 'Criar Produto'}
        </Button>
      </div>
    </div>
  );
}
