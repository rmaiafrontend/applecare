const PAYMENT_METHOD_MAP = { pix: 'PIX', credit_card: 'CARTAO', boleto: 'DINHEIRO' };

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CreditCard,
  Check,
  QrCode,
  FileText,
  Loader2,
  ChevronRight,
  Truck,
  ArrowRight,
  Lock,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPrice } from '@/lib/format';
import { mapCartItemFromApi, mapProductFromApi } from '@/api/adapters';
import { utilsService } from '@/api/services';
import {
  useSlug,
  useCart,
  usePublicProducts,
  useClearCart,
  useCreateOrder,
} from '@/api/hooks';

const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

const fadeSlide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

export default function Checkout() {
  const navigate = useNavigate();
  const slug = useSlug();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const [address, setAddress] = useState({
    cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '',
  });

  const [payment, setPayment] = useState({
    method: 'pix', document: '', documentType: 'cpf',
  });

  const { data: cartItemsRaw = [] } = useCart(slug);
  const cartItems = useMemo(() => cartItemsRaw.map(mapCartItemFromApi), [cartItemsRaw]);

  const { data: productsPage } = usePublicProducts(slug, { tamanho: 200 });
  const products = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);

  const clearCartMutation = useClearCart(slug);
  const createOrderMutation = useCreateOrder(slug);

  const productMap = products.reduce((acc, p) => { acc[p.id] = p; return acc; }, {});

  const subtotal = cartItems.reduce((sum, item) => {
    const product = productMap[item.product_id];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal >= 299 ? 0 : 19.9;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const allExpressDelivery = cartItems.every((item) => {
    const product = productMap[item.product_id];
    return product?.express_delivery && product?.stock > 0;
  });

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

  const isPaymentValid = () => {
    if (!payment.document) return false;
    return true;
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const orderItems = cartItems.map((item) => ({
        produtoId: item.product_id,
        quantidade: item.quantity,
      }));

      const orderResult = await createOrderMutation.mutateAsync({
        metodoPagamento: PAYMENT_METHOD_MAP[payment.method] || payment.method,
        observacao: `Endereco: ${address.street}, ${address.number} - ${address.city}/${address.state}`,
        itens: orderItems,
      });

      const orderNumber = orderResult?.numeroPedido || `APL-${Date.now().toString().slice(-5)}`;

      // Clear cart
      await clearCartMutation.mutateAsync();

      navigate(createPageUrl(`OrderConfirmation?order=${orderNumber}`));
    } catch (error) {
      console.error('Error creating order:', error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header title="Checkout" showBack />

      <main className="pt-12 max-w-lg mx-auto">
        {/* ── Step Indicator ── */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: 1, label: 'Endereco' },
              { id: 2, label: 'Pagamento' },
            ].map((step, i) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold transition-all ${
                    currentStep === step.id
                      ? 'bg-gray-900 text-white'
                      : currentStep > step.id
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : (
                    <span className="w-4 text-center">{step.id}</span>
                  )}
                  {step.label}
                </button>
                {i === 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Order Preview Strip ── */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3.5 border border-gray-100">
            <div className="flex -space-x-2">
              {cartItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-gray-50 overflow-hidden"
                >
                  <img
                    src={productMap[item.product_id]?.images?.[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {cartItems.length > 3 && (
                <div className="w-10 h-10 rounded-xl bg-gray-200 border-2 border-gray-50 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-500">
                    +{cartItems.length - 3}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] text-gray-500 block">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </span>
              <span className="text-[14px] font-bold text-gray-900 tabular-nums">
                {formatPrice(total)}
              </span>
            </div>
            {allExpressDelivery && (
              <div className="flex items-center gap-1 bg-gray-900 text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-full">
                <Truck className="w-3 h-3" />
                1h
              </div>
            )}
          </div>
        </div>

        {/* ── Step Content ── */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="address" {...fadeSlide}>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5">
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
                      {/* CEP */}
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                          CEP
                        </label>
                        <div className="relative">
                          <Input
                            value={address.cep}
                            onChange={handleCepChange}
                            placeholder="00000-000"
                            maxLength={9}
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                          {loadingCep && (
                            <Loader2 className="w-4 h-4 absolute right-3 top-3.5 animate-spin text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Street */}
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                          Rua
                        </label>
                        <Input
                          value={address.street}
                          onChange={(e) => setAddress((p) => ({ ...p, street: e.target.value }))}
                          placeholder="Nome da rua"
                          className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                        />
                      </div>

                      {/* Number + Complement */}
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                            Numero
                          </label>
                          <Input
                            value={address.number}
                            onChange={(e) => setAddress((p) => ({ ...p, number: e.target.value }))}
                            placeholder="123"
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                            Complemento
                          </label>
                          <Input
                            value={address.complement}
                            onChange={(e) => setAddress((p) => ({ ...p, complement: e.target.value }))}
                            placeholder="Apto, bloco (opcional)"
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      {/* Neighborhood */}
                      <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                          Bairro
                        </label>
                        <Input
                          value={address.neighborhood}
                          onChange={(e) => setAddress((p) => ({ ...p, neighborhood: e.target.value }))}
                          placeholder="Bairro"
                          className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                        />
                      </div>

                      {/* City + State */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                            Cidade
                          </label>
                          <Input
                            value={address.city}
                            onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
                            placeholder="Cidade"
                            className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
                            UF
                          </label>
                          <Select
                            value={address.state}
                            onValueChange={(v) => setAddress((p) => ({ ...p, state: v }))}
                          >
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
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="payment" {...fadeSlide} className="space-y-4">
                {/* Payment methods */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-gray-900">Pagamento</h2>
                        <p className="text-[11px] text-gray-400">Escolha como quer pagar</p>
                      </div>
                    </div>

                    <RadioGroup
                      value={payment.method}
                      onValueChange={(v) => setPayment((p) => ({ ...p, method: v }))}
                      className="space-y-2.5"
                    >
                      {/* PIX */}
                      <label
                        className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          payment.method === 'pix'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <RadioGroupItem value="pix" className="sr-only" />
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                          <QrCode className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-gray-900">PIX</span>
                            <span className="text-[9px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Recomendado
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">Aprovacao instantanea</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            payment.method === 'pix' ? 'border-gray-900' : 'border-gray-300'
                          }`}
                        >
                          {payment.method === 'pix' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                          )}
                        </div>
                      </label>

                      {/* Dinheiro */}
                      <label
                        className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          payment.method === 'boleto'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <RadioGroupItem value="boleto" className="sr-only" />
                        <div className="w-10 h-10 rounded-xl bg-gray-500 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[13px] font-semibold text-gray-900">Boleto Bancario</span>
                          <p className="text-[11px] text-gray-400 mt-0.5">Vencimento em 3 dias</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            payment.method === 'boleto' ? 'border-gray-900' : 'border-gray-300'
                          }`}
                        >
                          {payment.method === 'boleto' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                          )}
                        </div>
                      </label>
                    </RadioGroup>

                  </div>
                </div>

                {/* Document */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-2.5">
                    CPF/CNPJ para nota fiscal
                  </label>
                  <div className="flex gap-2.5">
                    <Select
                      value={payment.documentType}
                      onValueChange={(v) => setPayment((p) => ({ ...p, documentType: v }))}
                    >
                      <SelectTrigger className="w-[88px] h-11 rounded-xl border-gray-200 text-[13px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpf">CPF</SelectItem>
                        <SelectItem value="cnpj">CNPJ</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={payment.document}
                      onChange={(e) => setPayment((p) => ({ ...p, document: e.target.value }))}
                      placeholder={payment.documentType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                      className="flex-1 h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Fixed Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-5 py-4">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Total</span>
              <span className="text-lg font-bold text-gray-900 tabular-nums">{formatPrice(total)}</span>
            </div>

            {currentStep === 1 ? (
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!isAddressValid()}
                className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all disabled:opacity-40"
              >
                Continuar para pagamento
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isPaymentValid() || isProcessing}
                className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all disabled:opacity-40"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Finalizar pedido
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
