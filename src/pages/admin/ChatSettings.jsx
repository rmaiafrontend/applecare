import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Save, Loader2, Check, Plus, X, MessageCircle, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChatPreview from "@/components/chat/ChatPreview";

const TONES = [
  { value: "formal", label: "Formal", desc: "Linguagem corporativa e profissional" },
  { value: "casual", label: "Casual", desc: "Descontraído e natural" },
  { value: "tecnico", label: "Técnico", desc: "Focado em especificações e detalhes" },
  { value: "amigavel", label: "Amigável", desc: "Acolhedor e prestativo" },
];

const DEFAULT_FORM = {
  config_key: "main",
  assistant_name: "Assistente WEGX",
  welcome_message: "Olá! Sou o assistente WEGX. Como posso ajudar você hoje?",
  system_prompt: "Você é um assistente de vendas especializado em produtos Apple. Ajude os clientes a encontrar o produto ideal, tire dúvidas técnicas e ofereça recomendações personalizadas. Seja sempre prestativo e conhecedor dos produtos.",
  tone: "amigavel",
  primary_color: "#1d1d1f",
  chat_position: "bottom-right",
  is_active: true,
  show_product_suggestions: true,
  max_messages_per_session: 50,
  suggested_questions: [
    "Qual o melhor iPhone para mim?",
    "Vocês têm entrega express?",
    "Quais produtos estão em promoção?"
  ],
};

export default function ChatSettings() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [configId, setConfigId] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");

  const { data: configs = [] } = useQuery({
    queryKey: ["chat_config"],
    queryFn: () => base44.entities.ChatConfig.list(),
  });

  useEffect(() => {
    if (configs.length > 0) {
      const c = configs[0];
      setConfigId(c.id);
      setForm({
        config_key: c.config_key || "main",
        assistant_name: c.assistant_name || DEFAULT_FORM.assistant_name,
        welcome_message: c.welcome_message || DEFAULT_FORM.welcome_message,
        system_prompt: c.system_prompt || DEFAULT_FORM.system_prompt,
        tone: c.tone || DEFAULT_FORM.tone,
        primary_color: c.primary_color || DEFAULT_FORM.primary_color,
        chat_position: c.chat_position || DEFAULT_FORM.chat_position,
        is_active: c.is_active !== false,
        show_product_suggestions: c.show_product_suggestions !== false,
        max_messages_per_session: c.max_messages_per_session || 50,
        suggested_questions: c.suggested_questions || DEFAULT_FORM.suggested_questions,
      });
    }
  }, [configs]);

  const handleSave = async () => {
    setSaving(true);
    if (configId) {
      await base44.entities.ChatConfig.update(configId, form);
    } else {
      await base44.entities.ChatConfig.create(form);
    }
    queryClient.invalidateQueries({ queryKey: ["chat_config"] });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setForm(prev => ({ ...prev, suggested_questions: [...(prev.suggested_questions || []), newQuestion.trim()] }));
      setNewQuestion("");
    }
  };

  const removeQuestion = (i) => {
    setForm(prev => ({ ...prev, suggested_questions: prev.suggested_questions.filter((_, idx) => idx !== i) }));
  };

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Actions */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className={`h-9 px-5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all disabled:opacity-70 ${
            saved ? "bg-emerald-500 text-white" : "bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white"
          }`}
        >
          {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Salvando...</>
           : saved ? <><Check className="w-3.5 h-3.5" /> Salvo!</>
           : <><Save className="w-3.5 h-3.5" strokeWidth={1.8} /> Salvar</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-5">
        {/* Settings */}
        <div className="space-y-5">
          {/* General */}
          <Section title="Geral">
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-[13px] font-medium text-[#1d1d1f]">Chat Ativo</p>
                <p className="text-[11px] text-[#86868b]">Habilitar chat no catálogo</p>
              </div>
              <Switch checked={form.is_active} onCheckedChange={v => updateField("is_active", v)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Nome do Assistente</Label>
              <Input value={form.assistant_name} onChange={e => updateField("assistant_name", e.target.value)} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Mensagem de Boas-vindas</Label>
              <Textarea value={form.welcome_message} onChange={e => updateField("welcome_message", e.target.value)} className="rounded-xl text-[13px] min-h-[70px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
            </div>
          </Section>

          {/* Behavior */}
          <Section title="Comportamento da IA">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Prompt do Sistema</Label>
              <p className="text-[10px] text-[#b0b0b5]">Define a personalidade, conhecimento e regras do assistente</p>
              <Textarea
                value={form.system_prompt}
                onChange={e => updateField("system_prompt", e.target.value)}
                className="rounded-xl text-[13px] min-h-[120px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white"
                placeholder="Você é um assistente de vendas..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Tom de Voz</Label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => updateField("tone", t.value)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      form.tone === t.value
                        ? "border-[#1d1d1f] bg-[#1d1d1f]/[0.03]"
                        : "border-black/[0.04] hover:border-black/[0.08]"
                    }`}
                  >
                    <p className={`text-[12px] font-medium ${form.tone === t.value ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>{t.label}</p>
                    <p className="text-[10px] text-[#b0b0b5] mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-[13px] font-medium text-[#1d1d1f]">Sugestões de Produtos</p>
                <p className="text-[11px] text-[#86868b]">Mostrar cards de produtos nas respostas</p>
              </div>
              <Switch checked={form.show_product_suggestions} onCheckedChange={v => updateField("show_product_suggestions", v)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] font-medium">Limite de Mensagens por Sessão</Label>
              <Input type="number" value={form.max_messages_per_session} onChange={e => updateField("max_messages_per_session", parseInt(e.target.value) || 50)} className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white w-32" />
            </div>
          </Section>

          {/* Suggested Questions */}
          <Section title="Perguntas Sugeridas">
            <p className="text-[11px] text-[#b0b0b5]">Exibidas como botões rápidos ao iniciar o chat</p>
            <div className="space-y-2">
              {(form.suggested_questions || []).map((q, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#f5f5f7] rounded-xl px-3 py-2 group">
                  <MessageCircle className="w-3.5 h-3.5 text-[#86868b] flex-shrink-0" />
                  <span className="flex-1 text-[12px] text-[#1d1d1f]">{q}</span>
                  <button onClick={() => removeQuestion(i)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                placeholder="Digite uma pergunta sugerida..."
                className="h-9 rounded-xl text-[12px] border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white"
                onKeyDown={e => { if (e.key === "Enter") addQuestion(); }}
              />
              <button onClick={addQuestion} disabled={!newQuestion.trim()} className="h-9 px-3 bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-xl text-[11px] font-medium transition-colors disabled:opacity-40 flex-shrink-0">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </Section>

          {/* Appearance */}
          <Section title="Aparência">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Cor Primária</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.primary_color}
                    onChange={e => updateField("primary_color", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-black/[0.06] cursor-pointer"
                  />
                  <Input value={form.primary_color} onChange={e => updateField("primary_color", e.target.value)} className="h-10 rounded-xl text-[12px] font-mono border-black/[0.06] bg-[#f5f5f7]/50 focus:bg-white" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] font-medium">Posição do Chat</Label>
                <Select value={form.chat_position} onValueChange={v => updateField("chat_position", v)}>
                  <SelectTrigger className="h-10 rounded-xl text-[13px] border-black/[0.06] bg-[#f5f5f7]/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Inferior Direito</SelectItem>
                    <SelectItem value="bottom-left">Inferior Esquerdo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Section>
        </div>

        {/* Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <p className="text-[11px] font-medium text-[#86868b] uppercase tracking-widest mb-3">Preview</p>
            <ChatPreview config={form} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.04] shadow-[0_1px_8px_-3px_rgba(0,0,0,0.04)] p-5 space-y-4">
      <h3 className="text-[13px] font-semibold text-[#1d1d1f]">{title}</h3>
      {children}
    </div>
  );
}