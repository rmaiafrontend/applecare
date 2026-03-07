import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import {
  Package, Plus, Search, Pencil, Trash2, Copy, MoreHorizontal, Truck, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import EmptyState from '@/components/admin/EmptyState';

const { Product, Category } = base44.entities;
const PER_PAGE = 10;

export default function AdminProducts({ onNavigate }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ['admin-products'], queryFn: () => Product.list('-created_date', 9999) });
  const { data: categories = [] } = useQuery({ queryKey: ['admin-categories'], queryFn: () => Category.list() });

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categoryMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c])), [categories]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'all') list = list.filter((p) => p.category_id === categoryFilter);
    if (conditionFilter === 'new') list = list.filter((p) => p.condition !== 'used');
    if (conditionFilter === 'used') list = list.filter((p) => p.condition === 'used');
    if (stockFilter === 'instock') list = list.filter((p) => p.stock > 0);
    if (stockFilter === 'outofstock') list = list.filter((p) => p.stock === 0);
    return list;
  }, [products, search, categoryFilter, conditionFilter, stockFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await Product.delete(deleteTarget.id);
    queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    toast({ title: 'Produto excluido', description: `"${deleteTarget.name}" foi removido.` });
    setDeleteTarget(null);
  };

  const handleDuplicate = async (product) => {
    const { id, created_date, ...rest } = product;
    await Product.create({ ...rest, name: `${rest.name} (copia)`, sku: `${rest.sku}-COPY` });
    queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    toast({ title: 'Produto duplicado' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Produtos</h1>
          <p className="text-sm text-white/35 mt-0.5">{filtered.length} de {products.length} produtos</p>
        </div>
        <Button
          size="sm"
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20"
          onClick={() => onNavigate('products', 'new')}
        >
          <Plus className="h-3.5 w-3.5 mr-2" />
          Novo Produto
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
              <Input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar por nome ou SKU..."
                className="pl-9 bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/25 focus:border-violet-500/30 focus:ring-violet-500/10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[160px] bg-white/[0.03] border-white/[0.06] text-white/70">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#18181b] border-white/[0.08] text-white">
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={conditionFilter} onValueChange={(v) => { setConditionFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[130px] bg-white/[0.03] border-white/[0.06] text-white/70">
                <SelectValue placeholder="Condicao" />
              </SelectTrigger>
              <SelectContent className="bg-[#18181b] border-white/[0.08] text-white">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="new">Novo</SelectItem>
                <SelectItem value="used">Usado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={(v) => { setStockFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[140px] bg-white/[0.03] border-white/[0.06] text-white/70">
                <SelectValue placeholder="Estoque" />
              </SelectTrigger>
              <SelectContent className="bg-[#18181b] border-white/[0.08] text-white">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="instock">Em estoque</SelectItem>
                <SelectItem value="outofstock">Sem estoque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16">
            <EmptyState
              icon={Package}
              title="Nenhum produto encontrado"
              description={search || categoryFilter !== 'all' ? 'Tente ajustar os filtros.' : 'Crie seu primeiro produto.'}
              actionLabel={!search ? 'Criar Produto' : undefined}
              onAction={!search ? () => onNavigate('products', 'new') : undefined}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/[0.04] hover:bg-transparent">
                    <TableHead className="w-[50px] text-white/30 text-[11px] font-semibold uppercase tracking-wider"></TableHead>
                    <TableHead className="text-white/30 text-[11px] font-semibold uppercase tracking-wider">Produto</TableHead>
                    <TableHead className="hidden md:table-cell text-white/30 text-[11px] font-semibold uppercase tracking-wider">Categoria</TableHead>
                    <TableHead className="text-white/30 text-[11px] font-semibold uppercase tracking-wider">Preco</TableHead>
                    <TableHead className="hidden sm:table-cell text-white/30 text-[11px] font-semibold uppercase tracking-wider">Estoque</TableHead>
                    <TableHead className="hidden lg:table-cell w-[80px] text-center text-white/30 text-[11px] font-semibold uppercase tracking-wider">Express</TableHead>
                    <TableHead className="hidden lg:table-cell text-white/30 text-[11px] font-semibold uppercase tracking-wider">Condicao</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((product, i) => {
                    const cat = categoryMap[product.category_id];
                    const hasDiscount = product.original_price && product.original_price > product.price;
                    return (
                      <TableRow
                        key={product.id}
                        className="border-white/[0.04] cursor-pointer hover:bg-white/[0.02] transition-colors group"
                        onClick={() => onNavigate('products', 'edit', product.id)}
                      >
                        <TableCell className="p-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-hidden">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-4 w-4 text-white/15" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-[13px] font-medium text-white/70 group-hover:text-white line-clamp-1 transition-colors">{product.name}</p>
                          <p className="text-[11px] text-white/25">{product.sku}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {cat && (
                            <Badge className="bg-white/[0.04] border border-white/[0.06] text-white/40 hover:bg-white/[0.06] text-[10px]">
                              {cat.name}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="text-[13px] font-semibold text-white/70">
                            R$ {product.price?.toLocaleString('pt-BR')}
                          </p>
                          {hasDiscount && (
                            <p className="text-[11px] text-white/25 line-through">
                              R$ {product.original_price?.toLocaleString('pt-BR')}
                            </p>
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className={`text-[13px] font-medium ${product.stock === 0 ? 'text-red-400/80' : product.stock < 5 ? 'text-amber-400/80' : 'text-white/50'}`}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-center">
                          {product.express_delivery ? (
                            <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto">
                              <Truck className="h-3.5 w-3.5 text-green-400" />
                            </div>
                          ) : (
                            <span className="text-white/15">—</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {product.condition === 'used' ? (
                            <Badge className="bg-amber-500/10 border border-amber-500/15 text-amber-400/80 hover:bg-amber-500/15 text-[10px]">Usado</Badge>
                          ) : (
                            <Badge className="bg-white/[0.04] border border-white/[0.06] text-white/35 hover:bg-white/[0.06] text-[10px]">Novo</Badge>
                          )}
                        </TableCell>
                        <TableCell className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/30 hover:text-white hover:bg-white/[0.06]">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#18181b] border-white/[0.08] text-white">
                              <DropdownMenuItem className="text-white/70 focus:text-white focus:bg-white/[0.06]" onClick={(e) => { e.stopPropagation(); onNavigate('products', 'edit', product.id); }}>
                                <Pencil className="h-3.5 w-3.5 mr-2" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-white/70 focus:text-white focus:bg-white/[0.06]" onClick={(e) => { e.stopPropagation(); handleDuplicate(product); }}>
                                <Copy className="h-3.5 w-3.5 mr-2" /> Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-400 focus:text-red-300 focus:bg-red-500/10"
                                onClick={(e) => { e.stopPropagation(); setDeleteTarget(product); }}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-2" /> Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.04]">
                <p className="text-[11px] text-white/30">
                  Mostrando {(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, filtered.length)} de {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/30 hover:text-white hover:bg-white/[0.06]" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 text-xs ${p === page ? 'bg-violet-500/15 text-violet-400 hover:bg-violet-500/20' : 'text-white/30 hover:text-white hover:bg-white/[0.06]'}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/30 hover:text-white hover:bg-white/[0.06]" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Excluir "${deleteTarget?.name}"?`}
        description="O produto sera removido permanentemente do catalogo."
        onConfirm={handleDelete}
      />
    </div>
  );
}
