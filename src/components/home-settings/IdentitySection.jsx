import React from "react";
import { Input } from "@/components/ui/input";
import FieldRow from "./FieldRow";
import ImageUploadField from "./ImageUploadField";

export default function IdentitySection({ form, updateField }) {
  return (
    <div className="space-y-4">
      <ImageUploadField
        value={form.identity_logo_url}
        onChange={v => updateField("identity_logo_url", v)}
        label="Logotipo principal (400×400px)"
        aspect="aspect-square max-w-[160px]"
      />

      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Cor primária" required hint="Botões, badges, CTAs">
          <div className="flex items-center gap-2 bg-[#fafafa] border border-black/[0.06] rounded-xl px-3 py-2">
            <input
              type="color"
              value={form.identity_primary_color || "#1A1A1A"}
              onChange={e => updateField("identity_primary_color", e.target.value)}
              className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent p-0"
            />
            <input
              type="text"
              value={form.identity_primary_color || "#1A1A1A"}
              onChange={e => updateField("identity_primary_color", e.target.value)}
              className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] outline-none uppercase"
              maxLength={7}
            />
          </div>
        </FieldRow>
        <FieldRow label="Cor de destaque" hint="Promoções e urgência">
          <div className="flex items-center gap-2 bg-[#fafafa] border border-black/[0.06] rounded-xl px-3 py-2">
            <input
              type="color"
              value={form.identity_accent_color || "#FF6B35"}
              onChange={e => updateField("identity_accent_color", e.target.value)}
              className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent p-0"
            />
            <input
              type="text"
              value={form.identity_accent_color || "#FF6B35"}
              onChange={e => updateField("identity_accent_color", e.target.value)}
              className="flex-1 bg-transparent text-[12px] font-mono text-[#1d1d1f] outline-none uppercase"
              maxLength={7}
            />
          </div>
        </FieldRow>
      </div>

      <FieldRow label="Slug da loja" required hint="URL pública: wegx.com.br/[slug] — imutável após publicação">
        <Input
          value={form.identity_slug || ""}
          onChange={e => updateField("identity_slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          placeholder="minha-loja"
          className="h-10 rounded-xl text-[13px] font-mono border-black/[0.06] bg-[#fafafa] focus:bg-white"
        />
      </FieldRow>
    </div>
  );
}