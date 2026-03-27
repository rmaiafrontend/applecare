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

export default function InfoCard({ emoji, title, description, ctaText, ctaLink, bgColor }) {
  if (!title) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      className="mx-4 mt-8"
    >
      <div className="relative rounded-3xl overflow-hidden p-6" style={{ backgroundColor: bgColor }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/[0.03] rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-white/[0.02] rounded-full blur-xl" />
        </div>
        <div className="relative z-10">
          {emoji && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{emoji}</span>
            </div>
          )}
          <h3 className="text-white text-lg font-bold leading-snug mb-1.5">{title}</h3>
          {description && (
            <p className="text-white/40 text-sm leading-relaxed">{description}</p>
          )}
          {ctaText && (
            <Link
              to={ctaLink || '#'}
              className="inline-flex items-center gap-2 mt-4 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              {ctaText}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
}
