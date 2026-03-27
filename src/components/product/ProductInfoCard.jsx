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
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 pb-4">
          <motion.h1 variants={fadeUp} custom={0} className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
            {product.name}
          </motion.h1>

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

          <motion.p variants={fadeUp} custom={2} className="text-[13px] text-gray-400 mt-1">
            ou <span className="text-gray-600 font-medium">12x de {formatPrice(product.price / 12)}</span> sem juros
          </motion.p>

          {hasDiscount && (
            <motion.div variants={fadeUp} custom={2.5} className="mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              Voce economiza {formatPrice(product.original_price - product.price)}
            </motion.div>
          )}

          {isUsed && (
            <motion.div variants={fadeUp} custom={2.8} className="mt-3 flex items-center gap-2.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
              <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-[13px] font-semibold text-gray-800 block leading-tight">Produto seminovo</span>
                <span className="text-[11px] text-gray-500">Verificado e com garantia aLink</span>
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
                isInCompare ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              <GitCompareArrows className="w-4 h-4" strokeWidth={2} />
              {isInCompare ? 'Adicionado a comparacao' : 'Comparar'}
            </motion.button>
          )}
        </div>

        {/* Delivery & Guarantee */}
        <motion.div variants={fadeUp} custom={3} className="mx-5 border-t border-gray-100 py-4 grid grid-cols-3 gap-3">
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

        {/* Quantity */}
        {isAvailable && (
          <motion.div variants={fadeUp} custom={4} className="mx-5 pb-5">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Quantidade</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-all active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-lg text-gray-900 tabular-nums w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => onChangeQuantity(Math.min(maxQuantity, quantity + 1))}
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
  );
}
