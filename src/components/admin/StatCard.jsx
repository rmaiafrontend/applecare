import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, sublabel, gradient = 'from-violet-500/10 to-violet-500/5', iconColor = 'text-violet-400', borderGlow = 'violet', index = 0 }) {
  const glowMap = {
    violet: 'hover:border-violet-500/20 hover:shadow-violet-500/5',
    blue: 'hover:border-blue-500/20 hover:shadow-blue-500/5',
    red: 'hover:border-red-500/20 hover:shadow-red-500/5',
    green: 'hover:border-green-500/20 hover:shadow-green-500/5',
    amber: 'hover:border-amber-500/20 hover:shadow-amber-500/5',
    emerald: 'hover:border-emerald-500/20 hover:shadow-emerald-500/5',
    sky: 'hover:border-sky-500/20 hover:shadow-sky-500/5',
    pink: 'hover:border-pink-500/20 hover:shadow-pink-500/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`relative group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 transition-all duration-300 hover:shadow-xl ${glowMap[borderGlow] || glowMap.violet}`}>
        {/* Gradient background */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-[13px] font-medium text-white/40 tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
            {sublabel && (
              <p className="text-[11px] text-white/30 font-medium">{sublabel}</p>
            )}
          </div>
          <div className={`p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
