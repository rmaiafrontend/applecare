import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  ArrowRight,
  MapPin,
  CreditCard,
  QrCode,
  FileText,
  Store,
  Home as HomeIcon,
  ChevronLeft,
  Loader2,
  Check,
  MessageCircle,
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
import { utilsService } from '@/api/services';

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

export default function CheckoutFlow({
  cartItems,
  cartCount,
  productMap,
  subtotal,
  shipping,
  total,
  allExpressDelivery,
  onSendOrder,
  isSending,
}) {
  const [step, setStep] = useState('delivery'); // 'delivery' | 'address' | 'payment'
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loadingCep, setLoadingCep] = useState(false);
  const [address, setAddress] = useState({
    cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '',
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

  const handleBack = () => {
    if (step === 'payment') {
      setStep(deliveryMethod === 'delivery' ? 'address' : 'delivery');
    } else if (step === 'address') {
      setStep('delivery');
    }
  };

  const handleDeliveryNext = () => {
    setStep(deliveryMethod === 'delivery' ? 'address' : 'payment');
  };

  const handleSubmit = () => {
    onSendOrder({ deliveryMethod, paymentMethod, address });
  };

  const steps = ['delivery', ...(deliveryMethod === 'delivery' ? ['address'] : []), 'payment'];
  const stepLabels = { delivery: 'Recebimento', address: 'Endereco', payment: 'Pagamento' };

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header
        title={stepLabels[step]}
        showBack
        onBack={step === 'delivery' ? undefined : handleBack}
      />

      <main className="pt-12 max-w-lg mx-auto">
        {/* Step indicator */}
        <div className="px-4 pt-5 pb-4 flex items-center gap-2">
          {steps.map((s, i) => {
            const currentIdx = steps.indexOf(step);
            const stepIdx = steps.indexOf(s);
            const isDone = stepIdx < currentIdx;
            const isCurrent = s === step;

            return (
              <React.Fragment key={s}>
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
                  {stepLabels[s]}
                </span>
                {i < steps.length - 1 && (
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
            {step === 'delivery' && (
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
                        deliveryMethod === 'pickup' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
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
                        deliveryMethod === 'delivery' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
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
            {step === 'address' && (
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
            {step === 'payment' && (
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
            {step === 'delivery' && (
              <Button
                onClick={handleDeliveryNext}
                disabled={!deliveryMethod}
                className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all disabled:opacity-40"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {step === 'address' && (
              <Button
                onClick={() => setStep('payment')}
                disabled={!isAddressValid()}
                className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all disabled:opacity-40"
              >
                Continuar para pagamento
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {step === 'payment' && (
              <Button
                onClick={handleSubmit}
                disabled={isSending}
                className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold active:scale-[0.97] transition-all"
              >
                {isSending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
                ) : (
                  <><MessageCircle className="w-4 h-4 mr-2" strokeWidth={2} /> Enviar pedido via WhatsApp</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
