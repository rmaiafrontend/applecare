import React from "react";
import { Smartphone, Sparkles, ShoppingBag, Search, Wifi, Battery, Signal } from "lucide-react";

function PreviewSection({ active = true, children }) {
  if (!active) return null;
  return <div>{children}</div>;
}

export default function HomePreview({ form }) {
  const primary = form.identity_primary_color || "#1A1A1A";
  const items = form.differentials_items || [];
  const links = form.header_quick_links || [];
  const carousels = form.carousels || [];

  return (
    <div className="sticky top-20">
      {/* Label */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Smartphone className="w-3 h-3 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-[12px] font-bold text-[#1d1d1f] tracking-tight">Preview</span>
        </div>
        <span className="text-[9px] font-medium text-black/20 bg-black/[0.03] px-2 py-0.5 rounded-full">Tempo real</span>
      </div>

      {/* Phone frame - Dynamic Island style */}
      <div className="relative w-[290px] mx-auto">
        {/* Outer bezel with gradient */}
        <div className="bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] rounded-[3rem] p-[8px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
          {/* Inner screen */}
          <div className="w-full h-[570px] bg-white rounded-[2.4rem] overflow-hidden flex flex-col relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-20 h-[18px] bg-black rounded-full" />

            {/* Status bar */}
            <div className="h-10 flex items-end justify-between px-6 pb-1 relative z-10">
              <span className="text-[8px] font-semibold text-[#1d1d1f]">9:41</span>
              <div className="flex items-center gap-1">
                <Signal className="w-2.5 h-2.5 text-[#1d1d1f]" />
                <Wifi className="w-2.5 h-2.5 text-[#1d1d1f]" />
                <Battery className="w-3 h-2.5 text-[#1d1d1f]" />
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

              {/* Header */}
              <div className="px-3.5 pt-1 pb-2">
                <div className="flex items-center gap-2.5">
                  {form.header_logo_url ? (
                    <img src={form.header_logo_url} className="w-9 h-9 rounded-2xl object-cover ring-1 ring-black/5" alt="" />
                  ) : (
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-[11px] font-black text-white shadow-sm" style={{ backgroundColor: primary }}>
                      {(form.header_store_name || "W")[0]}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-[#1d1d1f] truncate tracking-tight">{form.header_store_name || "Nome da Loja"}</p>
                    <p className="text-[7px] text-black/35 truncate">{form.header_tagline || "Tagline aqui"}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-6 h-6 rounded-xl bg-black/[0.04] flex items-center justify-center">
                      <Search className="w-3 h-3 text-black/40" strokeWidth={2} />
                    </div>
                    <div className="w-6 h-6 rounded-xl bg-black/[0.04] flex items-center justify-center">
                      <ShoppingBag className="w-3 h-3 text-black/40" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Quick links */}
                {links.length > 0 && (
                  <div className="flex gap-1 mt-2.5 overflow-hidden">
                    {links.slice(0, 4).map((l, i) => (
                      <span key={i} className={`text-[6.5px] font-medium px-2 py-[3px] rounded-lg whitespace-nowrap ${
                        l.is_highlight ? "text-white shadow-sm" : "bg-black/[0.04] text-[#1d1d1f]"
                      }`} style={l.is_highlight ? { backgroundColor: primary } : {}}>
                        {l.emoji} {l.label || "Link"}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hero banner */}
              <div className="mx-2.5 rounded-2xl overflow-hidden relative h-[120px]" style={{ backgroundColor: "#e5e5ea" }}>
                {form.hero_image_url && (
                  <img src={form.hero_image_url} className="absolute inset-0 w-full h-full object-cover" alt="" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative z-10 p-3.5 flex flex-col justify-end h-full">
                  {form.hero_badge_active !== false && form.hero_badge_text && (
                    <span className="text-[5.5px] font-bold text-white bg-white/20 backdrop-blur-md px-2 py-[2px] rounded-md self-start mb-1.5 border border-white/10">
                      {form.hero_badge_text}
                    </span>
                  )}
                  <p className="text-[11px] font-bold text-white leading-tight tracking-tight">{form.hero_title || "Título do Banner"}</p>
                  <p className="text-[7px] text-white/70 mt-0.5">{form.hero_subtitle || "Subtítulo aqui"}</p>
                  {form.hero_cta_text && (
                    <span className="mt-2 self-start text-[6.5px] font-bold px-3 py-[5px] rounded-xl text-white shadow-lg" style={{ backgroundColor: primary }}>
                      {form.hero_cta_text}
                    </span>
                  )}
                </div>
              </div>

              {/* Differentials */}
              <PreviewSection active={form.differentials_active !== false && items.length > 0}>
                <div className="flex gap-1.5 px-3.5 mt-3 overflow-hidden">
                  {items.map((d, i) => (
                    <span key={i} className="text-[6.5px] font-medium px-2 py-[4px] bg-black/[0.03] rounded-lg whitespace-nowrap flex items-center gap-1 border border-black/[0.02]">
                      {d.emoji} {d.text}
                    </span>
                  ))}
                </div>
              </PreviewSection>

              {/* AI Button */}
              <PreviewSection active={form.ai_button_active !== false}>
                <div className="mx-3.5 mt-3 rounded-2xl p-3 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${form.ai_button_gradient_from || "#6366f1"}, ${form.ai_button_gradient_to || "#a855f7"})` }}>
                  {/* Decorative circles */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white/5 rounded-full" />
                  <div className="relative flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-bold text-white truncate">{form.ai_button_title || "Busca inteligente"}</p>
                      <p className="text-[5.5px] text-white/60 truncate">{form.ai_button_subtitle || "Descreva o que procura"}</p>
                    </div>
                    <span className="text-[5.5px] font-bold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-white whitespace-nowrap border border-white/10">
                      {form.ai_button_cta_text || "Pergunte"}
                    </span>
                  </div>
                </div>
              </PreviewSection>

              {/* Categories */}
              <PreviewSection active={form.categories_active !== false}>
                <div className="px-3.5 mt-4">
                  <p className="text-[9px] font-bold text-[#1d1d1f] mb-2 tracking-tight">{form.categories_title || "Categorias"}</p>
                  <div className={`flex gap-2 ${form.categories_layout === "grid" ? "flex-wrap" : ""}`}>
                    {["📱", "💻", "⌚", "🎧"].map((e, i) => (
                      <div key={i} className={`bg-gradient-to-b from-black/[0.02] to-black/[0.04] rounded-2xl flex flex-col items-center justify-center py-2 border border-black/[0.03] ${
                        form.categories_layout === "grid" ? "w-[calc(50%-4px)]" : "w-[52px] flex-shrink-0"
                      }`}>
                        <span className="text-[14px]">{e}</span>
                        <span className="text-[5.5px] font-medium text-black/35 mt-1">Cat {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </PreviewSection>

              {/* Secondary Banner */}
              <PreviewSection active={form.secondary_banner_active !== false}>
                <div className="px-3.5 mt-4">
                  <p className="text-[9px] font-bold text-[#1d1d1f] mb-2 tracking-tight">{form.secondary_banner_title || "Destaques"}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[1, 2, 3, 4].slice(0, (form.secondary_banner_product_ids || []).length || 2).map(i => (
                      <div key={i} className="bg-gradient-to-b from-black/[0.01] to-black/[0.04] rounded-xl p-2 flex flex-col items-center border border-black/[0.03]">
                        <div className="w-full aspect-[4/3] bg-white rounded-lg" />
                        <div className="w-12 h-1 bg-black/5 rounded mt-1.5" />
                        <div className="w-8 h-1 bg-black/5 rounded mt-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </PreviewSection>

              {/* Carousels */}
              {carousels.filter(c => c.is_active !== false).map((c, i) => (
                <div key={i} className="px-3.5 mt-4">
                  <p className="text-[9px] font-bold text-[#1d1d1f] mb-2 tracking-tight">{c.title || `Carrossel ${i + 1}`}</p>
                  <div className="flex gap-2 overflow-hidden">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="bg-gradient-to-b from-black/[0.01] to-black/[0.04] rounded-xl p-1.5 flex-shrink-0 w-[60px] border border-black/[0.03]">
                        <div className="w-full aspect-square bg-white rounded-lg" />
                        <div className="w-10 h-1 bg-black/5 rounded mt-1.5" />
                        <div className="w-7 h-1 bg-black/5 rounded mt-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Info Card */}
              <PreviewSection active={form.info_card_active !== false}>
                <div className="mx-3.5 mt-4 rounded-2xl p-3 border border-black/[0.03]" style={{ backgroundColor: form.info_card_bg_color || "#f5f5f7" }}>
                  <span className="text-[14px]">{form.info_card_emoji || "📦"}</span>
                  <p className="text-[9px] font-bold text-[#1d1d1f] mt-1.5 tracking-tight">{form.info_card_title || "Info Card"}</p>
                  {form.info_card_description && <p className="text-[6px] text-black/35 mt-0.5 line-clamp-2">{form.info_card_description}</p>}
                  {form.info_card_cta_text && (
                    <span className="inline-block mt-2 text-[6px] font-bold px-2 py-[3px] rounded-lg text-white" style={{ backgroundColor: primary }}>
                      {form.info_card_cta_text}
                    </span>
                  )}
                </div>
              </PreviewSection>

              {/* Product List */}
              <div className="px-3.5 mt-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-bold text-[#1d1d1f] tracking-tight">{form.product_list_title || "Novidades"}</p>
                  {form.product_list_show_cta !== false && (
                    <span className="text-[6px] font-semibold" style={{ color: primary }}>{form.product_list_cta_text || "Ver todos"} →</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {Array.from({ length: Math.min(form.product_list_max_items || 6, 4) }).map((_, i) => (
                    <div key={i} className="bg-gradient-to-b from-white to-black/[0.02] rounded-xl p-2 border border-black/[0.04]">
                      <div className="w-full aspect-square bg-black/[0.02] rounded-lg" />
                      <div className="w-14 h-1 bg-black/5 rounded mt-2" />
                      <div className="w-10 h-1 bg-black/5 rounded mt-0.5" />
                      <div className="w-8 h-1.5 rounded-md mt-1.5" style={{ backgroundColor: primary + "20" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="h-10 border-t border-black/[0.03] flex items-center justify-around px-6 flex-shrink-0 bg-white/80 backdrop-blur-sm">
              {["🏠", "🔍", "❤️", "👤"].map((e, i) => (
                <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "" : "opacity-30"}`}>
                  <span className="text-[11px]">{e}</span>
                  <div className={`w-1 h-1 rounded-full ${i === 0 ? "bg-[#1d1d1f]" : "bg-transparent"}`} />
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div className="h-4 flex items-center justify-center bg-white">
              <div className="w-24 h-1 bg-black/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute -bottom-6 left-4 right-4 h-6 bg-gradient-to-b from-black/[0.03] to-transparent rounded-[50%] blur-md" />
      </div>
    </div>
  );
}