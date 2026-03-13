import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, Category, Tag } from "@/api/dataService";
import { Plus, Package, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import AdminProductCard from "@/components/products/AdminProductCard";
import ProductTable from "@/components/products/ProductTable";
import ProductFilters from "@/components/products/ProductFilters";
import ProductFormModal from "@/components/products/ProductFormModal";
import { QUERY_KEYS } from '@/lib/constants';

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: () => Product.list('-created_date'),
  });

  const { data: categories = [] } = useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => Category.list(),
  });

  const { data: tags = [] } = useQuery({
    queryKey: QUERY_KEYS.tags,
    queryFn: () => Tag.list(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => Product.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products });
      setDeleteTarget(null);
    },
  });

  const getCategoryName = (catId) => categories.find(c => (c.category_id || c.id) === catId)?.name || catId;

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || p.category_id === categoryFilter;
    const matchStatus = statusFilter === "all" ||
      (statusFilter === "active" && p.is_active !== false) ||
      (statusFilter === "inactive" && p.is_active === false) ||
      (statusFilter === "featured" && p.is_featured) ||
      (statusFilter === "express" && p.express_delivery) ||
      (statusFilter === "discount" && p.original_price && p.original_price > p.price) ||
      (statusFilter === "low_stock" && (p.stock || 0) <= 2);
    return matchSearch && matchCategory && matchStatus;
  });

  const handleToggleActive = (product) => updateMutation.mutate({ id: product.id, data: { is_active: product.is_active === false ? true : false } });
  const handleToggleFeatured = (product) => updateMutation.mutate({ id: product.id, data: { is_featured: !product.is_featured } });
  const handleEdit = (product) => { setEditProduct(product); setFormOpen(true); };
  const handleNew = () => { setEditProduct(null); setFormOpen(true); };

  const activeCount = products.filter(p => p.is_active !== false).length;
  const lowStockCount = products.filter(p => (p.stock || 0) <= 2 && p.is_active !== false).length;

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[12px] font-medium text-[#86868b] dark:text-[#98989d] bg-[#f5f5f7] dark:bg-[#3a3a3c] px-2.5 py-1 rounded-full tabular-nums">
              {products.length} total
            </span>
            <span className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/[0.12] px-2.5 py-1 rounded-full tabular-nums">
              {activeCount} ativos
            </span>
            {lowStockCount > 0 && (
              <span className="text-[12px] font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/[0.12] px-2.5 py-1 rounded-full tabular-nums">
                {lowStockCount} estoque baixo
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-white dark:bg-[#3a3a3c] rounded-xl border border-black/[0.06] dark:border-white/[0.06] p-0.5 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                viewMode === "grid" ? "bg-[#007aff] dark:bg-[#0a84ff] text-white shadow-sm" : "text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                viewMode === "list" ? "bg-[#007aff] dark:bg-[#0a84ff] text-white shadow-sm" : "text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
              }`}
            >
              <List className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>

          <button
            onClick={handleNew}
            className="h-9 px-4 bg-[#007aff] dark:bg-[#0a84ff] hover:bg-[#0071e3] dark:hover:bg-[#409cff] text-white rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={2.2} /> Novo Produto
          </button>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        totalCount={products.length}
        filteredCount={filtered.length}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
              {filtered.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  categoryName={getCategoryName(product.category_id)}
                  onDelete={(p) => setDeleteTarget(p)}
                  onToggleActive={handleToggleActive}
                  onToggleFeatured={handleToggleFeatured}
                  onEdit={handleEdit}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductTable
                products={filtered}
                categories={categories}
                onDelete={(product) => setDeleteTarget(product)}
                onToggleActive={handleToggleActive}
                onToggleFeatured={handleToggleFeatured}
                onEdit={handleEdit}
              />
            </motion.div>
          )
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-sm"
          >
            <div className="w-16 h-16 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-7 h-7 text-[#c7c7cc] dark:text-[#636366]" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">Nenhum produto encontrado</p>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-1 max-w-xs mx-auto">
              Tente ajustar os filtros ou adicione um novo produto ao catálogo
            </p>
            <button
              onClick={handleNew}
              className="mt-5 h-9 px-5 bg-[#007aff] dark:bg-[#0a84ff] text-white rounded-full text-[13px] font-medium inline-flex items-center gap-2 hover:bg-[#0071e3] dark:hover:bg-[#409cff] transition-colors"
            >
              <Plus className="w-4 h-4" /> Novo Produto
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-3xl dark:bg-[#2c2c2e] dark:border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1d1d1f] dark:text-[#f5f5f7]">Excluir Produto</AlertDialogTitle>
            <AlertDialogDescription className="text-[#86868b] dark:text-[#98989d]">
              Tem certeza que deseja excluir "{deleteTarget?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full dark:bg-[#3a3a3c] dark:text-[#f5f5f7] dark:border-white/[0.06] dark:hover:bg-[#48484a]">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 rounded-full"
              onClick={() => deleteMutation.mutate(deleteTarget.id)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ProductFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        editProduct={editProduct}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
