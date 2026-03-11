import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { EASE_APPLE } from '../animations';

const carouselCards = [
  { src: '/exemple-layout/Layout%20Image%201.webp', label: 'Cards de Produto', desc: 'Design minimalista com detalhes que vendem.' },
  { src: '/exemple-layout/Layout%20Image%202.webp', label: 'Pagina do Produto', desc: 'Galeria imersiva com info card sobreposto.' },
  { src: '/exemple-layout/Img-layout-3.png', label: 'Vitrine Inteligente', desc: 'Home com hero banner, categorias e destaques.' },
  { src: '/exemple-layout/Layout%204.webp', label: 'Navegacao Premium', desc: 'Header glassmorphism e barra inferior elegante.' },
  { src: '/exemple-layout/Img%20Layout%205.webp', label: 'Carrinho & Checkout', desc: 'Checkout via WhatsApp com PIX e cartao.' },
  { src: '/exemple-layout/Img-layout-6.png', label: 'Entrega Express', desc: 'Badges e indicadores que geram confianca.' },
];

export default function DesignCarousel() {
  return (
    <section className="relative bg-[#f5f5f7] py-16 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_APPLE }}
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

      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar pr-4"
        >
          <div className="shrink-0 w-4 sm:w-6" />

          {carouselCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + idx * 0.07, duration: 0.6, ease: EASE_APPLE }}
              className="snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[420px]"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.04] h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                  {card.label}
                </h3>
                <p className="text-[12px] sm:text-[14px] text-[#86868b] mb-4 sm:mb-5 leading-relaxed">
                  {card.desc}
                </p>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={card.src}
                    alt={card.label}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
