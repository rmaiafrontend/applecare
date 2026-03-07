import React, { useState, useEffect, useCallback } from 'react';
import { Order } from '@/api/dataService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Check,
  Clock,
  MapPin,
  CreditCard,
  Package,
  Home,
  QrCode,
  FileText,
  Truck,
  ArrowRight,
  MessageCircle,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { QUERY_KEYS } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const paymentIcons = {
  pix: QrCode,
  credit_card: CreditCard,
  debit_card: CreditCard,
  boleto: FileText,
};

const paymentLabels = {
  pix: 'PIX',
  credit_card: 'Cartao de Credito',
  debit_card: 'Cartao de Debito',
  boleto: 'Boleto Bancario',
};

const COUNTDOWN_SECONDS = 5;

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('order');
  const whatsappUrl = urlParams.get('wa') ? decodeURIComponent(urlParams.get('wa')) : null;

  const [countdown, setCountdown] = useState(whatsappUrl ? COUNTDOWN_SECONDS : null);
  const [redirected, setRedirected] = useState(false);

  const { data: order, isLoading } = useQuery({
    queryKey: QUERY_KEYS.order(orderNumber),
    queryFn: async () => {
      const orders = await Order.filter({ order_number: orderNumber });
      return orders[0];
    },
    enabled: !!orderNumber,
  });

  // Countdown timer for WhatsApp redirect
  useEffect(() => {
    if (countdown === null || redirected) return;
    if (countdown <= 0) {
      setRedirected(true);
      window.open(whatsappUrl, '_blank');
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, whatsappUrl, redirected]);

  const handleOpenWhatsApp = useCallback(() => {
    if (whatsappUrl) {
      setRedirected(true);
      window.open(whatsappUrl, '_blank');
    }
  }, [whatsappUrl]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isWhatsAppFlow = !!whatsappUrl;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 text-center">
          <Skeleton className="w-20 h-20 rounded-3xl mx-auto" />
          <Skeleton className="h-7 w-48 mx-auto rounded-lg" />
          <Skeleton className="h-4 w-32 mx-auto rounded-lg" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm">Pedido nao encontrado</p>
          <Button
            onClick={() => navigate(createPageUrl('Home'))}
            className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  const PaymentIcon = paymentIcons[order.payment_method] || CreditCard;
  const isPickup = !order.address;

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* ── Success Header ── */}
      <div className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/[0.03] rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto px-4 pt-16 pb-10 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.4 }}
            className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center mx-auto mb-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl font-bold text-white tracking-tight mb-1.5"
          >
            {isWhatsAppFlow ? 'Pedido registrado' : 'Pedido confirmado'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/40 text-sm font-medium"
          >
            #{order.order_number}
          </motion.p>

          {/* WhatsApp countdown */}
          {isWhatsAppFlow && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-5"
            >
              {!redirected ? (
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <span className="text-[13px] font-semibold text-white block leading-tight">
                      Redirecionando para WhatsApp
                    </span>
                    <span className="text-[12px] text-white/50">
                      em {countdown} {countdown === 1 ? 'segundo' : 'segundos'}...
                    </span>
                  </div>
                  {/* Countdown circle */}
                  <div className="relative w-9 h-9 shrink-0">
                    <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15" fill="none" stroke="#22c55e" strokeWidth="3"
                        strokeDasharray={`${(countdown / COUNTDOWN_SECONDS) * 94.25} 94.25`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-white tabular-nums">
                      {countdown}
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleOpenWhatsApp}
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-2xl px-5 py-3 text-[13px] font-semibold transition-all active:scale-[0.97]"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  Abrir WhatsApp novamente
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 -mt-4 relative z-10">
        <motion.div initial="hidden" animate="visible" className="space-y-3.5">

          {/* ── Delivery Card ── */}
          <motion.div variants={fadeUp} custom={0}>
            <div
              className={`rounded-3xl p-5 ${
                isPickup
                  ? 'bg-amber-500 text-white'
                  : order.express_delivery
                    ? 'bg-green-500 text-white'
                    : 'bg-white border border-gray-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isPickup || order.express_delivery ? 'bg-white/20' : 'bg-gray-50'
                  }`}
                >
                  {isPickup ? (
                    <Store className="w-6 h-6 text-white" strokeWidth={1.75} />
                  ) : order.express_delivery ? (
                    <Truck className="w-6 h-6 text-white" strokeWidth={1.75} />
                  ) : (
                    <Clock className="w-6 h-6 text-gray-600" strokeWidth={1.75} />
                  )}
                </div>
                <div>
                  <span
                    className={`text-[11px] font-medium uppercase tracking-widest block ${
                      isPickup || order.express_delivery ? 'text-white/60' : 'text-gray-400'
                    }`}
                  >
                    {isPickup ? 'Forma de recebimento' : 'Previsao de entrega'}
                  </span>
                  <span
                    className={`text-lg font-bold block mt-0.5 ${
                      isPickup || order.express_delivery ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {isPickup
                      ? 'Retirada na loja'
                      : order.express_delivery
                        ? 'Em ate 1 hora'
                        : order.estimated_delivery
                          ? formatDate(order.estimated_delivery)
                          : 'A confirmar via WhatsApp'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Order Items ── */}
          <motion.div variants={fadeUp} custom={1}>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
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
                      <h3 className="text-[13px] font-semibold text-gray-900 truncate">
                        {item.product_name}
                      </h3>
                      <span className="text-[11px] text-gray-400">Qtd: {item.quantity}</span>
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 tabular-nums shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Summary ── */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                Resumo
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Subtotal</span>
                  <span className="text-[13px] font-semibold text-gray-900 tabular-nums">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Frete</span>
                  <span
                    className={`text-[13px] font-semibold tabular-nums ${
                      order.shipping === 0 ? 'text-green-600' : 'text-gray-900'
                    }`}
                  >
                    {order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900 tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Payment & Address ── */}
          <motion.div variants={fadeUp} custom={3}>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Payment */}
              <div className="p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <PaymentIcon className="w-5 h-5 text-gray-600" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-gray-400 block">Forma de pagamento</span>
                  <span className="text-[13px] font-semibold text-gray-900">
                    {paymentLabels[order.payment_method] || order.payment_method}
                  </span>
                </div>
              </div>

              {/* Address */}
              {order.address && (
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-4 border-t border-gray-100 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-gray-600" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] text-gray-400 block mb-1">Endereco de entrega</span>
                      <span className="text-[13px] font-semibold text-gray-900 block leading-snug">
                        {order.address.street}, {order.address.number}
                        {order.address.complement && ` - ${order.address.complement}`}
                      </span>
                      <span className="text-[12px] text-gray-500 block mt-0.5">
                        {order.address.neighborhood} - {order.address.city}/{order.address.state}
                      </span>
                      <span className="text-[12px] text-gray-400 block">
                        CEP {order.address.cep}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Notice ── */}
          <motion.div variants={fadeUp} custom={4}>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p className="text-[12px] text-gray-400 text-center leading-relaxed">
                {isWhatsAppFlow
                  ? 'Seu pedido foi registrado. Finalize a confirmacao pelo WhatsApp para darmos continuidade.'
                  : 'A Nota Fiscal sera enviada para seu e-mail e WhatsApp apos a confirmacao do pagamento.'}
              </p>
            </div>
          </motion.div>

          {/* ── Actions ── */}
          <motion.div variants={fadeUp} custom={5} className="space-y-3 pt-2">
            {isWhatsAppFlow ? (
              <>
                {redirected && (
                  <Button
                    onClick={handleOpenWhatsApp}
                    className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold active:scale-[0.97] transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" strokeWidth={2} />
                    Abrir WhatsApp
                  </Button>
                )}
                <Button
                  onClick={() => navigate(createPageUrl('Home'))}
                  variant={redirected ? 'ghost' : 'default'}
                  className={`w-full h-12 rounded-2xl text-sm font-semibold active:scale-[0.97] transition-all ${
                    redirected
                      ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" strokeWidth={2} />
                  Voltar para Home
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate(createPageUrl(`OrderDetail?id=${order.id}`))}
                  className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all"
                >
                  <Package className="w-4 h-4 mr-2" strokeWidth={2} />
                  Acompanhar pedido
                </Button>

                <Button
                  onClick={() => navigate(createPageUrl('Home'))}
                  variant="ghost"
                  className="w-full h-12 rounded-2xl text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                >
                  <Home className="w-4 h-4 mr-2" strokeWidth={2} />
                  Voltar para Home
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
