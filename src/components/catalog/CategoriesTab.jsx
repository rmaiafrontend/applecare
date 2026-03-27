import React, { useState, useMemo } from "react";
import {
  useAdminCategories, useAdminProducts,
  useCreateCategory, useUpdateCategory, useDeactivateCategory,
} from "@/api/hooks";
import { mapCategoryFromApi, mapProductFromApi } from "@/api/adapters";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Save, Loader2, Grid3X3, Package, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

const ICON_MAP = {
  Smartphone: "📱", Laptop: "💻", Tablet: "📟", Watch: "⌚",
  Headphones: "🎧", Monitor: "🖥️", Cable: "🔌", Cpu: "🧠",
  Battery: "🔋", Wifi: "📡", Bluetooth: "🔵", Camera: "📷",
  Mic: "🎙️", Speaker: "🔊",
};
const ICON_OPTIONS = Object.keys(ICON_MAP);

export default function CategoriesTab() {
  const [editDialog, setEditDialog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ category_id: "", name: "", icon: "Smartphone", has_promotion: false, display_order: 0, is_active: true, image_url: "" });
  const [saving, setSaving] = useState(false);

  const { data: categoriesData } = useAdminCategories();
  const { data: productsData } = useAdminProducts({ tamanho: 200 });

  const categories = useMemo(
    () => (categoriesData || []).map(mapCategoryFromApi),
    [categoriesData]
  );
  const products = useMemo(
    () => (productsData?.conteudo || []).map(mapProductFromApi),
    [productsData]
  );

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeactivateCategory();

  const openNew = () => {
    setForm({ category_id: "", name: "", icon: "Smartphone", has_promotion: false, display_order: categories.length, is_active: true, image_url: "" });
    setEditDialog('new');
  };

  const openEdit = (cat) => {
    setForm({
      category_id: cat.category_id || "", name: cat.name || "", icon: cat.icon || "Smartphone",
      has_promotion: cat.has_promotion || false, display_order: cat.display_order || 0,
      is_active: cat.is_active !== false, image_url: cat.image_url || "",
    });
    setEditDialog(cat);
  };

  const handleSave = async () => {
    setSaving(true);
    const apiData = {
      nome: form.name,
      icone: form.icon,
      imagemUrl: form.image_url,
      ordemExibicao: Number(form.display_order),
      temPromocao: form.has_promotion,
      ativo: form.is_active,
    };
    try {
      if (editDialog === 'new') {
        await createMutation.mutateAsync(apiData);
      } else {
        await updateMutation.mutateAsync({ id: editDialog.id, data: apiData });
      }
      setEditDialog(null);
    } catch (err) {
      console.error('Error saving category:', err);
    }
    setSaving(false);
  };

  const getProductCount = (catId) => products.filter(p => p.category_id === catId).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.25)] px-4 py-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-xl flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-[#86868b] dark:text-[#98989d]" />
            </div>
            <div>
              <p className="text-[18px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{categories.length}</p>
              <p className="text-[10px] text-[#86868b] dark:text-[#98989d] -mt-0.5">categorias</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.25)] px-4 py-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-xl flex items-center justify-center">
              <Package className="w-4 h-4 text-[#86868b] dark:text-[#98989d]" />
            </div>
            <div>
              <p className="text-[18px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{products.length}</p>
              <p className="text-[10px] text-[#86868b] dark:text-[#98989d] -mt-0.5">produtos</p>
            </div>
          </div>
        </div>
        <button onClick={openNew} className="h-9 px-4 bg-[#007aff] dark:bg-[#0a84ff] hover:bg-[#0071e3] dark:hover:bg-[#409cff] text-white rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" strokeWidth={2} /> Nova Categoria
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence>
          {categories.map((cat, i) => {
            const count = getProductCount(cat.category_id);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group bg-white dark:bg-[#2c2c2e] rounded-3xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.25)] p-5 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
              >
                {cat.has_promotion && (
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/8 rounded-full blur-2xl" />
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-2xl flex items-center justify-center text-2xl">
                    {ICON_MAP[cat.icon] || "📦"}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(cat)} className="w-8 h-8 rounded-xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-[#e8e8ed] dark:hover:bg-[#48484a] flex items-center justify-center transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d]" />
                    </button>
                    <button onClick={() => setDeleteTarget(cat)} className="w-8 h-8 rounded-xl bg-[#f5f5f7] dark:bg-[#3a3a3c] hover:bg-red-50 dark:hover:bg-red-500/[0.15] flex items-center justify-center transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d] hover:text-red-500 dark:hover:text-red-400" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{cat.name}</h3>
                    {cat.is_active === false && (
                      <span className="text-[10px] font-medium text-[#86868b] dark:text-[#98989d] bg-[#f5f5f7] dark:bg-[#3a3a3c] px-2 py-0.5 rounded-full">Inativa</span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#86868b] dark:text-[#636366] mt-1">{cat.category_id}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.03] dark:border-white/[0.04]">
                  <span className="text-[12px] text-[#86868b] dark:text-[#98989d]">{count} {count === 1 ? "produto" : "produtos"}</span>
                  <div className="flex items-center gap-1.5">
                    {cat.has_promotion && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/[0.12] px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2.5 h-2.5" /> Promoção
                      </span>
                    )}
                    <span className="text-[10px] text-[#b0b0b5] dark:text-[#636366]">#{cat.display_order}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {categories.length === 0 && (
          <div className="col-span-full bg-white dark:bg-[#2c2c2e] rounded-3xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.25)] py-16 text-center">
            <Grid3X3 className="w-10 h-10 text-[#d2d2d7] dark:text-[#48484a] mx-auto mb-3" />
            <p className="text-[15px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Nenhuma categoria</p>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-1">Crie sua primeira categoria para organizar os produtos</p>
          </div>
        )}
      </motion.div>

      {/* Edit/Create Dialog */}
      <Dialog open={editDialog !== null} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl dark:bg-[#2c2c2e] dark:border-white/[0.08]">
          <DialogHeader>
            <DialogTitle className="text-[#1d1d1f] dark:text-[#f5f5f7]">{editDialog === 'new' ? 'Nova Categoria' : 'Editar Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Nome *</Label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="iPhone" className="h-11 rounded-2xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Ícone</Label>
                <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full h-11 px-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] text-[13px] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 dark:focus:ring-[#0a84ff]/30 transition-all">
                  {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{ICON_MAP[icon]} {icon}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Ordem</Label>
                <Input type="number" value={form.display_order} onChange={e => setForm({...form, display_order: parseInt(e.target.value) || 0})} className="h-11 rounded-2xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">URL da Imagem</Label>
              <Input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." className="h-11 rounded-2xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
            </div>
            <div className="space-y-1 pt-2">
              {[
                { key: "is_active", label: "Categoria Ativa", desc: "Visível no catálogo" },
                { key: "has_promotion", label: "Promoção Ativa", desc: "Badge de promoção" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-black/[0.03] dark:border-white/[0.04] last:border-0">
                  <div>
                    <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{item.label}</p>
                    <p className="text-[11px] text-[#86868b] dark:text-[#98989d]">{item.desc}</p>
                  </div>
                  <Switch checked={form[item.key]} onCheckedChange={v => setForm({...form, [item.key]: v})} />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setEditDialog(null)} className="h-10 px-5 text-[13px] font-medium text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={saving || !form.name} className="h-10 px-6 bg-[#0071e3] hover:bg-[#0077ED] dark:bg-[#0a84ff] dark:hover:bg-[#409cff] text-white rounded-full text-[13px] font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-40">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Salvar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-3xl dark:bg-[#2c2c2e] dark:border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1d1d1f] dark:text-[#f5f5f7]">Excluir Categoria</AlertDialogTitle>
            <AlertDialogDescription className="text-[#86868b] dark:text-[#98989d]">
              Tem certeza que deseja excluir "{deleteTarget?.name}"? Os produtos desta categoria não serão excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full dark:bg-[#3a3a3c] dark:text-[#f5f5f7] dark:border-white/[0.06] dark:hover:bg-[#48484a]">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 rounded-full" onClick={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
