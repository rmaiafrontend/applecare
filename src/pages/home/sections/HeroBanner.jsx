import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroBanner({
  image, title, subtitle, ctaText, ctaLink,
  badgeText, badgeActive, badgeAnimated,
}) {
  return (
    <motion.section initial="hidden" animate="visible" variants={fadeUp} className="relative mx-4 mt-4 rounded-3xl overflow-hidden">
      <div className="relative p-6 pb-7">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgb(var(--store-primary) / 0.97), rgb(var(--store-primary) / 0.85), rgb(var(--store-primary) / 0.6))` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgb(var(--store-primary) / 0.8), transparent 60%)` }} />

        <div className="relative z-10">
          {badgeActive && (
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 mb-4 border border-white/[0.08]"
            >
              <div className={`w-1.5 h-1.5 bg-green-400 rounded-full ${badgeAnimated ? 'animate-pulse' : ''}`} />
              <span className="font-medium text-white/90 text-[11px] tracking-widest uppercase">{badgeText}</span>
            </motion.div>
          )}

          <motion.h1 variants={fadeUp} custom={1} className="text-[28px] font-bold mb-1 leading-[1.15] text-white tracking-tight">
            {title}
          </motion.h1>

          <motion.p variants={fadeUp} custom={1.5} className="text-[20px] text-white/60 mb-5 leading-snug max-w-[300px] font-medium">
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp} custom={3}>
            <Link
              to={ctaLink}
              className="group inline-flex items-center gap-2.5 bg-store-accent text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-all hover:bg-store-accent/90 active:scale-[0.97]"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
