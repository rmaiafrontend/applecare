import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "@/api/dataService";
import { uploadFile } from "@/lib/fileUpload";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Upload, Save, Loader2, Check,
  Info, DollarSign, Image, Cpu, Tags, Settings, FileText,
  Package, Zap, Star, Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SmartProductSearch from "./SmartProductSearch";
import FormSection from "./FormSection";
import { QUERY_KEYS } from '@/lib/constants';

const emptyForm = {
  product_id: "", name: "", sku: "", price: "", original_price: "",
  stock: "0", express_delivery: false, category_id: "", condition: "new",
  images: [], description: "", specs: [], datasheet_url: "",
  is_featured: false, is_active: true, tags: [],
};

const inputClass = "h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] transition-colors";

export default function ProductFormModal({ open, onOpenChange, editProduct, categories = [], tags = [] }) {
  const queryClient = useQueryClient();
  const isEditing = !!editProduct;

  const [form, setForm] = useState(emptyForm);
  const [newTag, setNewTag] = useState("");
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiFilled, setAiFilled] = useState(false);

  useEffect(() => {
    if (open) {
      if (editProduct) {
        setForm({
          product_id: editProduct.product_id || "", name: editProduct.name || "", sku: editProduct.sku || "",
          price: editProduct.price?.toString() || "", original_price: editProduct.original_price?.toString() || "",
          stock: editProduct.stock?.toString() || "0", express_delivery: editProduct.express_delivery || false,
          category_id: editProduct.category_id || "", condition: editProduct.condition || "new",
          images: editProduct.images || [], description: editProduct.description || "",
          specs: editProduct.specs || [], datasheet_url: editProduct.datasheet_url || "",
          is_featured: editProduct.is_featured || false, is_active: editProduct.is_active !== false,
          tags: editProduct.tags || [],
        });
      } else {
        setForm(emptyForm);
      }
      setSaved(false);
      setSaving(false);
      setAiFilled(false);
      setNewTag("");
      setNewSpecLabel("");
      setNewSpecValue("");
      setNewImageUrl("");
    }
  }, [open, editProduct]);

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
      await Product.update(editProduct.id, data);
    } else {
      await Product.create(data);
    }
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products });
    setSaving(false);
    setSaved(true);
    setTimeout(() => { onOpenChange(false); }, 800);
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

  const canSave = form.name && form.product_id && form.price && form.category_id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[680px] p-0 gap-0 rounded-2xl overflow-hidden max-h-[92vh] border-black/[0.06] dark:border-white/[0.08] dark:bg-[#2c2c2e]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-black/[0.05] dark:border-white/[0.06] bg-white dark:bg-[#2c2c2e] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isEditing ? "bg-blue-50 dark:bg-blue-500/[0.12]" : "bg-emerald-50 dark:bg-emerald-500/[0.12]"}`}>
              <Package className={`w-4 h-4 ${isEditing ? "text-blue-500 dark:text-blue-400" : "text-emerald-500 dark:text-emerald-400"}`} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                {isEditing ? "Editar Produto" : "Novo Produto"}
              </h2>
              {isEditing && (
                <p className="text-[10px] text-[#86868b] dark:text-[#98989d] leading-tight">{editProduct.product_id}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-lg hover:bg-[#f5f5f7] dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-[#86868b] dark:text-[#98989d]" />
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved || !canSave}
              className={`h-8 px-4 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40 ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1d1d1f] dark:bg-[#0a84ff] hover:bg-black dark:hover:bg-[#409cff] text-white shadow-sm"
              }`}
            >
              {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Salvando</>
               : saved ? <><Check className="w-3.5 h-3.5" /> Salvo!</>
               : <><Save className="w-3.5 h-3.5" strokeWidth={2} /> {isEditing ? "Salvar" : "Criar"}</>}
            </button>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(92vh-56px)]">
          <div className="p-6 space-y-6">
            {/* AI Success */}
            <AnimatePresence>
              {aiFilled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 dark:bg-emerald-500/[0.1] border border-emerald-100 dark:border-emerald-500/[0.2] rounded-xl px-4 py-3 flex items-center gap-3 overflow-hidden"
                >
                  <div className="w-6 h-6 bg-emerald-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-[12px] font-medium text-emerald-700 dark:text-emerald-400">Dados preenchidos automaticamente pela IA</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smart Search */}
            {!isEditing && <SmartProductSearch onProductData={handleAIData} categories={categories} />}

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-black/[0.04] dark:bg-white/[0.06]" />
              <span className="text-[10px] font-semibold text-[#b0b0b5] dark:text-[#636366] uppercase tracking-widest">Dados do produto</span>
              <div className="h-px flex-1 bg-black/[0.04] dark:bg-white/[0.06]" />
            </div>

            {/* Basic Info */}
            <FormSection title="Informações" icon={Info} accent="#007aff">
              <div className="grid grid-cols-2 gap-3">
                <FieldGroup label="ID do Produto *">
                  <Input value={form.product_id} onChange={e => updateField("product_id", e.target.value)} placeholder="prod-1" className={inputClass} />
                </FieldGroup>
                <FieldGroup label="SKU">
                  <Input value={form.sku} onChange={e => updateField("sku", e.target.value)} placeholder="APL-IPH16PM-256" className={inputClass} />
                </FieldGroup>
              </div>
              <FieldGroup label="Nome do Produto *">
                <Input value={form.name} onChange={e => updateField("name", e.target.value)} placeholder="iPhone 16 Pro Max 256GB" className={inputClass} />
              </FieldGroup>
              <FieldGroup label="Descrição">
                <Textarea value={form.description} onChange={e => updateField("description", e.target.value)} placeholder="Descrição comercial do produto..." className="rounded-xl text-[13px] min-h-[80px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] transition-colors resize-none" />
              </FieldGroup>
            </FormSection>

            {/* Price + Category row */}
            <div className="grid grid-cols-2 gap-5">
              <FormSection title="Preço e Estoque" icon={DollarSign} accent="#34c759">
                <div className="grid grid-cols-2 gap-2.5">
                  <FieldGroup label="Preço (R$) *">
                    <Input type="number" value={form.price} onChange={e => updateField("price", e.target.value)} placeholder="9.499" className={inputClass} />
                  </FieldGroup>
                  <FieldGroup label="Preço Original">
                    <Input type="number" value={form.original_price} onChange={e => updateField("original_price", e.target.value)} placeholder="10.499" className={inputClass} />
                  </FieldGroup>
                </div>
                <FieldGroup label="Estoque">
                  <Input type="number" value={form.stock} onChange={e => updateField("stock", e.target.value)} className={inputClass} />
                </FieldGroup>
              </FormSection>

              <FormSection title="Classificação" icon={Package} accent="#af52de">
                <FieldGroup label="Categoria *">
                  <Select value={form.category_id} onValueChange={v => updateField("category_id", v)}>
                    <SelectTrigger className={inputClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent className="dark:bg-[#2c2c2e] dark:border-white/[0.08]">
                      {categories.map(cat => <SelectItem key={cat.id} value={cat.category_id}>{cat.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Condição">
                  <Select value={form.condition} onValueChange={v => updateField("condition", v)}>
                    <SelectTrigger className={inputClass}><SelectValue /></SelectTrigger>
                    <SelectContent className="dark:bg-[#2c2c2e] dark:border-white/[0.08]">
                      <SelectItem value="new">Novo / Lacrado</SelectItem>
                      <SelectItem value="used">Usado / Seminovo</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </FormSection>
            </div>

            {/* Images */}
            <FormSection title="Imagens" icon={Image} accent="#ff9500">
              <div className="flex flex-wrap gap-2.5">
                {form.images.map((img, i) => (
                  <div key={i} className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#f5f5f7] dark:bg-[#3a3a3c] ring-1 ring-black/[0.06] dark:ring-white/[0.06] group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <X className="w-4 h-4 text-white" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 text-[8px] font-bold bg-white/90 dark:bg-[#2c2c2e]/90 text-[#1d1d1f] dark:text-[#f5f5f7] px-1.5 py-0.5 rounded">Principal</span>
                    )}
                  </div>
                ))}
                <label className="w-[72px] h-[72px] rounded-xl border-2 border-dashed border-black/[0.08] dark:border-white/[0.1] flex flex-col items-center justify-center cursor-pointer hover:border-[#007aff]/40 dark:hover:border-[#0a84ff]/40 hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.06] transition-all gap-1">
                  <Upload className="w-4 h-4 text-[#b0b0b5] dark:text-[#636366]" strokeWidth={1.8} />
                  <span className="text-[9px] text-[#b0b0b5] dark:text-[#636366] font-medium">Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              <div className="flex gap-2">
                <Input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="Ou cole a URL da imagem..." className="h-9 rounded-xl text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
                <button onClick={addImage} disabled={!newImageUrl} className="h-9 px-3.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-30">
                  Adicionar
                </button>
              </div>
            </FormSection>

            {/* Specs */}
            <FormSection title="Especificações" icon={Cpu} accent="#5856d6">
              {form.specs.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {form.specs.map((spec, i) => (
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
                <Input value={newSpecLabel} onChange={e => setNewSpecLabel(e.target.value)} placeholder="Label (ex: Tela)" className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
                <Input value={newSpecValue} onChange={e => setNewSpecValue(e.target.value)} placeholder="Valor (ex: 6.7 polegadas)" className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]"
                  onKeyDown={e => { if (e.key === "Enter") addSpec(); }}
                />
                <button onClick={addSpec} disabled={!newSpecLabel || !newSpecValue} className="h-9 w-9 bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 flex-shrink-0 border border-black/[0.04] dark:border-white/[0.06]">
                  <Plus className="w-3.5 h-3.5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                </button>
              </div>
            </FormSection>

            {/* Tags */}
            <FormSection title="Tags" icon={Tags} accent="#ff2d55">
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tags.map(tag => (
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
                <Select value="" onValueChange={v => { if (!form.tags.includes(v)) updateField("tags", [...form.tags, v]); }}>
                  <SelectTrigger className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7]"><SelectValue placeholder="Selecionar tag..." /></SelectTrigger>
                  <SelectContent className="dark:bg-[#2c2c2e] dark:border-white/[0.08]">
                    {tags.filter(t => !form.tags.includes(t.slug)).map(t => <SelectItem key={t.id} value={t.slug}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Ou digite..." className="h-9 rounded-lg text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" onKeyDown={e => { if (e.key === "Enter") addTag(); }} />
                <button onClick={addTag} disabled={!newTag} className="h-9 px-3.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-30 flex-shrink-0">
                  Add
                </button>
              </div>
            </FormSection>

            {/* Toggles */}
            <FormSection title="Configurações" icon={Settings} accent="#636366">
              <div className="bg-[#fafafa] dark:bg-[#1c1c1e] rounded-xl border border-black/[0.04] dark:border-white/[0.06] divide-y divide-black/[0.04] dark:divide-white/[0.06] overflow-hidden">
                {[
                  { key: "express_delivery", label: "Entrega Express", desc: "Disponível para entrega em 1h", icon: Zap, color: "text-violet-500 dark:text-violet-400" },
                  { key: "is_featured", label: "Produto em Destaque", desc: "Exibir na seção de destaques", icon: Star, color: "text-amber-500 dark:text-amber-400" },
                  { key: "is_active", label: "Produto Ativo", desc: "Visível no catálogo público", icon: Eye, color: "text-emerald-500 dark:text-emerald-400" },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} strokeWidth={1.8} />
                      <div>
                        <p className="text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{item.label}</p>
                        <p className="text-[10px] text-[#86868b] dark:text-[#98989d]">{item.desc}</p>
                      </div>
                    </div>
                    <Switch checked={form[item.key]} onCheckedChange={v => updateField(item.key, v)} />
                  </div>
                ))}
              </div>
            </FormSection>

            {/* Datasheet */}
            <FormSection title="Ficha Técnica" icon={FileText} accent="#86868b">
              <FieldGroup label="URL do PDF">
                <Input value={form.datasheet_url} onChange={e => updateField("datasheet_url", e.target.value)} placeholder="https://exemplo.com/ficha.pdf" className={inputClass} />
              </FieldGroup>
            </FormSection>

            {/* Bottom spacer */}
            <div className="h-2" />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">{label}</Label>
      {children}
    </div>
  );
}
