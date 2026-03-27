import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Package,
  Clock,
  MapPin,
  CreditCard,
  Truck,
  Check,
  X,
  QrCode,
  FileText,
  MessageCircle,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { mapOrderFromApi } from '@/api/adapters';
import {
  useSlug,
  useOrderById,
  useCart,
} from '@/api/hooks';

const STATUS_STEPS = [
  { key: 'AGUARDANDO_PAGAMENTO', label: 'Aguardando pagamento', icon: CreditCard },
  { key: 'PAGAMENTO_CONFIRMADO', label: 'Pagamento confirmado', icon: Check },
  { key: 'EM_SEPARACAO', label: 'Em separacao', icon: Package },
  { key: 'SAIU_PARA_ENTREGA', label: 'Saiu para entrega', icon: Truck },
  { key: 'ENTREGUE', label: 'Entregue', icon: Check },
];

const paymentIcons = { PIX: QrCode, CARTAO: CreditCard, DINHEIRO: FileText };
const paymentLabels = { PIX: 'PIX', CARTAO: 'Cartão de Crédito', DINHEIRO: 'Dinheiro' };

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function OrderDetail() {
  const navigate = useNavigate();
  const slug = useSlug();

  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('id');

  const { data: orderRaw, isLoading, refetch } = useOrderById(slug, Number(orderId));
  const order = useMemo(() => orderRaw ? mapOrderFromApi(orderRaw) : null, [orderRaw]);

  const { data: cartItemsRaw = [] } = useCart(slug);
  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit',
    });

  const getCurrentStepIndex = () => {
    if (order?.status === 'CANCELADO') return -1;
    return STATUS_STEPS.findIndex((s) => s.key === order?.status);
  };

  const canCancel = () =>
    ['AGUARDANDO_PAGAMENTO', 'PAGAMENTO_CONFIRMADO'].includes(order?.status);

  const handleCancel = async () => {
    // Note: cancel endpoint would need to be added to the order service
    // For now, refetch to reflect any server-side changes
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header showBack />
        <main className="pt-12 max-w-lg mx-auto px-4 space-y-3.5 mt-4">
          <Skeleton className="h-28 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </main>
        <BottomNav cartCount={cartCount} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Pedido" showBack />
        <main className="pt-12 max-w-lg mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">Pedido nao encontrado</p>
            <Button
              onClick={() => navigate(createPageUrl('Orders'))}
              className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white"
            >
              Ver meus pedidos
            </Button>
          </div>
        </main>
        <BottomNav cartCount={cartCount} />
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex();
  const isCancelled = order.status === 'CANCELADO';
  const PaymentIcon = paymentIcons[order.payment_method] || CreditCard;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showBack title={`#${order.order_number}`} />

      <main className="pt-12 max-w-lg mx-auto">
        <motion.div initial="hidden" animate="visible" className="px-4 pt-4 space-y-3.5">

          {/* ── Delivery Estimate ── */}
          {!isCancelled && (
            <motion.div variants={fadeUp} custom={0}>
              <div
                className={`rounded-3xl p-5 ${
                  order.express_delivery
                    ? 'bg-green-500 text-white'
                    : 'bg-store-bg border border-store-secondary/50 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      order.express_delivery ? 'bg-white/20' : 'bg-gray-50'
                    }`}
                  >
                    {order.express_delivery ? (
                      <Truck className="w-6 h-6 text-white" strokeWidth={1.75} />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-600" strokeWidth={1.75} />
                    )}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`text-[11px] font-medium uppercase tracking-widest block ${
                        order.express_delivery ? 'text-white/60' : 'text-gray-400'
                      }`}
                    >
                      Previsao de entrega
                    </span>
                    <span
                      className={`text-lg font-bold block mt-0.5 ${
                        order.express_delivery ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {order.express_delivery && order.status !== 'ENTREGUE'
                        ? 'Em ate 1 hora'
                        : formatDateTime(order.estimated_delivery)}
                    </span>
                  </div>
                  {order.status === 'SAIU_PARA_ENTREGA' && (
                    <button
                      className={`h-9 px-4 rounded-xl text-[12px] font-semibold transition-all active:scale-95 ${
                        order.express_delivery
                          ? 'bg-white text-green-600'
                          : 'bg-gray-900 text-white'
                      }`}
                    >
                      Rastrear
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Status Timeline ── */}
          <motion.div variants={fadeUp} custom={1}>
            <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">
                Status do pedido
              </h2>

              {isCancelled ? (
                <div className="flex items-center gap-3 bg-red-50 rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <X className="w-5 h-5 text-red-500" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-red-700 block">
                      Pedido cancelado
                    </span>
                    <span className="text-[11px] text-red-500">
                      {order.status_history?.find((h) => h.status === 'CANCELADO')?.message}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-0">
                  {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isLast = index === STATUS_STEPS.length - 1;
                    const StepIcon = step.icon;
                    const historyEntry = order.status_history?.find((h) => h.status === step.key);

                    return (
                      <div key={step.key} className="flex gap-3.5">
                        {/* Line + Dot */}
                        <div className="flex flex-col items-center w-8 shrink-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isCompleted
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-300'
                            } ${isCurrent ? 'ring-4 ring-gray-900/10' : ''}`}
                          >
                            <StepIcon className="w-3.5 h-3.5" strokeWidth={2} />
                          </div>
                          {!isLast && (
                            <div
                              className={`w-0.5 h-8 my-1 rounded-full ${
                                index < currentStepIndex ? 'bg-gray-900' : 'bg-gray-100'
                              }`}
                            />
                          )}
                        </div>

                        {/* Text */}
                        <div className={`pt-1.5 ${isLast ? '' : 'pb-4'}`}>
                          <span
                            className={`text-[13px] font-semibold block leading-tight ${
                              isCompleted ? 'text-gray-900' : 'text-gray-300'
                            }`}
                          >
                            {step.label}
                          </span>
                          {isCurrent && historyEntry && (
                            <span className="text-[11px] text-store-text/40 mt-0.5 block">
                              {formatDateTime(historyEntry.timestamp)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Order Items ── */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                {order.items?.length} {order.items?.length === 1 ? 'item' : 'itens'}
              </h2>

              <div className="space-y-3.5">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-store-text truncate">
                        {item.product_name}
                      </h3>
                      <span className="text-[11px] text-store-text/40">Qtd: {item.quantity}</span>
                    </div>
                    <span className="text-[13px] font-bold text-store-text tabular-nums shrink-0">
                      {formatPrice(item.unit_price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 pt-4 border-t border-store-secondary/50 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-store-text/50">Subtotal</span>
                  <span className="text-[13px] font-semibold text-store-text tabular-nums">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-store-text/50">Frete</span>
                  <span
                    className={`text-[13px] font-semibold tabular-nums ${
                      order.shipping_cost === 0 ? 'text-green-600' : 'text-gray-900'
                    }`}
                  >
                    {order.shipping_cost === 0 ? 'Gratis' : formatPrice(order.shipping_cost)}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-store-secondary/50 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-store-text">Total</span>
                  <span className="text-xl font-bold text-store-text tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Payment & Address ── */}
          <motion.div variants={fadeUp} custom={3}>
            <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm overflow-hidden">
              {/* Payment */}
              <div className="p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <PaymentIcon className="w-5 h-5 text-gray-600" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-store-text/40 block">Forma de pagamento</span>
                  <span className="text-[13px] font-semibold text-store-text">
                    {paymentLabels[order.payment_method] || order.payment_method}
                  </span>
                </div>
              </div>

              {/* Address */}
              {order.address && (
                <div className="px-5 pb-5">
                  <div className="pt-4 border-t border-store-secondary/50 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-gray-600" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] text-store-text/40 block mb-1">
                        Endereco de entrega
                      </span>
                      <span className="text-[13px] font-semibold text-store-text block leading-snug">
                        {order.address.street}, {order.address.number}
                        {order.address.complement && ` - ${order.address.complement}`}
                      </span>
                      <span className="text-[12px] text-store-text/50 block mt-0.5">
                        {order.address.neighborhood} - {order.address.city}/{order.address.state}
                      </span>
                      <span className="text-[12px] text-store-text/40 block">
                        CEP {order.address.cep}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Actions ── */}
          <motion.div variants={fadeUp} custom={4} className="space-y-2.5 pt-2 pb-4">
            <button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
              className="w-full h-12 rounded-2xl border border-gray-200 text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              Preciso de ajuda
            </button>

            {canCancel() && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full h-12 rounded-2xl text-[13px] font-medium text-red-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 transition-colors">
                    <X className="w-4 h-4" strokeWidth={2} />
                    Cancelar pedido
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[320px] rounded-3xl p-6">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-bold text-center">
                      Cancelar pedido?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-sm text-gray-400">
                      Esta acao nao pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-3 mt-2">
                    <AlertDialogCancel className="flex-1 h-11 rounded-xl border-gray-200 text-sm font-medium">
                      Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold"
                    >
                      Cancelar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </motion.div>
        </motion.div>
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
