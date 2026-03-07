import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import FieldRow from "./FieldRow";
import ImageUploadField from "./ImageUploadField";
import SuggestionPills from "./SuggestionPills";

export default function HeroBannerSection({ form, updateField }) {
  return (
    <div className="space-y-4">
      <ImageUploadField
        value={form.hero_image_url}
        onChange={v => updateField("hero_image_url", v)}
        label="Imagem de fundo (1080×600px)"
        aspect="aspect-[16/9]"
      />

      <FieldRow label="Título principal" required hint="Máx. 50 caracteres">
        <Input value={form.hero_title || ""} onChange={e => updateField("hero_title", e.target.value)} placeholder="Produtos Apple. Direto pra você." maxLength={50} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        <SuggestionPills suggestions={["Produtos Apple. Direto pra você.", "Tecnologia que chega rápido", "O melhor da Apple está aqui", "Sua próxima compra começa aqui"]} onSelect={v => updateField("hero_title", v)} currentValue={form.hero_title} />
      </FieldRow>

      <FieldRow label="Subtítulo" hint="Máx. 80 caracteres">
        <Input value={form.hero_subtitle || ""} onChange={e => updateField("hero_subtitle", e.target.value)} placeholder="Entrega em 1 hora para sua cidade" maxLength={80} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        <SuggestionPills suggestions={["Entrega em 1 hora para sua cidade", "Frete grátis · Garantia · Suporte 24h", "Novos e seminovos com garantia real", "Parcelamos em até 12x sem juros"]} onSelect={v => updateField("hero_subtitle", v)} currentValue={form.hero_subtitle} />
      </FieldRow>

      <div className="grid grid-cols-2 gap-3 items-start">
        <FieldRow label="Texto do CTA" required hint="Máx. 25 chars">
          <Input value={form.hero_cta_text || ""} onChange={e => updateField("hero_cta_text", e.target.value)} placeholder="Explorar produtos" maxLength={25} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
          <SuggestionPills suggestions={["Explorar produtos", "Ver catálogo", "Comprar agora", "Conferir ofertas"]} onSelect={v => updateField("hero_cta_text", v)} currentValue={form.hero_cta_text} />
        </FieldRow>
        <FieldRow label="Destino do CTA" required>
          <Input value={form.hero_cta_link || ""} onChange={e => updateField("hero_cta_link", e.target.value)} placeholder="/Products ou URL" className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#fafafa] focus:bg-white" />
        </FieldRow>
      </div>

      {/* Badge */}
      <div className="bg-[#fafafa] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#1d1d1f]">Badge Flutuante</p>
          <Switch checked={form.hero_badge_active !== false} onCheckedChange={v => updateField("hero_badge_active", v)} />
        </div>
        {form.hero_badge_active !== false && (
          <>
            <FieldRow label="Texto" hint="Máx. 30 chars">
              <Input value={form.hero_badge_text || ""} onChange={e => updateField("hero_badge_text", e.target.value)} placeholder="Entrega em 1h ⚡" maxLength={30} className="h-9 rounded-xl text-[13px] border-black/[0.06] bg-white" />
              <SuggestionPills suggestions={["Entrega em 1h ⚡", "Frete grátis 🚚", "Oferta relâmpago 🔥", "Novidade 🆕", "Só hoje! 🎯"]} onSelect={v => updateField("hero_badge_text", v)} currentValue={form.hero_badge_text} />
            </FieldRow>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#86868b]">Animação pulsante</span>
              <Switch checked={form.hero_badge_animated !== false} onCheckedChange={v => updateField("hero_badge_animated", v)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}