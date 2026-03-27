import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartEmptyStateProps {
  onExplore: () => void;
}

export default function CartEmptyState({ onExplore }: CartEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[65vh] px-6"
    >
      <div className="w-20 h-20 rounded-3xl bg-store-secondary flex items-center justify-center mb-5">
        <ShoppingCart className="w-9 h-9 text-store-text/30" strokeWidth={1.5} />
      </div>
      <h2 className="text-lg font-bold text-store-text mb-1.5 tracking-tight">
        Carrinho vazio
      </h2>
      <p className="text-sm text-store-text/50 text-center mb-6 max-w-[240px]">
        Explore nossos produtos e adicione o que voce precisa
      </p>
      <Button
        onClick={onExplore}
        className="h-11 px-6 rounded-xl bg-store-primary hover:bg-store-primary/90 text-white text-sm font-semibold active:scale-[0.97] transition-all"
      >
        Explorar produtos
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}
