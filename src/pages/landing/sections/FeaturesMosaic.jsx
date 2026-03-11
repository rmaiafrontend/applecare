import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Bot,
  MessageSquare,
  GitCompareArrows,
  Package,
  LayoutDashboard,
  Store,
  ArrowRight,
} from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function FeaturesMosaic() {
  return (
    <section className="relative bg-[#f5f5f7] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/[0.06] px-4 py-1.5 rounded-full text-[12px] font-semibold text-black/50 tracking-wide uppercase mb-6">
            <Sparkles className="w-3 h-3" />
            Recursos
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]">
            Tudo que voce precisa.{' '}
            <span className="text-[#86868b]">Nada que voce nao precisa.</span>
          </h2>
          <p className="mt-5 text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed max-w-lg mx-auto">
            Uma plataforma completa para gerenciar seu catalogo Apple com inteligencia artificial, do produto ao cliente.
          </p>
        </motion.div>

        {/* Bento mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">

          {/* Card 1: Busca Inteligente (wide) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 group"
          >
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="shrink-0 sm:max-w-[240px]">
                  <div className="w-11 h-11 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
                    <Search className="w-5 h-5 text-violet-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                    Busca Inteligente com IA
                  </h3>
                  <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#86868b] leading-relaxed">
                    Seus clientes conversam com a IA para encontrar o produto ideal. Recomendacoes personalizadas em tempo real.
                  </p>
                </div>
                {/* Visual: Chat UI mockup - animated */}
                <div className="flex-1 bg-[#f5f5f7] rounded-2xl p-4 sm:p-5 min-h-[200px]">
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-2.5 items-start"
                    >
                      <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-violet-600" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-black/[0.04]">
                        <p className="text-[13px] text-[#1d1d1f] leading-relaxed">Ola! Posso te ajudar a encontrar o produto perfeito. O que voce procura?</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-2.5 items-start justify-end"
                    >
                      <div className="bg-[#1d1d1f] rounded-2xl rounded-tr-md px-4 py-2.5">
                        <p className="text-[13px] text-white leading-relaxed">Quero um iPhone com boa camera</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-2.5 items-start"
                    >
                      <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-violet-600" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-black/[0.04]">
                        <p className="text-[13px] text-[#1d1d1f] leading-relaxed">Recomendo o iPhone 15 Pro Max! Camera de 48MP com zoom optico 5x.</p>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.5, duration: 0.4 }}
                          className="mt-2 flex gap-2"
                        >
                          <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">Ver produto</span>
                          <span className="text-[10px] font-medium text-[#86868b] bg-black/[0.04] px-2 py-1 rounded-full">Comparar</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Checkout WhatsApp (tall) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 md:row-span-2 group"
          >
            <div className="h-full bg-[#1d1d1f] rounded-3xl p-6 sm:p-8 border border-white/[0.06] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-green-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
                Checkout via WhatsApp
              </h3>
              <p className="mt-2.5 text-[14px] text-white/40 leading-relaxed">
                Carrinho, pagamento PIX ou cartao, e rastreio. Tudo dentro de uma conversa.
              </p>
              {/* Visual: WhatsApp-style order mockup - animated */}
              <div className="mt-5 flex-1 bg-white/[0.04] rounded-2xl p-4 space-y-2.5 border border-white/[0.06]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="bg-green-500/10 rounded-xl px-3 py-2 border border-green-500/10"
                >
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Novo Pedido #1247</p>
                </motion.div>
                {[
                  { item: 'iPhone 15 Pro 256GB', qty: '1x', price: 'R$7.499' },
                  { item: 'AirPods Pro 2', qty: '1x', price: 'R$1.899' },
                ].map((p, idx) => (
                  <motion.div
                    key={p.item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.15, duration: 0.4 }}
                    className="flex items-center justify-between py-1.5 border-b border-white/[0.04]"
                  >
                    <div>
                      <p className="text-[11px] font-medium text-white/80">{p.item}</p>
                      <p className="text-[10px] text-white/25">{p.qty}</p>
                    </div>
                    <p className="text-[11px] font-semibold text-white/60">{p.price}</p>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  className="flex items-center justify-between pt-2"
                >
                  <p className="text-[11px] font-semibold text-white/50">Total</p>
                  <p className="text-[15px] font-bold text-white">R$9.398</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-2 pt-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 bg-green-500 rounded-xl py-2.5 text-center cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-white">Pagar via PIX</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 bg-white/[0.06] rounded-xl py-2.5 text-center border border-white/[0.06] cursor-pointer"
                  >
                    <p className="text-[11px] font-medium text-white/50">Cartao</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Comparacao de Produtos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 group"
          >
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <GitCompareArrows className="w-5 h-5 text-blue-600" strokeWidth={1.8} />
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Comparacao com IA
              </h3>
              <p className="mt-2 text-[14px] text-[#86868b] leading-relaxed">
                Ate 4 produtos lado a lado com analise inteligente.
              </p>
              {/* Visual: Comparison table mini - animated rows */}
              <div className="mt-4 bg-[#f5f5f7] rounded-xl p-3 text-[10px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="grid grid-cols-3 gap-2 mb-2"
                >
                  <div className="text-[#86868b] font-medium" />
                  <div className="text-center font-semibold text-[#1d1d1f]">iPhone 15</div>
                  <div className="text-center font-semibold text-[#1d1d1f]">iPhone 15 Pro</div>
                </motion.div>
                {[
                  { spec: 'Camera', v1: '48MP', v2: '48MP 5x', win: 2 },
                  { spec: 'Chip', v1: 'A16', v2: 'A17 Pro', win: 2 },
                  { spec: 'Preco', v1: 'R$5.999', v2: 'R$7.499', win: 1 },
                ].map((row, idx) => (
                  <motion.div
                    key={row.spec}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-3 gap-2 py-1.5 border-t border-black/[0.04]"
                  >
                    <div className="text-[#86868b] font-medium">{row.spec}</div>
                    <motion.div
                      initial={{ backgroundColor: 'transparent' }}
                      whileInView={row.win === 1 ? { backgroundColor: 'rgba(34,197,94,0.08)' } : {}}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + idx * 0.12, duration: 0.6 }}
                      className={`text-center rounded px-1 ${row.win === 1 ? 'text-green-600 font-semibold' : 'text-[#1d1d1f]'}`}
                    >
                      {row.v1}
                    </motion.div>
                    <motion.div
                      initial={{ backgroundColor: 'transparent' }}
                      whileInView={row.win === 2 ? { backgroundColor: 'rgba(34,197,94,0.08)' } : {}}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + idx * 0.12, duration: 0.6 }}
                      className={`text-center rounded px-1 ${row.win === 2 ? 'text-green-600 font-semibold' : 'text-[#1d1d1f]'}`}
                    >
                      {row.v2}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 4: Gestao de Pedidos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 group"
          >
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Rastreio de Pedidos
              </h3>
              <p className="mt-2 text-[14px] text-[#86868b] leading-relaxed">
                Timeline em tempo real do pagamento a entrega.
              </p>
              {/* Visual: Order timeline - animated steps */}
              <div className="mt-4 space-y-0">
                {[
                  { status: 'Pagamento confirmado', time: '14:22', done: true },
                  { status: 'Produto embalado', time: '14:45', done: true },
                  { status: 'Saiu para entrega', time: '15:10', done: true },
                  { status: 'Entregue', time: '—', done: false },
                ].map((step, idx) => (
                  <motion.div
                    key={step.status}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.18, duration: 0.3, type: 'spring', stiffness: 300 }}
                        className={`w-3 h-3 rounded-full border-2 ${step.done ? 'bg-green-500 border-green-500' : 'bg-white border-black/10'}`}
                      />
                      {idx < 3 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + idx * 0.18, duration: 0.3 }}
                          className={`w-0.5 h-5 origin-top ${step.done ? 'bg-green-200' : 'bg-black/[0.06]'}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between pb-2">
                      <span className={`text-[12px] font-medium ${step.done ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`}>{step.status}</span>
                      <span className="text-[10px] text-[#86868b]">{step.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 5: Dashboard Admin (wide) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 group"
          >
            <div className="h-full bg-gradient-to-br from-[#1d1d1f] to-[#2d2d30] rounded-3xl p-6 sm:p-8 border border-white/[0.06] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="shrink-0 sm:max-w-[240px]">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <LayoutDashboard className="w-5 h-5 text-blue-400" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
                    Painel Admin Completo
                  </h3>
                  <p className="mt-2.5 text-[14px] text-white/40 leading-relaxed">
                    Gerencie produtos, categorias, pedidos, banners, pagamentos e configuracoes da loja em um unico lugar.
                  </p>
                </div>
                {/* Visual: Dashboard stats mockup - animated */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Vendas hoje', value: 'R$47.8k', change: '+23%', up: true },
                    { label: 'Pedidos', value: '48', change: '+12%', up: true },
                    { label: 'Produtos ativos', value: '248', change: '+5', up: true },
                    { label: 'Taxa conversao', value: '4.2%', change: '+0.3%', up: true },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/[0.04] rounded-xl p-3.5 border border-white/[0.06]"
                    >
                      <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">{stat.label}</p>
                      <p className="text-[20px] font-semibold text-white mt-1 leading-none">{stat.value}</p>
                      <span className={`text-[10px] font-medium mt-1 inline-block ${stat.up ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</span>
                    </motion.div>
                  ))}
                  {/* Mini chart - animated bars */}
                  <div className="col-span-2 bg-white/[0.04] rounded-xl p-3.5 border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Vendas - Ultimos 7 dias</p>
                      <p className="text-[10px] font-medium text-green-400">+18%</p>
                    </div>
                    <div className="flex items-end gap-1.5 h-10">
                      {[35, 52, 44, 65, 58, 78, 92].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-1 bg-blue-500/30 rounded-sm hover:bg-blue-500/50 transition-colors"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Personalizacao da Loja */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 group"
          >
            <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
                <Store className="w-5 h-5 text-rose-600" strokeWidth={1.8} />
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Sua Loja, Seu Estilo
              </h3>
              <p className="mt-2 text-[14px] text-[#86868b] leading-relaxed">
                Personalize cores, banners, secoes da home e layout do catalogo.
              </p>
              {/* Visual: Color picker mockup - animated */}
              <div className="mt-4 bg-[#f5f5f7] rounded-xl p-3.5">
                <p className="text-[10px] font-medium text-[#86868b] uppercase tracking-wider mb-2.5">Tema da loja</p>
                <div className="flex items-center gap-2">
                  {['#1d1d1f', '#007aff', '#5856d6', '#ff3b30', '#ff9500', '#34c759'].map((color, idx) => (
                    <motion.button
                      key={color}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: color === '#1d1d1f' ? 1.1 : 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.06, duration: 0.3, type: 'spring', stiffness: 400 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-7 h-7 rounded-full border-2 ${color === '#1d1d1f' ? 'border-black/20' : 'border-transparent'} transition-transform`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-3 grid grid-cols-2 gap-2"
                >
                  <div className="bg-white rounded-lg p-2 border border-black/[0.04]">
                    <div className="w-full h-3 bg-[#1d1d1f] rounded-md mb-1.5" />
                    <div className="w-3/4 h-1.5 bg-black/[0.06] rounded-sm" />
                  </div>
                  <div className="bg-[#1d1d1f] rounded-lg p-2 border border-white/[0.06]">
                    <div className="w-full h-3 bg-white/20 rounded-md mb-1.5" />
                    <div className="w-3/4 h-1.5 bg-white/[0.08] rounded-sm" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-16 text-center"
        >
          <Link
            to={createPageUrl('Products')}
            className="group inline-flex items-center gap-2.5 bg-[#1d1d1f] text-white px-7 py-3.5 sm:py-4 rounded-full text-[15px] font-semibold transition-all hover:bg-black active:scale-[0.97]"
          >
            Comecar gratis
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-4 text-[13px] text-[#86868b]">
            Setup em 5 minutos. Sem cartao de credito.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
