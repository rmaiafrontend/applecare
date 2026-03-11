import { motion } from 'framer-motion';
import {
  Bot,
  CheckCircle2,
  DollarSign,
  GitCompareArrows,
  Layers,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
} from 'lucide-react';
import { EASE_APPLE } from '../animations';

export default function AssistedPurchase() {
  return (
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_APPLE }}
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

        {/* MOMENT 1: O cliente pergunta */}
        <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-16 items-center mb-16 sm:mb-28">
          {/* Left: Step label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_APPLE }}
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
            transition={{ delay: 0.15, duration: 0.7, ease: EASE_APPLE }}
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
                  transition={{ delay: 0.5, duration: 0.5, ease: EASE_APPLE }}
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

        {/* MOMENT 2: A IA entende */}
        <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-16 items-center mb-16 sm:mb-28">
          {/* Left: Processing visualization */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_APPLE }}
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
                    transition={{ delay: 1, duration: 0.8, ease: EASE_APPLE }}
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
            transition={{ duration: 0.7, ease: EASE_APPLE }}
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

        {/* MOMENT 3: A IA recomenda (Product Cards) */}
        <div className="relative">
          {/* Step label centered */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_APPLE }}
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
              transition={{ duration: 0.6, ease: EASE_APPLE }}
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

            {/* Product Cards (slider on mobile, grid on desktop) */}
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

          {/* Bottom stat */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE_APPLE }}
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
  );
}
