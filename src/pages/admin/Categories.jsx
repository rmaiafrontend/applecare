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

export default function Categories() {
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
    } catch (err) {
      console.error('Error saving category:', err);
    }
    setSaving(false);
    setEditDialog(null);
  };

  const getProductCount = (catId) => products.filter(p => p.category_id === catId).length;

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-end">
        <button onClick={openNew} className="h-9 px-4 bg-[#007aff] hover:bg-[#0071e3] text-white rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" strokeWidth={2} /> Nova Categoria
        </button>
      </div>

      {/* Stats bar */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-3">
        <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#f5f5f7] rounded-xl flex items-center justify-center">
            <Grid3X3 className="w-4 h-4 text-[#86868b]" />
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#1d1d1f]">{categories.length}</p>
            <p className="text-[10px] text-[#86868b] -mt-0.5">categorias</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#f5f5f7] rounded-xl flex items-center justify-center">
            <Package className="w-4 h-4 text-[#86868b]" />
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#1d1d1f]">{products.length}</p>
            <p className="text-[10px] text-[#86868b] -mt-0.5">produtos</p>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence>
          {categories.map((cat, i) => {
            const count = getProductCount(cat.category_id);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group bg-white rounded-3xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Background glow */}
                {cat.has_promotion && (
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/8 rounded-full blur-2xl" />
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-[#f5f5f7] rounded-2xl flex items-center justify-center text-2xl">
                    {ICON_MAP[cat.icon] || "📦"}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(cat)} className="w-8 h-8 rounded-xl bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-[#86868b]" />
                    </button>
                    <button onClick={() => setDeleteTarget(cat)} className="w-8 h-8 rounded-xl bg-[#f5f5f7] hover:bg-red-50 flex items-center justify-center transition-colors">
                      <Trash2 className="w-3.5 h-3.5 text-[#86868b] hover:text-red-500" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-[#1d1d1f]">{cat.name}</h3>
                    {cat.is_active === false && (
                      <span className="text-[10px] font-medium text-[#86868b] bg-[#f5f5f7] px-2 py-0.5 rounded-full">Inativa</span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#86868b] mt-1">{cat.category_id}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.03]">
                  <span className="text-[12px] text-[#86868b]">{count} {count === 1 ? "produto" : "produtos"}</span>
                  <div className="flex items-center gap-1.5">
                    {cat.has_promotion && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2.5 h-2.5" /> Promoção
                      </span>
                    )}
                    <span className="text-[10px] text-[#b0b0b5]">#{cat.display_order}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {categories.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] py-16 text-center">
            <Grid3X3 className="w-10 h-10 text-[#d2d2d7] mx-auto mb-3" />
            <p className="text-[15px] font-medium text-[#1d1d1f]">Nenhuma categoria</p>
            <p className="text-[13px] text-[#86868b] mt-1">Crie sua primeira categoria para organizar os produtos</p>
          </div>
        )}
      </motion.div>

      {/* Edit/Create Dialog */}
      <Dialog open={editDialog !== null} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1d1d1f]">{editDialog === 'new' ? 'Nova Categoria' : 'Editar Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">ID *</Label>
                <Input value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} placeholder="cat-1" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Nome *</Label>
                <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="iPhone" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Ícone</Label>
                <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full h-11 px-3 rounded-2xl border border-black/[0.06] text-[13px] bg-[#f5f5f7]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-all">
                  {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{ICON_MAP[icon]} {icon}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Ordem</Label>
                <Input type="number" value={form.display_order} onChange={e => setForm({...form, display_order: parseInt(e.target.value) || 0})} className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">URL da Imagem</Label>
              <Input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
            </div>
            <div className="space-y-1 pt-2">
              {[
                { key: "is_active", label: "Categoria Ativa", desc: "Visível no catálogo" },
                { key: "has_promotion", label: "Promoção Ativa", desc: "Badge de promoção" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-black/[0.03] last:border-0">
                  <div>
                    <p className="text-[13px] font-medium text-[#1d1d1f]">{item.label}</p>
                    <p className="text-[11px] text-[#86868b]">{item.desc}</p>
                  </div>
                  <Switch checked={form[item.key]} onCheckedChange={v => setForm({...form, [item.key]: v})} />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setEditDialog(null)} className="h-10 px-5 text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={saving || !form.name || !form.category_id} className="h-10 px-6 bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full text-[13px] font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-40">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Salvar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1d1d1f]">Excluir Categoria</AlertDialogTitle>
            <AlertDialogDescription className="text-[#86868b]">
              Tem certeza que deseja excluir "{deleteTarget?.name}"? Os produtos desta categoria não serão excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 rounded-full" onClick={() => { deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null); }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
