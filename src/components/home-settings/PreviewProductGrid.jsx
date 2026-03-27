import { ChevronRight } from "lucide-react";

const Bar = ({ w = "100%", h = 8, className = "" }) => (
  <div className={`rounded-full bg-gray-200 ${className}`} style={{ width: w, height: h }} />
);

export function PreviewSectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between px-4 mb-3">
      <div>
        <span className="text-[13px] font-bold text-gray-900 block">{title}</span>
        {subtitle && <span className="text-[9px] text-gray-400">{subtitle}</span>}
      </div>
      <span className="text-[10px] text-gray-400 flex items-center">
        Ver todos
        <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  );
}

export function PreviewProductCarousel({ count = 3, badgeText = "Express" }) {
  return (
    <div className="flex gap-3 px-4 overflow-hidden pb-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[150px] shrink-0 rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 relative">
            <span className="absolute top-2 left-2 text-[7px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded-full">{badgeText}</span>
          </div>
          <div className="p-2.5 space-y-1.5">
            <Bar w="75%" h={6} />
            <Bar w="45%" h={8} className="!bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PreviewProductGrid({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 relative">
            <span className="absolute top-2 left-2 text-[7px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded-full">-14%</span>
          </div>
          <div className="p-2.5 space-y-1.5">
            <Bar w="80%" h={6} />
            <div className="flex items-center gap-1">
              <Bar w="45%" h={8} className="!bg-gray-300" />
              <Bar w="25%" h={5} className="opacity-30 line-through" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
