import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Minus,
  Plus,
  ShoppingCart,
  FileText,
  Bell,
  Check,
  Truck,
  Shield,
  Package,
  ChevronRight,
  RotateCcw,
  GitCompareArrows,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import { useCompare } from '@/contexts/CompareContext';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { mapProductFromApi, mapCartItemFromApi } from '@/api/adapters';
import {
  useSlug,
  useProductDetail,
  useRelatedProducts,
  useCart,
  useAddToCart,
  useUpdateCartItem,
} from '@/api/hooks';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const slug = useSlug();
  const { addToCompare, isInCompare, isFull } = useCompare();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const { data: productRaw, isLoading } = useProductDetail(slug, Number(productId));
  const product = useMemo(() => productRaw ? mapProductFromApi(productRaw) : null, [productRaw]);

  // Map specs from API format
  const specs = useMemo(() => {
    if (!productRaw?.especificacoes) return [];
    return productRaw.especificacoes.map(s => ({ label: s.rotulo, value: s.valor }));
  }, [productRaw]);

  // Map datasheet_url from API format
  const datasheetUrl = productRaw?.fichaTecnicaUrl || null;

  const { data: relatedRaw = [] } = useRelatedProducts(slug, Number(productId), 6);
  const relatedProducts = useMemo(() => {
    // relatedRaw is ProdutoResumoResponse[] — map to local format
    return relatedRaw.map(p => ({
      id: p.id,
      name: p.nome,
      price: p.preco,
      images: p.imagemUrl ? [p.imagemUrl] : [],
    }));
  }, [relatedRaw]);

  const { data: cartItemsRaw = [] } = useCart(slug);
  const cartItems = useMemo(() => cartItemsRaw.map(mapCartItemFromApi), [cartItemsRaw]);
  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  const addToCartMutation = useAddToCart(slug);
  const updateCartItemMutation = useUpdateCartItem(slug);

  const isAvailable = product?.stock > 0;
  const maxQuantity = product?.stock || 1;

  const handleAddToCart = async () => {
    if (!product || !isAvailable) return;
    setIsAdding(true);
    try {
      const existingItem = cartItems.find((item) => item.product_id === product.id);
      if (existingItem) {
        await updateCartItemMutation.mutateAsync({
          id: existingItem.id,
          data: { quantidade: existingItem.quantity + quantity },
        });
      } else {
        await addToCartMutation.mutateAsync({
          produtoId: product.id,
          quantidade: quantity,
        });
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setIsAdding(false);
  };

  const images = product?.images?.length > 0 ? product.images : [];

  const isUsed = product?.condition === 'USADO';
  const hasDiscount = product?.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-32">
        <Header showBack showCart cartCount={cartCount} />
        <main className="pt-12 pb-28 w-full max-w-lg mx-auto">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="px-4 mt-5 space-y-4">
            <Skeleton className="h-7 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-1/3 rounded-lg" />
            <Skeleton className="h-9 w-1/2 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  // ── Not found ──
  if (!product) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header showBack showCart cartCount={cartCount} />
        <main className="pt-12 w-full max-w-lg mx-auto px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">Produto nao encontrado</p>
            <Button
              onClick={() => navigate(createPageUrl('Home'))}
              className="rounded-xl"
            >
              Voltar para Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showBack showCart showShare showFavorite cartCount={cartCount} />

      <main className="pt-12 w-full max-w-lg mx-auto">
        {/* ── Image Gallery (full-bleed) ── */}
        <div className="relative bg-gradient-to-b from-gray-100 to-gray-50">
          <div className="relative aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  src={images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/80 flex items-center justify-center shadow-sm">
                    <Package className="w-10 h-10 text-gray-300" strokeWidth={1.4} />
                  </div>
                  <p className="text-sm font-medium text-gray-300 mt-3">Sem imagem</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gradient overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="flex flex-col gap-2">
                {isAvailable && product.express_delivery && (
                  <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/10">
                    <Truck className="w-3 h-3" />
                    Express 1h
                  </span>
                )}
                {isUsed && isAvailable && (
                  <span className="inline-flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                    <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
                    Seminovo
                  </span>
                )}
                {!isAvailable && (
                  <span className="inline-flex items-center bg-gray-900/70 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg">
                    Indisponivel
                  </span>
                )}
              </div>

              {hasDiscount && isAvailable && (
                <span className="inline-flex items-center gap-1 bg-red-500/90 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="text-[14px] leading-none">-{discountPercent}%</span>
                  <span className="text-white/70 text-[10px] font-medium uppercase">off</span>
                </span>
              )}
            </div>

            {/* Image dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`rounded-full transition-all duration-300 ${
                      currentImage === index
                        ? 'w-6 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Product Info ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="px-4 -mt-4 relative z-10"
        >
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 pb-4">
              {/* Name */}
              <motion.h1
                variants={fadeUp}
                custom={0}
                className="text-xl font-bold text-gray-900 leading-tight tracking-tight"
              >
                {product.name}
              </motion.h1>

              {/* Price block */}
              <motion.div variants={fadeUp} custom={1} className="mt-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through tabular-nums">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </motion.div>

              {/* Installments */}
              <motion.p variants={fadeUp} custom={2} className="text-[13px] text-gray-400 mt-1">
                ou{' '}
                <span className="text-gray-600 font-medium">
                  12x de {formatPrice(product.price / 12)}
                </span>{' '}
                sem juros
              </motion.p>

              {/* Savings callout */}
              {hasDiscount && (
                <motion.div
                  variants={fadeUp}
                  custom={2.5}
                  className="mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  Voce economiza {formatPrice(product.original_price - product.price)}
                </motion.div>
              )}

              {isUsed && (
                <motion.div
                  variants={fadeUp}
                  custom={2.8}
                  className="mt-3 flex items-center gap-2.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-gray-800 block leading-tight">
                      Produto seminovo
                    </span>
                    <span className="text-[11px] text-gray-500">
                      Verificado e com garantia aLink
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Compare Button */}
              {isAvailable && (
                <motion.button
                  variants={fadeUp}
                  custom={3}
                  onClick={() => product && addToCompare(product.id)}
                  disabled={isInCompare(product?.id) || isFull}
                  className={`mt-3 flex items-center gap-2 text-[12px] font-semibold px-3.5 py-2 rounded-xl border transition-all active:scale-95 ${
                    isInCompare(product?.id)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  } disabled:opacity-50`}
                >
                  <GitCompareArrows className="w-4 h-4" strokeWidth={2} />
                  {isInCompare(product?.id) ? 'Adicionado a comparacao' : 'Comparar'}
                </motion.button>
              )}
            </div>

            {/* ── Delivery & Guarantee info ── */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mx-5 border-t border-gray-100 py-4 grid grid-cols-3 gap-3"
            >
              {[
                { icon: Truck, label: 'Entrega', value: product.express_delivery ? '1 hora' : '2-3 dias' },
                { icon: Shield, label: 'Garantia', value: 'Apple' },
                { icon: Package, label: 'Estoque', value: `${product.stock} un.` },
              ].map((info, i) => (
                <div key={i} className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-1.5">
                    <info.icon className="w-4 h-4 text-gray-600" strokeWidth={1.75} />
                  </div>
                  <span className="text-[10px] text-gray-400 block leading-none">{info.label}</span>
                  <span className="text-[12px] font-semibold text-gray-800 block mt-0.5">{info.value}</span>
                </div>
              ))}
            </motion.div>

            {/* ── Quantity Selector ── */}
            {isAvailable && (
              <motion.div variants={fadeUp} custom={4} className="mx-5 pb-5">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">Quantidade</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-all active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-lg text-gray-900 tabular-nums w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                        disabled={quantity >= maxQuantity}
                        className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-all active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── Description ── */}
        {product.description && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="px-4 mt-4"
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                Sobre o produto
              </h2>
              <p className="text-[14px] text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        )}

        {/* ── Specs Grid ── */}
        {specs && specs.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="px-4 mt-4"
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 pb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Especificacoes
                </h2>
              </div>
              <div className="px-5 pb-5 grid grid-cols-2 gap-2.5">
                {specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    custom={index * 0.5}
                    className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100/60"
                  >
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block leading-none">
                      {spec.label}
                    </span>
                    <span className="text-[13px] font-semibold text-gray-800 block mt-1.5 leading-snug">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Datasheet ── */}
        {datasheetUrl && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="px-4 mt-4"
          >
            <a
              href={datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 group hover:border-gray-200 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-900 block">Datasheet</span>
                <span className="text-xs text-gray-400">Baixar ficha tecnica (PDF)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 shrink-0 group-hover:text-gray-400 transition-colors" />
            </a>
          </motion.div>
        )}

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
                Voce tambem pode gostar
              </h2>
            </div>
            <div className="flex gap-3.5 px-4 overflow-x-auto no-scrollbar scroll-smooth pb-1">
              {relatedProducts.map((relProduct, index) => (
                <motion.div
                  key={relProduct.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="w-[170px] shrink-0"
                >
                  <ProductCard
                    product={relProduct}
                    onAddToCart={() => {}}
                    isAdding={false}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Fixed Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-5 py-3.5 flex items-center justify-between gap-4"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400 leading-none">
                Total
              </span>
              <span className="text-lg font-bold text-gray-900 tabular-nums leading-tight mt-0.5">
                {formatPrice(product.price * quantity)}
              </span>
            </div>

            {isAvailable ? (
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`shrink-0 h-11 px-5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                  addedToCart
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                    Adicionado
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1.5" strokeWidth={2} />
                    {isAdding ? 'Adicionando...' : 'Adicionar'}
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="shrink-0 h-11 px-5 rounded-xl text-sm font-medium border-gray-200 text-gray-500 hover:bg-gray-50"
              >
                <Bell className="w-4 h-4 mr-1.5" strokeWidth={1.75} />
                Avise-me
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
