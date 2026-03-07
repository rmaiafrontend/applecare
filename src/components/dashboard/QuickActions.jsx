import React from "react";
import { motion } from "framer-motion";
import { Plus, ImagePlay, Grid3X3, Palette, ChevronRight, Settings } from "lucide-react";

const actions = [
  { label: "Novo Produto", desc: "Cadastrar item", view: "product-form", icon: Plus },
  { label: "Banners", desc: "Gerenciar vitrines", view: "banner-settings", icon: ImagePlay },
  { label: "Catalogo", desc: "Categorias e tags", view: "catalog", icon: Grid3X3 },
  { label: "Tema", desc: "Cores e identidade", view: "store-settings", icon: Palette },
  { label: "Configuracoes", desc: "Ajustes gerais", view: "catalog-settings", icon: Settings },
];

export default function QuickActions({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden h-full"
    >
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Acoes Rapidas</h3>
      </div>
      <div className="px-2 pb-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.view}
              onClick={() => onNavigate(action.view)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f7] transition-colors duration-200 group text-left"
            >
              <div className="w-9 h-9 bg-[#f5f5f7] group-hover:bg-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors border border-transparent group-hover:border-black/[0.04]">
                <Icon className="w-4 h-4 text-[#86868b] group-hover:text-[#1d1d1f] transition-colors" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#1d1d1f]">{action.label}</p>
                <p className="text-[11px] text-[#b0b0b5]">{action.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#d2d2d7] group-hover:text-[#86868b] transition-colors flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
