import React, { useEffect, useRef } from "react";
import {
  Smartphone, Wifi, Battery, Signal, Sparkles, ArrowRight,
  MessageCircle, Instagram, Truck, Shield, Zap,
} from "lucide-react";
import { PreviewSectionHeader, PreviewProductCarousel, PreviewProductGrid } from "./PreviewProductGrid";

export default function HomePreview({ form, storeInfo = {}, activeSection, scrollProgress = 0 }) {
  // Campos base vêm de storeInfo (ConfigLoja), campos exclusivos de form (ConfigHome)
  const storeName = storeInfo.name || 'aLink';
  const storeLogo = storeInfo.logo || '';
  const storeWhatsapp = storeInfo.whatsapp || '';
  const storeInstagram = storeInfo.instagram || '';
  const scrollRef = useRef(null);
  const isAutoScrolling = useRef(false);
  const iframeWidth = 390;
  const iframeHeight = 844;
  const frameInnerWidth = 338;
  const scale = frameInnerWidth / iframeWidth;
  const scaledHeight = Math.round(iframeHeight * scale);

  useEffect(() => {
    if (activeSection && scrollRef.current) {
      isAutoScrolling.current = true;
      const el = scrollRef.current.querySelector(`[data-section="${activeSection}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => { isAutoScrolling.current = false; }, 500);
    }
  }, [activeSection]);

  useEffect(() => {
    if (isAutoScrolling.current || activeSection) return;
    const container = scrollRef.current;
    if (!container) return;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;
    container.scrollTop = scrollProgress * maxScroll;
  }, [scrollProgress, activeSection]);

  const isActive = (key) => activeSection === key;

  const sectionWrapperClass = (key) => {
    if (!activeSection) return "transition-all duration-300";
    if (isActive(key)) return "transition-all duration-300 relative";
    return "transition-all duration-300 opacity-[0.15] grayscale pointer-events-none";
  };

  const activeGlowStyle = (key) => {
    if (!isActive(key)) return {};
    return {
      boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.6), 0 0 20px 4px rgba(139, 92, 246, 0.15)",
      borderRadius: "16px",
      margin: "4px",
    };
  };

  const Bar = ({ w = "100%", h = 8, className = "" }) => (
    <div className={`rounded-full bg-gray-200 ${className}`} style={{ width: w, height: h }} />
  );

  return (
    <div className="sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Smartphone className="w-3 h-3 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-[12px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">Preview</span>
        </div>
        <span className="text-[9px] font-medium text-black/20 dark:text-white/20 bg-black/[0.03] dark:bg-white/[0.06] px-2 py-0.5 rounded-full">Wireframe</span>
      </div>

      <div className="relative w-[354px] mx-auto">
        <div className="bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] rounded-[3rem] p-[8px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]">
          <div className="w-full bg-white rounded-[2.4rem] overflow-hidden flex flex-col relative" style={{ height: `${scaledHeight + 56}px` }}>
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-20 h-[18px] bg-black rounded-full" />

            {/* Status bar */}
            <div className="h-10 flex items-end justify-between px-6 pb-1 relative z-10 bg-white">
              <span className="text-[8px] font-semibold text-[#1d1d1f]">9:41</span>
              <div className="flex items-center gap-1">
                <Signal className="w-2.5 h-2.5 text-[#1d1d1f]" />
                <Wifi className="w-2.5 h-2.5 text-[#1d1d1f]" />
                <Battery className="w-3 h-2.5 text-[#1d1d1f]" />
              </div>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-hidden relative">
              <div
                style={{
                  width: `${iframeWidth}px`,
                  height: `${iframeHeight}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <div
                  ref={scrollRef}
                  className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#f8f8f8] no-scrollbar"
                  style={{ scrollBehavior: "smooth", padding: activeSection ? "6px" : "0px", transition: "padding 0.3s ease" }}
                >
                  {/* ── 01. Header / Linktree ── */}
                  <div
                    data-section="header"
                    className={`px-5 pt-6 pb-5 bg-white ${sectionWrapperClass("header")}`}
                    style={activeGlowStyle("header")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden">
                        {storeLogo ? (
                          <img src={storeLogo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[15px] font-black text-white tracking-tighter">
                            {(storeName || "AL").slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 pt-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-gray-900 truncate">
                            {storeName}
                          </span>
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full ring-1 ring-emerald-500/20 flex items-center gap-0.5 shrink-0">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            Aberto
                          </span>
                        </div>
                        <Bar w="70%" h={5} className="mt-1.5 opacity-30" />
                        {(() => {
                          const hours = form.header_hours || {};
                          const hasHours = Object.values(hours).some(v => v);
                          if (hasHours) {
                            return (
                              <div className="flex items-center gap-1 mt-2 text-[7px] text-gray-400">
                                <span>🕐</span>
                                <span className="truncate">{Object.values(hours).find(v => v) || ""}</span>
                              </div>
                            );
                          }
                          return (
                            <div className="flex gap-1.5 mt-2">
                              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                                <div className="w-2.5 h-2.5 rounded-sm bg-gray-300" />
                                <Bar w="40px" h={5} className="opacity-40" />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Social / Contact buttons */}
                    {(() => {
                      const hasWhatsapp = !!storeWhatsapp;
                      const socials = [
                        storeInstagram && "instagram",
                        form.header_tiktok && "tiktok",
                        form.header_youtube && "youtube",
                        form.header_facebook && "facebook",
                      ].filter(Boolean);
                      if (!hasWhatsapp && socials.length === 0) {
                        return (
                          <>
                            <Bar w="85%" h={5} className="mt-4 opacity-25" />
                            <Bar w="60%" h={5} className="mt-1 opacity-15" />
                            <div className="flex gap-2 mt-4">
                              <div className="flex-1 h-10 rounded-xl bg-gray-200 flex items-center justify-center gap-1.5">
                                <MessageCircle className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                                <span className="text-[10px] font-semibold text-gray-400">WhatsApp</span>
                              </div>
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Instagram className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                              </div>
                            </div>
                          </>
                        );
                      }
                      return (
                        <div className="flex gap-2 mt-4">
                          {hasWhatsapp && (
                            <div className="flex-1 h-10 rounded-xl bg-gray-800 flex items-center justify-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                              <span className="text-[10px] font-semibold text-white">WhatsApp</span>
                            </div>
                          )}
                          {socials.map(s => (
                            <div key={s} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                              {s === "instagram" ? <Instagram className="w-4 h-4 text-gray-400" strokeWidth={1.5} /> : (
                                <span className="text-[10px] text-gray-400">{s.slice(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Quick Links */}
                    {(() => {
                      const quickLinks = Array.isArray(form.header_quick_links) && form.header_quick_links.length > 0
                        ? form.header_quick_links
                        : null;
                      const items = quickLinks || [{ emoji: "", label: "Catálogo" }, { emoji: "", label: "Ofertas" }, { emoji: "", label: "FAQ" }];
                      return (
                        <div className="flex gap-2 mt-3 overflow-hidden">
                          {items.map((link, i) => (
                            <div key={i} className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 shrink-0">
                              {link.emoji ? (
                                <span className="text-[10px]">{link.emoji}</span>
                              ) : (
                                <div className="w-3 h-3 rounded-sm bg-gray-300" />
                              )}
                              <span className="text-[9px] font-semibold text-gray-500">{link.label || "Link"}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  {/* ── 02. Hero Banner ── */}
                  <div
                    data-section="hero"
                    className={`mx-4 mt-4 ${sectionWrapperClass("hero")}`}
                    style={activeGlowStyle("hero")}
                  >
                    <div className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 pb-7">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1 mb-4 border border-white/[0.06]">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <Bar w="70px" h={5} className="!bg-white/20" />
                      </div>
                      <Bar w="75%" h={14} className="!bg-white/25 mb-2" />
                      <Bar w="50%" h={14} className="!bg-white/12 mb-2" />
                      <Bar w="65%" h={6} className="!bg-white/8 mb-6" />
                      <div className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl">
                        <span className="text-[10px] font-semibold">Explorar</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* ── 03. Benefits Strip ── */}
                  {form.differentials_active !== false && <div
                    data-section="differentials"
                    className={`flex gap-2 px-4 mt-5 overflow-hidden ${sectionWrapperClass("differentials")}`}
                    style={activeGlowStyle("differentials")}
                  >
                    {[
                      { icon: Truck, label: "Entrega" },
                      { icon: Shield, label: "Garantia" },
                      { icon: Zap, label: "Original" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-2 shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                        <span className="text-[9px] font-semibold text-gray-500">{item.label}</span>
                      </div>
                    ))}
                  </div>}

                  {/* ── 04. Smart Search Banner ── */}
                  {form.ai_button_active !== false && <div
                    data-section="ai_button"
                    className={`px-4 mt-5 ${sectionWrapperClass("ai_button")}`}
                    style={activeGlowStyle("ai_button")}
                  >
                    <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 flex items-center gap-3 relative overflow-hidden">
                      <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/10 relative z-10">
                        <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0 relative z-10">
                        <span className="text-[11px] font-bold text-white block">Compra Assistida</span>
                        <Bar w="85%" h={5} className="!bg-white/15 mt-1" />
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0 relative z-10" />
                    </div>
                  </div>}

                  {/* ── 05. Categories ── */}
                  {form.categories_active !== false && <div
                    data-section="categories"
                    className={`mt-8 ${sectionWrapperClass("categories")}`}
                    style={activeGlowStyle("categories")}
                  >
                    <div className="flex items-center justify-between px-4 mb-3">
                      <span className="text-[13px] font-bold text-gray-900">Categorias</span>
                      <span className="text-[10px] text-gray-400 flex items-center">
                        Ver todas
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="flex gap-2.5 px-4 overflow-hidden">
                      {["iPhone", "Mac", "Watch", "Audio"].map(name => (
                        <div key={name} className="flex flex-col items-center gap-2 shrink-0">
                          <div className="w-[60px] h-[60px] rounded-2xl bg-gray-800 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-lg bg-white/15" />
                          </div>
                          <span className="text-[9px] font-semibold text-gray-600">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>}

                  {/* ── 06. Featured Product (Secondary Banner) ── */}
                  {form.secondary_banner_active !== false && <div
                    data-section="secondary_banner"
                    className={`mx-4 mt-8 ${sectionWrapperClass("secondary_banner")}`}
                    style={activeGlowStyle("secondary_banner")}
                  >
                    <div className="rounded-3xl overflow-hidden border border-gray-100">
                      <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-100 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1.5">
                          <div className="flex gap-1.5">
                            <span className="text-[8px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-full border border-white/10">Express</span>
                            <span className="text-[8px] font-bold text-white bg-green-500/70 px-2 py-0.5 rounded-full">-15%</span>
                          </div>
                          <Bar w="60%" h={9} className="!bg-white/35" />
                          <div className="flex items-baseline gap-1.5">
                            <Bar w="55px" h={11} className="!bg-white/30" />
                            <Bar w="35px" h={7} className="!bg-white/15" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}

                  {/* ── 07. Carousels ── */}
                  <div
                    data-section="carousels"
                    className={`mt-8 ${sectionWrapperClass("carousels")}`}
                    style={activeGlowStyle("carousels")}
                  >
                    <PreviewSectionHeader title="Entrega Express" subtitle="Receba em ate 1 hora" />
                    <PreviewProductCarousel count={3} badgeText="Express" />
                  </div>

                  {/* ── 08. Info Card ── */}
                  {form.info_card_active !== false && <div
                    data-section="info_card"
                    className={`mx-4 mt-8 ${sectionWrapperClass("info_card")}`}
                    style={activeGlowStyle("info_card")}
                  >
                    <div className="rounded-3xl bg-gray-900 p-6 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                          <span className="text-[9px] font-medium text-white/40 tracking-widest uppercase">Garantia</span>
                        </div>
                        <Bar w="70%" h={10} className="!bg-white/20 mb-1.5" />
                        <Bar w="50%" h={10} className="!bg-white/15 mb-3" />
                        <Bar w="85%" h={5} className="!bg-white/8" />
                        <Bar w="55%" h={5} className="!bg-white/8 mt-1" />
                      </div>
                    </div>
                  </div>}

                  {/* ── 09. Product List ── */}
                  <div
                    data-section="product_list"
                    className={`mt-8 mb-6 ${sectionWrapperClass("product_list")}`}
                    style={activeGlowStyle("product_list")}
                  >
                    <PreviewSectionHeader title="Ofertas" subtitle="Melhores precos" />
                    <PreviewProductGrid count={4} />
                  </div>

                  <div className="h-20" />
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="h-5 flex items-center justify-center bg-white flex-shrink-0">
              <div className="w-24 h-1 bg-black/10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-6 left-4 right-4 h-6 bg-gradient-to-b from-black/[0.03] to-transparent rounded-[50%] blur-md" />
      </div>
    </div>
  );
}
