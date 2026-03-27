import { motion } from 'framer-motion';
import { ShoppingCart, Check, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';

export default function ProductBottomCTA({
  price, quantity, isAvailable, isAdding, addedToCart, onAddToCart,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-5 py-3.5 flex items-center justify-between gap-4"
        >
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400 leading-none">Total</span>
            <span className="text-lg font-bold text-gray-900 tabular-nums leading-tight mt-0.5">
              {formatPrice(price * quantity)}
            </span>
          </div>

          {isAvailable ? (
            <Button
              onClick={onAddToCart}
              disabled={isAdding}
              className={`shrink-0 h-11 px-5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] ${
                addedToCart ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              {addedToCart ? (
                <><Check className="w-4 h-4 mr-1.5" strokeWidth={2.5} /> Adicionado</>
              ) : (
                <><ShoppingCart className="w-4 h-4 mr-1.5" strokeWidth={2} /> {isAdding ? 'Adicionando...' : 'Adicionar'}</>
              )}
            </Button>
          ) : (
            <Button variant="outline" className="shrink-0 h-11 px-5 rounded-xl text-sm font-medium border-gray-200 text-gray-500 hover:bg-gray-50">
              <Bell className="w-4 h-4 mr-1.5" strokeWidth={1.75} />
              Avise-me
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
