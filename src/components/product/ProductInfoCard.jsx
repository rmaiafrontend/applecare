import { motion } from 'framer-motion';
import { Minus, Plus, Truck, Shield, Package, RotateCcw, GitCompareArrows } from 'lucide-react';
import { formatPrice } from '@/lib/format';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function ProductInfoCard({
  product, hasDiscount, discountPercent, isUsed, isAvailable,
  quantity, maxQuantity, onChangeQuantity,
  onCompare, isInCompare, isCompareFull,
}) {
  return (
    <motion.div initial="hidden" animate="visible" className="px-4 -mt-4 relative z-10">
      <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm overflow-hidden">
        <div className="p-5 pb-4">
          <motion.h1 variants={fadeUp} custom={0} className="text-xl font-bold text-store-text leading-tight tracking-tight">
            {product.name}
          </motion.h1>

          <motion.div variants={fadeUp} custom={1} className="mt-3 flex items-baseline gap-2.5">
            <span className="text-2xl font-bold text-store-text tabular-nums tracking-tight">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-store-text/40 line-through tabular-nums">
                {formatPrice(product.original_price)}
              </span>
            )}
          </motion.div>

          <motion.p variants={fadeUp} custom={2} className="text-[13px] text-store-text/40 mt-1">
            ou <span className="text-store-text/70 font-medium">12x de {formatPrice(product.price / 12)}</span> sem juros
          </motion.p>

          {hasDiscount && (
            <motion.div variants={fadeUp} custom={2.5} className="mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              Voce economiza {formatPrice(product.original_price - product.price)}
            </motion.div>
          )}

          {isUsed && (
            <motion.div variants={fadeUp} custom={2.8} className="mt-3 flex items-center gap-2.5 bg-store-secondary rounded-2xl px-4 py-3 border border-store-secondary">
              <div className="w-8 h-8 rounded-xl bg-store-primary flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-[13px] font-semibold text-store-text block leading-tight">Produto seminovo</span>
                <span className="text-[11px] text-store-text/50">Verificado e com garantia aLink</span>
              </div>
            </motion.div>
          )}

          {isAvailable && (
            <motion.button
              variants={fadeUp}
              custom={3}
              onClick={onCompare}
              disabled={isInCompare || isCompareFull}
              className={`mt-3 flex items-center gap-2 text-[12px] font-semibold px-3.5 py-2 rounded-xl border transition-all active:scale-95 ${
                isInCompare ? 'bg-store-primary text-white border-store-primary' : 'bg-store-bg text-store-text/70 border-store-secondary hover:bg-store-secondary'
              } disabled:opacity-50`}
            >
              <GitCompareArrows className="w-4 h-4" strokeWidth={2} />
              {isInCompare ? 'Adicionado a comparacao' : 'Comparar'}
            </motion.button>
          )}
        </div>

        {/* Delivery & Guarantee */}
        <motion.div variants={fadeUp} custom={3} className="mx-5 border-t border-store-secondary/50 py-4 grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: 'Entrega', value: product.express_delivery ? '1 hora' : '2-3 dias' },
            { icon: Shield, label: 'Garantia', value: 'Apple' },
            { icon: Package, label: 'Estoque', value: `${product.stock} un.` },
          ].map((info, i) => (
            <div key={i} className="text-center">
              <div className="w-9 h-9 rounded-xl bg-store-secondary flex items-center justify-center mx-auto mb-1.5">
                <info.icon className="w-4 h-4 text-store-text/60" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] text-store-text/40 block leading-none">{info.label}</span>
              <span className="text-[12px] font-semibold text-store-text block mt-0.5">{info.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Quantity */}
        {isAvailable && (
          <motion.div variants={fadeUp} custom={4} className="mx-5 pb-5">
            <div className="bg-store-secondary rounded-2xl p-4 border border-store-secondary/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-store-text">Quantidade</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-xl bg-store-bg border border-store-secondary flex items-center justify-center text-store-text/60 hover:bg-store-secondary disabled:opacity-40 transition-all active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-lg text-store-text tabular-nums w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => onChangeQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                    className="w-9 h-9 rounded-xl bg-store-bg border border-store-secondary flex items-center justify-center text-store-text/60 hover:bg-store-secondary disabled:opacity-40 transition-all active:scale-95"
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
  );
}
