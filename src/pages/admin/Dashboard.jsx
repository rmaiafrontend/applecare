import React from "react";
import { useDashboardStats } from "@/api/hooks";
import { motion } from "framer-motion";
import {
  Package,
  Zap,
  Star,
  TrendingDown,
  Grid3X3,
  ShoppingBag,
  DollarSign,
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
  const { data: stats } = useDashboardStats();

  // Adaptar dados da API para os componentes existentes
  const lowStockProducts = (stats?.produtosEstoqueBaixo || []).map((p) => ({
    id: p.id,
    name: p.nome,
    stock: p.estoque,
    is_active: true,
  }));

  const recentProducts = (stats?.produtosRecentes || []).map((p) => ({
    id: p.id,
    name: p.nome,
    price: p.preco,
    images: [],
  }));

  const categoriesData = (stats?.categoriasResumo || []).map((c) => ({
    id: c.id,
    name: c.nome,
    count: c.totalProdutos,
  }));

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
              {stats?.unidadesEmEstoque ?? 0} unidades em estoque
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Stock Alert */}
      <StockAlert products={lowStockProducts} onNavigate={onNavigate} />

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Produtos"
          value={stats?.totalProdutos ?? 0}
          icon={Package}
          subtitle={`${stats?.produtosAtivos ?? 0} ativos`}
          accent="#007aff"
          delay={0}
        />
        <StatsCard
          title="Express"
          value={stats?.produtosExpressa ?? 0}
          icon={Zap}
          subtitle="Entrega rápida"
          accent="#ff9500"
          delay={0.05}
        />
        <StatsCard
          title="Destaques"
          value={stats?.produtosDestaque ?? 0}
          icon={Star}
          subtitle="Na vitrine"
          accent="#af52de"
          delay={0.1}
        />
        <StatsCard
          title="Em Oferta"
          value={stats?.produtosComDesconto ?? 0}
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
          value={categoriesData.length}
          icon={Grid3X3}
          compact
          accent="#34c759"
          delay={0.2}
        />
        <StatsCard
          title="Pedidos"
          value={stats?.totalPedidos ?? 0}
          icon={ShoppingBag}
          compact
          accent="#5ac8fa"
          delay={0.25}
        />
        <StatsCard
          title="Valor Total"
          value={formatPrice(stats?.valorTotalEstoque ?? 0)}
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
          <RecentProducts products={recentProducts} onNavigate={onNavigate} />
        </div>
        <div className="lg:col-span-3">
          <CategoryBreakdown categories={categoriesData} />
        </div>
      </div>
    </div>
  );
}
