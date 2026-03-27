import { Tag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ subtotal, shipping, total, onCheckout }: CartSummaryProps) {
  return (
    <div className="bg-store-bg rounded-3xl border border-store-secondary/50 shadow-sm overflow-hidden">
      <div className="p-5 space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-store-text/40">
          Resumo
        </h3>

        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-store-text/50">Subtotal</span>
            <span className="text-[13px] font-semibold text-store-text tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-store-text/50">Frete</span>
            <span
              className={`text-[13px] font-semibold tabular-nums ${
                shipping === 0 ? 'text-green-600' : 'text-store-text'
              }`}
            >
              {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
            </span>
          </div>
          {subtotal < 299 && (
            <div className="flex items-center gap-1.5 bg-store-secondary rounded-xl px-3 py-2">
              <Tag className="w-3 h-3 text-store-text/40" />
              <span className="text-[11px] text-store-text/40">
                Faltam {formatPrice(299 - subtotal)} para frete gratis
              </span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-store-secondary/50 flex justify-between items-baseline">
          <span className="text-sm font-semibold text-store-text">Total</span>
          <span className="text-xl font-bold text-store-text tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Button
          onClick={onCheckout}
          className="w-full h-12 rounded-2xl bg-store-accent hover:bg-store-accent/90 text-white text-sm font-semibold active:scale-[0.97] transition-all"
        >
          <MessageCircle className="w-4 h-4 mr-2" strokeWidth={2} />
          Finalizar via WhatsApp
        </Button>
      </div>
    </div>
  );
}
