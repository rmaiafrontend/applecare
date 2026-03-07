import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Package, Grid3X3, AlertTriangle, Truck, DollarSign, TrendingUp, RefreshCw, Tag, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/admin/StatCard';

const { Product, Category } = base44.entities;

export default function AdminDashboard({ onNavigate }) {
  const { data: products = [] } = useQuery({ queryKey: ['admin-products'], queryFn: () => Product.list('-created_date', 9999) });
  const { data: categories = [] } = useQuery({ queryKey: ['admin-categories'], queryFn: () => Category.list() });

  const outOfStock = products.filter((p) => p.stock === 0).length;
  const expressCount = products.filter((p) => p.express_delivery).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0);
  const avgPrice = products.length ? products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length : 0;
  const usedCount = products.filter((p) => p.condition === 'used').length;
  const discountCount = products.filter((p) => p.original_price && p.original_price > p.price).length;
  const recentProducts = products.slice(0, 6);

  const formatCurrency = (v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10 p-6 lg:p-8"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/8 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-violet-400/80 uppercase tracking-widest">Painel de Controle</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Bem-vindo ao Dashboard</h1>
            <p className="text-sm text-white/40 mt-1.5 max-w-md">Gerencie seu catalogo de produtos, categorias, precos e estoque em um so lugar.</p>
          </div>
          <div className="flex gap-2.5">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/[0.04] border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12]"
              onClick={() => onNavigate('categories', 'new')}
            >
              <Grid3X3 className="h-3.5 w-3.5 mr-2" />
              Nova Categoria
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-violet-500/20"
              onClick={() => onNavigate('products', 'new')}
            >
              <Plus className="h-3.5 w-3.5 mr-2" />
              Novo Produto
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard icon={Package} label="Total Produtos" value={products.length} index={0} iconColor="text-violet-400" gradient="from-violet-500/10 to-violet-500/5" borderGlow="violet" />
        <StatCard icon={Grid3X3} label="Categorias" value={categories.length} index={1} iconColor="text-blue-400" gradient="from-blue-500/10 to-blue-500/5" borderGlow="blue" />
        <StatCard icon={AlertTriangle} label="Sem Estoque" value={outOfStock} index={2} iconColor="text-red-400" gradient="from-red-500/10 to-red-500/5" borderGlow="red" sublabel={outOfStock > 0 ? 'Requer atencao' : 'Tudo em ordem'} />
        <StatCard icon={Truck} label="Entrega Express" value={expressCount} index={3} iconColor="text-green-400" gradient="from-green-500/10 to-green-500/5" borderGlow="green" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard icon={DollarSign} label="Valor do Catalogo" value={formatCurrency(totalValue)} index={4} iconColor="text-emerald-400" gradient="from-emerald-500/10 to-emerald-500/5" borderGlow="emerald" />
        <StatCard icon={TrendingUp} label="Preco Medio" value={formatCurrency(avgPrice)} index={5} iconColor="text-sky-400" gradient="from-sky-500/10 to-sky-500/5" borderGlow="sky" />
        <StatCard icon={RefreshCw} label="Produtos Usados" value={usedCount} index={6} iconColor="text-amber-400" gradient="from-amber-500/10 to-amber-500/5" borderGlow="amber" />
        <StatCard icon={Tag} label="Com Desconto" value={discountCount} index={7} iconColor="text-pink-400" gradient="from-pink-500/10 to-pink-500/5" borderGlow="pink" />
      </div>

      {/* Recent Products + Quick Actions Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Products - Takes 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div>
                <h2 className="text-sm font-semibold text-white">Produtos Recentes</h2>
                <p className="text-[11px] text-white/30 mt-0.5">Ultimos produtos adicionados</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/40 hover:text-white hover:bg-white/[0.06] text-xs gap-1.5"
                onClick={() => onNavigate('products')}
              >
                Ver todos
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {recentProducts.map((product, i) => {
                const category = categories.find((c) => c.id === product.category_id);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    onClick={() => onNavigate('products', 'edit', product.id)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-hidden flex-shrink-0">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-4 w-4 text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white/80 group-hover:text-white truncate transition-colors">{product.name}</p>
                      <p className="text-[11px] text-white/25">{product.sku}</p>
                    </div>
                    {category && (
                      <Badge className="bg-white/[0.04] border border-white/[0.06] text-white/40 hover:bg-white/[0.06] text-[10px] hidden sm:inline-flex">
                        {category.name}
                      </Badge>
                    )}
                    <div className="text-right flex-shrink-0">
                      <p className="text-[13px] font-semibold text-white/70">
                        R$ {product.price?.toLocaleString('pt-BR')}
                      </p>
                      <p className={`text-[11px] font-medium ${product.stock === 0 ? 'text-red-400/70' : product.stock < 5 ? 'text-amber-400/70' : 'text-white/25'}`}>
                        {product.stock} un.
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              {recentProducts.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <Package className="h-8 w-8 text-white/10 mx-auto mb-3" />
                  <p className="text-sm text-white/30">Nenhum produto cadastrado</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          {/* Quick Action: Products */}
          <div
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 cursor-pointer hover:border-violet-500/20 transition-all duration-300 overflow-hidden"
            onClick={() => onNavigate('products')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/10 flex items-center justify-center mb-3">
                <Package className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Gerenciar Produtos</h3>
              <p className="text-[11px] text-white/30 mt-1">{products.length} produtos no catalogo</p>
              <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-violet-400 absolute top-0 right-0 transition-all duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Quick Action: Categories */}
          <div
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 cursor-pointer hover:border-blue-500/20 transition-all duration-300 overflow-hidden"
            onClick={() => onNavigate('categories')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center mb-3">
                <Grid3X3 className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Gerenciar Categorias</h3>
              <p className="text-[11px] text-white/30 mt-1">{categories.length} categorias ativas</p>
              <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-blue-400 absolute top-0 right-0 transition-all duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Catalog Health */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">Saude do Catalogo</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/40">Com imagens</span>
                <span className="text-[12px] font-medium text-white/60">{products.filter((p) => p.images?.length > 0).length}/{products.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${products.length ? (products.filter((p) => p.images?.length > 0).length / products.length) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[12px] text-white/40">Com specs</span>
                <span className="text-[12px] font-medium text-white/60">{products.filter((p) => p.specs?.length > 0).length}/{products.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
                  style={{ width: `${products.length ? (products.filter((p) => p.specs?.length > 0).length / products.length) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[12px] text-white/40">Em estoque</span>
                <span className="text-[12px] font-medium text-white/60">{products.filter((p) => p.stock > 0).length}/{products.length}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${products.length ? (products.filter((p) => p.stock > 0).length / products.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
