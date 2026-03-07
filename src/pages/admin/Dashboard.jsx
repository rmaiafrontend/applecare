import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, Category, Tag } from "@/api/dataService";
import { motion } from "framer-motion";
import { Package, Zap, Star, TrendingDown, Grid3X3, Tags, DollarSign, BarChart3 } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentProducts from "@/components/dashboard/RecentProducts";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import QuickActions from "@/components/dashboard/QuickActions";
import StockAlert from "@/components/dashboard/StockAlert";
import { formatPrice } from '@/lib/format';
import { QUERY_KEYS } from '@/lib/constants';

const greetingByHour = () => {
  const h = new Date().getHours();
  return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
};

const todayFormatted = () =>
  new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());

export default function Dashboard({ onNavigate }) {
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

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.is_active !== false).length;
  const expressProducts = products.filter(p => p.express_delivery).length;
  const featuredProducts = products.filter(p => p.is_featured).length;
  const discountProducts = products.filter(p => p.original_price && p.original_price > p.price).length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1"
      >
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1d1d1f] tracking-tight">
            {greetingByHour()} 👋
          </h1>
          <p className="text-[13px] text-[#86868b] capitalize mt-0.5">{todayFormatted()}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-black/[0.04] rounded-full px-3 py-1.5 shadow-sm">
            <BarChart3 className="w-3.5 h-3.5 text-[#86868b]" />
            <span className="text-[11px] font-medium text-[#86868b]">{totalStock} unidades em estoque</span>
          </div>
        </div>
      </motion.div>



      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Produtos"
          value={totalProducts}
          icon={Package}
          subtitle={`${activeProducts} ativos`}
          accent="#007aff"
        />
        <StatsCard
          title="Express"
          value={expressProducts}
          icon={Zap}
          subtitle="Entrega em 1h"
          accent="#ff9500"
        />
        <StatsCard
          title="Destaques"
          value={featuredProducts}
          icon={Star}
          subtitle="Na vitrine"
          accent="#af52de"
        />
        <StatsCard
          title="Em Oferta"
          value={discountProducts}
          icon={TrendingDown}
          subtitle="Com desconto"
          accent="#ff3b30"
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatsCard title="Categorias" value={categories.length} icon={Grid3X3} compact accent="#34c759" />
        <StatsCard title="Tags" value={tags.length} icon={Tags} compact accent="#5ac8fa" />
        <StatsCard title="Valor Total" value={formatPrice(totalValue)} icon={DollarSign} compact accent="#30d158" />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <QuickActions onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-5">
          <RecentProducts products={products} onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-3">
          <CategoryBreakdown categories={categories} products={products} />
        </div>
      </div>
    </div>
  );
}