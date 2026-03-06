import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Clock, ChevronRight, Zap, Truck, Shield, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import ProductCard from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Monitor,
  Cable,
} from 'lucide-react';

const categoryIconMap = {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Monitor,
  Cable,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function Home() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [addingProduct, setAddingProduct] = useState(null);
  const categoriesRef = useRef(null);

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list('order'),
  });

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 200),
  });

  const { data: cartItems = [], refetch: refetchCart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);

  const expressProducts = products.filter(p => p.stock > 0 && p.express_delivery);
  const featuredProducts = expressProducts.slice(0, 6);

  const discountProducts = products
    .filter(p => p.stock > 0 && p.original_price && p.original_price > p.price)
    .sort((a, b) => (1 - a.price / a.original_price) - (1 - b.price / b.original_price))
    .reverse()
    .slice(0, 6);

  const heroProduct = products.find(p => p.stock > 0 && p.express_delivery && p.original_price > p.price) || products[0];

  const productCountByCategory = products.reduce((acc, product) => {
    if (product.category_id) {
      acc[product.category_id] = (acc[product.category_id] || 0) + 1;
    }
    return acc;
  }, {});

  const handleAddToCart = async (product) => {
    setAddingProduct(product.id);
    try {
      const existingItem = cartItems.find(item => item.product_id === product.id);
      if (existingItem) {
        await base44.entities.CartItem.update(existingItem.id, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        await base44.entities.CartItem.create({
          product_id: product.id,
          quantity: 1,
        });
      }
      refetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setAddingProduct(null);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showSearch showCart cartCount={cartCount} onSearch={() => navigate('/Search')} />

      <main className="pt-12 max-w-lg mx-auto">
        {/* ── Hero Banner ── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-4 mt-4 rounded-3xl overflow-hidden"
        >
          <div className="relative p-6 pb-7">
            <img
              src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&h=500&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(3,7,18,0.95), rgba(17,24,39,0.85), rgba(31,41,55,0.5))' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.6), transparent)' }} />

            <div className="relative z-10">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 mb-4 border border-white/[0.08]"
              >
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="font-medium text-white/90 text-[11px] tracking-widest uppercase">
                  Entrega em 1 hora
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-[28px] font-bold mb-2 leading-[1.15] text-white tracking-tight"
              >
                Produtos Apple.
                <br />
                <span className="text-white/60">Direto pra voce.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-white/50 text-sm mb-6 leading-relaxed max-w-[240px]"
              >
                Originais com garantia. Entrega express na sua porta.
              </motion.p>

              <motion.div variants={fadeUp} custom={3}>
                <Link
                  to={createPageUrl('Products')}
                  className="group inline-flex items-center gap-2.5 bg-white text-gray-900 px-5 py-3 rounded-2xl font-semibold text-sm transition-all hover:bg-white/95 active:scale-[0.97]"
                >
                  Explorar produtos
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ── Benefits Strip ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex items-center gap-2 px-4 mt-5 overflow-x-auto no-scrollbar"
        >
          {[
            { icon: Truck, label: 'Entrega 1h' },
            { icon: Shield, label: 'Garantia Apple' },
            { icon: Zap, label: '100% Original' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2.5 shrink-0"
            >
              <item.icon className="w-4 h-4 text-gray-900" strokeWidth={2} />
              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Smart Search Banner ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="px-4 mt-5"
        >
          <button
            onClick={() => navigate('/Search')}
            className="w-full relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-4 text-left group active:scale-[0.98] transition-transform"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-bold text-white block leading-tight">
                  Compra Assistida
                </span>
                <span className="text-[11px] text-white/60 block mt-0.5">
                  Converse com a IA e descubra o produto ideal pra voce
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/50 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* ── Categories (Horizontal Scroll) ── */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Categorias</h2>
            <Link
              to={createPageUrl('Categories')}
              className="text-sm font-medium text-gray-400 flex items-center gap-0.5 hover:text-gray-600 transition-colors"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingCategories ? (
            <div className="flex gap-3 px-4 overflow-hidden">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="w-[100px] h-[110px] rounded-2xl shrink-0" />
              ))}
            </div>
          ) : (
            <div
              ref={categoriesRef}
              className="flex gap-3 px-4 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {categories.map((cat, index) => {
                const Icon = categoryIconMap[cat.icon] || Smartphone;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={createPageUrl(`Products?category=${cat.id}`)}
                      className="group flex flex-col items-center gap-2.5 w-[88px] shrink-0"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center transition-all duration-200 group-hover:bg-gray-800 group-hover:scale-105 group-active:scale-95">
                        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-semibold text-gray-800 block leading-tight">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">
                          {productCountByCategory[cat.id] || 0} itens
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Featured Product Spotlight ── */}
        {heroProduct && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="mx-4 mt-8"
          >
            <Link
              to={createPageUrl(`ProductDetail?id=${heroProduct.id}`)}
              className="block group"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-100">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={heroProduct.images?.[0]}
                    alt={heroProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {heroProduct.express_delivery && (
                        <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10">
                          <Truck className="w-3 h-3" />
                          Express
                        </span>
                      )}
                      {heroProduct.original_price > heroProduct.price && (
                        <span className="inline-flex items-center bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                          -{Math.round((1 - heroProduct.price / heroProduct.original_price) * 100)}%
                        </span>
                      )}
                    </div>
                    <h3 className="text-white text-lg font-bold leading-snug mb-1 drop-shadow-sm">
                      {heroProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-xl font-bold">
                        {formatPrice(heroProduct.price)}
                      </span>
                      {heroProduct.original_price > heroProduct.price && (
                        <span className="text-white/50 text-sm line-through">
                          {formatPrice(heroProduct.original_price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* ── Express Delivery Products ── */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
                Entrega Express
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Receba em ate 1 hora</p>
            </div>
            <Link
              to={createPageUrl('Products')}
              className="text-sm font-medium text-gray-400 flex items-center gap-0.5 hover:text-gray-600 transition-colors"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProducts ? (
            <div className="flex gap-4 px-4 overflow-hidden">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="w-[200px] h-[280px] rounded-2xl shrink-0" />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="flex gap-3.5 px-4 overflow-x-auto no-scrollbar scroll-smooth pb-1">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="w-[170px] shrink-0"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    isAdding={addingProduct === product.id}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              Nenhum produto disponivel
            </div>
          )}
        </section>

        {/* ── Promo Banner ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="mx-4 mt-8"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 p-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/[0.03] rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/[0.02] rounded-full blur-xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                <span className="text-[11px] font-medium text-white/50 tracking-widest uppercase">
                  Garantia Apple
                </span>
              </div>
              <h3 className="text-white text-lg font-bold leading-snug mb-1.5">
                Todos os produtos sao
                <br />
                100% originais.
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Garantia oficial Apple em todos os itens da loja.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Offers / Discounts ── */}
        {discountProducts.length > 0 && (
          <section className="mt-8 mb-6">
            <div className="flex items-center justify-between px-4 mb-4">
              <div>
                <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Ofertas</h2>
                <p className="text-xs text-gray-400 mt-0.5">Melhores precos para voce</p>
              </div>
              <Link
                to={createPageUrl('Products')}
                className="text-sm font-medium text-gray-400 flex items-center gap-0.5 hover:text-gray-600 transition-colors"
              >
                Ver todos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3.5 px-4">
              {discountProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    isAdding={addingProduct === product.id}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
