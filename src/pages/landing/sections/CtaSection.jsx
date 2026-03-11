import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { EASE_APPLE } from '../animations';

export default function CtaSection() {
  return (
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
            transition={{ duration: 0.8, ease: EASE_APPLE }}
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
            transition={{ delay: 0.15, duration: 0.6, ease: EASE_APPLE }}
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
  );
}
