import { motion } from "framer-motion";
import { Pencil, Trash2, Star, Zap, Tag, Sparkles, FolderOpen, LayoutGrid, Eye, EyeOff, Layers } from "lucide-react";

const FILTER_META = {
  featured: { label: "Destaques", icon: Star, color: "#af52de", bg: "bg-purple-50" },
  express: { label: "Express", icon: Zap, color: "#ff9500", bg: "bg-orange-50" },
  discount: { label: "Desconto", icon: Tag, color: "#ff3b30", bg: "bg-red-50" },
  new: { label: "Novos", icon: Sparkles, color: "#30d158", bg: "bg-emerald-50" },
  category: { label: "Categoria", icon: FolderOpen, color: "#007aff", bg: "bg-blue-50" },
  all: { label: "Todos", icon: LayoutGrid, color: "#86868b", bg: "bg-gray-50" },
};

export default function SectionCard({ config, index, onEdit, onDelete, onToggle }) {
  const meta = FILTER_META[config.tipoFiltro] || FILTER_META.all;
  const FilterIcon = meta.icon;
  const isActive = config.ativo !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className={`group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? "border-black/[0.04] shadow-[0_1px_6px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)]"
          : "border-black/[0.03] opacity-60 hover:opacity-80"
      }`}
    >
      {/* Top color accent */}
      <div className="h-1 w-full" style={{ backgroundColor: isActive ? meta.color : "#e5e5ea" }} />

      <div className="p-4">
        <div className="flex items-start gap-3.5">
          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${meta.bg}`}
          >
            <FilterIcon className="w-5 h-5" style={{ color: meta.color }} strokeWidth={1.8} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-[#1d1d1f] truncate">{config.titulo}</h3>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-emerald-400" : "bg-[#c7c7cc]"}`} />
            </div>
            {config.subtitulo && (
              <p className="text-[12px] text-[#86868b] mt-0.5 truncate">{config.subtitulo}</p>
            )}

            {/* Meta pills */}
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md"
                style={{ backgroundColor: meta.color + "12", color: meta.color }}
              >
                {meta.label}
              </span>
              {config.maxItens && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#86868b] bg-[#f5f5f7] px-2 py-1 rounded-md">
                  <Layers className="w-3 h-3" />
                  {config.maxItens} itens
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#86868b] bg-[#f5f5f7] px-2 py-1 rounded-md">
                Ordem: {config.ordemExibicao}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onToggle(config)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5f5f7] transition-colors"
              title={isActive ? "Desativar" : "Ativar"}
            >
              {isActive
                ? <Eye className="w-4 h-4 text-emerald-500" strokeWidth={1.8} />
                : <EyeOff className="w-4 h-4 text-[#c7c7cc]" strokeWidth={1.8} />
              }
            </button>
            <button
              onClick={() => onEdit(config)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5f5f7] transition-colors"
            >
              <Pencil className="w-4 h-4 text-[#86868b]" strokeWidth={1.8} />
            </button>
            <button
              onClick={() => onDelete(config)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-400" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
