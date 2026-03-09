import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Cpu, Menu, X, Star, Clock, Bot, CheckCircle2, Sparkles, BarChart3, Wand2, MessageSquare, Search, GitCompareArrows, ShoppingCart, Package, LayoutDashboard, Store, FileText, Tag, DollarSign, AlignLeft, Layers, Heart, Plus, Truck, ChevronRight, Minus, Link2, Globe, Instagram, MapPin, Share2, ExternalLink, Smartphone, Mail, Phone, Youtube } from 'lucide-react';
import { STORE_INFO } from '@/lib/constants';
import { useState, useRef, useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const navLinks = [
  { label: 'Recursos', to: createPageUrl('Products') },
  { label: 'Precos', to: createPageUrl('Categories') },
  { label: 'Contato', to: createPageUrl('Profile') },
];

const floatingProducts = [
  { name: 'Catalogo com IA', price: 'Automatizado', color: 'from-blue-500/20 to-blue-600/10', x: '-left-16 md:-left-32', y: 'top-[15%]', delay: 0 },
  { name: 'Gestao de Pedidos', price: 'Em tempo real', color: 'from-violet-500/20 to-violet-600/10', x: '-right-14 md:-right-28', y: 'top-[10%]', delay: 0.4 },
  { name: 'Analytics Pro', price: 'Insights IA', color: 'from-cyan-500/20 to-cyan-600/10', x: '-left-10 md:-left-20', y: 'bottom-[25%]', delay: 0.8 },
  { name: 'Checkout Smart', price: 'WhatsApp', color: 'from-purple-500/20 to-purple-600/10', x: '-right-8 md:-right-18', y: 'bottom-[30%]', delay: 1.2 },
];

function GlowBeam() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Full-width conic gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70%]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 20%, rgba(59,130,246,0) 0deg, rgba(59,130,246,0.07) 50deg, rgba(139,92,246,0.1) 100deg, rgba(168,85,247,0.08) 160deg, rgba(59,130,246,0.06) 200deg, rgba(99,102,241,0.08) 260deg, rgba(139,92,246,0.06) 320deg, rgba(59,130,246,0) 360deg)',
        }}
      />
      {/* Central beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[35%] bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-[2px]" />
      {/* Horizontal aurora bands */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[5%] left-0 right-0 h-[250px] bg-gradient-to-r from-transparent via-blue-500/[0.05] to-transparent blur-[40px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[10%] left-0 right-0 h-[200px] bg-gradient-to-r from-transparent via-violet-500/[0.04] to-transparent blur-[50px]"
      />
      {/* Side glows */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], x: [-30, 30, -30] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[10%] w-[40%] h-[300px] bg-blue-500/[0.04] rounded-full blur-[80px] rotate-6"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], x: [30, -30, 30] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[6%] right-[10%] w-[40%] h-[280px] bg-violet-500/[0.04] rounded-full blur-[80px] -rotate-6"
      />
    </div>
  );
}

function Marquee() {
  const items = [
    'Catalogo IA', 'Gestao de Estoque', 'Checkout WhatsApp', 'Analytics', 'Automacao', 'Dashboard',
    'Pedidos em Tempo Real', 'Notificacoes', 'Multi-loja', 'Relatorios', 'Integracao', 'Suporte 24h',
  ];
  return (
    <div className="relative overflow-hidden py-6 border-t border-b border-white/[0.04]">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-white/20 tracking-wide">{item}</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function FloatingCard({ product, index }) {
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

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black overflow-x-hidden">
      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-3 mt-2.5 sm:mx-5 sm:mt-3">
          <div className="max-w-[1200px] mx-auto bg-black/60 backdrop-blur-2xl border border-white/[0.06] rounded-2xl">
            <div className="px-4 sm:px-5 h-14 md:h-[56px] flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-[12px] font-bold text-black tracking-tighter">A</span>
                </div>
                <span className="text-[15px] font-semibold text-white tracking-tight">AppleLink</span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex items-center">
                <Link
                  to={createPageUrl('Products')}
                  className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-xl text-[13px] font-semibold transition-all hover:bg-white/90 active:scale-[0.97]"
                >
                  Comecar gratis
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="md:hidden border-t border-white/[0.06] px-5 pb-4"
              >
                <div className="pt-3 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to={createPageUrl('Products')}
                    className="mt-2 flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-sm font-semibold"
                  >
                    Comecar gratis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen bg-black">
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6">
          {/* ── Text block ── */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="pt-28 sm:pt-32 md:pt-40 text-center max-w-4xl mx-auto"
          >
            <motion.div initial="hidden" animate="visible">
              {/* Badge */}
              <motion.div variants={fadeUp} custom={0} className="flex justify-center">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.07] pl-1.5 pr-4 py-1 rounded-full cursor-default"
                >
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-violet-500 to-blue-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 sm:px-3 py-1.5 rounded-full shadow-lg shadow-violet-500/25 shrink-0">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">IA Integrada</span>
                    <span className="sm:hidden">IA</span>
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/50 truncate">
                    Catalogo inteligente para Apple Stores
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/25 shrink-0" />
                </motion.span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} custom={1} className="mt-8 sm:mt-10 relative">
                {/* Glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-blue-500/[0.06] rounded-full blur-[80px] pointer-events-none" />
                <span className="relative block text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                  Sua loja Apple.
                </span>
                <span className="relative block text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.04] tracking-[-0.04em] bg-gradient-to-b from-white/50 to-white/15 bg-clip-text text-transparent">
                  Potencializada por IA.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-5 sm:mt-7 text-[15px] sm:text-[17px] text-white/30 leading-relaxed max-w-[440px] mx-auto"
              >
                Catalogo inteligente, gestao automatizada e checkout via WhatsApp. Tudo que sua loja Apple precisa em uma unica plataforma.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to={createPageUrl('Products')}
                  className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 bg-white text-black pl-7 pr-5 py-3.5 sm:py-4 rounded-full text-[15px] font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.97]"
                >
                  Criar minha loja
                  <span className="flex items-center justify-center w-7 h-7 bg-black/10 rounded-full group-hover:bg-black/15 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(STORE_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/[0.1] text-white/60 px-7 py-3.5 sm:py-4 rounded-full text-[15px] font-medium transition-all hover:bg-white/[0.05] hover:text-white hover:border-white/20 active:scale-[0.97]"
                >
                  Ver demonstracao
                </a>
              </motion.div>

              {/* Trust row */}
              <motion.div variants={fadeUp} custom={4} className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {[
                  { icon: Bot, text: 'IA generativa integrada' },
                  { icon: Wand2, text: 'Setup em 5 minutos' },
                  { icon: BarChart3, text: 'Analytics em tempo real' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-blue-400/70" strokeWidth={2} />
                    <span className="text-[12px] text-white/25 font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Phone composition ── */}
          <motion.div
            style={{ y: phoneY, scale: phoneScale }}
            className="relative mt-12 sm:mt-16 md:mt-20 pb-8 flex justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Massive glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none">
                <div className="absolute inset-0 bg-blue-500/[0.08] rounded-full blur-[120px]" />
                <div className="absolute inset-8 bg-violet-500/[0.06] rounded-full blur-[100px]" />
              </div>

              {/* Floating product cards */}
              {floatingProducts.map((product, i) => (
                <FloatingCard key={product.name} product={product} index={i} />
              ))}

              {/* 3D shapes - left cluster */}
              <motion.div
                animate={{ y: [0, -16, 0], rotate: [-15, -10, -15] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 sm:-left-16 md:-left-32 bottom-0 sm:bottom-4 md:bottom-10 z-0"
              >
                <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-44 md:h-44 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-2xl sm:rounded-3xl shadow-[0_20px_80px_rgba(59,130,246,0.35)]">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-transparent to-white/[0.08]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0], rotate: [10, 14, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute -left-1 sm:-left-6 md:-left-14 bottom-14 sm:bottom-24 md:bottom-36 z-0"
              >
                <div className="w-10 h-10 sm:w-18 sm:h-18 md:w-32 md:h-32 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-xl sm:rounded-2xl shadow-[0_16px_50px_rgba(96,165,250,0.25)]">
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-transparent to-white/[0.1]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute left-2 sm:left-0 md:-left-4 bottom-28 sm:bottom-40 md:bottom-56 z-0"
              >
                <div className="w-7 h-7 sm:w-12 sm:h-12 md:w-18 md:h-18 bg-gradient-to-br from-[#93c5fd] to-[#60a5fa] rounded-lg md:rounded-xl shadow-lg shadow-blue-400/20 rotate-[15deg]">
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-t from-transparent to-white/[0.12]" />
                </div>
              </motion.div>

              {/* 3D shapes - right cluster */}
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [14, 9, 14] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 sm:-right-14 md:-right-28 bottom-2 sm:bottom-8 md:bottom-14 z-0"
              >
                <div className="w-14 h-14 sm:w-24 sm:h-24 md:w-40 md:h-40 bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] rounded-2xl sm:rounded-3xl shadow-[0_20px_80px_rgba(139,92,246,0.3)]">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-transparent to-white/[0.08]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0], rotate: [-8, -3, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -right-0 sm:-right-4 md:-right-10 bottom-16 sm:bottom-28 md:bottom-40 z-0"
              >
                <div className="w-9 h-9 sm:w-16 sm:h-16 md:w-26 md:h-26 bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] rounded-xl md:rounded-2xl shadow-[0_12px_40px_rgba(167,139,250,0.2)]">
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-transparent to-white/[0.1]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute right-2 sm:right-0 md:right-0 bottom-30 sm:bottom-44 md:bottom-60 z-0"
              >
                <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 bg-gradient-to-br from-[#c4b5fd] to-[#a78bfa] rounded-md sm:rounded-lg md:rounded-xl shadow-lg shadow-violet-400/15 -rotate-[15deg]">
                  <div className="absolute inset-0 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-t from-transparent to-white/[0.12]" />
                </div>
              </motion.div>

              {/* Phone */}
              <div className="relative z-10 w-[290px] sm:w-[330px] md:w-[380px] mx-auto">
                {/* Phone outer glow ring */}
                <div className="absolute -inset-1 rounded-[2.6rem] sm:rounded-[3rem] bg-gradient-to-b from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none" />

                <div className="relative bg-[#1c1c1e] rounded-[2.5rem] sm:rounded-[2.8rem] p-[9px] sm:p-[10px] shadow-[0_50px_120px_rgba(0,0,0,0.7),0_0_0_0.5px_rgba(255,255,255,0.08)_inset]">
                  {/* Dynamic Island */}
                  <div className="absolute top-[13px] sm:top-[15px] left-1/2 -translate-x-1/2 w-[90px] sm:w-[105px] h-[24px] sm:h-[28px] bg-black rounded-full z-20">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#080810] ring-1 ring-[#15152a]" />
                  </div>

                  {/* Screen */}
                  <div className="bg-[#000000] rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden">
                    <div className="pt-13 sm:pt-14">
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-5 mb-4">
                        <span className="text-[10px] font-semibold text-white/80">9:41</span>
                        <div className="flex items-center gap-1 opacity-80">
                          <div className="flex gap-[3px] items-end">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className={`w-[3px] rounded-full ${i <= 3 ? 'bg-white' : 'bg-white/25'}`} style={{ height: `${5 + i * 2}px` }} />
                            ))}
                          </div>
                          <div className="w-4 h-2 border border-white rounded-[2px] ml-1.5 relative">
                            <div className="absolute inset-[1px] right-[2px] bg-white rounded-[0.5px]" />
                            <div className="absolute right-[-1.5px] top-1/2 -translate-y-1/2 w-[1px] h-[4px] bg-white rounded-r-full" />
                          </div>
                        </div>
                      </div>

                      {/* App content */}
                      <div className="px-4 sm:px-5 pb-5 sm:pb-6">
                        {/* App header */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 flex items-center justify-center border border-white/[0.06]">
                              <Sparkles className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                              <p className="text-[10px] text-white/25 leading-none">Painel</p>
                              <p className="text-[13px] font-semibold text-white leading-tight mt-0.5">AppleLink Admin</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/[0.04]">
                              <BarChart3 className="w-3.5 h-3.5 text-white/30" />
                            </div>
                            <div className="relative w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/[0.04]">
                              <svg className="w-3.5 h-3.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                              </svg>
                              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-violet-500 rounded-full border border-black" />
                            </div>
                          </div>
                        </div>

                        {/* AI Assistant bar */}
                        <div className="flex items-center gap-2.5 bg-gradient-to-r from-violet-500/[0.08] to-blue-500/[0.05] border border-violet-500/[0.1] rounded-xl px-3.5 py-2.5 mb-4">
                          <Bot className="w-3.5 h-3.5 text-violet-400" />
                          <span className="text-[11px] text-white/30">Pergunte a IA sobre seu catalogo...</span>
                        </div>

                        {/* Stats overview */}
                        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl p-4 mb-3.5 border border-white/[0.05] overflow-hidden">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-violet-500/[0.08] to-transparent blur-2xl" />
                          <div className="relative">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1 bg-violet-500/15 px-2 py-0.5 rounded-full">
                                <Wand2 className="w-2.5 h-2.5 text-violet-400" />
                                <span className="text-[8px] font-bold text-violet-400 tracking-wider uppercase">IA Ativa</span>
                              </div>
                              <div className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full">
                                <span className="text-[8px] font-bold text-green-400 tracking-wider uppercase">+23%</span>
                              </div>
                            </div>
                            <p className="text-white text-[15px] font-semibold leading-snug tracking-tight">
                              Vendas de Hoje
                            </p>
                            <p className="text-white/20 text-[10px] mt-1">12 pedidos via WhatsApp</p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-baseline gap-2">
                                <span className="text-white text-[22px] font-semibold tracking-tight">R$47.8k</span>
                                <span className="text-green-400/60 text-[11px] font-medium">+23%</span>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Feature cards */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: 'Produtos', value: '248', tag: 'IA' },
                            { name: 'Pedidos', value: '12', tag: 'Novo' },
                            { name: 'Clientes', value: '1.4k', tag: 'Ativo' },
                          ].map((item) => (
                            <div key={item.name} className="bg-white/[0.03] rounded-xl p-2.5 border border-white/[0.04]">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[6px] font-bold text-violet-400/60 bg-violet-500/[0.1] px-1.5 py-0.5 rounded">{item.tag}</span>
                              </div>
                              <p className="text-[16px] font-semibold text-white leading-tight">{item.value}</p>
                              <p className="text-[7px] text-white/20 mt-0.5">{item.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone edge highlight */}
                <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[2.8rem] pointer-events-none z-20 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.04] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/[0.02] to-transparent" />
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>

        {/* Marquee - inside hero, above the fade */}
        <div className="relative z-40 mt-8">
          <Marquee />
        </div>

        {/* Full-width bottom fade - covers entire viewport width, pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[45vh] z-30 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgb(0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0.97) 35%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.25) 80%, transparent 100%)',
        }} />
      </section>

      {/* ── Section 2: Features Mosaic ── */}
      <section className="relative bg-[#f5f5f7] py-24 sm:py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/[0.06] px-4 py-1.5 rounded-full text-[12px] font-semibold text-black/50 tracking-wide uppercase mb-6">
              <Sparkles className="w-3 h-3" />
              Recursos
            </span>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]">
              Tudo que voce precisa.{' '}
              <span className="text-[#86868b]">Nada que voce nao precisa.</span>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed max-w-lg mx-auto">
              Uma plataforma completa para gerenciar seu catalogo Apple com inteligencia artificial, do produto ao cliente.
            </p>
          </motion.div>

          {/* Bento mosaic */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">

            {/* ── Card 1: Busca Inteligente (wide) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-4 group"
            >
              <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  <div className="shrink-0 sm:max-w-[240px]">
                    <div className="w-11 h-11 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
                      <Search className="w-5 h-5 text-violet-600" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                      Busca Inteligente com IA
                    </h3>
                    <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#86868b] leading-relaxed">
                      Seus clientes conversam com a IA para encontrar o produto ideal. Recomendacoes personalizadas em tempo real.
                    </p>
                  </div>
                  {/* Visual: Chat UI mockup - animated */}
                  <div className="flex-1 bg-[#f5f5f7] rounded-2xl p-4 sm:p-5 min-h-[200px]">
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-2.5 items-start"
                      >
                        <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-violet-600" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-black/[0.04]">
                          <p className="text-[13px] text-[#1d1d1f] leading-relaxed">Ola! Posso te ajudar a encontrar o produto perfeito. O que voce procura?</p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-2.5 items-start justify-end"
                      >
                        <div className="bg-[#1d1d1f] rounded-2xl rounded-tr-md px-4 py-2.5">
                          <p className="text-[13px] text-white leading-relaxed">Quero um iPhone com boa camera</p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-2.5 items-start"
                      >
                        <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-violet-600" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-black/[0.04]">
                          <p className="text-[13px] text-[#1d1d1f] leading-relaxed">Recomendo o iPhone 15 Pro Max! Camera de 48MP com zoom optico 5x.</p>
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: 0.4 }}
                            className="mt-2 flex gap-2"
                          >
                            <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">Ver produto</span>
                            <span className="text-[10px] font-medium text-[#86868b] bg-black/[0.04] px-2 py-1 rounded-full">Comparar</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Checkout WhatsApp (tall) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 md:row-span-2 group"
            >
              <div className="h-full bg-[#1d1d1f] rounded-3xl p-6 sm:p-8 border border-white/[0.06] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
                <div className="w-11 h-11 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-green-400" strokeWidth={1.8} />
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
                  Checkout via WhatsApp
                </h3>
                <p className="mt-2.5 text-[14px] text-white/40 leading-relaxed">
                  Carrinho, pagamento PIX ou cartao, e rastreio. Tudo dentro de uma conversa.
                </p>
                {/* Visual: WhatsApp-style order mockup - animated */}
                <div className="mt-5 flex-1 bg-white/[0.04] rounded-2xl p-4 space-y-2.5 border border-white/[0.06]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-green-500/10 rounded-xl px-3 py-2 border border-green-500/10"
                  >
                    <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Novo Pedido #1247</p>
                  </motion.div>
                  {[
                    { item: 'iPhone 15 Pro 256GB', qty: '1x', price: 'R$7.499' },
                    { item: 'AirPods Pro 2', qty: '1x', price: 'R$1.899' },
                  ].map((p, idx) => (
                    <motion.div
                      key={p.item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.15, duration: 0.4 }}
                      className="flex items-center justify-between py-1.5 border-b border-white/[0.04]"
                    >
                      <div>
                        <p className="text-[11px] font-medium text-white/80">{p.item}</p>
                        <p className="text-[10px] text-white/25">{p.qty}</p>
                      </div>
                      <p className="text-[11px] font-semibold text-white/60">{p.price}</p>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.85, duration: 0.4 }}
                    className="flex items-center justify-between pt-2"
                  >
                    <p className="text-[11px] font-semibold text-white/50">Total</p>
                    <p className="text-[15px] font-bold text-white">R$9.398</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-2 pt-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-green-500 rounded-xl py-2.5 text-center cursor-pointer"
                    >
                      <p className="text-[11px] font-bold text-white">Pagar via PIX</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-white/[0.06] rounded-xl py-2.5 text-center border border-white/[0.06] cursor-pointer"
                    >
                      <p className="text-[11px] font-medium text-white/50">Cartao</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Comparacao de Produtos ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 group"
            >
              <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <GitCompareArrows className="w-5 h-5 text-blue-600" strokeWidth={1.8} />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                  Comparacao com IA
                </h3>
                <p className="mt-2 text-[14px] text-[#86868b] leading-relaxed">
                  Ate 4 produtos lado a lado com analise inteligente.
                </p>
                {/* Visual: Comparison table mini - animated rows */}
                <div className="mt-4 bg-[#f5f5f7] rounded-xl p-3 text-[10px]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="grid grid-cols-3 gap-2 mb-2"
                  >
                    <div className="text-[#86868b] font-medium" />
                    <div className="text-center font-semibold text-[#1d1d1f]">iPhone 15</div>
                    <div className="text-center font-semibold text-[#1d1d1f]">iPhone 15 Pro</div>
                  </motion.div>
                  {[
                    { spec: 'Camera', v1: '48MP', v2: '48MP 5x', win: 2 },
                    { spec: 'Chip', v1: 'A16', v2: 'A17 Pro', win: 2 },
                    { spec: 'Preco', v1: 'R$5.999', v2: 'R$7.499', win: 1 },
                  ].map((row, idx) => (
                    <motion.div
                      key={row.spec}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-3 gap-2 py-1.5 border-t border-black/[0.04]"
                    >
                      <div className="text-[#86868b] font-medium">{row.spec}</div>
                      <motion.div
                        initial={{ backgroundColor: 'transparent' }}
                        whileInView={row.win === 1 ? { backgroundColor: 'rgba(34,197,94,0.08)' } : {}}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + idx * 0.12, duration: 0.6 }}
                        className={`text-center rounded px-1 ${row.win === 1 ? 'text-green-600 font-semibold' : 'text-[#1d1d1f]'}`}
                      >
                        {row.v1}
                      </motion.div>
                      <motion.div
                        initial={{ backgroundColor: 'transparent' }}
                        whileInView={row.win === 2 ? { backgroundColor: 'rgba(34,197,94,0.08)' } : {}}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + idx * 0.12, duration: 0.6 }}
                        className={`text-center rounded px-1 ${row.win === 2 ? 'text-green-600 font-semibold' : 'text-[#1d1d1f]'}`}
                      >
                        {row.v2}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Card 4: Gestao de Pedidos ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 group"
            >
              <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
                  <Package className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                  Rastreio de Pedidos
                </h3>
                <p className="mt-2 text-[14px] text-[#86868b] leading-relaxed">
                  Timeline em tempo real do pagamento a entrega.
                </p>
                {/* Visual: Order timeline - animated steps */}
                <div className="mt-4 space-y-0">
                  {[
                    { status: 'Pagamento confirmado', time: '14:22', done: true },
                    { status: 'Produto embalado', time: '14:45', done: true },
                    { status: 'Saiu para entrega', time: '15:10', done: true },
                    { status: 'Entregue', time: '—', done: false },
                  ].map((step, idx) => (
                    <motion.div
                      key={step.status}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + idx * 0.18, duration: 0.3, type: 'spring', stiffness: 300 }}
                          className={`w-3 h-3 rounded-full border-2 ${step.done ? 'bg-green-500 border-green-500' : 'bg-white border-black/10'}`}
                        />
                        {idx < 3 && (
                          <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + idx * 0.18, duration: 0.3 }}
                            className={`w-0.5 h-5 origin-top ${step.done ? 'bg-green-200' : 'bg-black/[0.06]'}`}
                          />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between pb-2">
                        <span className={`text-[12px] font-medium ${step.done ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`}>{step.status}</span>
                        <span className="text-[10px] text-[#86868b]">{step.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Card 5: Dashboard Admin (wide) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-4 group"
            >
              <div className="h-full bg-gradient-to-br from-[#1d1d1f] to-[#2d2d30] rounded-3xl p-6 sm:p-8 border border-white/[0.06] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  <div className="shrink-0 sm:max-w-[240px]">
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <LayoutDashboard className="w-5 h-5 text-blue-400" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
                      Painel Admin Completo
                    </h3>
                    <p className="mt-2.5 text-[14px] text-white/40 leading-relaxed">
                      Gerencie produtos, categorias, pedidos, banners, pagamentos e configuracoes da loja em um unico lugar.
                    </p>
                  </div>
                  {/* Visual: Dashboard stats mockup - animated */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Vendas hoje', value: 'R$47.8k', change: '+23%', up: true },
                      { label: 'Pedidos', value: '48', change: '+12%', up: true },
                      { label: 'Produtos ativos', value: '248', change: '+5', up: true },
                      { label: 'Taxa conversao', value: '4.2%', change: '+0.3%', up: true },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white/[0.04] rounded-xl p-3.5 border border-white/[0.06]"
                      >
                        <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">{stat.label}</p>
                        <p className="text-[20px] font-semibold text-white mt-1 leading-none">{stat.value}</p>
                        <span className={`text-[10px] font-medium mt-1 inline-block ${stat.up ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                      </motion.div>
                    ))}
                    {/* Mini chart - animated bars */}
                    <div className="col-span-2 bg-white/[0.04] rounded-xl p-3.5 border border-white/[0.06]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Vendas - Ultimos 7 dias</p>
                        <p className="text-[10px] font-medium text-green-400">+18%</p>
                      </div>
                      <div className="flex items-end gap-1.5 h-10">
                        {[35, 52, 44, 65, 58, 78, 92].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex-1 bg-blue-500/30 rounded-sm hover:bg-blue-500/50 transition-colors"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 6: Personalizacao da Loja ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2 group"
            >
              <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
                  <Store className="w-5 h-5 text-rose-600" strokeWidth={1.8} />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                  Sua Loja, Seu Estilo
                </h3>
                <p className="mt-2 text-[14px] text-[#86868b] leading-relaxed">
                  Personalize cores, banners, secoes da home e layout do catalogo.
                </p>
                {/* Visual: Color picker mockup - animated */}
                <div className="mt-4 bg-[#f5f5f7] rounded-xl p-3.5">
                  <p className="text-[10px] font-medium text-[#86868b] uppercase tracking-wider mb-2.5">Tema da loja</p>
                  <div className="flex items-center gap-2">
                    {['#1d1d1f', '#007aff', '#5856d6', '#ff3b30', '#ff9500', '#34c759'].map((color, idx) => (
                      <motion.button
                        key={color}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: color === '#1d1d1f' ? 1.1 : 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.06, duration: 0.3, type: 'spring', stiffness: 400 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-7 h-7 rounded-full border-2 ${color === '#1d1d1f' ? 'border-black/20' : 'border-transparent'} transition-transform`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-3 grid grid-cols-2 gap-2"
                  >
                    <div className="bg-white rounded-lg p-2 border border-black/[0.04]">
                      <div className="w-full h-3 bg-[#1d1d1f] rounded-md mb-1.5" />
                      <div className="w-3/4 h-1.5 bg-black/[0.06] rounded-sm" />
                    </div>
                    <div className="bg-[#1d1d1f] rounded-lg p-2 border border-white/[0.06]">
                      <div className="w-full h-3 bg-white/20 rounded-md mb-1.5" />
                      <div className="w-3/4 h-1.5 bg-white/[0.08] rounded-sm" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 sm:mt-16 text-center"
          >
            <Link
              to={createPageUrl('Products')}
              className="group inline-flex items-center gap-2.5 bg-[#1d1d1f] text-white px-7 py-3.5 sm:py-4 rounded-full text-[15px] font-semibold transition-all hover:bg-black active:scale-[0.97]"
            >
              Comecar gratis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className="mt-4 text-[13px] text-[#86868b]">
              Setup em 5 minutos. Sem cartao de credito.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — Cadastro Inteligente
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-16 sm:py-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-500/[0.07] via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14 sm:mb-18"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-6">
              <Wand2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[12px] font-medium text-white/60 tracking-wide uppercase">Cadastro com IA</span>
            </div>
            <h2 className="text-[26px] sm:text-[44px] md:text-[52px] font-bold text-white tracking-tight leading-[1.08]">
              Digite o nome. A IA faz o resto.
            </h2>
            <p className="mt-3 sm:mt-5 text-[14px] sm:text-[18px] text-white/40 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
              Comece a digitar o nome do aparelho e o autocomplete inteligente preenche descricao, especificacoes e preco sugerido.
            </p>
          </motion.div>

          {/* Large central card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl sm:rounded-[28px] border border-white/[0.08] p-4 sm:p-10 md:p-12 backdrop-blur-sm overflow-hidden">

              {/* Step 1: Search input with autocomplete */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-blue-400">1</span>
                  </div>
                  <span className="text-[12px] font-medium text-white/40 uppercase tracking-wider">Digite o nome do produto</span>
                </div>

                {/* Search field */}
                <div>
                  <div className="bg-white/[0.06] rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 border border-white/[0.1] flex items-center gap-2 sm:gap-3">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/20 shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: 'auto' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        className="text-[14px] sm:text-[16px] text-white font-medium inline-block overflow-hidden whitespace-nowrap"
                      >
                        iPhone 15 Pro Ma
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(1)' }}
                        className="text-[14px] sm:text-[16px] text-blue-400 font-light"
                      >
                        |
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
                    >
                      <Sparkles className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  {/* Autocomplete dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: -8, scaleY: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-1.5 sm:mt-2 bg-[#1a1a1c] rounded-lg sm:rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl origin-top"
                  >
                    {[
                      { name: 'iPhone 15 Pro Max 256GB Titanio Natural', match: true },
                      { name: 'iPhone 15 Pro Max 512GB Titanio Azul', match: false },
                      { name: 'iPhone 15 Pro Max 1TB Titanio Preto', match: false },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.6 + idx * 0.1, duration: 0.3 }}
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 cursor-pointer transition-colors ${
                          item.match ? 'bg-blue-500/10' : 'hover:bg-white/[0.04]'
                        } ${idx > 0 ? 'border-t border-white/[0.04]' : ''}`}
                      >
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg shrink-0 ${item.match ? 'bg-blue-500/20' : 'bg-white/[0.04]'} flex items-center justify-center`}>
                          <Package className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.match ? 'text-blue-400' : 'text-white/20'}`} strokeWidth={1.5} />
                        </div>
                        <span className={`text-[12px] sm:text-[13px] truncate ${item.match ? 'text-white font-medium' : 'text-white/50'}`}>{item.name}</span>
                        {item.match && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 2.0, type: 'spring', stiffness: 400 }}
                            className="ml-auto shrink-0"
                          >
                            <CheckCircle2 className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Divider with arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.4 }}
                className="flex items-center gap-4 mb-6 sm:mb-8"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              </motion.div>

              {/* Step 2: Auto-filled form */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-green-400">2</span>
                  </div>
                  <span className="text-[12px] font-medium text-white/40 uppercase tracking-wider">Preenchido automaticamente</span>
                </div>

                <div className="bg-white/[0.04] rounded-xl sm:rounded-2xl border border-white/[0.06] p-3.5 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Description field */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.5, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                      <AlignLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20" strokeWidth={1.5} />
                      <span className="text-[9px] sm:text-[10px] font-medium text-white/30 uppercase tracking-wider">Descricao</span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.8, type: 'spring', stiffness: 300 }}
                        className="text-[8px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full ml-1"
                      >
                        IA
                      </motion.span>
                    </div>
                    <div className="bg-white/[0.04] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.06] overflow-hidden">
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.7, duration: 0.6 }}
                        className="text-[12px] sm:text-[13px] text-white/60 block sm:inline-block line-clamp-2 sm:line-clamp-none sm:overflow-hidden sm:whitespace-nowrap"
                      >
                        O iPhone mais poderoso com chip A17 Pro, camera de 48MP com zoom optico 5x e corpo em titanio.
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Category + Price row */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.9, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                        <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20" strokeWidth={1.5} />
                        <span className="text-[9px] sm:text-[10px] font-medium text-white/30 uppercase tracking-wider">Categoria</span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 3.1, type: 'spring', stiffness: 300 }}
                          className="text-[8px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full ml-0.5 sm:ml-1"
                        >
                          IA
                        </motion.span>
                      </div>
                      <div className="bg-white/[0.04] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.06]">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 3.1, duration: 0.3 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0">
                            <Layers className="w-3 h-3 text-blue-400" strokeWidth={1.5} />
                          </div>
                          <span className="text-[12px] sm:text-[13px] text-white/70">iPhones</span>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 3.0, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
                        <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20" strokeWidth={1.5} />
                        <span className="text-[9px] sm:text-[10px] font-medium text-white/30 uppercase tracking-wider">Preco</span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 3.3, type: 'spring', stiffness: 300 }}
                          className="text-[8px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full ml-0.5 sm:ml-1"
                        >
                          IA
                        </motion.span>
                      </div>
                      <div className="bg-white/[0.04] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0">
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 3.2, duration: 0.3 }}
                          className="text-[13px] sm:text-[14px] text-white font-semibold"
                        >
                          R$ 9.499,00
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 3.4, type: 'spring', stiffness: 300 }}
                          className="text-[8px] sm:text-[9px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full w-fit"
                        >
                          Baseado no mercado
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Specs tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 3.3, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                      <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/20" strokeWidth={1.5} />
                      <span className="text-[9px] sm:text-[10px] font-medium text-white/30 uppercase tracking-wider">Especificacoes detectadas</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {[
                        { label: 'A17 Pro', bg: 'rgba(59,130,246,0.1)', text: 'rgb(96,165,250)', border: 'rgba(59,130,246,0.1)' },
                        { label: '256GB', bg: 'rgba(139,92,246,0.1)', text: 'rgb(167,139,250)', border: 'rgba(139,92,246,0.1)' },
                        { label: '48MP Camera', bg: 'rgba(6,182,212,0.1)', text: 'rgb(34,211,238)', border: 'rgba(6,182,212,0.1)' },
                        { label: 'Titanio', bg: 'rgba(245,158,11,0.1)', text: 'rgb(251,191,36)', border: 'rgba(245,158,11,0.1)' },
                        { label: 'USB-C', bg: 'rgba(34,197,94,0.1)', text: 'rgb(74,222,128)', border: 'rgba(34,197,94,0.1)' },
                        { label: '6.7"', bg: 'rgba(244,63,94,0.1)', text: 'rgb(251,113,133)', border: 'rgba(244,63,94,0.1)' },
                      ].map((spec, idx) => (
                        <motion.span
                          key={spec.label}
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 3.5 + idx * 0.08, type: 'spring', stiffness: 400, damping: 20 }}
                          className="text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg"
                          style={{ backgroundColor: spec.bg, color: spec.text, borderWidth: 1, borderColor: spec.border }}
                        >
                          {spec.label}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Confidence bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 3.8, duration: 0.4 }}
                    className="flex items-center gap-2 sm:gap-3 pt-2 border-t border-white/[0.04]"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" strokeWidth={1.5} />
                      <span className="text-[10px] sm:text-[11px] text-white/30 font-medium">Confianca</span>
                    </div>
                    <div className="flex-1 h-1.5 sm:h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '96%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 4.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                      />
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 4.4, duration: 0.3 }}
                      className="text-[12px] font-semibold text-green-400"
                    >
                      96%
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Bottom highlight features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.04]">
                {[
                  { icon: Search, label: 'Digite o nome', desc: 'Autocomplete inteligente' },
                  { icon: Sparkles, label: 'IA completa', desc: 'Todos os dados' },
                  { icon: FileText, label: 'Specs e preco', desc: 'Preenchidos na hora' },
                  { icon: CheckCircle2, label: 'Publique', desc: 'Em 1 clique' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-1.5 sm:mb-2"
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" strokeWidth={1.5} />
                    </motion.div>
                    <p className="text-[11px] sm:text-[12px] font-semibold text-white/70">{item.label}</p>
                    <p className="text-[9px] sm:text-[10px] text-white/25 mt-0.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — Design de Alto Nivel (Carousel)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#f5f5f7] py-16 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/[0.06] rounded-full px-4 py-1.5 mb-5 sm:mb-6">
              <Star className="w-3.5 h-3.5 text-[#1d1d1f]" strokeWidth={1.8} />
              <span className="text-[11px] sm:text-[12px] font-medium text-[#86868b] tracking-wide uppercase">Design Premium</span>
            </div>
            <h2 className="text-[26px] sm:text-[44px] md:text-[52px] font-bold text-[#1d1d1f] tracking-tight leading-[1.08]">
              Seu catalogo com visual de loja oficial.
            </h2>
            <p className="mt-3 sm:mt-5 text-[14px] sm:text-[18px] text-[#86868b] max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Cada detalhe pensado para transmitir confianca. Design Apple-level que seus clientes vao amar.
            </p>
          </motion.div>
        </div>

        {/* Carousel - starts aligned with container, bleeds right */}
        <div className="relative overflow-visible">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar"
            style={{ paddingLeft: 'max(1rem, calc((100% - 72rem) / 2 + 2rem))', paddingRight: '1rem' }}
          >

            {/* ── Card 1: Product Card Design ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  Cards de Produto
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  Design minimalista com detalhes que vendem.
                </p>
                {/* Visual: Product card mockup */}
                <div className="bg-[#f5f5f7] rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      { name: 'iPhone 15 Pro', price: 'R$7.499', oldPrice: 'R$8.299', discount: '-10%', color: 'from-gray-200 to-gray-100' },
                      { name: 'AirPods Pro 2', price: 'R$2.099', oldPrice: null, discount: null, color: 'from-gray-100 to-gray-50' },
                    ].map((product, idx) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white rounded-xl overflow-hidden border border-black/[0.03] group/card"
                      >
                        {/* Image area */}
                        <div className={`relative aspect-[3/4] bg-gradient-to-b ${product.color} flex items-center justify-center overflow-hidden`}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="w-12 h-16 sm:w-16 sm:h-20 bg-white/40 rounded-lg"
                          />
                          {product.discount && (
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6, type: 'spring', stiffness: 400 }}
                              className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                            >
                              {product.discount}
                            </motion.span>
                          )}
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + idx * 0.1, type: 'spring', stiffness: 300 }}
                            className="absolute bottom-1.5 right-1.5 w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full shadow-md flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1d1d1f]" strokeWidth={2} />
                          </motion.div>
                        </div>
                        {/* Info */}
                        <div className="p-2 sm:p-2.5">
                          <div className="flex items-center gap-1 mb-1">
                            <Truck className="w-2.5 h-2.5 text-gray-400" strokeWidth={1.5} />
                            <span className="text-[7px] sm:text-[8px] text-gray-400">Entrega 1h</span>
                          </div>
                          <p className="text-[10px] sm:text-[11px] font-semibold text-[#1d1d1f] leading-tight line-clamp-2">{product.name}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[11px] sm:text-[12px] font-bold text-[#1d1d1f]">{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-[9px] sm:text-[10px] text-gray-400 line-through">{product.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Product Detail / Image Gallery ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  Pagina do Produto
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  Galeria imersiva com info card sobreposto.
                </p>
                {/* Visual: Product detail mockup */}
                <div className="bg-[#f5f5f7] rounded-xl sm:rounded-2xl overflow-hidden">
                  {/* Image area with gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative aspect-[4/3] bg-gradient-to-b from-gray-200 to-gray-100 flex items-center justify-center"
                  >
                    <div className="w-16 h-20 sm:w-20 sm:h-24 bg-white/50 rounded-xl" />
                    {/* Discount badge */}
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 400 }}
                      className="absolute top-2.5 right-2.5 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md"
                    >
                      -15%
                    </motion.span>
                    {/* Express badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55, duration: 0.3 }}
                      className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[8px] font-medium px-2 py-1 rounded-lg flex items-center gap-1"
                    >
                      <Truck className="w-2.5 h-2.5" strokeWidth={1.5} />
                      Express
                    </motion.div>
                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
                    {/* Image dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 16 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        className="h-1.5 bg-white rounded-full"
                      />
                      {[1, 2, 3].map(i => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.05, type: 'spring', stiffness: 400 }}
                          className="w-1.5 h-1.5 bg-white/50 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                  {/* Overlapping info card */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative -mt-3 mx-2 mb-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 z-10"
                  >
                    <p className="text-[11px] sm:text-[13px] font-bold text-[#1d1d1f]">MacBook Air M3 15"</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[13px] sm:text-[15px] font-bold text-[#1d1d1f]">R$14.999</span>
                      <span className="text-[10px] sm:text-[11px] text-gray-400 line-through">R$17.599</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      className="flex items-center gap-1 mt-1.5"
                    >
                      <span className="text-[9px] sm:text-[10px] text-gray-400">ou 12x de</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-[#1d1d1f]">R$1.249,92</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
                      className="mt-2 bg-green-50 text-green-700 text-[8px] sm:text-[9px] font-semibold px-2 py-1 rounded-lg w-fit"
                    >
                      Voce economiza R$2.600
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Storefront Home ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.19, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  Vitrine Inteligente
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  Home com hero banner, categorias e destaques.
                </p>
                {/* Visual: Storefront home mockup */}
                <div className="bg-[#f5f5f7] rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                  {/* Store profile */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1d1d1f] flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] sm:text-[11px] font-black">A</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] sm:text-[12px] font-bold text-[#1d1d1f]">AppleLink Store</span>
                        <span className="text-[7px] sm:text-[8px] bg-green-50 text-green-600 font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <span className="w-1 h-1 bg-green-500 rounded-full" />
                          Aberto
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-[#86868b]">Apple Premium Reseller</span>
                    </div>
                  </motion.div>
                  {/* Hero banner mini */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#1d1d1f] to-[#3a3a3c] p-3 sm:p-4 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55, duration: 0.4 }}
                    >
                      <span className="text-[7px] sm:text-[8px] text-green-400 font-semibold flex items-center gap-1 mb-1">
                        <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={2} />
                        ENTREGA EXPRESS
                      </span>
                      <p className="text-[11px] sm:text-[14px] font-bold text-white leading-tight">Novos iPhone 15</p>
                      <p className="text-[8px] sm:text-[10px] text-white/50 mt-0.5">A partir de R$5.999</p>
                    </motion.div>
                  </motion.div>
                  {/* Categories row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex gap-2"
                  >
                    {['iPhones', 'Macs', 'iPads', 'Watch'].map((cat, idx) => (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + idx * 0.06, type: 'spring', stiffness: 400, damping: 20 }}
                        className="flex-1 text-center"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1d1d1f] mx-auto mb-0.5 flex items-center justify-center">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white/15 rounded-md" />
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-medium text-[#1d1d1f]">{cat}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  {/* AI Search mini banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-2.5 sm:p-3 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-semibold text-white">Busca com IA</p>
                      <p className="text-[7px] sm:text-[8px] text-white/60">Pergunte o que precisa</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-white/40 ml-auto shrink-0" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 4: Navigation & Bottom Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  Navegacao Premium
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  Header glassmorphism e barra inferior elegante.
                </p>
                {/* Visual: Phone frame with nav elements */}
                <div className="bg-[#f5f5f7] rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden relative" style={{ aspectRatio: '9/16' }}>
                    {/* Glassmorphism header */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-[#1d1d1f] flex items-center justify-center">
                          <span className="text-white text-[7px] font-black">A</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#1d1d1f]">AppleLink</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Search className="w-3 h-3 text-gray-500" strokeWidth={1.5} />
                        <div className="relative">
                          <ShoppingCart className="w-3 h-3 text-gray-500" strokeWidth={1.5} />
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, type: 'spring', stiffness: 400 }}
                            className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <span className="text-white text-[5px] font-bold">2</span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                    {/* Content placeholder */}
                    <div className="flex-1 p-3 space-y-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                          className="h-3 bg-gray-100 rounded-md"
                          style={{ width: `${85 - i * 10}%` }}
                        />
                      ))}
                    </div>
                    {/* Bottom nav */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-2 left-2 right-2 bg-[#1d1d1f]/90 backdrop-blur-sm rounded-xl p-1.5 flex items-center justify-around"
                    >
                      {[
                        { icon: LayoutDashboard, label: 'Home', active: true },
                        { icon: Search, label: 'Explorar', active: false },
                        { icon: ShoppingCart, label: 'Carrinho', active: false },
                        { icon: Star, label: 'Perfil', active: false },
                      ].map((nav, idx) => (
                        <motion.div
                          key={nav.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.75 + idx * 0.06, type: 'spring', stiffness: 400 }}
                          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${nav.active ? 'bg-white/15' : ''}`}
                        >
                          <nav.icon className={`w-3 h-3 ${nav.active ? 'text-white' : 'text-white/40'}`} strokeWidth={1.5} />
                          <span className={`text-[6px] sm:text-[7px] ${nav.active ? 'text-white font-semibold' : 'text-white/35'}`}>{nav.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 5: Cart & WhatsApp Checkout ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.33, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  Carrinho & Checkout
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  Checkout via WhatsApp com PIX e cartao.
                </p>
                {/* Visual: Cart mockup */}
                <div className="bg-[#f5f5f7] rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2.5">
                  {/* Cart item */}
                  {[
                    { name: 'iPhone 15 Pro 256GB', price: 'R$7.499', qty: 1 },
                    { name: 'AirPods Pro 2', price: 'R$2.099', qty: 2 },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.12, duration: 0.4 }}
                      className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 border border-black/[0.03]"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center">
                        <div className="w-6 h-8 bg-gray-200 rounded-md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-semibold text-[#1d1d1f] truncate">{item.name}</p>
                        <p className="text-[10px] sm:text-[11px] font-bold text-[#1d1d1f] mt-0.5">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Minus className="w-2.5 h-2.5 text-gray-500" strokeWidth={2} />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#1d1d1f] w-4 text-center">{item.qty}</span>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Plus className="w-2.5 h-2.5 text-gray-500" strokeWidth={2} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                    className="bg-white rounded-xl p-3 border border-black/[0.03] space-y-1.5"
                  >
                    <div className="flex justify-between text-[9px] sm:text-[10px] text-[#86868b]">
                      <span>Subtotal</span><span>R$11.697</span>
                    </div>
                    <div className="flex justify-between text-[9px] sm:text-[10px]">
                      <span className="text-[#86868b]">Frete</span>
                      <span className="text-green-600 font-semibold">Gratis</span>
                    </div>
                    <div className="flex justify-between text-[11px] sm:text-[12px] font-bold text-[#1d1d1f] pt-1.5 border-t border-black/[0.04]">
                      <span>Total</span><span>R$11.697</span>
                    </div>
                  </motion.div>
                  {/* WhatsApp CTA */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
                    className="bg-green-600 rounded-xl py-2.5 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white">Finalizar via WhatsApp</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 6: Express Delivery & Badges ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  Entrega Express
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  Badges e indicadores que geram confianca.
                </p>
                {/* Visual: Badges showcase */}
                <div className="bg-[#f5f5f7] rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-3">
                  {/* Express banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-[#1d1d1f] rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-semibold text-white">Entrega Express</p>
                      <p className="text-[8px] sm:text-[9px] text-white/50">Todos os itens em ate 1 hora</p>
                    </div>
                  </motion.div>
                  {/* Trust badges grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Truck, label: 'Entrega\n1 hora', color: 'bg-blue-50', iconColor: 'text-blue-600' },
                      { icon: Shield, label: 'Garantia\nApple', color: 'bg-green-50', iconColor: 'text-green-600' },
                      { icon: Zap, label: '100%\nOriginal', color: 'bg-amber-50', iconColor: 'text-amber-600' },
                    ].map((badge, idx) => (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + idx * 0.08, type: 'spring', stiffness: 400, damping: 20 }}
                        className="bg-white rounded-xl p-2.5 text-center border border-black/[0.03]"
                      >
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${badge.color} flex items-center justify-center mx-auto mb-1.5`}>
                          <badge.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${badge.iconColor}`} strokeWidth={1.5} />
                        </div>
                        <p className="text-[8px] sm:text-[9px] font-medium text-[#1d1d1f] leading-tight whitespace-pre-line">{badge.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  {/* Payment methods */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="space-y-1.5"
                  >
                    {[
                      { method: 'PIX', desc: 'Aprovacao instantanea', color: 'bg-emerald-500', badge: 'Recomendado' },
                      { method: 'Cartao', desc: 'Parcele em ate 12x', color: 'bg-violet-500', badge: null },
                    ].map((pm, idx) => (
                      <motion.div
                        key={pm.method}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + idx * 0.1, duration: 0.3 }}
                        className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 border border-black/[0.03]"
                      >
                        <div className={`w-7 h-7 rounded-lg ${pm.color} flex items-center justify-center shrink-0`}>
                          <DollarSign className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#1d1d1f]">{pm.method}</span>
                            {pm.badge && (
                              <span className="text-[7px] sm:text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{pm.badge}</span>
                            )}
                          </div>
                          <span className="text-[8px] sm:text-[9px] text-[#86868b]">{pm.desc}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${idx === 0 ? 'border-[#1d1d1f]' : 'border-gray-200'} flex items-center justify-center shrink-0`}>
                          {idx === 0 && <div className="w-2 h-2 bg-[#1d1d1f] rounded-full" />}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION — Compra Assistida com IA (Deconstructed Narrative)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-16 sm:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <motion.div
            animate={{ opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-violet-600 to-transparent rounded-full blur-[150px]"
          />
          {/* Vertical timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-[280px] bottom-[180px] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 sm:mb-24"
          >
            <div className="inline-flex items-center gap-2 bg-violet-500/[0.12] border border-violet-500/[0.15] rounded-full px-4 py-1.5 mb-5 sm:mb-6">
              <Bot className="w-3.5 h-3.5 text-violet-400" strokeWidth={1.8} />
              <span className="text-[11px] sm:text-[12px] font-medium text-violet-400 tracking-wide uppercase">Compra Assistida</span>
            </div>
            <h2 className="text-[26px] sm:text-[44px] md:text-[56px] font-bold text-white tracking-tight leading-[1.08]">
              Seu cliente conversa.{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">A IA vende.</span>
            </h2>
          </motion.div>

          {/* ── MOMENT 1: O cliente pergunta ── */}
          <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-16 items-center mb-16 sm:mb-28">
            {/* Left: Step label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-right order-2 lg:order-1"
            >
              <span className="text-[11px] font-bold text-violet-400/60 tracking-[0.2em] uppercase">Passo 01</span>
              <h3 className="text-[22px] sm:text-[32px] font-bold text-white tracking-tight mt-2 leading-tight">
                O cliente descreve<br className="hidden sm:block" /> o que precisa
              </h3>
              <p className="text-[14px] sm:text-[16px] text-white/40 leading-relaxed mt-3 max-w-md mx-auto lg:mx-0 lg:ml-auto">
                Em linguagem natural, sem filtros complicados. Ele so diz o que quer — a IA entende categoria, orcamento e preferencias.
              </p>
              {/* Extracted tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap gap-2 mt-5 justify-center lg:justify-end"
              >
                {[
                  { label: 'iPhone', icon: '📱' },
                  { label: 'Camera', icon: '📷' },
                  { label: 'R$ 8.000', icon: '💰' },
                ].map((tag) => (
                  <span key={tag.label} className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-white/60 bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 rounded-full">
                    <span>{tag.icon}</span> {tag.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: The user message (blown up) */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 lg:order-2"
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-sm">
                {/* Mini chat header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] sm:text-[13px] font-semibold text-white/90">Compra Assistida</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-[10px] text-white/40">Online</p>
                    </div>
                  </div>
                </div>
                {/* AI greeting */}
                <div className="flex gap-2.5 items-start mb-4">
                  <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3">
                    <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed">O que voce esta procurando hoje?</p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {['iPhone', 'MacBook', 'iPad', 'Presente'].map((label) => (
                        <span key={label} className="text-[10px] font-medium text-violet-400 bg-violet-500/10 border border-violet-500/15 px-2.5 py-1 rounded-full">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* User message (hero) */}
                <div className="flex justify-end">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl rounded-tr-md px-5 py-3.5 max-w-[85%] shadow-lg shadow-violet-500/20"
                  >
                    <p className="text-[14px] sm:text-[15px] text-white font-medium leading-relaxed">
                      Quero um iPhone com boa camera, ate R$ 8.000
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── MOMENT 2: A IA entende ── */}
          <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-16 items-center mb-16 sm:mb-28">
            {/* Left: Processing visualization */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/8 to-transparent rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-sm">
                {/* Processing header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-[13px] font-semibold text-white/80">Analisando intencao...</span>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-auto flex gap-1"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Extracted context cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Categoria', value: 'iPhones', icon: Tag, color: 'violet', delay: 0.3 },
                    { label: 'Orcamento', value: 'Ate R$ 8.000', icon: DollarSign, color: 'green', delay: 0.45 },
                    { label: 'Prioridade', value: 'Camera', icon: Star, color: 'amber', delay: 0.6 },
                    { label: 'Filtro', value: 'Em estoque', icon: CheckCircle2, color: 'blue', delay: 0.75 },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay, type: 'spring', stiffness: 400, damping: 25 }}
                      className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5 group hover:bg-white/[0.07] transition-colors"
                    >
                      <item.icon className={`w-4 h-4 text-${item.color}-400 mb-2`} strokeWidth={1.75} />
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{item.label}</p>
                      <p className="text-[13px] sm:text-[14px] text-white font-semibold mt-0.5">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Confidence bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="mt-4 bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-white/50 font-medium">Confianca da IA</span>
                    <span className="text-[12px] text-green-400 font-bold">96%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '96%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-violet-500 to-green-400 rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Step label */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <span className="text-[11px] font-bold text-blue-400/60 tracking-[0.2em] uppercase">Passo 02</span>
              <h3 className="text-[22px] sm:text-[32px] font-bold text-white tracking-tight mt-2 leading-tight">
                A IA extrai contexto<br className="hidden sm:block" /> e filtra em tempo real
              </h3>
              <p className="text-[14px] sm:text-[16px] text-white/40 leading-relaxed mt-3 max-w-md mx-auto lg:mx-0">
                Categoria, orcamento, preferencias — tudo e detectado automaticamente. E o contexto se acumula: cada mensagem refina os resultados.
              </p>
              <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Layers className="w-5 h-5 text-indigo-400 shrink-0" strokeWidth={1.75} />
                <p className="text-[13px] text-white/50 leading-relaxed">
                  <span className="text-white/80 font-medium">Contexto cumulativo:</span> "iPhone" + "ate R$ 8.000" + "entrega rapida" — cada filtro se soma ao anterior.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── MOMENT 3: A IA recomenda (Product Cards - the STAR) ── */}
          <div className="relative">
            {/* Step label centered */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-10 sm:mb-14"
            >
              <span className="text-[11px] font-bold text-green-400/60 tracking-[0.2em] uppercase">Passo 03</span>
              <h3 className="text-[22px] sm:text-[36px] md:text-[42px] font-bold text-white tracking-tight mt-2 leading-tight">
                Cards de produto aparecem{' '}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">direto no chat</span>
              </h3>
              <p className="text-[14px] sm:text-[16px] text-white/40 leading-relaxed mt-3 max-w-xl mx-auto">
                Nao e um link. Nao e um redirect. Sao cards interativos com foto, preco, desconto e entrega express — tudo inline na conversa.
              </p>
            </motion.div>

            {/* AI bubble + Product cards breaking out */}
            <div className="relative">
              {/* Glow behind cards */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] bg-gradient-to-b from-violet-600/[0.06] via-purple-600/[0.04] to-transparent blur-[80px] pointer-events-none" />

              {/* AI text bubble */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-3 max-w-2xl mx-auto mb-8"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm rounded-2xl rounded-tl-md px-5 py-4">
                  <p className="text-[14px] sm:text-[16px] text-white/80 leading-relaxed">
                    Encontrei <strong className="text-white">3 iPhones</strong> perfeitos pra voce! Todos com camera profissional e dentro do orcamento:
                  </p>
                </div>
              </motion.div>

              {/* ── Product Cards (slider on mobile, grid on desktop) ── */}
              {(() => {
                const aiProducts = [
                  {
                    name: 'iPhone 15 Pro Max',
                    specs: '256GB · A17 Pro · Camera 48MP',
                    price: 'R$ 7.499',
                    originalPrice: 'R$ 8.999',
                    discount: '-17%',
                    express: true,
                    gradient: 'from-[#1a1a3e] via-[#1e1e40] to-[#0f0f2a]',
                    ring: 'ring-violet-500/20',
                    featured: true,
                  },
                  {
                    name: 'iPhone 15 Pro',
                    specs: '128GB · A17 Pro · Camera 48MP',
                    price: 'R$ 6.299',
                    originalPrice: 'R$ 7.499',
                    discount: '-16%',
                    express: true,
                    gradient: 'from-[#1a1a1a] via-[#252525] to-[#111111]',
                    ring: 'ring-white/10',
                    featured: false,
                  },
                  {
                    name: 'iPhone 15',
                    specs: '128GB · A16 · Camera 48MP',
                    price: 'R$ 4.999',
                    originalPrice: 'R$ 5.999',
                    discount: '-17%',
                    express: false,
                    gradient: 'from-[#2a1a28] via-[#1e1520] to-[#150f14]',
                    ring: 'ring-pink-500/10',
                    featured: false,
                  },
                ];

                const renderCard = (product, idx) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + idx * 0.15,
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                    }}
                    className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.04] border border-white/[0.08] ring-1 ${product.ring} hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 ${product.featured ? 'sm:-translate-y-2' : ''}`}
                  >
                    {/* Product image area */}
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                        className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm shadow-2xl"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] sm:text-[11px] font-bold text-white bg-green-500 px-2.5 py-1 rounded-full shadow-lg shadow-green-500/30">
                          {product.discount}
                        </span>
                      </div>
                      {product.express && (
                        <div className="absolute top-3 right-3">
                          <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                            <Truck className="w-3 h-3" /> 1h
                          </span>
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute bottom-3 left-3">
                          <span className="flex items-center gap-1 text-[9px] font-bold text-violet-300 bg-violet-500/20 backdrop-blur-md px-2 py-1 rounded-full border border-violet-500/20">
                            <Star className="w-3 h-3 fill-violet-400" /> Melhor opcao
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product info */}
                    <div className="p-4 sm:p-5">
                      <p className="text-[14px] sm:text-[16px] font-semibold text-white leading-snug">{product.name}</p>
                      <p className="text-[11px] sm:text-[12px] text-white/40 mt-1">{product.specs}</p>
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-[18px] sm:text-[22px] font-bold text-white tabular-nums">{product.price}</span>
                        <span className="text-[12px] sm:text-[13px] text-white/30 line-through">{product.originalPrice}</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 bg-white text-[#1d1d1f] rounded-xl py-2.5 sm:py-3 text-center cursor-pointer"
                      >
                        <span className="text-[12px] sm:text-[13px] font-semibold">Ver detalhes</span>
                      </motion.div>
                    </div>
                  </motion.div>
                );

                return (
                  <>
                    {/* Desktop: grid */}
                    <div className="hidden sm:grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
                      {aiProducts.map((product, idx) => renderCard(product, idx))}
                    </div>

                    {/* Mobile: slider */}
                    <div className="sm:hidden max-w-4xl mx-auto">
                      <div
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4"
                        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                      >
                        {aiProducts.map((product, idx) => (
                          <div key={product.name} className="snap-center shrink-0 w-[85vw] max-w-[320px]">
                            {renderCard(product, idx)}
                          </div>
                        ))}
                      </div>
                      {/* Slider dots */}
                      <div className="flex justify-center gap-2 mt-4">
                        {aiProducts.map((_, idx) => (
                          <div
                            key={idx}
                            className="w-1.5 h-1.5 rounded-full bg-white/20"
                          />
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}

              {/* Quick reply row below cards */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex overflow-x-auto sm:flex-wrap justify-center gap-2.5 mt-8 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none"
                style={{ scrollbarWidth: 'none' }}
              >
                {[
                  { label: 'Comparar os 3', icon: GitCompareArrows },
                  { label: 'So entrega express', icon: Truck },
                  { label: 'Ate R$ 5.000', icon: DollarSign },
                  { label: 'Adicionar ao carrinho', icon: ShoppingCart },
                ].map((action) => (
                  <span
                    key={action.label}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-violet-300 bg-violet-500/10 border border-violet-500/15 px-4 py-2 rounded-full hover:bg-violet-500/20 transition-colors cursor-default shrink-0 snap-center"
                  >
                    <action.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {action.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Bottom stat ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-4 mt-14 sm:mt-20"
            >
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[32px] sm:text-[40px] font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent tracking-tight leading-none">+40%</div>
                <div className="border-l border-white/[0.08] pl-4">
                  <p className="text-[13px] sm:text-[14px] font-semibold text-white">Mais conversoes</p>
                  <p className="text-[11px] sm:text-[12px] text-white/40">com Compra Assistida vs busca tradicional</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION — Linktree Integrado (Bento Grid)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#f5f5f7] py-16 sm:py-32 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/[0.06] px-4 py-1.5 rounded-full text-[12px] font-semibold text-black/50 tracking-wide uppercase mb-6">
              <Link2 className="w-3 h-3" />
              Link na Bio
            </span>
            <h2 className="text-[clamp(1.6rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]">
              Seu Linktree.{' '}
              <span className="bg-gradient-to-r from-[#007aff] via-purple-500 to-[#34c759] bg-clip-text text-transparent">So que completo.</span>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed max-w-lg mx-auto">
              Um unico link reune perfil, catalogo, redes sociais, WhatsApp e localizacao. Substitua 5 links por 1.
            </p>
          </motion.div>

          {/* ── Bento Grid — 3 cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            {/* ── Card 1: Um link, tudo dentro (full-width, hero card) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2"
            >
              <div className="relative bg-[#1d1d1f] rounded-[20px] sm:rounded-[28px] overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.08] via-transparent to-green-500/[0.06] pointer-events-none" />

                <div className="relative p-6 sm:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                  {/* Left: text + old links → new link */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white/30 uppercase tracking-wider mb-3">Antes vs Agora</p>
                    <h3 className="text-[24px] sm:text-[32px] font-bold text-white tracking-tight leading-[1.1]">
                      5 links espalhados.{' '}
                      <span className="bg-gradient-to-r from-[#007aff] to-[#34c759] bg-clip-text text-transparent">Agora e so 1.</span>
                    </h3>
                    <p className="mt-3 text-[14px] sm:text-[16px] text-white/40 leading-relaxed max-w-md">
                      Linktree, site, WhatsApp, redes, mapa — seu cliente so precisa de um link pra acessar tudo.
                    </p>

                    {/* Old links crossed out */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {['linktree.com/loja', 'wa.me/5511...', 'instagram.com/loja', 'site-catalogo.com', 'maps.google'].map((l, idx) => (
                        <motion.span
                          key={l}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + idx * 0.06 }}
                          className="text-[10px] sm:text-[11px] font-mono text-white/25 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1.5 rounded-lg line-through"
                        >
                          {l}
                        </motion.span>
                      ))}
                    </div>

                    {/* Arrow + new link */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-5 flex items-center gap-3"
                    >
                      <ArrowRight className="w-4 h-4 text-white/20" />
                      <div className="bg-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg shadow-white/[0.05]">
                        <div className="w-8 h-8 rounded-xl bg-[#1d1d1f] flex items-center justify-center">
                          <span className="text-[11px] font-black text-white">W</span>
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#1d1d1f]">wegx.app/sualoja</p>
                          <p className="text-[10px] text-[#86868b]">Tudo em um link</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: feature pills grid */}
                  <div className="shrink-0 w-full md:w-auto">
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {[
                        { icon: Store, label: 'Catalogo', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                        { icon: MessageSquare, label: 'WhatsApp', color: 'text-green-400', bg: 'bg-green-500/10' },
                        { icon: Instagram, label: 'Redes sociais', color: 'text-pink-400', bg: 'bg-pink-500/10' },
                        { icon: Clock, label: 'Horario', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                        { icon: MapPin, label: 'Localizacao', color: 'text-red-400', bg: 'bg-red-500/10' },
                        { icon: Link2, label: 'Links rapidos', color: 'text-violet-400', bg: 'bg-violet-500/10' },
                      ].map((f, idx) => (
                        <motion.div
                          key={f.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.06, type: 'spring', stiffness: 400, damping: 25 }}
                          className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-3.5 py-3 hover:bg-white/[0.07] transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                            <f.icon className={`w-4 h-4 ${f.color}`} strokeWidth={1.75} />
                          </div>
                          <span className="text-[12px] sm:text-[13px] font-medium text-white/70">{f.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Header real do catalogo (replica fiel) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-full bg-white rounded-[20px] sm:rounded-[28px] border border-black/[0.04] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                {/* Label */}
                <div className="px-6 sm:px-7 pt-5 sm:pt-6 pb-0">
                  <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Header do catalogo</p>
                </div>
                {/* Replica of Home.jsx Store Profile */}
                <div className="px-6 sm:px-7 pt-4 pb-6 sm:pb-7">
                  {/* Avatar + Info */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shrink-0 shadow-lg shadow-gray-900/20">
                      <span className="text-xl font-black text-white tracking-tighter">W</span>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-bold text-gray-900 tracking-tight truncate">WEGX Fast Delivery</h4>
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                          Aberto
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">Apple Premium Reseller | Entrega Express</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" strokeWidth={2} />
                          <span>Seg-Sex 9h-18h</span>
                        </div>
                        <span className="text-gray-200 text-[10px]">|</span>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <MapPin className="w-3 h-3" strokeWidth={2} />
                          <span>Sao Paulo, SP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-[13px] text-gray-500 leading-relaxed mt-3.5">
                    Produtos Apple 100% originais com garantia. Entrega em ate 1 hora na sua regiao.
                  </p>

                  {/* Actions: WhatsApp + Socials */}
                  <div className="flex items-center gap-2.5 mt-4">
                    <div className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl h-10 font-semibold text-[13px]">
                      <MessageSquare className="w-4 h-4" strokeWidth={2} />
                      WhatsApp
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <Instagram className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.19a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.62z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="flex items-center gap-2 mt-3.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {[
                      { label: 'Catalogo', icon: Tag },
                      { label: 'Ofertas', icon: Zap },
                      { label: 'Rastreio', icon: Package },
                    ].map((link) => (
                      <span key={link.label} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-2 text-[12px] font-semibold text-gray-700 shrink-0">
                        <link.icon className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                        {link.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Catalogo + Horario (visual mockup) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-full bg-white rounded-[20px] sm:rounded-[28px] border border-black/[0.04] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                {/* Colored top accent */}
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-green-400 to-emerald-500" />
                <div className="p-6 sm:p-7">
                  {/* Product list section */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[14px] font-bold text-[#1d1d1f]">Produtos em destaque</p>
                    <span className="text-[12px] text-[#007aff] font-medium">Ver catalogo</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: 'iPhone 15 Pro', specs: '256GB · Titanio', price: 'R$ 6.299', tag: '-16%', express: true },
                      { name: 'MacBook Air M3', specs: '8GB · 256GB SSD', price: 'R$ 8.999', tag: '-12%', express: true },
                      { name: 'AirPods Pro 2', specs: 'USB-C · ANC', price: 'R$ 1.899', tag: '-20%', express: false },
                    ].map((product, idx) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.08, duration: 0.4 }}
                        className="flex items-center gap-3 bg-[#f5f5f7] rounded-2xl p-3 hover:bg-[#ebebed] transition-colors"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center shrink-0">
                          <Smartphone className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-[#1d1d1f] truncate">{product.name}</p>
                          <p className="text-[10px] text-[#86868b]">{product.specs}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[13px] font-bold text-[#1d1d1f]">{product.price}</p>
                          <div className="flex items-center gap-1 justify-end mt-0.5">
                            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{product.tag}</span>
                            {product.express && (
                              <span className="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                <Zap className="w-2 h-2" /> 1h
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-black/[0.04] my-5" />

                  {/* Hours compact */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#86868b]" strokeWidth={1.75} />
                      <span className="text-[12px] font-medium text-[#86868b]">Seg-Sex 9h-18h · Sab 9h-14h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[11px] font-semibold text-green-600">Aberto</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-[#86868b]" strokeWidth={1.75} />
                    <span className="text-[12px] font-medium text-[#86868b]">Sao Paulo, SP</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION — Precos e Planos
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-black py-16 sm:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <motion.div
            animate={{ opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-600 to-transparent rounded-full blur-[150px]"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 mb-5 sm:mb-6">
              <DollarSign className="w-3.5 h-3.5 text-white/50" strokeWidth={1.8} />
              <span className="text-[11px] sm:text-[12px] font-medium text-white/50 tracking-wide uppercase">Precos</span>
            </div>
            <h2 className="text-[26px] sm:text-[44px] md:text-[56px] font-bold text-white tracking-tight leading-[1.08]">
              Preco simples.{' '}
              <br className="hidden sm:block" />
              <span className="text-white/40">Sem surpresas.</span>
            </h2>
            <p className="mt-3 sm:mt-5 text-[14px] sm:text-[18px] text-white/35 max-w-xl mx-auto leading-relaxed">
              Comece gratis e escale conforme sua loja cresce. Sem taxa de setup, sem contrato.
            </p>
          </motion.div>

          {/* ── Billing toggle ── */}
          {(() => {
            const [isAnnual, setIsAnnual] = useState(false);
            const proPrice = isAnnual ? '77' : '97';
            const proSuffix = isAnnual ? '/mes' : '/mes';
            const proBilled = isAnnual ? 'Cobrado R$ 924/ano' : 'Cobrado mensalmente';

            return (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center justify-center gap-3 mb-10 sm:mb-14"
                >
                  <span className={`text-[13px] sm:text-[14px] font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-white/30'}`}>Mensal</span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="relative w-12 h-7 rounded-full bg-white/[0.08] border border-white/[0.1] transition-colors hover:bg-white/[0.12] focus:outline-none"
                    style={{ backgroundColor: isAnnual ? 'rgba(0,122,255,0.3)' : undefined }}
                  >
                    <motion.div
                      animate={{ x: isAnnual ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-sm ${isAnnual ? 'bg-[#007aff]' : 'bg-white/40'}`}
                    />
                  </button>
                  <span className={`text-[13px] sm:text-[14px] font-medium transition-colors ${isAnnual ? 'text-white' : 'text-white/30'}`}>
                    Anual
                  </span>
                  {isAnnual && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[11px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full"
                    >
                      -20%
                    </motion.span>
                  )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-[1000px] mx-auto">

            {/* ── Basico ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 flex flex-col">
                <p className="text-[13px] font-semibold text-white/40 uppercase tracking-wider">Basico</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-[40px] sm:text-[48px] font-bold text-white tracking-tight leading-none">Gratis</span>
                </div>
                <p className="text-[13px] text-white/30 mt-2">Para sempre, sem cartao</p>

                <div className="h-px bg-white/[0.06] my-6" />

                <div className="space-y-3.5 flex-1">
                  {[
                    'Ate 50 produtos',
                    'Link na bio personalizado',
                    'Checkout via WhatsApp',
                    'Perfil com redes sociais',
                    'Horario de funcionamento',
                    'Design responsivo',
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-white/20 shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-[13px] sm:text-[14px] text-white/50">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 bg-white/[0.06] border border-white/[0.08] text-white rounded-2xl py-3.5 text-center cursor-pointer hover:bg-white/[0.1] transition-colors"
                >
                  <span className="text-[14px] font-semibold">Comecar gratis</span>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Pro (highlighted) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group md:-translate-y-3"
            >
              <div className="h-full relative rounded-[20px] sm:rounded-[24px] p-px bg-gradient-to-b from-[#007aff]/60 via-white/[0.12] to-white/[0.04] shadow-2xl shadow-blue-500/[0.1]">
                <div className="h-full bg-[#111113] rounded-[19px] sm:rounded-[23px] p-6 sm:p-8 flex flex-col relative overflow-hidden">
                  {/* Glow */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-[#007aff]/[0.12] rounded-full blur-[60px] pointer-events-none" />

                  <div className="relative flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-[#007aff] uppercase tracking-wider">Pro</p>
                    <span className="text-[10px] font-bold text-white bg-[#007aff] px-2.5 py-1 rounded-full">Popular</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-[14px] text-white/40 font-medium">R$</span>
                    <motion.span
                      key={proPrice}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="text-[40px] sm:text-[48px] font-bold text-white tracking-tight leading-none"
                    >{proPrice}</motion.span>
                    <span className="text-[14px] text-white/40 font-medium">{proSuffix}</span>
                  </div>
                  <p className="text-[13px] text-white/30 mt-2">{proBilled}</p>

                  <div className="h-px bg-white/[0.06] my-6" />

                  <div className="space-y-3.5 flex-1">
                    {[
                      { text: 'Produtos ilimitados', highlight: true },
                      { text: 'Entrega Express (1h)', highlight: true },
                      { text: 'Compra Assistida com IA', highlight: true },
                      { text: 'Analytics e relatorios', highlight: false },
                      { text: 'Dominio personalizado', highlight: false },
                      { text: 'Comparacao de produtos', highlight: false },
                      { text: 'Suporte prioritario', highlight: false },
                    ].map((feature) => (
                      <div key={feature.text} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${feature.highlight ? 'text-[#007aff]' : 'text-white/15'}`} strokeWidth={2} />
                        <span className={`text-[13px] sm:text-[14px] ${feature.highlight ? 'text-white font-medium' : 'text-white/40'}`}>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 bg-[#007aff] text-white rounded-2xl py-3.5 text-center cursor-pointer hover:bg-[#0071e3] transition-colors shadow-lg shadow-blue-500/25"
                  >
                    <span className="text-[14px] font-semibold">Assinar Pro</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Enterprise ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 flex flex-col">
                <p className="text-[13px] font-semibold text-white/40 uppercase tracking-wider">Enterprise</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight leading-none">Sob consulta</span>
                </div>
                <p className="text-[13px] text-white/30 mt-2">Para operacoes em escala</p>

                <div className="h-px bg-white/[0.06] my-6" />

                <div className="space-y-3.5 flex-1">
                  {[
                    'Tudo do Pro',
                    'API e integracoes',
                    'Multi-lojas',
                    'SLA garantido (99.9%)',
                    'Account manager dedicado',
                    'Onboarding personalizado',
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-white/20 shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-[13px] sm:text-[14px] text-white/50">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 bg-white/[0.06] border border-white/[0.08] text-white rounded-2xl py-3.5 text-center cursor-pointer hover:bg-white/[0.1] transition-colors"
                >
                  <span className="text-[14px] font-semibold">Falar com vendas</span>
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* ── Bottom note ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-10 sm:mt-14"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] sm:text-[13px] text-white/25">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                Sem taxa de setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                Cancele quando quiser
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                Suporte via WhatsApp
              </span>
            </div>
          </motion.div>

                </>
              );
          })()}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Top divider — thin gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="py-32 sm:py-44 md:py-52">
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* Giant headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,8vw,7rem)] font-bold text-white tracking-tight leading-[1] max-w-4xl mx-auto"
            >
              Comece agora.
              <br />
              <span className="text-white/15">É grátis.</span>
            </motion.h2>

            {/* Single CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 sm:mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group bg-[#007aff] text-white font-semibold pl-7 pr-5 py-4 rounded-full text-[15px] sm:text-[16px] hover:bg-[#0071e3] transition-colors inline-flex items-center gap-3"
              >
                Criar minha loja
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
            </motion.div>

            {/* Demo link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-5"
            >
              <Link to={createPageUrl('Home')} className="text-white/30 text-[13px] sm:text-[14px] hover:text-white/60 transition-colors inline-flex items-center gap-1.5">
                ou veja a demo ao vivo
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-20 pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

            {/* Brand column */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 lg:pr-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#007aff] to-[#007aff]/70 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-white font-semibold text-lg tracking-tight">WEGX</span>
              </div>
              <p className="text-white/35 text-[13px] sm:text-[14px] leading-relaxed max-w-xs mb-6">
                A plataforma completa para lojas Apple. Catálogo, entrega express, checkout via WhatsApp e muito mais.
              </p>
              <div className="flex items-center gap-3">
                <a href={STORE_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={STORE_INFO.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href={STORE_INFO.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z"/></svg>
                </a>
              </div>
            </div>

            {/* Produto */}
            <div>
              <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-5">Produto</h4>
              <ul className="space-y-3.5">
                {['Catálogo', 'Entrega Express', 'WhatsApp Checkout', 'Painel Admin', 'Busca com IA', 'Link da Loja'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 text-[13px] sm:text-[14px] hover:text-white/70 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-5">Empresa</h4>
              <ul className="space-y-3.5">
                {['Sobre nós', 'Blog', 'Carreiras', 'Contato', 'Parceiros'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 text-[13px] sm:text-[14px] hover:text-white/70 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-5">Legal</h4>
              <ul className="space-y-3.5">
                {['Termos de Uso', 'Privacidade', 'Cookies', 'LGPD'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/35 text-[13px] sm:text-[14px] hover:text-white/70 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>

              <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-4 mt-8">Contato</h4>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:contato@wegx.com.br`} className="flex items-center gap-2 text-white/35 text-[13px] hover:text-white/70 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                    contato@wegx.com.br
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${STORE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/35 text-[13px] hover:text-white/70 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-[12px] sm:text-[13px]">
              © {new Date().getFullYear()} WEGX. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1.5 text-white/15 text-[11px] sm:text-[12px]">
              <span>Feito com</span>
              <Heart className="w-3 h-3 text-red-500/50 fill-red-500/50" />
              <span>em São Paulo, Brasil</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
