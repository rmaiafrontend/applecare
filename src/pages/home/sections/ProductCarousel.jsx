import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';

export default function ProductCarousel({
  title,
  subtitle,
  products,
  onAddToCart,
  layout = 'carousel',
  ctaText = 'Ver todos',
  ctaLink,
  showCta = true,
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {showCta && (
          <Link
            to={ctaLink || createPageUrl('Products')}
            className="text-sm font-medium text-gray-400 flex items-center gap-0.5 hover:text-gray-600 transition-colors"
          >
            {ctaText}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-2 gap-3.5 px-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex gap-3.5 px-4 overflow-x-auto no-scrollbar scroll-smooth pb-1">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="w-[170px] shrink-0"
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
