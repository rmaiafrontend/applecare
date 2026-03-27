import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Sparkles, Trophy, Truck, Tag, Cpu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/navigation/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/contexts/CompareContext';
import { generateComparison } from '@/engines/smartCompare';
import { formatPrice } from '@/lib/format';
import { mapProductFromApi, mapCategoryFromApi } from '@/api/adapters';
import {
  useSlug,
  usePublicProducts,
  usePublicCategories,
} from '@/api/hooks';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const highlightIcons = {
  discount: Tag,
  express: Truck,
  performance: Cpu,
};

export default function Compare() {
  const navigate = useNavigate();
  const slug = useSlug();
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const [showRecommendation, setShowRecommendation] = useState(false);

  const { data: productsPage } = usePublicProducts(slug, { tamanho: 200 });
  const allProducts = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);

  const { data: categoriesRaw = [] } = usePublicCategories(slug);
  const categories = useMemo(() => categoriesRaw.map(mapCategoryFromApi), [categoriesRaw]);

  const products = compareIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  const comparison = products.length >= 2
    ? generateComparison(products, categories)
    : null;

  // Simulate AI "thinking" delay
  useEffect(() => {
    if (comparison) {
      const timer = setTimeout(() => setShowRecommendation(true), 800);
      return () => clearTimeout(timer);
    }
    setShowRecommendation(false);
  }, [comparison?.recommendation]);

  if (products.length < 2) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header showBack title="Comparar Produtos" />
        <main className="pt-12 w-full max-w-lg mx-auto px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-store-text/40 mb-4 text-sm">Selecione pelo menos 2 produtos para comparar</p>
            <Button onClick={() => navigate(-1)} className="rounded-xl">
              Voltar
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header showBack title="Comparar Produtos" />

      <main className="pt-14 w-full max-w-lg mx-auto">
        {/* Product Cards Row */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="px-4 mt-2"
        >
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                custom={i}
                className="flex-1 min-w-[130px] bg-store-bg rounded-2xl border border-store-secondary/50 shadow-sm p-3 relative"
              >
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-2 right-2 w-5 h-5 bg-store-secondary rounded-full flex items-center justify-center z-10"
                >
                  <X className="w-3 h-3 text-store-text/50" strokeWidth={2.5} />
                </button>
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'}
                  alt={product.name}
                  className="w-full aspect-square rounded-xl object-cover bg-store-secondary mb-2.5"
                />
                <h3 className="text-[12px] font-semibold text-store-text leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-1.5">
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-[10px] text-store-text/40 line-through block">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                  <span className={`text-[14px] font-bold tabular-nums ${
                    comparison?.bestValue?.id === product.id ? 'text-green-600' : 'text-store-text'
                  }`}>
                    {formatPrice(product.price)}
                  </span>
                  {comparison?.bestValue?.id === product.id && (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold text-green-600 mt-0.5">
                      <Trophy className="w-3 h-3" /> Melhor preco
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        {comparison?.highlights.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="px-4 mt-4"
          >
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {comparison.highlights.map((h, i) => {
                const Icon = highlightIcons[h.type] || Tag;
                return (
                  <div
                    key={i}
                    className="shrink-0 flex items-center gap-2 bg-store-secondary rounded-xl px-3 py-2.5 border border-store-secondary/50"
                  >
                    <div className="w-7 h-7 rounded-lg bg-store-primary flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-store-text/40 block leading-none truncate">{h.product}</span>
                      <span className="text-[11px] font-semibold text-store-text block mt-0.5">{h.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Specs Comparison Table */}
        {comparison?.specsTable && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="px-4 mt-4"
          >
            <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm overflow-hidden">
              <div className="p-4 pb-2">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-store-text/40">
                  Especificacoes
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-store-secondary/50">
                      <th className="pl-4 pr-2 py-2 text-[10px] font-medium text-store-text/40 uppercase tracking-wider w-[100px] shrink-0">
                        Spec
                      </th>
                      {products.map(p => (
                        <th key={p.id} className="px-2 py-2 text-[10px] font-medium text-store-text/40 uppercase tracking-wider min-w-[100px]">
                          {p.name.split(' ').slice(0, 2).join(' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price row */}
                    <tr className="border-b border-store-secondary">
                      <td className="pl-4 pr-2 py-2.5 text-[11px] font-semibold text-store-text/50">Preco</td>
                      {products.map(p => (
                        <td key={p.id} className={`px-2 py-2.5 text-[12px] font-bold tabular-nums ${
                          comparison.bestValue?.id === p.id ? 'text-green-600' : 'text-store-text'
                        }`}>
                          {formatPrice(p.price)}
                        </td>
                      ))}
                    </tr>
                    {/* Spec rows */}
                    {comparison.specsTable.map((row, i) => (
                      <tr key={row.label} className={i < comparison.specsTable.length - 1 ? 'border-b border-store-secondary' : ''}>
                        <td className="pl-4 pr-2 py-2.5 text-[11px] font-semibold text-store-text/50">{row.label}</td>
                        {row.values.map((val, j) => (
                          <td key={j} className="px-2 py-2.5 text-[12px] text-store-text">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Express row */}
                    <tr className="border-t border-store-secondary/50">
                      <td className="pl-4 pr-2 py-2.5 text-[11px] font-semibold text-store-text/50">Express</td>
                      {products.map(p => (
                        <td key={p.id} className="px-2 py-2.5 text-[12px]">
                          {p.express_delivery ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                              <Truck className="w-3 h-3" /> 1h
                            </span>
                          ) : (
                            <span className="text-store-text/40">2-3 dias</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    {/* Stock row */}
                    <tr>
                      <td className="pl-4 pr-2 py-2.5 text-[11px] font-semibold text-store-text/50">Estoque</td>
                      {products.map(p => (
                        <td key={p.id} className="px-2 py-2.5 text-[12px] text-store-text">
                          {p.stock} un.
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Recommendation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="px-4 mt-4"
        >
          <div className="bg-store-primary rounded-3xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/60">
                Recomendacao Inteligente
              </h3>
            </div>

            {!showRecommendation ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-[11px] text-white/40">Analisando produtos...</span>
                </div>
                <Skeleton className="h-4 w-full bg-white/10 rounded" />
                <Skeleton className="h-4 w-4/5 bg-white/10 rounded" />
                <Skeleton className="h-4 w-3/5 bg-white/10 rounded" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-[13px] text-white/85 leading-relaxed">
                  {comparison?.recommendation}
                </p>
                {comparison?.bestValue && (
                  <Button
                    onClick={() => navigate(createPageUrl(`ProductDetail?id=${comparison.bestValue.id}`))}
                    className="mt-4 w-full h-10 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-[12px] font-semibold"
                  >
                    Ver {comparison.bestValue.name}
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Clear Button */}
        <div className="px-4 mt-4">
          <button
            onClick={() => {
              clearCompare();
              navigate(-1);
            }}
            className="w-full text-center text-[12px] text-store-text/40 hover:text-store-text/60 py-3 transition-colors"
          >
            Limpar comparacao
          </button>
        </div>
      </main>
    </div>
  );
}
