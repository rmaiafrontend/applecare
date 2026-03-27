import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import Header from '@/components/navigation/Header';
import { useCompare } from '@/contexts/CompareContext';
import ProductCard from '@/components/product/ProductCard';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfoCard from '@/components/product/ProductInfoCard';
import ProductBottomCTA from '@/components/product/ProductBottomCTA';
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
    opacity: 1, y: 0,
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

  const specs = useMemo(() => {
    if (!productRaw?.especificacoes) return [];
    return productRaw.especificacoes.map(s => ({ label: s.rotulo, value: s.valor }));
  }, [productRaw]);

  const datasheetUrl = productRaw?.fichaTecnicaUrl || null;

  const { data: relatedRaw = [] } = useRelatedProducts(slug, Number(productId), 6);
  const relatedProducts = useMemo(() => {
    return relatedRaw.map(p => ({
      id: p.id, name: p.nome, price: p.preco,
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
  const images = product?.images?.length > 0 ? product.images : [];
  const isUsed = product?.condition === 'USADO';
  const hasDiscount = product?.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.original_price) * 100) : 0;

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
        await addToCartMutation.mutateAsync({ produtoId: product.id, quantidade: quantity });
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setIsAdding(false);
  };

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

  if (!product) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header showBack showCart cartCount={cartCount} />
        <main className="pt-12 w-full max-w-lg mx-auto px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">Produto nao encontrado</p>
            <Button onClick={() => navigate(createPageUrl('Home'))} className="rounded-xl">
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
        <ProductImageGallery
          images={images}
          currentImage={currentImage}
          onChangeImage={setCurrentImage}
          isAvailable={isAvailable}
          expressDelivery={product.express_delivery}
          isUsed={isUsed}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
          productName={product.name}
        />

        <ProductInfoCard
          product={product}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
          isUsed={isUsed}
          isAvailable={isAvailable}
          quantity={quantity}
          maxQuantity={maxQuantity}
          onChangeQuantity={setQuantity}
          onCompare={() => addToCompare(product.id)}
          isInCompare={isInCompare(product.id)}
          isCompareFull={isFull}
        />

        {/* Description */}
        {product.description && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className="px-4 mt-4">
            <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-store-text/40 mb-3">Sobre o produto</h2>
              <p className="text-[14px] text-store-text/70 leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        )}

        {/* Specs */}
        {specs.length > 0 && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} className="px-4 mt-4">
            <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm overflow-hidden">
              <div className="p-5 pb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-store-text/40">Especificacoes</h2>
              </div>
              <div className="px-5 pb-5 grid grid-cols-2 gap-2.5">
                {specs.map((spec, index) => (
                  <motion.div key={index} variants={fadeUp} custom={index * 0.5} className="bg-store-secondary rounded-2xl p-3.5 border border-store-secondary/30">
                    <span className="text-[10px] font-medium text-store-text/40 uppercase tracking-wider block leading-none">{spec.label}</span>
                    <span className="text-[13px] font-semibold text-store-text block mt-1.5 leading-snug">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Datasheet */}
        {datasheetUrl && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="px-4 mt-4">
            <a href={datasheetUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm p-5 group hover:border-store-secondary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-store-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-store-text block">Datasheet</span>
                <span className="text-xs text-store-text/40">Baixar ficha tecnica (PDF)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-store-text/30 shrink-0 group-hover:text-gray-400 transition-colors" />
            </a>
          </motion.div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-8">
            <div className="px-4 mb-4">
              <h2 className="text-[17px] font-bold text-store-text tracking-tight">Voce tambem pode gostar</h2>
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
                  <ProductCard product={relProduct} onAddToCart={() => {}} isAdding={false} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <ProductBottomCTA
        price={product.price}
        quantity={quantity}
        isAvailable={isAvailable}
        isAdding={isAdding}
        addedToCart={addedToCart}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
