import React, { useMemo } from "react";
import { useAdminProducts, useAdminCategories, useAdminTags } from "@/api/hooks";
import { mapProductFromApi, mapCategoryFromApi, mapTagFromApi } from "@/api/adapters";
import { motion } from "framer-motion";
import {
  Package,
  Zap,
  Star,
  TrendingDown,
  Grid3X3,
  Tags,
  DollarSign,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentProducts from "@/components/dashboard/RecentProducts";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import QuickActions from "@/components/dashboard/QuickActions";
import StockAlert from "@/components/dashboard/StockAlert";
import { formatPrice } from "@/lib/format";

const greetingByHour = () => {
  const h = new Date().getHours();
  return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
};

const todayFormatted = () =>
  new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard({ onNavigate }) {
  const { data: productsData } = useAdminProducts({ tamanho: 200, ordenacao: 'recentes' });
  const { data: categoriesData } = useAdminCategories();
  const { data: tagsData } = useAdminTags();

  const products = useMemo(
    () => (productsData?.conteudo || []).map(mapProductFromApi),
    [productsData]
  );
  const categories = useMemo(
    () => (categoriesData || []).map(mapCategoryFromApi),
    [categoriesData]
  );
  const tags = useMemo(
    () => (tagsData || []).map(mapTagFromApi),
    [tagsData]
  );

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.is_active !== false).length;
  const expressProducts = products.filter((p) => p.express_delivery).length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const discountProducts = products.filter(
    (p) => p.original_price && p.original_price > p.price
  ).length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValue = products.reduce(
    (sum, p) => sum + p.price * (p.stock || 0),
    0
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-[-0.03em] leading-tight">
            {greetingByHour()}
          </h1>
          <p className="text-[13px] text-[#86868b] dark:text-[#98989d] capitalize mt-1 tracking-[-0.01em]">
            {todayFormatted()}
          </p>
        </div>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-2 bg-white/80 dark:bg-[#2c2c2e]/80 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] rounded-full px-3.5 py-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#34c759] animate-pulse" />
            <span className="text-[11px] font-medium text-[#48484a] dark:text-[#aeaeb2] tabular-nums">
              {totalStock} unidades em estoque
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Stock Alert */}
      <StockAlert products={products} onNavigate={onNavigate} />

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Produtos"
          value={totalProducts}
          icon={Package}
          subtitle={`${activeProducts} ativos`}
          accent="#007aff"
          delay={0}
        />
        <StatsCard
          title="Express"
          value={expressProducts}
          icon={Zap}
          subtitle="Entrega rápida"
          accent="#ff9500"
          delay={0.05}
        />
        <StatsCard
          title="Destaques"
          value={featuredProducts}
          icon={Star}
          subtitle="Na vitrine"
          accent="#af52de"
          delay={0.1}
        />
        <StatsCard
          title="Em Oferta"
          value={discountProducts}
          icon={TrendingDown}
          subtitle="Com desconto"
          accent="#ff3b30"
          delay={0.15}
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatsCard
          title="Categorias"
          value={categories.length}
          icon={Grid3X3}
          compact
          accent="#34c759"
          delay={0.2}
        />
        <StatsCard
          title="Tags"
          value={tags.length}
          icon={Tags}
          compact
          accent="#5ac8fa"
          delay={0.25}
        />
        <StatsCard
          title="Valor Total"
          value={formatPrice(totalValue)}
          icon={DollarSign}
          compact
          accent="#30d158"
          delay={0.3}
        />
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
