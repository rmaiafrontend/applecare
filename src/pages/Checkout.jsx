const PAYMENT_METHOD_MAP = { pix: 'PIX', credit_card: 'CARTAO', boleto: 'DINHEIRO' };

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight, Truck, ArrowRight, Lock, Loader2 } from 'lucide-react';
import Header from '@/components/navigation/Header';
import CheckoutAddressForm from '@/components/checkout/CheckoutAddressForm';
import CheckoutPaymentForm from '@/components/checkout/CheckoutPaymentForm';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import { mapCartItemFromApi, mapProductFromApi } from '@/api/adapters';
import {
  useSlug, useCart, usePublicProducts, useClearCart, useCreateOrder,
} from '@/api/hooks';

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

  const productMap = useMemo(() =>
    products.reduce((acc, p) => { acc[p.id] = p; return acc; }, {}),
    [products]
  );

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

  const isAddressValid = () =>
    address.cep && address.street && address.number &&
    address.neighborhood && address.city && address.state;

  const isPaymentValid = () => !!payment.document;

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const orderItems = cartItems.map((item) => ({
        produtoId: item.product_id, quantidade: item.quantity,
      }));

      const orderResult = await createOrderMutation.mutateAsync({
        metodoPagamento: PAYMENT_METHOD_MAP[payment.method] || payment.method,
        paraEntrega: true,
        enderecoCep: address.cep.replace(/\D/g, ''),
        enderecoRua: address.street,
        enderecoNumero: address.number,
        enderecoComplemento: address.complement || undefined,
        enderecoBairro: address.neighborhood,
        enderecoCidade: address.city,
        enderecoEstado: address.state,
        itens: orderItems,
      });

      const orderNumber = orderResult?.numeroPedido || `APL-${Date.now().toString().slice(-5)}`;
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
        {/* Step Indicator */}
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
                {i === 0 && <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Order Preview Strip */}
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
              <span className="text-[12px] text-gray-500 block">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
              <span className="text-[14px] font-bold text-gray-900 tabular-nums">{formatPrice(total)}</span>
            </div>
            {allExpressDelivery && (
              <div className="flex items-center gap-1 bg-gray-900 text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-full">
                <Truck className="w-3 h-3" /> 1h
              </div>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="address" {...fadeSlide}>
                <CheckoutAddressForm address={address} onChange={setAddress} />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div key="payment" {...fadeSlide}>
                <CheckoutPaymentForm payment={payment} onChange={setPayment} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
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
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...</>
                ) : (
                  <><Lock className="w-4 h-4 mr-2" /> Finalizar pedido</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
