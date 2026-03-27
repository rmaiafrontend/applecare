import React, { useRef, useEffect } from "react";
import { Smartphone, Wifi, Battery, Signal } from "lucide-react";

export default function HomePreview({ form, storeInfo = {}, activeSection, scrollProgress = 0 }) {
  const iframeRef = useRef(null);
  const iframeWidth = 390;
  const iframeHeight = 844;
  const frameInnerWidth = 338;
  const scale = frameInnerWidth / iframeWidth;
  const scaledHeight = Math.round(iframeHeight * scale);

  // Recarregar iframe quando config mudar (debounced via key)
  const iframeKey = JSON.stringify({
    hours: form.header_hours,
    links: form.header_quick_links,
    hero: form.hero_title,
    diff: form.differentials_active,
    ai: form.ai_button_active,
    cats: form.categories_active,
    banner: form.secondary_banner_active,
    info: form.info_card_active,
  });

  return (
    <div className="sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Smartphone className="w-3 h-3 text-white" strokeWidth={2.2} />
          </div>
          <span className="text-[12px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">Preview</span>
        </div>
        <span className="text-[9px] font-medium text-black/20 dark:text-white/20 bg-black/[0.03] dark:bg-white/[0.06] px-2 py-0.5 rounded-full">Live</span>
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

            {/* Live preview via iframe */}
            <div className="flex-1 overflow-hidden relative">
              <div
                style={{
                  width: `${iframeWidth}px`,
                  height: `${iframeHeight}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <iframe
                  ref={iframeRef}
                  key={iframeKey}
                  src="/Home"
                  title="Preview da vitrine"
                  className="w-full h-full border-0"
                  style={{ pointerEvents: "none" }}
                />
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
