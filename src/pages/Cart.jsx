const PAYMENT_METHOD_MAP = { pix: 'PIX', credit_card: 'CARTAO', boleto: 'DINHEIRO' };

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Truck,
  ArrowRight,
  Tag,
  MessageCircle,
  MapPin,
  CreditCard,
  QrCode,
  FileText,
  Store,
  Home as HomeIcon,
  ChevronLeft,
  Loader2,
  Check,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import CartItemCard from '@/components/cart/CartItemCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatPrice } from '@/lib/format';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { mapCartItemFromApi, mapProductFromApi } from '@/api/adapters';
import { utilsService } from '@/api/services';
import {
  useSlug,
  usePublicProducts,
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  useCreateOrder,
} from '@/api/hooks';

const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeSlide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

export default function Cart() {
  const navigate = useNavigate();
  const slug = useSlug();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);

  // Checkout flow states
  const [checkoutStep, setCheckoutStep] = useState(null); // null | 'delivery' | 'address' | 'payment' | 'sending'
  const [deliveryMethod, setDeliveryMethod] = useState(null); // 'pickup' | 'delivery'
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loadingCep, setLoadingCep] = useState(false);
  const [address, setAddress] = useState({
    cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '',
  });

  const { data: cartItemsRaw = [], isLoading: loadingCart } = useCart(slug);
  const cartItems = useMemo(() => cartItemsRaw.map(mapCartItemFromApi), [cartItemsRaw]);

  const { data: productsPage, isLoading: loadingProducts } = usePublicProducts(slug, { tamanho: 200 });
  const products = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);

  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  const productMap = products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  const updateCartItemMutation = useUpdateCartItem(slug);
  const removeCartItemMutation = useRemoveCartItem(slug);
  const clearCartMutation = useClearCart(slug);
  const createOrderMutation = useCreateOrder(slug);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    setUpdatingItem(itemId);
    try {
      await updateCartItemMutation.mutateAsync({ id: itemId, data: { quantidade: quantity } });
    } catch (e) {
      console.error('Error updating quantity:', e);
    }
    setUpdatingItem(null);
  };

  const handleRemove = (itemId) => {
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeCartItemMutation.mutate(itemToRemove);
      setItemToRemove(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = productMap[item.product_id];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal >= 299 ? 0 : 19.9;
  const total = subtotal + shipping;

  const allExpressDelivery = cartItems.every((item) => {
    const product = productMap[item.product_id];
    return product?.express_delivery && product?.stock > 0;
  });

  const isLoading = loadingCart || loadingProducts;
  const isEmpty = cartItems.length === 0;

  // CEP lookup
  const fetchCep = async (cep) => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) return;
    setLoadingCep(true);
    try {
      const data = await utilsService.consultarCep(clean);
      if (data) {
        setAddress((prev) => ({
          ...prev,
          street: data.rua,
          neighborhood: data.bairro,
          city: data.cidade,
          state: data.estado,
        }));
      }
    } catch (e) {
      console.error('CEP error:', e);
    }
    setLoadingCep(false);
  };

  const handleCepChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    setAddress((prev) => ({ ...prev, cep: formatted }));
    if (value.length === 8) fetchCep(value);
  };

  const isAddressValid = () =>
    address.cep && address.street && address.number &&
    address.neighborhood && address.city && address.state;

  // Build WhatsApp message and send
  const handleSendWhatsApp = async () => {
    setCheckoutStep('sending');

    const itemLines = cartItems.map((item) => {
      const product = productMap[item.product_id];
      const name = product?.name || 'Produto';
      const price = (product?.price || 0) * item.quantity;
      return `- ${name} (x${item.quantity}) — ${formatPrice(price)}`;
    }).join('\n');

    const deliveryLabel = deliveryMethod === 'pickup' ? 'Retirar na loja' : 'Receber em casa';
    const paymentLabels = { pix: 'PIX', credit_card: 'Cartao de Credito', boleto: 'Boleto Bancario' };

    let addressLine = '';
    if (deliveryMethod === 'delivery') {
      addressLine = `\nEndereco: ${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''} — ${address.neighborhood}, ${address.city}/${address.state} — CEP ${address.cep}`;
    }

    const message = `Ola! Gostaria de fazer o seguinte pedido:\n\n${itemLines}\n\nSubtotal: ${formatPrice(subtotal)}\nFrete: ${shipping === 0 ? 'Gratis' : formatPrice(shipping)}\n*Total: ${formatPrice(total)}*\n\nRecebimento: ${deliveryLabel}${addressLine}\nPagamento: ${paymentLabels[paymentMethod] || paymentMethod}\n\nAguardo confirmacao!`;

    try {
      // Save order via the API
      const orderItems = cartItems.map((item) => ({
        produtoId: item.product_id,
        quantidade: item.quantity,
      }));

      const isDelivery = deliveryMethod === 'delivery';
      const orderResult = await createOrderMutation.mutateAsync({
        metodoPagamento: PAYMENT_METHOD_MAP[paymentMethod] || paymentMethod,
        paraEntrega: isDelivery,
        ...(isDelivery ? {
          enderecoCep: address.cep.replace(/\D/g, ''),
          enderecoRua: address.street,
          enderecoNumero: address.number,
          enderecoComplemento: address.complement || undefined,
          enderecoBairro: address.neighborhood,
          enderecoCidade: address.city,
          enderecoEstado: address.state,
        } : {}),
        observacao: !isDelivery ? 'Retirada na loja' : undefined,
        itens: orderItems,
      });

      const orderNumber = orderResult?.numeroPedido || `WPP-${Date.now().toString().slice(-5)}`;

      // Clear cart
      await clearCartMutation.mutateAsync();

      // Build WhatsApp URL
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      // Navigate to confirmation page with countdown
      navigate(createPageUrl(`OrderConfirmation?order=${orderNumber}&wa=${encodeURIComponent(whatsappUrl)}`));

      // Reset checkout state
      setCheckoutStep(null);
      setDeliveryMethod(null);
      setPaymentMethod('pix');
      setAddress({ cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' });
    } catch (error) {
      console.error('Error saving order:', error);
      setCheckoutStep('payment');
    }
  };

  const handleStartCheckout = () => {
    setCheckoutStep('delivery');
  };

  const handleBack = () => {
    if (checkoutStep === 'payment') {
      if (deliveryMethod === 'delivery') {
        setCheckoutStep('address');
      } else {
        setCheckoutStep('delivery');
      }
    } else if (checkoutStep === 'address') {
      setCheckoutStep('delivery');
    } else {
      setCheckoutStep(null);
    }
  };

  const handleDeliveryNext = () => {
    if (deliveryMethod === 'delivery') {
      setCheckoutStep('address');
    } else {
      setCheckoutStep('payment');
    }
  };

  // ── Checkout Flow Render ──
  if (checkoutStep && !isEmpty) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <Header
          title={checkoutStep === 'delivery' ? 'Recebimento' : checkoutStep === 'address' ? 'Endereco' : 'Pagamento'}
          showBack
          onBack={handleBack}
        />

        <main className="pt-12 max-w-lg mx-auto">
          {/* Step indicator */}
          <div className="px-4 pt-5 pb-4 flex items-center gap-2">
            {[
              { id: 'delivery', label: 'Recebimento' },
              ...(deliveryMethod === 'delivery' ? [{ id: 'address', label: 'Endereco' }] : []),
              { id: 'payment', label: 'Pagamento' },
            ].map((step, i, arr) => {
              const steps = ['delivery', ...(deliveryMethod === 'delivery' ? ['address'] : []), 'payment'];
              const currentIdx = steps.indexOf(checkoutStep);
              const stepIdx = steps.indexOf(step.id);
              const isDone = stepIdx < currentIdx;
              const isCurrent = step.id === checkoutStep;

              return (
                <React.Fragment key={step.id}>
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                      isCurrent
                        ? 'bg-gray-900 text-white'
                        : isDone
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3" strokeWidth={2.5} />}
                    {step.label}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronLeft className="w-3.5 h-3.5 text-gray-300 rotate-180" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Order preview strip */}
          <div className="px-4 mb-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3.5 border border-gray-100">
              <div className="flex -space-x-2">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="w-10 h-10 rounded-xl bg-white border-2 border-gray-50 overflow-hidden">
                    <img src={productMap[item.product_id]?.images?.[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <div className="w-10 h-10 rounded-xl bg-gray-200 border-2 border-gray-50 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-500">+{cartItems.length - 3}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] text-gray-500 block">
                  {cartCount} {cartCount === 1 ? 'item' : 'itens'}
                </span>
                <span className="text-[14px] font-bold text-gray-900 tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="px-4">
            <AnimatePresence mode="wait">
              {/* Step: Delivery method */}
              {checkoutStep === 'delivery' && (
                <motion.div key="delivery" {...fadeSlide}>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-5">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                        <Truck className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-gray-900">Como deseja receber?</h2>
                        <p className="text-[11px] text-gray-400">Escolha a forma de recebimento</p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left transition-all ${
                          deliveryMethod === 'pickup'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[13px] font-semibold text-gray-900 block">Retirar na loja</span>
                          <span className="text-[11px] text-gray-400">Retire quando estiver pronto</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === 'pickup' ? 'border-gray-900' : 'border-gray-300'
                        }`}>
                          {deliveryMethod === 'pickup' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                        </div>
                      </button>

                      <button
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left transition-all ${
                          deliveryMethod === 'delivery'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                          <HomeIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[13px] font-semibold text-gray-900 block">Receber em casa</span>
                          <span className="text-[11px] text-gray-400">
                            {allExpressDelivery ? 'Entrega Express em ate 1h' : 'Entrega em ate 3 dias'}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === 'delivery' ? 'border-gray-900' : 'border-gray-300'
                        }`}>
                          {deliveryMethod === 'delivery' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step: Address */}
              {checkoutStep === 'address' && (
                <motion.div key="address" {...fadeSlide}>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-5">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-gray-900">Endereco de entrega</h2>
                        <p className="text-[11px] text-gray-400">Para onde enviamos seu pedido</p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">CEP</label>
                        <div className="relative">
                          <Input
                            value={address.cep}
                            onChange={handleCepChange}
                            placeholder="00000-000"
                            maxLength={9}
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                          {loadingCep && <Loader2 className="w-4 h-4 absolute right-3 top-3.5 animate-spin text-gray-400" />}
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Rua</label>
                        <Input
                          value={address.street}
                          onChange={(e) => setAddress((p) => ({ ...p, street: e.target.value }))}
                          placeholder="Nome da rua"
                          className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Numero</label>
                          <Input
                            value={address.number}
                            onChange={(e) => setAddress((p) => ({ ...p, number: e.target.value }))}
                            placeholder="123"
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Complemento</label>
                          <Input
                            value={address.complement}
                            onChange={(e) => setAddress((p) => ({ ...p, complement: e.target.value }))}
                            placeholder="Apto, bloco (opcional)"
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Bairro</label>
                        <Input
                          value={address.neighborhood}
                          onChange={(e) => setAddress((p) => ({ ...p, neighborhood: e.target.value }))}
                          placeholder="Bairro"
                          className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Cidade</label>
                          <Input
                            value={address.city}
                            onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
                            placeholder="Cidade"
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">UF</label>
                          <Select value={address.state} onValueChange={(v) => setAddress((p) => ({ ...p, state: v }))}>
                            <SelectTrigger className="h-11 rounded-xl border-gray-200 text-[14px]">
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step: Payment */}
              {checkoutStep === 'payment' && (
                <motion.div key="payment" {...fadeSlide}>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-5">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-gray-900">Forma de pagamento</h2>
                        <p className="text-[11px] text-gray-400">Como deseja pagar</p>
                      </div>
                    </div>

                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2.5">
                      <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'pix' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                      }`}>
                        <RadioGroupItem value="pix" className="sr-only" />
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                          <QrCode className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-gray-900">PIX</span>
                            <span className="text-[9px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Recomendado</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">Aprovacao instantanea</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                        </div>
                      </label>

                      <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'credit_card' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                      }`}>
                        <RadioGroupItem value="credit_card" className="sr-only" />
                        <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[13px] font-semibold text-gray-900">Cartao de Credito</span>
                          <p className="text-[11px] text-gray-400 mt-0.5">Parcele em ate 12x</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {paymentMethod === 'credit_card' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                        </div>
                      </label>

                      <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'boleto' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                      }`}>
                        <RadioGroupItem value="boleto" className="sr-only" />
                        <div className="w-10 h-10 rounded-xl bg-gray-500 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[13px] font-semibold text-gray-900">Boleto Bancario</span>
                          <p className="text-[11px] text-gray-400 mt-0.5">Vencimento em 3 dias</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'boleto' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {paymentMethod === 'boleto' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                        </div>
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Order summary */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-5 mt-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Resumo do pedido</h3>
                    <div className="space-y-2">
                      {cartItems.map((item) => {
                        const product = productMap[item.product_id];
                        return (
                          <div key={item.id} className="flex justify-between text-[13px]">
                            <span className="text-gray-500 truncate mr-2">{product?.name} (x{item.quantity})</span>
                            <span className="text-gray-900 font-semibold tabular-nums shrink-0">
                              {formatPrice((product?.price || 0) * item.quantity)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t border-gray-100 mt-3 pt-3 space-y-1.5">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-gray-500">Frete</span>
                        <span className={`font-semibold tabular-nums ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[15px] font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900 tabular-nums">{formatPrice(total)}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                      <span>Recebimento:</span>
                      <span className="font-semibold text-gray-600">
                        {deliveryMethod === 'pickup' ? 'Retirar na loja' : 'Entrega'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Fixed bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-lg mx-auto">
            <div className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-5 py-4">
              {checkoutStep === 'delivery' && (
                <Button
                  onClick={handleDeliveryNext}
                  disabled={!deliveryMethod}
                  className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {checkoutStep === 'address' && (
                <Button
                  onClick={() => setCheckoutStep('payment')}
                  disabled={!isAddressValid()}
                  className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all disabled:opacity-40"
                >
                  Continuar para pagamento
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {checkoutStep === 'payment' && (
                <Button
                  onClick={handleSendWhatsApp}
                  className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold active:scale-[0.97] transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" strokeWidth={2} />
                  Enviar pedido via WhatsApp
                </Button>
              )}
              {checkoutStep === 'sending' && (
                <Button disabled className="w-full h-12 rounded-2xl bg-gray-900 text-white text-sm font-semibold opacity-70">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Cart View ──
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Carrinho" showBack />

      <main className="pt-12 max-w-lg mx-auto">
        {isLoading ? (
          <div className="p-4 space-y-5 mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3.5">
                <Skeleton className="w-24 h-24 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-1/3 rounded-lg" />
                  <Skeleton className="h-8 w-24 rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[65vh] px-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-5">
              <ShoppingCart className="w-9 h-9 text-gray-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1.5 tracking-tight">
              Carrinho vazio
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6 max-w-[240px]">
              Explore nossos produtos e adicione o que voce precisa
            </p>
            <Button
              onClick={() => navigate(createPageUrl('Home'))}
              className="h-11 px-6 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all"
            >
              Explorar produtos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <motion.div initial="hidden" animate="visible">
            {/* Header info */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex items-center justify-between px-4 pt-5 pb-2"
            >
              <span className="text-sm text-gray-400">
                {cartCount} {cartCount === 1 ? 'item' : 'itens'}
              </span>
              <button
                onClick={() => clearCartMutation.mutate()}
                disabled={clearCartMutation.isPending}
                className="text-[12px] font-medium text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Limpar tudo
              </button>
            </motion.div>

            {/* Cart Items */}
            <div className="px-4 space-y-5 mt-1">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={fadeUp}
                    custom={index + 1}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                  >
                    <CartItemCard
                      item={item}
                      product={productMap[item.product_id]}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemove}
                      isUpdating={updatingItem === item.id}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue shopping */}
            <motion.div variants={fadeUp} custom={cartItems.length + 1} className="px-4 mt-5">
              <button
                onClick={() => navigate(createPageUrl('Home'))}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-gray-200 text-[13px] font-medium text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Continuar comprando
              </button>
            </motion.div>

            {/* Express delivery banner */}
            {allExpressDelivery && cartItems.length > 0 && (
              <motion.div variants={fadeUp} custom={cartItems.length + 2} className="px-4 mt-4">
                <div className="flex items-center gap-3 bg-gray-900 rounded-2xl p-4">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-white block leading-tight">
                      Entrega Express disponivel
                    </span>
                    <span className="text-[11px] text-white/50">
                      Todos os itens em ate 1 hora
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Order Summary */}
            <motion.div variants={fadeUp} custom={cartItems.length + 3} className="px-4 mt-6 mb-4">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 space-y-3">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Resumo
                  </h3>

                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-gray-500">Subtotal</span>
                      <span className="text-[13px] font-semibold text-gray-900 tabular-nums">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-gray-500">Frete</span>
                      <span
                        className={`text-[13px] font-semibold tabular-nums ${
                          shipping === 0 ? 'text-green-600' : 'text-gray-900'
                        }`}
                      >
                        {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                      </span>
                    </div>
                    {subtotal < 299 && (
                      <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span className="text-[11px] text-gray-400">
                          Faltam {formatPrice(299 - subtotal)} para frete gratis
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900 tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp checkout button */}
                <div className="px-5 pb-5">
                  <Button
                    onClick={handleStartCheckout}
                    className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold active:scale-[0.97] transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" strokeWidth={2} />
                    Finalizar via WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={!!itemToRemove} onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent className="max-w-[320px] rounded-3xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-center">
              Remover item?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-gray-400">
              Tem certeza que deseja remover este item do carrinho?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 mt-2">
            <AlertDialogCancel className="flex-1 h-11 rounded-xl border-gray-200 text-sm font-medium">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
