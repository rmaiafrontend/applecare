import { useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronRight, Zap, Truck, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/navigation/BottomNav';
import ProductCard from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { mapProductFromApi, mapCategoryFromApi } from '@/api/adapters';
import {
  useSlug,
  usePublicStore,
  usePublicCategories,
  usePublicProducts,
  usePublicBanners,
  usePublicCatalogSections,
  usePublicHomeConfig,
  useCart,
  useAddToCart,
} from '@/api/hooks';
import { deserializeHomeConfig } from '@/lib/homeConfigSerializer';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Monitor, Cable } from 'lucide-react';

import StoreProfile from './home/sections/StoreProfile';
import HeroBanner from './home/sections/HeroBanner';
import ProductCarousel from './home/sections/ProductCarousel';
import InfoCard from './home/sections/InfoCard';

const categoryIconMap = { Smartphone, Laptop, Tablet, Watch, Headphones, Monitor, Cable };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function Home() {
  const navigate = useNavigate();
  const slug = useSlug();
  const categoriesRef = useRef(null);

  // Data hooks
  const { data: store } = usePublicStore(slug);
  const { data: categoriesRaw = [], isLoading: loadingCategories } = usePublicCategories(slug);
  const { data: productsPage, isLoading: loadingProducts } = usePublicProducts(slug, { tamanho: 200 });
  const { data: heroBanners = [] } = usePublicBanners(slug, 'HERO');
  const { data: catalogSections = [] } = usePublicCatalogSections(slug);
  const { data: homeConfigRaw } = usePublicHomeConfig(slug);
  const { data: cartItems = [] } = useCart(slug);
  const addToCartMutation = useAddToCart(slug);

  const homeConfig = useMemo(() => deserializeHomeConfig(homeConfigRaw), [homeConfigRaw]);

  // Store config
  const config = store?.configuracao;
  const storeName = config?.nomeLoja || 'Apple Link';
  const storeSlogan = config?.sloganLoja || '';
  const whatsapp = config?.numeroWhatsapp || '';
  const instagramUrl = config?.urlInstagram || '';
  const logoUrl = config?.logoUrl || '';

  // Home layout config
  const tiktokUrl = homeConfig.header_tiktok || '';
  const youtubeUrl = homeConfig.header_youtube || '';
  const facebookUrl = homeConfig.header_facebook || '';
  const quickLinks = Array.isArray(homeConfig.header_quick_links) && homeConfig.header_quick_links.length > 0
    ? homeConfig.header_quick_links : null;
  const headerHours = homeConfig.header_hours || {};

  const categories = categoriesRaw.map(mapCategoryFromApi);
  const products = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantidade, 0);
  const heroBanner = heroBanners.find(b => b.ativo) || null;

  // Hero config
  const heroTitle = homeConfig.hero_title || 'Produtos Apple.';
  const heroSubtitle = homeConfig.hero_subtitle || 'Direto pra você.';
  const heroCta = homeConfig.hero_cta_text || heroBanner?.textoCta || 'Explorar produtos';
  const heroCtaLink = homeConfig.hero_cta_link || heroBanner?.link || createPageUrl('Products');
  const heroImage = homeConfig.hero_image_url || heroBanner?.imagemUrl || "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge.jpg";
  const heroBadgeText = homeConfig.hero_badge_text || 'Entrega em 1 hora';
  const heroBadgeActive = homeConfig.hero_badge_active !== false;
  const heroBadgeAnimated = homeConfig.hero_badge_animated !== false;

  // Differentials
  const differentialsActive = homeConfig.differentials_active !== false;
  const differentialsItems = Array.isArray(homeConfig.differentials_items)
    ? homeConfig.differentials_items
    : [{ icon: 'Truck', label: 'Entrega 1h' }, { icon: 'Shield', label: 'Garantia Apple' }, { icon: 'Zap', label: '100% Original' }];

  // AI Button
  const aiButtonActive = homeConfig.ai_button_active !== false;
  const aiButtonTitle = homeConfig.ai_button_title || 'Compra Assistida';
  const aiButtonSubtitle = homeConfig.ai_button_subtitle || 'Converse com a IA e descubra o produto ideal pra você';
  const aiButtonGradientFrom = homeConfig.ai_button_gradient_from || '#6366f1';
  const aiButtonGradientTo = homeConfig.ai_button_gradient_to || '#a855f7';

  // Categories
  const categoriesActive = homeConfig.categories_active !== false;
  const categoriesTitle = homeConfig.categories_title || 'Categorias';
  const categoriesLayout = homeConfig.categories_layout || 'carousel';

  // Secondary Banner
  const secondaryBannerActive = homeConfig.secondary_banner_active !== false;
  const secondaryBannerTitle = homeConfig.secondary_banner_title || 'Destaques';
  const secondaryBannerProductIds = Array.isArray(homeConfig.secondary_banner_product_ids) ? homeConfig.secondary_banner_product_ids : [];
  const secondaryBannerProducts = products.filter(p => secondaryBannerProductIds.includes(p.id));

  // Info Card
  const infoCardActive = homeConfig.info_card_active === true;

  // Carousels
  const carousels = Array.isArray(homeConfig.carousels) ? homeConfig.carousels.filter(c => c.is_active !== false) : [];

  // Product List
  const productListTitle = homeConfig.product_list_title || 'Novidades';
  const productListTemplate = homeConfig.product_list_template || 'launches';
  const productListMaxItems = Number(homeConfig.product_list_max_items) || 6;
  const productListShowCta = homeConfig.product_list_show_cta !== false;
  const productListCtaText = homeConfig.product_list_cta_text || 'Ver todos';
  const productListCuratedIds = Array.isArray(homeConfig.product_list_curated_ids) ? homeConfig.product_list_curated_ids : [];

  const productListItems = useMemo(() => {
    if (productListTemplate === 'offers') {
      return products
        .filter(p => p.stock > 0 && p.original_price && p.original_price > p.price)
        .sort((a, b) => (b.original_price / b.price) - (a.original_price / a.price))
        .slice(0, productListMaxItems);
    }
    if (productListTemplate === 'curated') {
      return products.filter(p => productListCuratedIds.includes(p.id)).slice(0, productListMaxItems);
    }
    return [...products].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, productListMaxItems);
  }, [products, productListTemplate, productListMaxItems, productListCuratedIds]);

  const handleAddToCart = async (product) => {
    try {
      await addToCartMutation.mutateAsync({ produtoId: product.id, quantidade: 1 });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="max-w-lg mx-auto">
        {/* Store Profile */}
        <StoreProfile
          storeName={storeName}
          storeSlogan={storeSlogan}
          logoUrl={logoUrl}
          whatsapp={whatsapp}
          instagramUrl={instagramUrl}
          tiktokUrl={tiktokUrl}
          youtubeUrl={youtubeUrl}
          facebookUrl={facebookUrl}
          quickLinks={quickLinks}
          headerHours={headerHours}
        />

        {/* Hero Banner */}
        <HeroBanner
          image={heroImage}
          title={heroTitle}
          subtitle={heroSubtitle}
          ctaText={heroCta}
          ctaLink={heroCtaLink}
          badgeText={heroBadgeText}
          badgeActive={heroBadgeActive}
          badgeAnimated={heroBadgeAnimated}
        />

        {/* Benefits Strip */}
        {differentialsActive && (
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="flex items-center gap-2 px-4 mt-5 overflow-x-auto no-scrollbar"
          >
            {differentialsItems.map((item, i) => {
              const IconComp = item.icon ? ({ Truck, Shield, Zap }[item.icon] || null) : null;
              return (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2.5 shrink-0">
                  {item.emoji ? (
                    <span className="text-base">{item.emoji}</span>
                  ) : IconComp ? (
                    <IconComp className="w-4 h-4 text-gray-900" strokeWidth={2} />
                  ) : (
                    <Shield className="w-4 h-4 text-gray-900" strokeWidth={2} />
                  )}
                  <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{item.label || item.text}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* AI Button */}
        {aiButtonActive && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="px-4 mt-5">
            <button
              onClick={() => navigate('/Search')}
              className="w-full relative overflow-hidden rounded-2xl p-4 text-left group active:scale-[0.98] transition-transform"
              style={{ background: `linear-gradient(to right, ${aiButtonGradientFrom}, ${aiButtonGradientTo})` }}
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
                  <span className="text-[13px] font-bold text-white block leading-tight">{aiButtonTitle}</span>
                  <span className="text-[11px] text-white/60 block mt-0.5">{aiButtonSubtitle}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}

        {/* Categories */}
        {categoriesActive && (
          <section className="mt-8">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">{categoriesTitle}</h2>
              <Link to={createPageUrl('Categories')} className="text-sm font-medium text-gray-400 flex items-center gap-0.5 hover:text-gray-600 transition-colors">
                Ver todas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loadingCategories ? (
              <div className="flex gap-1 px-4 overflow-hidden">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-[100px] h-[110px] rounded-2xl shrink-0" />)}
              </div>
            ) : (
              <div
                ref={categoriesRef}
                className={categoriesLayout === 'grid' ? "grid grid-cols-4 gap-3 px-4" : "flex gap-1 px-4 overflow-x-auto no-scrollbar scroll-smooth"}
              >
                {categories.map((cat, index) => {
                  const Icon = categoryIconMap[cat.icon] || Smartphone;
                  return (
                    <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }}>
                      <Link to={createPageUrl(`Products?category=${cat.id}`)} className={`group flex flex-col items-center gap-2.5 ${categoriesLayout === 'grid' ? '' : 'w-[88px] shrink-0'}`}>
                        <div className="w-16 h-16 rounded-2xl bg-store-primary flex items-center justify-center transition-all duration-200 group-hover:opacity-90 group-hover:scale-105 group-active:scale-95">
                          <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold text-gray-800 block leading-tight text-center">{cat.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Secondary Banner */}
        <ProductCarousel
          title={secondaryBannerTitle}
          products={secondaryBannerActive ? secondaryBannerProducts.slice(0, 4) : []}
          onAddToCart={handleAddToCart}
          layout="grid"
          showCta={false}
        />

        {/* Dynamic Catalog Sections */}
        {catalogSections.map((section) => (
          <ProductCarousel
            key={section.id}
            title={section.titulo}
            subtitle={section.subtitulo}
            products={section.produtos?.map(p => ({
              id: p.id, name: p.nome, price: p.preco,
              images: p.imagemUrl ? [p.imagemUrl] : [], stock: 1,
            })) || []}
            onAddToCart={handleAddToCart}
          />
        ))}

        {/* Dynamic Carousels */}
        {carousels.map((carousel, ci) => {
          const items = carousel.source_type === 'category'
            ? products.filter(p => String(p.category_id) === String(carousel.source_value))
            : products.filter(p => p.tags?.some(t => t.slug === carousel.source_value || t.name === carousel.source_value));
          return (
            <ProductCarousel
              key={ci}
              title={carousel.title || 'Produtos'}
              products={items.slice(0, 12)}
              onAddToCart={handleAddToCart}
            />
          );
        })}

        {/* Product List */}
        <ProductCarousel
          title={productListTitle}
          products={productListItems}
          onAddToCart={handleAddToCart}
          layout="grid"
          showCta={productListShowCta}
          ctaText={productListCtaText}
        />

        {/* Info Card */}
        {infoCardActive && (
          <InfoCard
            emoji={homeConfig.info_card_emoji}
            title={homeConfig.info_card_title}
            description={homeConfig.info_card_description}
            ctaText={homeConfig.info_card_cta_text}
            ctaLink={homeConfig.info_card_cta_link}
            bgColor={homeConfig.info_card_bg_color || '#1c1c1e'}
          />
        )}

        {/* Loading state */}
        {loadingProducts && (
          <div className="px-4 mt-8">
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3].map(i => <Skeleton key={i} className="w-[200px] h-[280px] rounded-2xl shrink-0" />)}
            </div>
          </div>
        )}
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
