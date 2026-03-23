import { Upload, Loader2, ExternalLink, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BannerFormFields({ form, setForm, uploading, onUpload }) {
  const updateField = (key, value) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="space-y-5">
      {/* Tipo */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Tipo</p>
        <Select value={form.tipo} onValueChange={v => updateField("tipo", v)}>
          <SelectTrigger className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HERO">Hero</SelectItem>
            <SelectItem value="PROMO">Promo</SelectItem>
            <SelectItem value="SECUNDARIO">Secundário</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Imagem</p>

        {form.imagemUrl && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden bg-[#f5f5f7] group">
            <img src={form.imagemUrl} alt="Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <button
                onClick={() => updateField("imagemUrl", "")}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-[#1d1d1f] rounded-full p-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <label className={`flex items-center justify-center w-full h-20 border border-dashed rounded-xl cursor-pointer transition-all ${
          uploading ? "border-[#0071e3] bg-blue-50/50" : "border-black/[0.08] hover:border-[#0071e3] hover:bg-blue-50/20"
        }`}>
          {uploading ? (
            <div className="flex items-center gap-2 text-[#0071e3]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[12px] font-medium">Enviando...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-[#86868b]">
              <Upload className="w-4 h-4" />
              <span className="text-[12px] font-medium">Upload de imagem</span>
              <span className="text-[10px] text-[#c7c7cc]">PNG, JPG, WebP</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
        </label>

        <Input
          value={form.imagemUrl}
          onChange={e => updateField("imagemUrl", e.target.value)}
          placeholder="Ou cole a URL da imagem..."
          className="h-10 rounded-xl text-[12px] border-black/[0.06] bg-[#fafafa] focus:bg-white placeholder:text-[#c7c7cc]"
        />
      </div>

      {/* CTA + Link */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Conteúdo</p>
        <div className="space-y-2.5">
          <FieldRow label="Botão CTA">
            <Input value={form.textoCta} onChange={e => updateField("textoCta", e.target.value)} placeholder="Ver Ofertas" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
          <FieldRow label="Link">
            <Input value={form.link} onChange={e => updateField("link", e.target.value)} placeholder="/Products ou https://..." className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          </FieldRow>
          {form.link && (
            <a href={form.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0071e3] hover:underline">
              <ExternalLink className="w-3 h-3" /> Testar link
            </a>
          )}
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">Aparência</p>

        {/* Text color toggle */}
        <div className="space-y-1.5">
          <Label className="text-[11px] text-[#86868b] font-medium">Cor do texto</Label>
          <div className="grid grid-cols-2 gap-1.5 bg-[#f5f5f7] p-1 rounded-xl">
            {[
              { value: "light", label: "Claro" },
              { value: "dark", label: "Escuro" },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => updateField("corTexto", opt.value)}
                className={`py-2 rounded-[10px] text-[12px] font-medium transition-all ${
                  form.corTexto === opt.value
                    ? "bg-white text-[#1d1d1f] shadow-sm"
                    : "text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overlay slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-[11px] text-[#86868b] font-medium">Overlay</Label>
            <span className="text-[11px] text-[#1d1d1f] font-semibold tabular-nums bg-[#f5f5f7] px-2 py-0.5 rounded-md">{form.opacidadeOverlay ?? 40}%</span>
          </div>
          <Slider
            value={[form.opacidadeOverlay ?? 40]}
            onValueChange={([v]) => updateField("opacidadeOverlay", v)}
            min={0} max={80} step={5}
            className="w-full"
          />
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between py-3 px-3 bg-[#fafafa] rounded-xl">
          <div>
            <p className="text-[12px] font-medium text-[#1d1d1f]">Banner Ativo</p>
            <p className="text-[10px] text-[#86868b]">Visível no catálogo</p>
          </div>
          <Switch checked={form.ativo} onCheckedChange={v => updateField("ativo", v)} />
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-[#86868b] font-medium">{label}</Label>
      {children}
    </div>
  );
}
