import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search, ShoppingCart, ArrowLeft, Share2, Heart } from 'lucide-react';

export default function Header({
  title,
  showBack = false,
  showSearch = false,
  showCart = false,
  showShare = false,
  showFavorite = false,
  cartCount = 0,
  onBack,
  onSearch,
  onShare,
  onFavorite,
  isFavorite = false,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-area-top">
      <div className="bg-store-bg/80 backdrop-blur-xl border-b border-gray-100/60">
        <div className="max-w-lg mx-auto flex items-center justify-between h-12 px-4">
          {/* Left side */}
          <div className="flex items-center gap-2 min-w-0">
            {showBack && (
              <button
                onClick={handleBack}
                className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-[18px] h-[18px] text-store-text" strokeWidth={2} />
              </button>
            )}

            {title ? (
              <h1 className="text-[15px] font-semibold text-store-text truncate">{title}</h1>
            ) : (
              <Link to={createPageUrl('Home')} className="flex items-center gap-1.5">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/logo-alink.png" alt="aLink" className="w-6 h-6 object-contain" />
                </div>
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-0.5">
            {showSearch && (
              <button
                onClick={onSearch}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all"
              >
                <Search className="w-[18px] h-[18px] text-store-text/70" strokeWidth={2} />
              </button>
            )}

            {showShare && (
              <button
                onClick={onShare}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all"
              >
                <Share2 className="w-[17px] h-[17px] text-store-text/70" strokeWidth={2} />
              </button>
            )}

            {showFavorite && (
              <button
                onClick={onFavorite}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all"
              >
                <Heart
                  className={`w-[17px] h-[17px] ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-store-text/70'
                  }`}
                  strokeWidth={2}
                />
              </button>
            )}

            {showCart && (
              <Link
                to={createPageUrl('Cart')}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all relative"
              >
                <ShoppingCart className="w-[18px] h-[18px] text-store-text/70" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
