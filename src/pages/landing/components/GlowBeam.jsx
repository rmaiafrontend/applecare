import { motion } from 'framer-motion';

export default function GlowBeam() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Full-width conic gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70%]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 20%, rgba(59,130,246,0) 0deg, rgba(59,130,246,0.07) 50deg, rgba(139,92,246,0.1) 100deg, rgba(168,85,247,0.08) 160deg, rgba(59,130,246,0.06) 200deg, rgba(99,102,241,0.08) 260deg, rgba(139,92,246,0.06) 320deg, rgba(59,130,246,0) 360deg)',
        }}
      />
      {/* Central beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[35%] bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 blur-[2px]" />
      {/* Horizontal aurora bands */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[5%] left-0 right-0 h-[250px] bg-gradient-to-r from-transparent via-blue-500/[0.05] to-transparent blur-[40px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[10%] left-0 right-0 h-[200px] bg-gradient-to-r from-transparent via-violet-500/[0.04] to-transparent blur-[50px]"
      />
      {/* Side glows */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], x: [-30, 30, -30] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[10%] w-[40%] h-[300px] bg-blue-500/[0.04] rounded-full blur-[80px] rotate-6"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], x: [30, -30, 30] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[6%] right-[10%] w-[40%] h-[280px] bg-violet-500/[0.04] rounded-full blur-[80px] -rotate-6"
      />
    </div>
  );
}
