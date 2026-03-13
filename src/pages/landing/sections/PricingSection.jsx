import { motion } from 'framer-motion';
import { Sparkles, Crown, Gift, Users, ArrowRight } from 'lucide-react';
import { EASE_APPLE } from '../animations';
import { useWaitlist } from '../components/WaitlistModal';

const benefits = [
  {
    icon: Crown,
    title: 'Acesso antes de todos',
    description: 'Seja um dos primeiros a usar a plataforma e saia na frente da concorrencia.',
  },
  {
    icon: Gift,
    title: 'Oferta exclusiva de lancamento',
    description: 'Condicoes especiais que so estarao disponiveis para quem se cadastrar agora.',
  },
  {
    icon: Users,
    title: 'Grupo VIP',
    description: 'Acesso ao grupo exclusivo com novidades, dicas e suporte direto da equipe.',
  },
];

export default function PricingSection() {
  const { setOpen } = useWaitlist();

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
          <div className="inline-flex items-center gap-2 bg-[#007aff]/10 border border-[#007aff]/20 rounded-full px-4 py-1.5 mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#007aff]" strokeWidth={1.8} />
            <span className="text-[11px] sm:text-[12px] font-bold text-[#007aff] tracking-wide uppercase">Pre-lancamento</span>
          </div>
          <h2 className="text-[26px] sm:text-[44px] md:text-[56px] font-bold text-white tracking-tight leading-[1.08]">
            Vagas limitadas{' '}
            <br className="hidden sm:block" />
            <span className="text-white/40">para o pre-lancamento.</span>
          </h2>
          <p className="mt-3 sm:mt-5 text-[14px] sm:text-[18px] text-white/35 max-w-xl mx-auto leading-relaxed">
            Cadastre-se agora e garanta beneficios exclusivos que so os primeiros terao acesso.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-[1000px] mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: EASE_APPLE }}
              className="group"
            >
              <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#007aff]/10 border border-[#007aff]/20 flex items-center justify-center mb-5">
                  <benefit.icon className="w-6 h-6 text-[#007aff]" strokeWidth={1.8} />
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-semibold text-white tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[13px] sm:text-[14px] text-white/35 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: EASE_APPLE }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group bg-[#007aff] text-white font-semibold pl-7 pr-5 py-4 rounded-full text-[15px] sm:text-[16px] hover:bg-[#0071e3] transition-colors inline-flex items-center gap-3 shadow-lg shadow-blue-500/25"
          >
            Garantir minha vaga
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>

          <p className="mt-4 text-[13px] text-white/25">
            Apenas <span className="text-[#007aff] font-semibold">47 vagas</span> restantes para o acesso antecipado
          </p>
        </motion.div>
      </div>
    </section>
  );
}
