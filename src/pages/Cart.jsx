import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Trash2, Truck, ArrowRight, Tag } from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import CartItemCard from '@/components/cart/CartItemCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [cartCount, setCartCount] = useState(0);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);

  const { data: cartItems = [], isLoading: loadingCart, refetch: refetchCart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);

  const productMap = products.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }) => {
      if (quantity < 1) return;
      await base44.entities.CartItem.update(itemId, { quantity });
    },
    onSuccess: () => {
      refetchCart();
      setUpdatingItem(null);
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId) => {
      await base44.entities.CartItem.delete(itemId);
    },
    onSuccess: () => {
      refetchCart();
      setItemToRemove(null);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await Promise.all(cartItems.map((item) => base44.entities.CartItem.delete(item.id)));
    },
    onSuccess: () => {
      refetchCart();
    },
  });

  const handleUpdateQuantity = (itemId, quantity) => {
    setUpdatingItem(itemId);
    updateQuantityMutation.mutate({ itemId, quantity });
  };

  const handleRemove = (itemId) => {
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeItemMutation.mutate(itemToRemove);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

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

                {/* Checkout button */}
                <div className="px-5 pb-5">
                  <Button
                    onClick={() => navigate(createPageUrl('Checkout'))}
                    className="w-full h-12 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold active:scale-[0.97] transition-all"
                  >
                    Finalizar compra
                    <ArrowRight className="w-4 h-4 ml-2" />
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
