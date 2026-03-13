import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, Category, Tag } from "@/api/dataService";
import { uploadFile } from "@/lib/fileUpload";
import { motion } from "framer-motion";
import {
  ArrowLeft, Plus, X, Upload, Save, Loader2, Check,
  Info, DollarSign, Image, Cpu, Tags, Settings, FileText,
  Package, ClipboardCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SmartProductSearch from "@/components/products/SmartProductSearch";
import FormSection from "@/components/products/FormSection";
import ConditionChecklist from "@/components/products/ConditionChecklist";
import { QUERY_KEYS } from '@/lib/constants';

export default function ProductForm({ onNavigate, productId: propProductId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const productId = propProductId || searchParams.get("id");
  const isEditing = !!productId;

  const goToProducts = () => onNavigate ? onNavigate('products') : setSearchParams({ view: 'products' });

  const [form, setForm] = useState({
    product_id: "", name: "", sku: "", price: "", original_price: "",
    stock: "0", express_delivery: false, category_id: "", condition: "new",
    condition_checklist: [],
    images: [], description: "", specs: [], datasheet_url: "",
    is_featured: false, is_active: true, tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiFilled, setAiFilled] = useState(false);

  const { data: categories = [] } = useQuery({ queryKey: QUERY_KEYS.categories, queryFn: () => Category.list() });
  const { data: tags = [] } = useQuery({ queryKey: QUERY_KEYS.tags, queryFn: () => Tag.list() });
  const { data: existingProduct } = useQuery({
    queryKey: QUERY_KEYS.product(productId),
    queryFn: () => Product.filter({ id: productId }),
    enabled: !!productId,
  });

  useEffect(() => {
    if (existingProduct?.[0]) {
      const p = existingProduct[0];
      setForm({
        product_id: p.product_id || "", name: p.name || "", sku: p.sku || "",
        price: p.price?.toString() || "", original_price: p.original_price?.toString() || "",
        stock: p.stock?.toString() || "0", express_delivery: p.express_delivery || false,
        category_id: p.category_id || "", condition: p.condition || "new",
        condition_checklist: p.condition_checklist || [],
        images: p.images || [], description: p.description || "",
        specs: p.specs || [], datasheet_url: p.datasheet_url || "",
        is_featured: p.is_featured || false, is_active: p.is_active !== false,
        tags: p.tags || [],
      });
    }
  }, [existingProduct]);

  const handleAIData = (data) => {
    setForm(prev => ({
      ...prev,
      product_id: data.product_id || prev.product_id,
      name: data.name || prev.name,
      sku: data.sku || prev.sku,
      price: data.price?.toString() || prev.price,
      original_price: data.original_price?.toString() || prev.original_price,
      category_id: data.category_id || prev.category_id,
      condition: data.condition || prev.condition,
      description: data.description || prev.description,
      specs: data.specs?.length ? data.specs : prev.specs,
      tags: data.tags?.length ? data.tags : prev.tags,
    }));
    setAiFilled(true);
    setTimeout(() => setAiFilled(false), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      stock: parseInt(form.stock) || 0,
    };
    if (isEditing) {
      await Product.update(productId, data);
    } else {
      await Product.create(data);
    }
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products });
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      goToProducts();
    }, 1000);
  };

  const addTag = () => { if (newTag && !form.tags.includes(newTag)) { setForm({ ...form, tags: [...form.tags, newTag] }); setNewTag(""); } };
  const removeTag = (tag) => setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  const addSpec = () => { if (newSpecLabel && newSpecValue) { setForm({ ...form, specs: [...form.specs, { label: newSpecLabel, value: newSpecValue }] }); setNewSpecLabel(""); setNewSpecValue(""); } };
  const removeSpec = (i) => setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) });
  const addImage = () => { if (newImageUrl) { setForm({ ...form, images: [...form.images, newImageUrl] }); setNewImageUrl(""); } };
  const removeImage = (i) => setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) });
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { file_url } = await uploadFile(file);
    setForm(prev => ({ ...prev, images: [...prev.images, file_url] }));
  };
  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-5 max-w-4xl pb-10">
      {/* Top actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToProducts}
          className="flex items-center gap-2 text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.8} /> Voltar
        </button>
        <button
          onClick={handleSave}
          disabled={saving || saved || !form.name || !form.product_id || !form.price || !form.category_id}
          className={`h-9 px-5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all disabled:opacity-40 ${
            saved ? "bg-emerald-500 text-white" : "bg-[#007aff] hover:bg-[#0071e3] text-white"
          }`}
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
           : saved ? <><Check className="w-4 h-4" /> Salvo!</>
           : <><Save className="w-4 h-4" strokeWidth={1.8} /> {isEditing ? "Salvar" : "Criar Produto"}</>}
        </button>
      </div>

      {/* AI Success feedback */}
      {aiFilled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-emerald-50 border border-emerald-200/60 rounded-2xl px-5 py-3 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-emerald-500/15 rounded-xl flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-emerald-800">Dados preenchidos automaticamente!</p>
            <p className="text-[11px] text-emerald-600">Revise as informações e ajuste o que precisar antes de salvar.</p>
          </div>
        </motion.div>
      )}

      {/* Smart Search (only for new products) */}
      {!isEditing && <SmartProductSearch onProductData={handleAIData} categories={categories} />}

      {/* Basic Info */}
      <FormSection title="Informações Básicas" subtitle="Dados principais do produto" icon={Info}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] text-[#86868b] font-medium">ID do Produto *</Label>
            <Input value={form.product_id} onChange={e => updateField("product_id", e.target.value)} placeholder="prod-1" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] text-[#86868b] font-medium">SKU</Label>
            <Input value={form.sku} onChange={e => updateField("sku", e.target.value)} placeholder="APL-IPH16PM-256" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#86868b] font-medium">Nome do Produto *</Label>
          <Input value={form.name} onChange={e => updateField("name", e.target.value)} placeholder="iPhone 16 Pro Max 256GB" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#86868b] font-medium">Descrição</Label>
          <Textarea value={form.description} onChange={e => updateField("description", e.target.value)} placeholder="Descrição comercial do produto..." className="rounded-2xl text-[13px] min-h-[90px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
        </div>
      </FormSection>

      {/* Pricing & Category - side by side */}
      <div className="grid lg:grid-cols-2 gap-5">
        <FormSection title="Preço e Estoque" icon={DollarSign}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Preço (R$) *</Label>
                <Input type="number" value={form.price} onChange={e => updateField("price", e.target.value)} placeholder="9499" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Preço Original</Label>
                <Input type="number" value={form.original_price} onChange={e => updateField("original_price", e.target.value)} placeholder="10499" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Estoque</Label>
              <Input type="number" value={form.stock} onChange={e => updateField("stock", e.target.value)} className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
            </div>
          </div>
        </FormSection>

        <FormSection title="Categoria e Condição" icon={Package}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Categoria *</Label>
              <Select value={form.category_id} onValueChange={v => updateField("category_id", v)}>
                <SelectTrigger className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat.id} value={cat.category_id}>{cat.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Condição</Label>
              <Select value={form.condition} onValueChange={v => updateField("condition", v)}>
                <SelectTrigger className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Novo / Lacrado</SelectItem>
                  <SelectItem value="used">Usado / Seminovo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FormSection>
      </div>

      {/* Condition Checklist - only for used */}
      {form.condition === "used" && (
        <FormSection title="Checklist de Condições" subtitle="Informe o estado de cada item do aparelho" icon={ClipboardCheck}>
          <ConditionChecklist
            checklist={form.condition_checklist}
            onChange={v => updateField("condition_checklist", v)}
          />
        </FormSection>
      )}

      {/* Images */}
      <FormSection title="Imagens" subtitle="Fotos do produto" icon={Image}>
        <div className="flex flex-wrap gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#f5f5f7] ring-1 ring-black/[0.04] group">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button onClick={() => removeImage(i)} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
          <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-black/[0.08] flex flex-col items-center justify-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/30 transition-all gap-1">
            <Upload className="w-5 h-5 text-[#86868b]" />
            <span className="text-[9px] text-[#86868b]">Upload</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        <div className="flex gap-2">
          <Input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="Ou cole a URL da imagem..." className="h-10 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
          <button onClick={addImage} disabled={!newImageUrl} className="h-10 px-4 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-2xl text-[12px] font-medium transition-colors disabled:opacity-40">
            Adicionar
          </button>
        </div>
      </FormSection>

      {/* Specs */}
      <FormSection title="Especificações Técnicas" subtitle={form.specs.length > 0 ? `${form.specs.length} especificações` : "Adicione as specs do produto"} icon={Cpu}>
        {form.specs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {form.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#f5f5f7] rounded-2xl px-4 py-2.5 group">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#86868b] font-medium">{spec.label}</p>
                  <p className="text-[13px] text-[#1d1d1f] font-medium truncate">{spec.value}</p>
                </div>
                <button onClick={() => removeSpec(i)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <X className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Input value={newSpecLabel} onChange={e => setNewSpecLabel(e.target.value)} placeholder="Label (ex: Chip)" className="h-10 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
          <Input value={newSpecValue} onChange={e => setNewSpecValue(e.target.value)} placeholder="Valor (ex: A18 Pro)" className="h-10 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white"
            onKeyDown={e => { if (e.key === "Enter") addSpec(); }}
          />
          <button onClick={addSpec} disabled={!newSpecLabel || !newSpecValue} className="h-10 w-10 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-2xl flex items-center justify-center transition-colors disabled:opacity-40 flex-shrink-0">
            <Plus className="w-4 h-4 text-[#1d1d1f]" />
          </button>
        </div>
      </FormSection>

      {/* Tags */}
      <FormSection title="Tags" icon={Tags}>
        <div className="flex flex-wrap gap-1.5">
          {form.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1.5 text-[12px] font-medium bg-[#f5f5f7] text-[#1d1d1f] px-3 py-1.5 rounded-full hover:bg-[#e8e8ed] transition-colors group cursor-default">
              {tag}
              <button onClick={() => removeTag(tag)} className="opacity-40 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Select value="" onValueChange={v => { if (!form.tags.includes(v)) updateField("tags", [...form.tags, v]); }}>
            <SelectTrigger className="h-10 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50"><SelectValue placeholder="Selecionar tag..." /></SelectTrigger>
            <SelectContent>
              {tags.filter(t => !form.tags.includes(t.slug)).map(t => <SelectItem key={t.id} value={t.slug}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Ou digite..." className="h-10 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" onKeyDown={e => { if (e.key === "Enter") addTag(); }} />
          <button onClick={addTag} disabled={!newTag} className="h-10 px-4 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-2xl text-[12px] font-medium transition-colors disabled:opacity-40 flex-shrink-0">Add</button>
        </div>
      </FormSection>

      {/* Toggles */}
      <FormSection title="Configurações" icon={Settings}>
        <div className="space-y-1">
          {[
            { key: "express_delivery", label: "Entrega Express", desc: "Disponível para entrega em 1h" },
            { key: "is_featured", label: "Produto em Destaque", desc: "Exibir na seção de destaques" },
            { key: "is_active", label: "Produto Ativo", desc: "Visível no catálogo" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-black/[0.03] last:border-0">
              <div>
                <p className="text-[13px] font-medium text-[#1d1d1f]">{item.label}</p>
                <p className="text-[11px] text-[#86868b]">{item.desc}</p>
              </div>
              <Switch checked={form[item.key]} onCheckedChange={v => updateField(item.key, v)} />
            </div>
          ))}
        </div>
      </FormSection>

      {/* Datasheet */}
      <FormSection title="Ficha Técnica" icon={FileText}>
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#86868b] font-medium">URL do PDF</Label>
          <Input value={form.datasheet_url} onChange={e => updateField("datasheet_url", e.target.value)} placeholder="https://..." className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
        </div>
      </FormSection>

      {/* Bottom actions */}
      <div className="flex items-center justify-between pt-2">
        <button onClick={goToProducts} className="text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors">
          ← Voltar para Produtos
        </button>
        <button
          onClick={handleSave}
          disabled={saving || saved || !form.name || !form.product_id || !form.price || !form.category_id}
          className={`h-11 px-6 rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all shadow-sm disabled:opacity-40 ${
            saved ? "bg-emerald-500 text-white" : "bg-[#0071e3] hover:bg-[#0077ED] text-white"
          }`}
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
           : saved ? <><Check className="w-4 h-4" /> Salvo!</>
           : <><Save className="w-4 h-4" strokeWidth={2.2} /> {isEditing ? "Salvar" : "Criar Produto"}</>}
        </button>
      </div>
    </div>
  );
}