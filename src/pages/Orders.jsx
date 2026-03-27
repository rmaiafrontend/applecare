import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  ChevronRight,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { mapOrderFromApi } from '@/api/adapters';
import {
  useSlug,
  useOrders,
  useCart,
} from '@/api/hooks';

const STATUS_CONFIG = {
  AGUARDANDO_PAGAMENTO: {
    label: 'Aguardando Pagamento',
    shortLabel: 'Pagamento',
    color: 'bg-amber-500',
    softColor: 'bg-amber-50 text-amber-700 border-amber-100',
    icon: CreditCard,
    progress: 20,
  },
  PAGAMENTO_CONFIRMADO: {
    label: 'Pagamento Confirmado',
    shortLabel: 'Confirmado',
    color: 'bg-blue-500',
    softColor: 'bg-blue-50 text-blue-700 border-blue-100',
    icon: CheckCircle2,
    progress: 40,
  },
  EM_SEPARACAO: {
    label: 'Em Separacao',
    shortLabel: 'Separacao',
    color: 'bg-indigo-500',
    softColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    icon: Package,
    progress: 60,
  },
  SAIU_PARA_ENTREGA: {
    label: 'Saiu para Entrega',
    shortLabel: 'A caminho',
    color: 'bg-violet-500',
    softColor: 'bg-violet-50 text-violet-700 border-violet-100',
    icon: Truck,
    progress: 80,
  },
  ENTREGUE: {
    label: 'Entregue',
    shortLabel: 'Entregue',
    color: 'bg-green-500',
    softColor: 'bg-green-50 text-green-700 border-green-100',
    icon: CheckCircle2,
    progress: 100,
  },
  CANCELADO: {
    label: 'Cancelado',
    shortLabel: 'Cancelado',
    color: 'bg-gray-400',
    softColor: 'bg-gray-100 text-gray-500 border-gray-200',
    icon: XCircle,
    progress: 0,
  },
};

const filters = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Ativos' },
  { key: 'delivered', label: 'Entregues' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Orders() {
  const slug = useSlug();
  const [filter, setFilter] = useState('all');

  const { data: ordersPage, isLoading } = useOrders(slug);
  const orders = useMemo(() => {
    const raw = ordersPage?.conteudo || [];
    return raw.map(mapOrderFromApi);
  }, [ordersPage]);

  const { data: cartItemsRaw = [] } = useCart(slug);
  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  const getRelativeTime = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes}min atras`;
    if (hours < 24) return `${hours}h atras`;
    if (days < 7) return `${days}d atras`;
    return formatDate(dateString);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return !['ENTREGUE', 'CANCELADO'].includes(order.status);
    if (filter === 'delivered') return order.status === 'ENTREGUE';
    return true;
  });

  const activeCount = orders.filter(o => !['ENTREGUE', 'CANCELADO'].includes(o.status)).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Meus Pedidos" showBack showCart cartCount={cartCount} />

      <main className="pt-14 w-full max-w-lg mx-auto">
        {/* Stats Header */}
        {!isLoading && orders.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="px-4 mt-2 mb-2"
          >
            <div className="flex gap-2.5">
              <div className="flex-1 bg-store-bg rounded-2xl border border-store-secondary/50 p-3.5">
                <span className="text-[22px] font-bold text-store-text block leading-none tabular-nums">
                  {orders.length}
                </span>
                <span className="text-[11px] text-store-text/40 mt-1 block">
                  Total de pedidos
                </span>
              </div>
              <div className="flex-1 bg-store-bg rounded-2xl border border-store-secondary/50 p-3.5">
                <span className="text-[22px] font-bold text-store-text block leading-none tabular-nums">
                  {activeCount}
                </span>
                <span className="text-[11px] text-store-text/40 mt-1 block">
                  Em andamento
                </span>
              </div>
              <div className="flex-1 bg-store-bg rounded-2xl border border-store-secondary/50 p-3.5">
                <span className="text-[22px] font-bold text-green-600 block leading-none tabular-nums">
                  {orders.filter(o => o.status === 'ENTREGUE').length}
                </span>
                <span className="text-[11px] text-store-text/40 mt-1 block">
                  Entregues
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Pills */}
        <div className="sticky top-12 z-30 bg-background/80 backdrop-blur-xl">
          <div className="px-4 py-3 flex gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all active:scale-95 ${
                  filter === f.key
                    ? 'bg-store-primary text-white shadow-md'
                    : 'bg-store-secondary text-store-text/50 border border-store-secondary hover:border-store-secondary'
                }`}
              >
                {f.label}
                {f.key === 'active' && activeCount > 0 && (
                  <span className={`ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold ${
                    filter === f.key ? 'bg-white text-store-text' : 'bg-store-secondary text-store-text/60'
                  }`}>
                    {activeCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4">
          {/* Loading */}
          {isLoading && (
            <div className="space-y-3 mt-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-store-bg rounded-3xl border border-store-secondary/50 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2 rounded-lg" />
                      <Skeleton className="h-3 w-1/3 rounded-lg" />
                    </div>
                    <Skeleton className="w-20 h-7 rounded-full" />
                  </div>
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 flex flex-col items-center"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-[28px] bg-store-secondary flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-store-text/30" strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-xl bg-store-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
              </div>

              <h2 className="text-lg font-bold text-store-text mt-5">
                {filter === 'all' ? 'Nenhum pedido ainda' : 'Nenhum pedido aqui'}
              </h2>
              <p className="text-sm text-store-text/40 mt-1 text-center max-w-[240px]">
                {filter === 'all'
                  ? 'Explore nosso catalogo e faca seu primeiro pedido'
                  : 'Nenhum pedido corresponde a esse filtro'}
              </p>

              {filter === 'all' && (
                <Link
                  to={createPageUrl('Home')}
                  className="mt-5 inline-flex items-center gap-2 bg-store-primary text-white text-sm font-semibold px-5 py-3 rounded-2xl hover:bg-store-primary transition-colors active:scale-[0.97]"
                >
                  Explorar produtos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          )}

          {/* Order List */}
          <AnimatePresence mode="popLayout">
            {!isLoading && filteredOrders.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 mt-1"
              >
                {filteredOrders.map((order, index) => {
                  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.EM_SEPARACAO;
                  const StatusIcon = config.icon;
                  const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                  const isCancelled = order.status === 'CANCELADO';
                  const isDelivered = order.status === 'ENTREGUE';
                  const isInTransit = order.status === 'SAIU_PARA_ENTREGA';

                  return (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.04, duration: 0.35 }}
                    >
                      <Link
                        to={createPageUrl(`OrderDetail?id=${order.id}`)}
                        className="block group"
                      >
                        <div className={`bg-store-bg rounded-3xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                          isInTransit ? 'border-violet-200' : 'border-store-secondary/50'
                        }`}>
                          {/* Live tracking banner for in-transit orders */}
                          {isInTransit && (
                            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 flex items-center gap-2">
                              <div className="relative flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping absolute" />
                                <div className="w-2 h-2 bg-white rounded-full relative" />
                              </div>
                              <span className="text-[11px] font-bold text-white tracking-wide uppercase">
                                A caminho — Acompanhar em tempo real
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-white/60 ml-auto" />
                            </div>
                          )}

                          <div className="p-4">
                            {/* Top row: order info + status badge */}
                            <div className="flex items-start justify-between mb-3.5">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[15px] font-bold text-store-text">
                                    #{order.order_number}
                                  </span>
                                  {order.express_delivery && (
                                    <span className="inline-flex items-center gap-0.5 bg-store-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      <Truck className="w-2.5 h-2.5" /> Express
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-store-text/40 mt-0.5 block">
                                  {getRelativeTime(order.created_date)}
                                </span>
                              </div>

                              <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border ${config.softColor}`}>
                                <StatusIcon className="w-3 h-3" strokeWidth={2.5} />
                                {config.shortLabel}
                              </div>
                            </div>

                            {/* Progress bar */}
                            {!isCancelled && (
                              <div className="mb-3.5">
                                <div className="w-full h-1.5 bg-store-secondary rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${config.progress}%` }}
                                    transition={{ delay: index * 0.04 + 0.2, duration: 0.6, ease: 'easeOut' }}
                                    className={`h-full rounded-full ${config.color}`}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Items + Price */}
                            <div className="flex items-center gap-3">
                              {/* Product images */}
                              <div className="flex -space-x-2.5">
                                {order.items?.slice(0, 3).map((item, i) => (
                                  <div
                                    key={i}
                                    className="w-11 h-11 rounded-xl bg-store-secondary border-2 border-white overflow-hidden shadow-sm"
                                  >
                                    <img
                                      src={item.product_image}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                                {(order.items?.length || 0) > 3 && (
                                  <div className="w-11 h-11 rounded-xl bg-store-secondary border-2 border-white flex items-center justify-center shadow-sm">
                                    <span className="text-[11px] font-bold text-store-text/50">
                                      +{(order.items?.length || 0) - 3}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className="text-[12px] text-store-text/50 block">
                                  {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                                </span>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-[15px] font-bold text-store-text tabular-nums block leading-tight">
                                  {formatPrice(order.total)}
                                </span>
                              </div>

                              <ChevronRight className="w-4 h-4 text-store-text/30 shrink-0 group-hover:text-store-text/40 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
