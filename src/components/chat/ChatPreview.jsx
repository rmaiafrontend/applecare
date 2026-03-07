import React from "react";
import { MessageCircle, Send, X } from "lucide-react";

export default function ChatPreview({ config }) {
  const color = config.primary_color || "#1d1d1f";

  return (
    <div className="bg-[#f5f5f7] rounded-2xl p-4 relative overflow-hidden" style={{ height: 520 }}>
      {/* Mock phone frame */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-black/[0.06]">
        {/* Chat header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: color }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white">{config.assistant_name || "Assistente"}</p>
              <p className="text-[10px] text-white/60">Online agora</p>
            </div>
          </div>
          <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
            <X className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>

        {/* Chat body */}
        <div className="flex-1 p-3 space-y-3 overflow-hidden bg-[#fafafa]">
          {/* Welcome message */}
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
              <MessageCircle className="w-3 h-3" style={{ color }} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm border border-black/[0.04] max-w-[85%]">
              <p className="text-[11px] text-[#1d1d1f] leading-relaxed">{config.welcome_message || "Olá! Como posso ajudar?"}</p>
            </div>
          </div>

          {/* Suggested questions */}
          {config.suggested_questions?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pl-8">
              {config.suggested_questions.slice(0, 3).map((q, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-1 rounded-full border font-medium"
                  style={{ borderColor: color + "30", color }}
                >
                  {q}
                </span>
              ))}
            </div>
          )}

          {/* Mock user message */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-tr-md px-3 py-2 max-w-[75%] text-white text-[11px]" style={{ backgroundColor: color }}>
              Qual o melhor iPhone?
            </div>
          </div>

          {/* Mock AI response */}
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
              <MessageCircle className="w-3 h-3" style={{ color }} />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-sm border border-black/[0.04] max-w-[85%]">
              <p className="text-[11px] text-[#1d1d1f] leading-relaxed">
                O iPhone 16 Pro Max é nossa principal recomendação! Com chip A18 Pro, câmera de 48MP e tela Super Retina XDR.
              </p>
              {config.show_product_suggestions && (
                <div className="mt-2 p-2 bg-[#f5f5f7] rounded-xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-black/[0.04]">
                    <span className="text-[8px] text-[#86868b]">IMG</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#1d1d1f]">iPhone 16 Pro Max</p>
                    <p className="text-[10px] font-medium" style={{ color }}>R$ 9.499</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 border-t border-black/[0.04] bg-white flex items-center gap-2">
          <div className="flex-1 h-8 bg-[#f5f5f7] rounded-full px-3 flex items-center">
            <span className="text-[10px] text-[#b0b0b5]">Digite sua mensagem...</span>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
            <Send className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* FAB preview */}
      <div
        className={`absolute bottom-6 ${config.chat_position === "bottom-left" ? "left-6" : "right-6"} w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all`}
        style={{ backgroundColor: color }}
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}