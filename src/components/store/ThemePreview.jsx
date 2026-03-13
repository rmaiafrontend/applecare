import React from "react";
import { Smartphone, Search, ShoppingBag, Signal, Wifi, Battery } from "lucide-react";

export default function ThemePreview({ config }) {
  const primary = config.primary_color || "#1A1A1A";
  const accent = config.accent_color || "#6366f1";
  const bg = config.background_color || "#ffffff";
  const text = config.text_color || "#1d1d1f";
  const secondary = config.secondary_color || "#f5f5f7";

  return (
    <div className="sticky top-20">
      {/* Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Smartphone className="w-3 h-3 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-[12px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">Preview</span>
        </div>
        <span className="text-[9px] font-medium text-black/20 dark:text-white/20 bg-black/[0.03] dark:bg-white/[0.06] px-2 py-0.5 rounded-full">Tempo real</span>
      </div>

      {/* Phone frame - Dynamic Island style */}
      <div className="relative w-[290px] mx-auto">
        {/* Outer bezel with gradient */}
        <div className="bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] rounded-[3rem] p-[8px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
          {/* Inner screen */}
          <div className="w-full h-[570px] rounded-[2.4rem] overflow-hidden flex flex-col relative" style={{ backgroundColor: bg }}>
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-20 h-[18px] bg-black rounded-full" />

            {/* Status bar */}
            <div className="h-10 flex items-end justify-between px-6 pb-1 relative z-10">
              <span className="text-[8px] font-semibold" style={{ color: text }}>9:41</span>
              <div className="flex items-center gap-1">
                <Signal className="w-2.5 h-2.5" style={{ color: text }} />
                <Wifi className="w-2.5 h-2.5" style={{ color: text }} />
                <Battery className="w-3 h-2.5" style={{ color: text }} />
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

              {/* Header */}
              <div className="px-3.5 py-2.5 flex items-center justify-between" style={{ backgroundColor: primary }}>
                <div className="flex items-center gap-2">
                  {config.logo_url ? (
                    <img src={config.logo_url} alt="" className="h-6 object-contain brightness-0 invert" />
                  ) : (
                    <span className="text-[11px] font-bold text-white tracking-tight">
                      {config.store_name || "AppleLink"}
                    </span>
                  )}
                </div>
                <div className="flex gap-1.5">
                  <div className="w-6 h-6 rounded-xl bg-white/15 flex items-center justify-center">
                    <Search className="w-3 h-3 text-white/70" strokeWidth={2} />
                  </div>
                  <div className="w-6 h-6 rounded-xl bg-white/15 flex items-center justify-center">
                    <ShoppingBag className="w-3 h-3 text-white/70" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Hero */}
              <div className="px-4 py-5" style={{ backgroundColor: accent + "12" }}>
                <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                  Novidades
                </p>
                <p className="text-[12px] font-bold mt-0.5 leading-tight" style={{ color: text }}>
                  {config.store_slogan || "Entrega rápida, preço justo"}
                </p>
              </div>

              {/* Products grid */}
              <div className="px-3.5 py-3.5 space-y-2">
                <p className="text-[9px] font-bold tracking-tight" style={{ color: text }}>Destaques</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="rounded-xl overflow-hidden border border-black/[0.04]" style={{ backgroundColor: secondary }}>
                      <div className="h-14 bg-gradient-to-br from-gray-200/60 to-gray-100/60" />
                      <div className="p-2 space-y-1">
                        <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: text + "15" }} />
                        <div className="h-1 w-1/2 rounded-full" style={{ backgroundColor: text + "10" }} />
                        <div className="h-1.5 w-8 rounded-md mt-1" style={{ backgroundColor: accent + "30" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-3.5 py-2">
                <div className="h-8 rounded-2xl flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <span className="text-[9px] font-bold text-white">Comprar Agora</span>
                </div>
              </div>

              {/* Info section */}
              <div className="mx-3.5 mt-2 rounded-2xl p-3 border border-black/[0.03]" style={{ backgroundColor: secondary }}>
                <span className="text-[12px]">📦</span>
                <p className="text-[8px] font-bold mt-1" style={{ color: text }}>Entrega Express</p>
                <p className="text-[5.5px] mt-0.5" style={{ color: text + "50" }}>Receba seu pedido em até 1h</p>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 mt-3 border-t" style={{ borderColor: text + "08" }}>
                <p className="text-[7px] text-center" style={{ color: text + "40" }}>
                  {config.footer_text || "© 2026 AppleLink"}
                </p>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="h-10 border-t flex items-center justify-around px-6 flex-shrink-0 backdrop-blur-sm" style={{ borderColor: text + "06", backgroundColor: bg + "dd" }}>
              {["🏠", "🔍", "❤️", "👤"].map((e, i) => (
                <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "" : "opacity-30"}`}>
                  <span className="text-[11px]">{e}</span>
                  <div className={`w-1 h-1 rounded-full ${i === 0 ? "" : "bg-transparent"}`} style={i === 0 ? { backgroundColor: text } : {}} />
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div className="h-4 flex items-center justify-center" style={{ backgroundColor: bg }}>
              <div className="w-24 h-1 rounded-full" style={{ backgroundColor: text + "15" }} />
            </div>
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute -bottom-6 left-4 right-4 h-6 bg-gradient-to-b from-black/[0.03] to-transparent rounded-[50%] blur-md" />
      </div>
    </div>
  );
}
