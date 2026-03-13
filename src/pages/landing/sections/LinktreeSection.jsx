import { motion } from 'framer-motion';
import {
  Link2,
  ArrowRight,
  Store,
  MessageSquare,
  Instagram,
  Clock,
  MapPin,
  Tag,
  Zap,
  Package,
} from 'lucide-react';
import { EASE_APPLE } from '../animations';

export default function LinktreeSection() {
  return (
    <section className="relative bg-[#f5f5f7] py-16 sm:py-32 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_APPLE }}
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
            transition={{ duration: 0.6, ease: EASE_APPLE }}
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
                        <span className="text-[11px] font-black text-white">AL</span>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#1d1d1f]">applelink.app/sualoja</p>
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
            transition={{ delay: 0.1, duration: 0.6, ease: EASE_APPLE }}
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
                    <span className="text-xl font-black text-white tracking-tighter">AL</span>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-bold text-gray-900 tracking-tight truncate">AppleLink Loja</h4>
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

          {/* ── Card 3: Pagina de produto real ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.18, duration: 0.6, ease: EASE_APPLE }}
          >
            <div className="h-full bg-white rounded-[20px] sm:rounded-[28px] border border-black/[0.04] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
              {/* Label */}
              <div className="px-6 sm:px-7 pt-5 sm:pt-6 pb-3">
                <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Pagina do produto</p>
              </div>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <div className="rounded-2xl overflow-hidden h-[280px] sm:h-[320px]">
                  <img
                    src="/exemple-layout/mockup-pagina-produto.webp"
                    alt="Pagina de produto"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
