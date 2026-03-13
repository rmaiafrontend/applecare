import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ImagePlay,
  Grid3X3,
  Palette,
  ChevronRight,
  Settings,
} from "lucide-react";

const actions = [
  {
    label: "Novo Produto",
    desc: "Cadastrar item",
    view: "product-form",
    icon: Plus,
    accent: "#007aff",
  },
  {
    label: "Banners",
    desc: "Gerenciar vitrines",
    view: "banner-settings",
    icon: ImagePlay,
    accent: "#ff9500",
  },
  {
    label: "Catálogo",
    desc: "Categorias e tags",
    view: "catalog",
    icon: Grid3X3,
    accent: "#34c759",
  },
  {
    label: "Tema",
    desc: "Cores e identidade",
    view: "store-settings",
    icon: Palette,
    accent: "#af52de",
  },
  {
    label: "Configurações",
    desc: "Ajustes gerais",
    view: "catalog-settings",
    icon: Settings,
    accent: "#86868b",
  },
];

export default function QuickActions({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="bg-white/70 dark:bg-[#2c2c2e]/70 backdrop-blur-xl rounded-2xl border border-black/[0.04] dark:border-white/[0.06] overflow-hidden h-full"
    >
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-[11px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-[0.06em]">
          Ações Rápidas
        </h3>
      </div>
      <div className="px-2 pb-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.view}
              onClick={() => onNavigate(action.view)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f7]/80 dark:hover:bg-white/[0.04] active:bg-[#ebebed] dark:active:bg-white/[0.08] transition-all duration-200 group text-left"
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: action.accent + "0d" }}
              >
                <Icon
                  className="w-4 h-4 transition-colors"
                  style={{ color: action.accent }}
                  strokeWidth={1.8}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] tracking-[-0.01em]">
                  {action.label}
                </p>
                <p className="text-[11px] text-[#86868b] dark:text-[#98989d]">{action.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#d2d2d7] dark:text-[#48484a] group-hover:text-[#86868b] dark:group-hover:text-[#98989d] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
