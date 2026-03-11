import { motion } from 'framer-motion';

export default function FloatingCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + product.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${product.x} ${product.y} z-20 hidden sm:block`}
    >
      <motion.div
        animate={{ y: [0, index % 2 === 0 ? -10 : 10, 0] }}
        transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`bg-gradient-to-br ${product.color} backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-2xl shadow-black/40`}>
          <p className="text-[11px] font-semibold text-white/90 whitespace-nowrap">{product.name}</p>
          <p className="text-[10px] text-white/40 mt-0.5">{product.price}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
