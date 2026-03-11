import { motion } from 'framer-motion';
import {
  Wand2,
  Search,
  Sparkles,
  Package,
  CheckCircle2,
  AlignLeft,
  Tag,
  DollarSign,
  Layers,
  FileText,
  Bot,
} from 'lucide-react';
import { fadeUp, EASE_APPLE } from '../animations';

export default function SmartRegistration() {
  return (
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
  );
}
