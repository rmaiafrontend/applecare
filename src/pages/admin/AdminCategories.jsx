import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Grid3X3, Plus, ArrowUp, ArrowDown, Pencil, Trash2, Smartphone, Laptop, Tablet, Watch, Headphones, Monitor, Cable, Package, Gift, Tag, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import EmptyState from '@/components/admin/EmptyState';

const { Category, Product } = base44.entities;

const iconMap = {
  Smartphone, Laptop, Tablet, Watch, Headphones, Monitor, Cable, Package, Gift, Tag, Star, Zap,
};

export default function AdminCategories({ onNavigate }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: categories = [] } = useQuery({ queryKey: ['admin-categories'], queryFn: () => Category.list() });
  const { data: products = [] } = useQuery({ queryKey: ['admin-products'], queryFn: () => Product.list('-created_date', 9999) });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const productCountMap = products.reduce((acc, p) => {
    acc[p.category_id] = (acc[p.category_id] || 0) + 1;
    return acc;
  }, {});

  const handleReorder = async (index, direction) => {
    const sorted = [...categories];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sorted.length) return;
    [sorted[index], sorted[newIndex]] = [sorted[newIndex], sorted[index]];
    const orderedIds = sorted.map((c) => c.id);
    await Category.reorder(orderedIds);
    queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await Category.delete(deleteTarget.id);
    queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    toast({ title: 'Categoria excluida', description: `"${deleteTarget.name}" foi removida.` });
    setDeleteTarget(null);
  };

  const gradients = [
    'from-violet-500/15 to-violet-600/5',
    'from-blue-500/15 to-blue-600/5',
    'from-emerald-500/15 to-emerald-600/5',
    'from-amber-500/15 to-amber-600/5',
    'from-pink-500/15 to-pink-600/5',
    'from-sky-500/15 to-sky-600/5',
    'from-rose-500/15 to-rose-600/5',
  ];

  const iconColors = [
    'text-violet-400', 'text-blue-400', 'text-emerald-400', 'text-amber-400',
    'text-pink-400', 'text-sky-400', 'text-rose-400',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Categorias</h1>
          <p className="text-sm text-white/35 mt-0.5">{categories.length} categorias cadastradas</p>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20"
          onClick={() => onNavigate('categories', 'new')}
        >
          <Plus className="h-3.5 w-3.5 mr-2" />
          Nova Categoria
        </Button>
      </motion.div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16">
          <EmptyState
            icon={Grid3X3}
            title="Nenhuma categoria"
            description="Crie sua primeira categoria para organizar os produtos."
            actionLabel="Criar Categoria"
            onAction={() => onNavigate('categories', 'new')}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] || Package;
            const count = productCountMap[cat.id] || 0;
            const gradient = gradients[index % gradients.length];
            const iconColor = iconColors[index % iconColors.length];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                  {/* Gradient header */}
                  <div className={`relative h-20 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#09090b]/50" />
                    <IconComponent className={`h-8 w-8 ${iconColor} relative z-10 opacity-80`} />
                    {cat.is_promotion && (
                      <Badge className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/20 text-amber-300 hover:bg-amber-500/25 text-[9px] px-1.5 z-10">
                        Promocao
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{cat.name}</h3>
                        <p className="text-[11px] text-white/30 mt-1">
                          {count} {count === 1 ? 'produto' : 'produtos'} · Ordem #{cat.order}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 mt-4 pt-3 border-t border-white/[0.04]">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/20 hover:text-white hover:bg-white/[0.06]"
                        onClick={() => handleReorder(index, -1)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/20 hover:text-white hover:bg-white/[0.06]"
                        onClick={() => handleReorder(index, 1)}
                        disabled={index === categories.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <div className="flex-1" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/20 hover:text-white hover:bg-white/[0.06]"
                        onClick={() => onNavigate('categories', 'edit', cat.id)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/20 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => setDeleteTarget(cat)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Excluir "${deleteTarget?.name}"?`}
        description={
          productCountMap[deleteTarget?.id]
            ? `Esta categoria possui ${productCountMap[deleteTarget?.id]} produto(s). Eles ficarao sem categoria.`
            : 'Esta acao nao pode ser desfeita.'
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}
