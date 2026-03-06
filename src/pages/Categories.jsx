import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Monitor,
  Cable,
  ArrowRight,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap = {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Monitor,
  Cable,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Categories() {
  const [cartCount, setCartCount] = useState(0);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list('order'),
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);

  const productCountByCategory = products.reduce((acc, product) => {
    if (product.category_id) {
      acc[product.category_id] = (acc[product.category_id] || 0) + 1;
    }
    return acc;
  }, {});

  // Get first product image for each category
  const categoryImage = (catId) => {
    const p = products.find((prod) => prod.category_id === catId && prod.images?.length > 0);
    return p?.images?.[0] || null;
  };

  // First category gets a large featured card, rest in grid
  const featured = categories[0];
  const rest = categories.slice(1);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Categorias" showBack showCart cartCount={cartCount} />

      <main className="pt-12 max-w-lg mx-auto">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="px-4 pt-6 pb-5"
        >
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Explore
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Encontre o produto Apple ideal para voce
          </p>
        </motion.div>

        {isLoading ? (
          <div className="px-4 space-y-3">
            <Skeleton className="h-48 rounded-3xl" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 space-y-3">
            {/* Featured category - large card */}
            {featured && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
              >
                <Link
                  to={createPageUrl(`Products?category=${featured.id}`)}
                  className="group block relative rounded-3xl overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-gray-900">
                    {categoryImage(featured.id) ? (
                      <img
                        src={categoryImage(featured.id)}
                        alt={featured.name}
                        className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest block mb-1.5">
                            {productCountByCategory[featured.id] || 0} produtos
                          </span>
                          <h2 className="text-2xl font-bold text-white tracking-tight">
                            {featured.name}
                          </h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid of remaining categories */}
            <div className="grid grid-cols-2 gap-3">
              {rest.map((category, index) => {
                const Icon = iconMap[category.icon] || Smartphone;
                const image = categoryImage(category.id);
                const count = productCountByCategory[category.id] || 0;

                return (
                  <motion.div
                    key={category.id}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={index + 1}
                  >
                    <Link
                      to={createPageUrl(`Products?category=${category.id}`)}
                      className="group block relative rounded-2xl overflow-hidden"
                    >
                      <div className="relative aspect-[4/5] bg-gray-900">
                        {image ? (
                          <img
                            src={image}
                            alt={category.name}
                            className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center mb-3">
                            <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
                          </div>
                          <h3 className="text-[15px] font-bold text-white leading-tight">
                            {category.name}
                          </h3>
                          <span className="text-[11px] text-white/50 font-medium mt-0.5 block">
                            {count} {count === 1 ? 'produto' : 'produtos'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
