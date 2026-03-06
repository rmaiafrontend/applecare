import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItemCard({
  item,
  product,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  const subtotal = (product?.price || 0) * item.quantity;
  const maxStock = product?.stock || 99;

  return (
    <div className="flex gap-3.5">
      {/* Image */}
      <Link
        to={createPageUrl(`ProductDetail?id=${product?.id}`)}
        className="shrink-0"
      >
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={
              product?.images?.[0] ||
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'
            }
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={createPageUrl(`ProductDetail?id=${product?.id}`)}
              className="hover:no-underline"
            >
              <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2 leading-snug">
                {product?.name || 'Produto'}
              </h3>
            </Link>
            <button
              onClick={() => onRemove(item.id)}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[13px] font-bold text-gray-900 tabular-nums mt-0.5 block">
            {formatPrice(product?.price || 0)}
          </span>
        </div>

        {/* Quantity + Subtotal */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-0 bg-gray-100 rounded-xl">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
              className="w-8 h-8 flex items-center justify-center text-gray-600 disabled:opacity-30 active:scale-90 transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-[13px] font-bold text-gray-900 tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= maxStock || isUpdating}
              className="w-8 h-8 flex items-center justify-center text-gray-600 disabled:opacity-30 active:scale-90 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[13px] font-bold text-gray-900 tabular-nums">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
