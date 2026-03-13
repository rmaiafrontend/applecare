import { motion } from 'framer-motion';

export default function Marquee() {
  const items = [
    'Catalogo IA', 'Gestao de Estoque', 'Checkout WhatsApp', 'Analytics', 'Automacao', 'Dashboard',
    'Pedidos em Tempo Real', 'Notificacoes', 'Multi-loja', 'Relatorios', 'Integracao', 'Suporte 24h',
  ];
  return (
    <div className="relative overflow-hidden py-6 border-t border-b border-white/[0.04]">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-white/80 tracking-wide">{item}</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
