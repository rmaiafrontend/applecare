import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plus, Truck, RotateCcw } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export default function ProductCard({ product, onAddToCart, isAdding }) {
  const isAvailable = product.stock > 0;
  const isUsed = product.condition === 'used';
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <div
      className={`group h-full flex flex-col ${
        !isAvailable ? 'opacity-55' : ''
      }`}
    >
      {/* Image */}
      <Link to={createPageUrl(`ProductDetail?id=${product.id}`)} className="block relative">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={
              product.images?.[0] ||
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop'
            }
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Badges top-left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {hasDiscount && isAvailable && (
              <span className="bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                -{discountPercent}%
              </span>
            )}
            {isUsed && isAvailable && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                <RotateCcw className="w-2.5 h-2.5" strokeWidth={2.5} />
                Usado
              </span>
            )}
          </div>

          {/* Unavailable overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
              <span className="bg-gray-900/80 text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                Indisponivel
              </span>
            </div>
          )}

          {/* Add to cart floating button */}
          {isAvailable && onAddToCart && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              disabled={isAdding}
              className="absolute bottom-2.5 right-2.5 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-90 transition-all disabled:opacity-50"
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </Link>

      {/* Info */}
      <Link
        to={createPageUrl(`ProductDetail?id=${product.id}`)}
        className="flex flex-col mt-2.5 px-0.5 hover:no-underline"
      >
        {/* Express badge */}
        {isAvailable && product.express_delivery && (
          <div className="flex items-center gap-1 mb-1">
            <Truck className="w-3 h-3 text-gray-500" strokeWidth={2} />
            <span className="text-[11px] font-medium text-gray-500">Entrega 1h</span>
          </div>
        )}

        <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Prices */}
        <div className="flex items-baseline gap-1.5 mt-1">
          {hasDiscount && (
            <span className="text-[12px] text-gray-400 line-through tabular-nums">
              {formatPrice(product.original_price)}
            </span>
          )}
          <span className={`text-[14px] font-bold tabular-nums text-gray-900`}>
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>
    </div>
  );
}
