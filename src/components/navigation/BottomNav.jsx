import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Grid3X3, ShoppingCart, Package, User } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: Home, page: 'Home' },
  { name: 'Explorar', icon: Grid3X3, page: 'Categories' },
  { name: 'Carrinho', icon: ShoppingCart, page: 'Cart' },
  { name: 'Pedidos', icon: Package, page: 'Orders' },
  { name: 'Perfil', icon: User, page: 'Profile' },
];

export default function BottomNav({ cartCount = 0 }) {
  const location = useLocation();

  const isActive = (page) => {
    const pageUrl = createPageUrl(page);
    return location.pathname === pageUrl || location.pathname === pageUrl + '/';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto px-4 pb-2">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/[0.06] px-2 py-1.5 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.page);
            const isCart = item.page === 'Cart';

            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                  active
                    ? 'bg-white/15'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-[20px] h-[20px] transition-colors duration-200 ${
                      active ? 'text-white' : 'text-white/40'
                    }`}
                    strokeWidth={active ? 2 : 1.5}
                  />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold min-w-[14px] h-3.5 px-1 rounded-full flex items-center justify-center ring-2 ring-gray-900">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 transition-colors duration-200 ${
                    active ? 'text-white font-semibold' : 'text-white/35 font-medium'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
