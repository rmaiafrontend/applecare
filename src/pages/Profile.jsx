import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Bell,
  FileText,
  Shield,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  LogOut,
  Package,
  CreditCard,
  Heart,
  Settings,
  Smartphone,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import BottomNav from '@/components/navigation/BottomNav';
import { Switch } from '@/components/ui/switch';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const quickActions = [
  { icon: Package, label: 'Pedidos', color: 'bg-blue-500', page: 'Orders' },
  { icon: Heart, label: 'Favoritos', color: 'bg-pink-500', page: 'Wishlist' },
  { icon: CreditCard, label: 'Pagamento', color: 'bg-violet-500', page: 'Payment' },
  { icon: MapPin, label: 'Enderecos', color: 'bg-amber-500', page: 'Addresses' },
];

const menuSections = [
  {
    title: 'Conta',
    items: [
      { icon: User, label: 'Dados Pessoais', subtitle: 'Nome, email e telefone', page: 'EditProfile' },
      { icon: MapPin, label: 'Enderecos Salvos', subtitle: 'Gerencie seus enderecos', page: 'Addresses' },
      { icon: CreditCard, label: 'Formas de Pagamento', subtitle: 'Cartoes e Pix', page: 'Payment' },
    ],
  },
  {
    title: 'Preferencias',
    items: [
      { icon: Bell, label: 'Notificacoes', subtitle: 'Push e alertas de ofertas', toggle: true },
      { icon: Smartphone, label: 'Aparencia', subtitle: 'Tema e idioma', page: 'Appearance' },
    ],
  },
  {
    title: 'Suporte',
    items: [
      { icon: MessageCircle, label: 'Falar no WhatsApp', subtitle: 'Atendimento rapido', whatsapp: true },
      { icon: HelpCircle, label: 'Central de Ajuda', subtitle: 'Duvidas frequentes', page: 'FAQ' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { icon: FileText, label: 'Termos de Uso', external: true },
      { icon: Shield, label: 'Politica de Privacidade', external: true },
    ],
  },
];

export default function Profile() {
  const [cartCount, setCartCount] = useState(0);
  const [notifications, setNotifications] = useState(true);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        return await base44.auth.me();
      } catch {
        return null;
      }
    },
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => base44.entities.Order.list(),
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cartItems]);

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Ola, preciso de ajuda com a WEGX', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Minha Conta" showCart cartCount={cartCount} />

      <main className="pt-12 max-w-lg mx-auto">
        <motion.div initial="hidden" animate="visible">
          {/* Profile Header */}
          <motion.div variants={fadeUp} custom={0} className="px-4 pt-6 pb-2">
            <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Decorative top bar */}
              <div className="h-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

              <div className="px-5 pb-5">
                {/* Avatar - overlapping the gradient */}
                <div className="-mt-8 mb-3 flex items-end justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border-2 border-white flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {user?.full_name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <button className="text-[12px] font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-xl transition-colors active:scale-95">
                    Editar perfil
                  </button>
                </div>

                {/* Name & email */}
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  {user?.full_name || 'Usuario'}
                </h2>
                <p className="text-[13px] text-gray-400 mt-0.5">
                  {user?.email || 'email@exemplo.com'}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex-1 text-center">
                    <span className="text-lg font-bold text-gray-900 tabular-nums block">
                      {orders.length}
                    </span>
                    <span className="text-[11px] text-gray-400">Pedidos</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="flex-1 text-center">
                    <span className="text-lg font-bold text-gray-900 tabular-nums block">0</span>
                    <span className="text-[11px] text-gray-400">Favoritos</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="flex-1 text-center">
                    <span className="text-lg font-bold text-gray-900 tabular-nums block">
                      {cartItems.length}
                    </span>
                    <span className="text-[11px] text-gray-400">No carrinho</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} custom={1} className="px-4 mt-4">
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              variants={fadeUp}
              custom={sectionIndex + 2}
              className="px-4 mt-5"
            >
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-1 mb-2">
                {section.title}
              </h3>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isLast = itemIndex === section.items.length - 1;

                  if (item.toggle) {
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between px-4 py-3.5 ${
                          !isLast ? 'border-b border-gray-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-600" strokeWidth={2} />
                          </div>
                          <div>
                            <span className="text-[13px] font-semibold text-gray-900 block">
                              {item.label}
                            </span>
                            {item.subtitle && (
                              <span className="text-[11px] text-gray-400">{item.subtitle}</span>
                            )}
                          </div>
                        </div>
                        <Switch checked={notifications} onCheckedChange={setNotifications} />
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.whatsapp) handleWhatsApp();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors active:bg-gray-50 ${
                        !isLast ? 'border-b border-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-600" strokeWidth={2} />
                        </div>
                        <div className="text-left">
                          <span className="text-[13px] font-semibold text-gray-900 block leading-tight">
                            {item.label}
                          </span>
                          {item.subtitle && (
                            <span className="text-[11px] text-gray-400">{item.subtitle}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={2} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Logout */}
          <motion.div variants={fadeUp} custom={menuSections.length + 2} className="px-4 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl border border-red-100 bg-red-50/50 text-red-500 text-[13px] font-semibold hover:bg-red-50 transition-colors active:scale-[0.98]"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sair da Conta
            </button>
          </motion.div>

          {/* Version */}
          <motion.div
            variants={fadeUp}
            custom={menuSections.length + 3}
            className="text-center mt-6 mb-4"
          >
            <p className="text-[11px] text-gray-300 font-medium">WEGX Fast Delivery v1.0.0</p>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav cartCount={cartCount} />
    </div>
  );
}
