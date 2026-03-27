import React, { useState, useEffect } from "react";
import { useCreateProduct, useUpdateProduct } from "@/api/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Save, Loader2, Check,
  Info, DollarSign, Image, Cpu, Tags, Settings, FileText,
  Package, Zap, Star, Eye, Trash2
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
import ProductFormImages from "./ProductFormImages";
import ProductFormSpecs from "./ProductFormSpecs";
import ProductFormTags from "./ProductFormTags";

const emptyForm = {
  product_id: "", name: "", sku: "", price: "", original_price: "",
  stock: "0", express_delivery: false, category_id: "", condition: "NOVO",
  images: [], description: "", specs: [], datasheet_url: "",
  is_featured: false, is_active: true, tags: [],
};

const inputClass = "h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] transition-colors";

export default function ProductFormModal({ open, onOpenChange, editProduct, categories = [], tags = [], onDelete }) {
  const isEditing = !!editProduct;

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiFilled, setAiFilled] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  useEffect(() => {
    if (open) {
      if (editProduct) {
        setForm({
          product_id: editProduct.product_id || "", name: editProduct.name || "", sku: editProduct.sku || "",
          price: editProduct.price?.toString() || "", original_price: editProduct.original_price?.toString() || "",
          stock: editProduct.stock?.toString() || "0", express_delivery: editProduct.express_delivery || false,
          category_id: editProduct.category_id || "", condition: editProduct.condition || "NOVO",
          images: editProduct.images || [], description: editProduct.description || "",
          specs: editProduct.specs || [], datasheet_url: editProduct.datasheet_url || "",
          is_featured: editProduct.is_featured || editProduct.featured || false, is_active: editProduct.is_active !== false,
          tags: editProduct.tags || [],
        });
      } else {
        setForm(emptyForm);
      }
      setSaved(false); setSaving(false); setAiFilled(false); setConfirmDelete(false);
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

  const buildApiBody = () => {
    const body = {};
    body.nome = form.name;
    if (form.sku) body.sku = form.sku;
    body.preco = parseFloat(form.price) || 0;
    body.precoOriginal = form.original_price ? parseFloat(form.original_price) : null;
    body.estoque = parseInt(form.stock) || 0;
    body.entregaExpressa = form.express_delivery;
    body.condicao = form.condition;
    body.descricao = form.description;
    body.destaque = form.is_featured;
    body.ativo = form.is_active;
    if (form.category_id) body.categoriaId = Number(form.category_id);
    if (form.datasheet_url) body.fichaTecnicaUrl = form.datasheet_url;
    if (form.images?.length) {
      body.imagens = form.images.map((img, i) => ({
        imagemUrl: typeof img === 'string' ? img : img.imagemUrl || img.url,
        ordemExibicao: i,
      }));
    }
    if (form.specs?.length) {
      body.especificacoes = form.specs.map((s, i) => ({ rotulo: s.label, valor: s.value, ordemExibicao: i }));
    }
    if (form.tags?.length) {
      body.etiquetaIds = form.tags.map(Number).filter(n => !isNaN(n));
    }
    return body;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const apiBody = buildApiBody();
      if (isEditing) {
        await updateMutation.mutateAsync({ id: editProduct.id, data: apiBody });
      } else {
        await createMutation.mutateAsync(apiBody);
      }
      setSaving(false);
      setSaved(true);
      setTimeout(() => { onOpenChange(false); }, 800);
    } catch (err) {
      setSaving(false);
      console.error('Error saving product:', err);
    }
  };

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const canSave = form.name && form.price && form.category_id && (isEditing || form.product_id);

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
              {isEditing && <p className="text-[10px] text-[#86868b] dark:text-[#98989d] leading-tight">{editProduct.product_id}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onOpenChange(false)} className="w-8 h-8 rounded-lg hover:bg-[#f5f5f7] dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-[#86868b] dark:text-[#98989d]" />
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved || !canSave}
              className={`h-8 px-4 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40 ${
                saved ? "bg-emerald-500 text-white" : "bg-[#007aff] dark:bg-[#0a84ff] hover:bg-[#0071e3] dark:hover:bg-[#409cff] text-white shadow-sm"
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
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 dark:bg-emerald-500/[0.1] border border-emerald-100 dark:border-emerald-500/[0.2] rounded-xl px-4 py-3 flex items-center gap-3 overflow-hidden"
                >
                  <div className="w-6 h-6 bg-emerald-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-[12px] font-medium text-emerald-700 dark:text-emerald-400">Dados preenchidos automaticamente pela IA</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isEditing && <SmartProductSearch onProductData={handleAIData} categories={categories} />}

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

            {/* Price + Category */}
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
                  <Select value={String(form.category_id || "")} onValueChange={v => updateField("category_id", v)}>
                    <SelectTrigger className={inputClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent className="dark:bg-[#2c2c2e] dark:border-white/[0.08]">
                      {categories.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Condição">
                  <Select value={form.condition} onValueChange={v => updateField("condition", v)}>
                    <SelectTrigger className={inputClass}><SelectValue /></SelectTrigger>
                    <SelectContent className="dark:bg-[#2c2c2e] dark:border-white/[0.08]">
                      <SelectItem value="NOVO">Novo / Lacrado</SelectItem>
                      <SelectItem value="USADO">Usado / Seminovo</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </FormSection>
            </div>

            {/* Images */}
            <FormSection title="Imagens" icon={Image} accent="#ff9500">
              <ProductFormImages images={form.images} onChange={(imgs) => updateField("images", imgs)} inputClass={inputClass} />
            </FormSection>

            {/* Specs */}
            <FormSection title="Especificações" icon={Cpu} accent="#5856d6">
              <ProductFormSpecs specs={form.specs} onChange={(specs) => updateField("specs", specs)} />
            </FormSection>

            {/* Tags */}
            <FormSection title="Tags" icon={Tags} accent="#ff2d55">
              <ProductFormTags selectedTags={form.tags} availableTags={tags} onChange={(t) => updateField("tags", t)} />
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

            {/* Delete */}
            {isEditing && onDelete && (
              <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                {!confirmDelete ? (
                  <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-2 text-[12px] font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Excluir produto
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/[0.1] border border-red-100 dark:border-red-500/[0.2] rounded-xl px-4 py-3">
                    <p className="text-[12px] text-red-600 dark:text-red-400 flex-1">Tem certeza? Esta ação não pode ser desfeita.</p>
                    <button onClick={() => setConfirmDelete(false)} className="h-7 px-3 rounded-lg text-[11px] font-semibold bg-white dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#f5f5f7] dark:hover:bg-[#3a3a3c] transition-colors">
                      Cancelar
                    </button>
                    <button onClick={() => { onDelete(editProduct); onOpenChange(false); }} className="h-7 px-3 rounded-lg text-[11px] font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors">
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            )}

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
