import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Save, Loader2, Tags as TagsIcon, Hash } from "lucide-react";
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

const PRESET_COLORS = [
  "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444",
  "#EC4899", "#06B6D4", "#6366F1", "#14B8A6", "#F97316",
];

export default function Tags() {
  const [editDialog, setEditDialog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ name: "", slug: "", color: "#10B981", is_active: true });
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: () => base44.entities.Tag.list(),
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Tag.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tags'] }); setDeleteTarget(null); },
  });

  const openNew = () => {
    setForm({ name: "", slug: "", color: "#10B981", is_active: true });
    setEditDialog('new');
  };

  const openEdit = (tag) => {
    setForm({ name: tag.name || "", slug: tag.slug || "", color: tag.color || "#10B981", is_active: tag.is_active !== false });
    setEditDialog(tag);
  };

  const handleSave = async () => {
    setSaving(true);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const data = { ...form, slug };
    if (editDialog === 'new') {
      await base44.entities.Tag.create(data);
    } else {
      await base44.entities.Tag.update(editDialog.id, data);
    }
    queryClient.invalidateQueries({ queryKey: ['tags'] });
    setSaving(false);
    setEditDialog(null);
  };

  const getUsageCount = (slug) => products.filter(p => p.tags?.includes(slug)).length;

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-end">
        <button onClick={openNew} className="h-9 px-4 bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" strokeWidth={2} /> Nova Tag
        </button>
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-3">
        <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#f5f5f7] rounded-xl flex items-center justify-center">
            <TagsIcon className="w-4 h-4 text-[#86868b]" />
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#1d1d1f]">{tags.length}</p>
            <p className="text-[10px] text-[#86868b] -mt-0.5">tags criadas</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#f5f5f7] rounded-xl flex items-center justify-center">
            <Hash className="w-4 h-4 text-[#86868b]" />
          </div>
          <div>
            <p className="text-[18px] font-bold text-[#1d1d1f]">{tags.filter(t => t.is_active !== false).length}</p>
            <p className="text-[10px] text-[#86868b] -mt-0.5">ativas</p>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <AnimatePresence>
          {tags.map((tag, i) => {
            const count = getUsageCount(tag.slug);
            const color = tag.color || '#6e6e73';
            return (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="group bg-white rounded-3xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Color accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: color }} />

                <div className="flex items-start justify-between mb-4 mt-1">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color }} />
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(tag)} className="w-7 h-7 rounded-lg bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center transition-colors">
                      <Pencil className="w-3 h-3 text-[#86868b]" />
                    </button>
                    <button onClick={() => setDeleteTarget(tag)} className="w-7 h-7 rounded-lg bg-[#f5f5f7] hover:bg-red-50 flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3 text-[#86868b]" />
                    </button>
                  </div>
                </div>

                <h3 className="text-[14px] font-semibold text-[#1d1d1f]">{tag.name}</h3>
                <p className="text-[11px] text-[#86868b] mt-0.5 font-mono">{tag.slug}</p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/[0.03]">
                  <span className="text-[11px] text-[#86868b]">{count} {count === 1 ? "produto" : "produtos"}</span>
                  {tag.is_active === false && (
                    <span className="text-[9px] font-medium text-[#86868b] bg-[#f5f5f7] px-1.5 py-0.5 rounded-full">Inativa</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {tags.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl border border-black/[0.04] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] py-16 text-center">
            <TagsIcon className="w-10 h-10 text-[#d2d2d7] mx-auto mb-3" />
            <p className="text-[15px] font-medium text-[#1d1d1f]">Nenhuma tag</p>
            <p className="text-[13px] text-[#86868b] mt-1">Crie tags para classificar seus produtos</p>
          </div>
        )}
      </motion.div>

      {/* Edit/Create Dialog */}
      <Dialog open={editDialog !== null} onOpenChange={() => setEditDialog(null)}>
        <DialogContent className="sm:max-w-sm rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1d1d1f]">{editDialog === 'new' ? 'Nova Tag' : 'Editar Tag'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Nome *</Label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Express" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Slug</Label>
              <Input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="express" className="h-11 rounded-2xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white font-mono" />
              <p className="text-[10px] text-[#b0b0b5]">Gerado automaticamente se vazio</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] text-[#86868b] font-medium">Cor</Label>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setForm({...form, color})}
                    className={`w-8 h-8 rounded-xl transition-all ${form.color === color ? 'ring-2 ring-offset-2 ring-[#0071e3] scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <label className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-400 via-green-400 to-blue-400 cursor-pointer relative overflow-hidden hover:scale-105 transition-transform">
                  <input
                    type="color" value={form.color}
                    onChange={e => setForm({...form, color: e.target.value})}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-black/[0.03]">
              <div>
                <p className="text-[13px] font-medium text-[#1d1d1f]">Tag Ativa</p>
                <p className="text-[11px] text-[#86868b]">Visível nos filtros</p>
              </div>
              <Switch checked={form.is_active} onCheckedChange={v => setForm({...form, is_active: v})} />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setEditDialog(null)} className="h-10 px-5 text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={saving || !form.name} className="h-10 px-6 bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full text-[13px] font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-40">
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
            <AlertDialogTitle className="text-[#1d1d1f]">Excluir Tag</AlertDialogTitle>
            <AlertDialogDescription className="text-[#86868b]">
              Tem certeza que deseja excluir a tag "{deleteTarget?.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 rounded-full" onClick={() => deleteMutation.mutate(deleteTarget.id)}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}