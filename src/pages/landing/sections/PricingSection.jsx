import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign } from 'lucide-react';
import { EASE_APPLE } from '../animations';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const proPrice = isAnnual ? '77' : '97';
  const proSuffix = isAnnual ? '/mes' : '/mes';
  const proBilled = isAnnual ? 'Cobrado R$ 924/ano' : 'Cobrado mensalmente';

  return (
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_APPLE }}
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

        {/* Billing toggle */}
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

          {/* Basico */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE_APPLE }}
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

          {/* Pro (highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.08, duration: 0.6, ease: EASE_APPLE }}
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

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.16, duration: 0.6, ease: EASE_APPLE }}
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

        {/* Bottom note */}
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

      </div>
    </section>
  );
}
