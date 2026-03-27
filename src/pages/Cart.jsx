const PAYMENT_METHOD_MAP = { pix: 'PIX', credit_card: 'CARTAO', boleto: 'DINHEIRO' };

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Truck } from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import CartItemCard from '@/components/cart/CartItemCard';
import CartEmptyState from '@/components/cart/CartEmptyState';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutFlow from '@/components/cart/CheckoutFlow';
import RemoveItemDialog from '@/components/cart/RemoveItemDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { mapCartItemFromApi, mapProductFromApi } from '@/api/adapters';
import {
  useSlug,
  usePublicProducts,
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  useCreateOrder,
} from '@/api/hooks';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Cart() {
  const navigate = useNavigate();
  const slug = useSlug();
  const [itemToRemove, setItemToRemove] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { data: cartItemsRaw = [], isLoading: loadingCart } = useCart(slug);
  const cartItems = useMemo(() => cartItemsRaw.map(mapCartItemFromApi), [cartItemsRaw]);

  const { data: productsPage, isLoading: loadingProducts } = usePublicProducts(slug, { tamanho: 200 });
  const products = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);

  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  const productMap = useMemo(() =>
    products.reduce((acc, product) => { acc[product.id] = product; return acc; }, {}),
    [products]
  );

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

  const handleSendOrder = async ({ deliveryMethod, paymentMethod, address }) => {
    setIsSending(true);

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

      await clearCartMutation.mutateAsync();

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      navigate(createPageUrl(`OrderConfirmation?order=${orderNumber}&wa=${encodeURIComponent(whatsappUrl)}`));

      setShowCheckout(false);
    } catch (error) {
      console.error('Error saving order:', error);
    }
    setIsSending(false);
  };

  // ── Checkout Flow ──
  if (showCheckout && !isEmpty) {
    return (
      <CheckoutFlow
        cartItems={cartItems}
        cartCount={cartCount}
        productMap={productMap}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        allExpressDelivery={allExpressDelivery}
        onSendOrder={handleSendOrder}
        isSending={isSending}
      />
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
          <CartEmptyState onExplore={() => navigate(createPageUrl('Home'))} />
        ) : (
          <motion.div initial="hidden" animate="visible">
            {/* Header info */}
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-between px-4 pt-5 pb-2">
              <span className="text-sm text-store-text/40">
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
                      onRemove={(id) => setItemToRemove(id)}
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
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-store-secondary text-[13px] font-medium text-store-text/40 hover:text-store-text/60 hover:border-store-text/20 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Continuar comprando
              </button>
            </motion.div>

            {/* Express delivery banner */}
            {allExpressDelivery && cartItems.length > 0 && (
              <motion.div variants={fadeUp} custom={cartItems.length + 2} className="px-4 mt-4">
                <div className="flex items-center gap-3 bg-store-primary rounded-2xl p-4">
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
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onCheckout={() => setShowCheckout(true)}
              />
            </motion.div>
          </motion.div>
        )}
      </main>

      <RemoveItemDialog
        open={!!itemToRemove}
        onClose={() => setItemToRemove(null)}
        onConfirm={confirmRemove}
      />

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
