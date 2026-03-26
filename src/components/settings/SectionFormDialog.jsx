import { Save, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";

const FILTER_TYPES = [
  { value: "DESTAQUE", label: "Destaques" },
  { value: "ETIQUETA", label: "Por Etiqueta" },
  { value: "CATEGORIA", label: "Por Categoria" },
  { value: "TODOS", label: "Todos" },
];

export default function SectionFormDialog({ open, onOpenChange, form, setForm, categories, saving, onSave, isNew }) {
  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] rounded-2xl p-0 gap-0 overflow-hidden border-0 shadow-2xl">
        {/* Header */}
        <div className="bg-[#1d1d1f] px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-white text-[16px] font-semibold">
              {isNew ? "Nova Seção" : "Editar Seção"}
            </DialogTitle>
            <p className="text-white/50 text-[12px] mt-0.5">
              {isNew ? "Configure uma nova seção para o catálogo" : "Atualize as configurações desta seção"}
            </p>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Row: Title + Order */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider">Título</Label>
              <Input
                value={form.titulo}
                onChange={e => updateField("titulo", e.target.value)}
                placeholder="Entrega Express"
                className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider">Ordem</Label>
              <Input
                type="number"
                value={form.ordemExibicao}
                onChange={e => updateField("ordemExibicao", parseInt(e.target.value) || 0)}
                className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white text-center"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <Label className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider">Subtítulo</Label>
            <Input
              value={form.subtitulo}
              onChange={e => updateField("subtitulo", e.target.value)}
              placeholder="Receba em até 1 hora"
              className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white"
            />
          </div>

          {/* Row: Filter + Max */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider">Filtro</Label>
              <Select value={form.tipoFiltro} onValueChange={v => updateField("tipoFiltro", v)}>
                <SelectTrigger className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_TYPES.map(ft => (
                    <SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider">Max Itens</Label>
              <Input
                type="number"
                value={form.maxItens}
                onChange={e => updateField("maxItens", parseInt(e.target.value) || 6)}
                className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white text-center"
              />
            </div>
          </div>

          {/* Category selector */}
          {form.tipoFiltro === "CATEGORIA" && (
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-semibold uppercase tracking-wider">Categoria</Label>
              <Select value={form.valorFiltro} onValueChange={v => updateField("valorFiltro", v)}>
                <SelectTrigger className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Active toggle */}
          <div className="flex items-center justify-between bg-[#fafafa] rounded-xl px-4 py-3">
            <div>
              <p className="text-[13px] font-medium text-[#1d1d1f]">Seção Ativa</p>
              <p className="text-[10px] text-[#86868b]">Visível no catálogo</p>
            </div>
            <Switch checked={form.ativo} onCheckedChange={v => updateField("ativo", v)} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 h-10 rounded-xl text-[13px] font-medium text-[#86868b] bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex-1 h-10 rounded-xl text-[13px] font-medium text-white bg-[#007aff] hover:bg-[#0071e3] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" strokeWidth={1.8} />}
            Salvar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
