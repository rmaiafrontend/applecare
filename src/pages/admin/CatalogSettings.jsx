import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Settings2, Layers } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import SectionCard from "@/components/settings/SectionCard";
import SectionFormDialog from "@/components/settings/SectionFormDialog";

export default function CatalogSettings() {
  const [editDialog, setEditDialog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    config_key: "", title: "", subtitle: "", is_active: true,
    display_order: 0, max_items: 6, filter_type: "all", filter_value: ""
  });
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: configs = [] } = useQuery({
    queryKey: ['catalog_configs'],
    queryFn: () => base44.entities.CatalogConfig.list('display_order'),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.CatalogConfig.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['catalog_configs'] }); setDeleteTarget(null); },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }) => base44.entities.CatalogConfig.update(id, { is_active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['catalog_configs'] }),
  });

  const openNew = () => {
    setForm({
      config_key: "", title: "", subtitle: "", is_active: true,
      display_order: configs.length, max_items: 6, filter_type: "all", filter_value: ""
    });
    setEditDialog('new');
  };

  const openEdit = (config) => {
    setForm({
      config_key: config.config_key || "",
      title: config.title || "",
      subtitle: config.subtitle || "",
      is_active: config.is_active !== false,
      display_order: config.display_order || 0,
      max_items: config.max_items || 6,
      filter_type: config.filter_type || "all",
      filter_value: config.filter_value || "",
    });
    setEditDialog(config);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editDialog === 'new') {
      await base44.entities.CatalogConfig.create(form);
    } else {
      await base44.entities.CatalogConfig.update(editDialog.id, form);
    }
    queryClient.invalidateQueries({ queryKey: ['catalog_configs'] });
    setSaving(false);
    setEditDialog(null);
  };

  const handleToggle = (config) => {
    toggleMutation.mutate({ id: config.id, is_active: config.is_active === false });
  };

  const activeCount = configs.filter(c => c.is_active !== false).length;

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#f5f5f7] px-3 py-1.5 rounded-full">
            <Layers className="w-3.5 h-3.5 text-[#86868b]" strokeWidth={1.8} />
            <span className="text-[12px] font-medium text-[#86868b]">{configs.length} seções</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px] font-medium text-emerald-600">{activeCount} ativas</span>
          </div>
        </div>

        <button
          onClick={openNew}
          className="h-9 px-5 bg-[#1d1d1f] hover:bg-black text-white rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} /> Nova Seção
        </button>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <AnimatePresence>
          {configs.map((config, i) => (
            <SectionCard
              key={config.id}
              config={config}
              index={i}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
              onToggle={handleToggle}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty */}
      {configs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 text-center bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_6px_-2px_rgba(0,0,0,0.05)]"
        >
          <div className="w-14 h-14 bg-[#f5f5f7] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings2 className="w-6 h-6 text-[#c7c7cc]" strokeWidth={1.5} />
          </div>
          <p className="text-[15px] font-semibold text-[#1d1d1f]">Nenhuma seção configurada</p>
          <p className="text-[13px] text-[#86868b] mt-1 max-w-xs mx-auto">
            Crie seções como "Destaques", "Express", "Ofertas" para organizar o catálogo
          </p>
          <button
            onClick={openNew}
            className="mt-5 h-9 px-5 bg-[#1d1d1f] text-white rounded-full text-[13px] font-medium inline-flex items-center gap-2 hover:bg-black transition-colors"
          >
            <Plus className="w-4 h-4" /> Criar Primeira Seção
          </button>
        </motion.div>
      )}

      {/* Form Dialog */}
      <SectionFormDialog
        open={editDialog !== null}
        onOpenChange={(v) => { if (!v) setEditDialog(null); }}
        form={form}
        setForm={setForm}
        categories={categories}
        saving={saving}
        onSave={handleSave}
        isNew={editDialog === 'new'}
      />

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1d1d1f]">Excluir Seção</AlertDialogTitle>
            <AlertDialogDescription className="text-[#86868b]">
              Tem certeza que deseja excluir "{deleteTarget?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 rounded-full"
              onClick={() => deleteMutation.mutate(deleteTarget.id)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}