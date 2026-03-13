import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Sparkles, Crown, Gift, Users } from 'lucide-react';
import { STORE_INFO } from '@/lib/constants';
import { useState, useRef } from 'react';
import { useWaitlist } from '../components/WaitlistModal';

import { fadeUp } from '../animations';
import GlowBeam from '../components/GlowBeam';
import Marquee from '../components/Marquee';
import FloatingCard from '../components/FloatingCard';

const navLinks = [];

const floatingProducts = [
  { name: 'Catalogo com IA', price: 'Automatizado', color: 'from-blue-500/20 to-blue-600/10', x: '-left-16 md:-left-32', y: 'top-[15%]', delay: 0 },
  { name: 'Gestao de Pedidos', price: 'Em tempo real', color: 'from-violet-500/20 to-violet-600/10', x: '-right-14 md:-right-28', y: 'top-[10%]', delay: 0.4 },
  { name: 'Analytics Pro', price: 'Insights IA', color: 'from-cyan-500/20 to-cyan-600/10', x: '-left-10 md:-left-20', y: 'bottom-[25%]', delay: 0.8 },
  { name: 'Checkout Smart', price: 'WhatsApp', color: 'from-purple-500/20 to-purple-600/10', x: '-right-8 md:-right-18', y: 'bottom-[30%]', delay: 1.2 },
];

export default function HeroSection() {
  const { setOpen } = useWaitlist();
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
    <>
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
                <button
                  onClick={() => setOpen(true)}
                  className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-xl text-[13px] font-semibold transition-all hover:bg-white/90 active:scale-[0.97]"
                >
                  Quero acesso antecipado
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
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
                  <button
                    onClick={() => { setOpen(true); setMobileMenuOpen(false); }}
                    className="mt-2 flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-sm font-semibold w-full"
                  >
                    Quero acesso antecipado
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen bg-black">
        <GlowBeam />
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
                    <span className="hidden sm:inline">Pre-lancamento</span>
                    <span className="sm:hidden">Em breve</span>
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/50 truncate">
                    Vagas limitadas — cadastre-se agora
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
                <button
                  onClick={() => setOpen(true)}
                  className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 bg-white text-black pl-7 pr-5 py-3.5 sm:py-4 rounded-full text-[15px] font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.97]"
                >
                  Garantir minha vaga
                  <span className="flex items-center justify-center w-7 h-7 bg-black/10 rounded-full group-hover:bg-black/15 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(STORE_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/[0.1] text-white/60 px-7 py-3.5 sm:py-4 rounded-full text-[15px] font-medium transition-all hover:bg-white/[0.05] hover:text-white hover:border-white/20 active:scale-[0.97]"
                >
                  Falar com a equipe
                </a>
              </motion.div>

              {/* Trust row */}
              <motion.div variants={fadeUp} custom={4} className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {[
                  { icon: Crown, text: 'Acesso antecipado' },
                  { icon: Gift, text: 'Oferta exclusiva' },
                  { icon: Users, text: 'Grupo VIP' },
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

              {/* Phone mockup */}
              <div className="relative z-10 w-[290px] sm:w-[330px] md:w-[380px] mx-auto">
                <img
                  src="/exemple-layout/mockup-home.webp"
                  alt="AppleLink Catalogo"
                  className="w-full h-auto drop-shadow-[0_50px_120px_rgba(0,0,0,0.7)]"
                />
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
    </>
  );
}
