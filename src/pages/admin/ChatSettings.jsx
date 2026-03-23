import { useState, useEffect } from "react";
import { Save, Loader2, Check, Plus, X, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChatPreview from "@/components/chat/ChatPreview";
import { useConfigChat, useSaveConfigChat } from "@/api/hooks";

const TONES = [
  { value: "formal", label: "Formal", desc: "Linguagem corporativa e profissional" },
  { value: "casual", label: "Casual", desc: "Descontraído e natural" },
  { value: "tecnico", label: "Técnico", desc: "Focado em especificações e detalhes" },
  { value: "amigavel", label: "Amigável", desc: "Acolhedor e prestativo" },
];

const DEFAULT_FORM = {
  assistant_name: "Assistente aLink",
  welcome_message: "Olá! Sou o assistente aLink. Como posso ajudar você hoje?",
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

function fromApi(data) {
  if (!data) return {};
  return {
    assistant_name: data.nomeAssistente || DEFAULT_FORM.assistant_name,
    welcome_message: data.mensagemBoasVindas || DEFAULT_FORM.welcome_message,
    tone: data.tom || DEFAULT_FORM.tone,
    primary_color: data.corPrimaria || DEFAULT_FORM.primary_color,
    chat_position: data.posicaoChat || DEFAULT_FORM.chat_position,
    is_active: data.ativo !== false,
    show_product_suggestions: data.mostrarSugestoesProdutos !== false,
    max_messages_per_session: data.maxMensagensPorSessao || 50,
    suggested_questions: (data.perguntasSugeridas || []).map(p => p.pergunta),
  };
}

function toApi(form) {
  return {
    nomeAssistente: form.assistant_name,
    mensagemBoasVindas: form.welcome_message,
    tom: form.tone,
    corPrimaria: form.primary_color,
    posicaoChat: form.chat_position,
    ativo: form.is_active,
    mostrarSugestoesProdutos: form.show_product_suggestions,
    maxMensagensPorSessao: form.max_messages_per_session,
    perguntasSugeridas: (form.suggested_questions || []).map((q, i) => ({
      pergunta: q,
      ordemExibicao: i,
    })),
  };
}

export default function ChatSettings() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const { data: chatConfig } = useConfigChat();
  const saveMutation = useSaveConfigChat();

  useEffect(() => {
    if (chatConfig) {
      setForm(prev => ({ ...prev, ...fromApi(chatConfig) }));
    }
  }, [chatConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveMutation.mutateAsync(toApi(form));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
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
            saved ? "bg-emerald-500 text-white" : "bg-[#007aff] dark:bg-[#0a84ff] hover:bg-[#0071e3] dark:hover:bg-[#409cff] text-white"
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
                <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Chat Ativo</p>
                <p className="text-[11px] text-[#86868b] dark:text-[#98989d]">Habilitar chat no catálogo</p>
              </div>
              <Switch checked={form.is_active} onCheckedChange={v => updateField("is_active", v)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Nome do Assistente</Label>
              <Input value={form.assistant_name} onChange={e => updateField("assistant_name", e.target.value)} className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Mensagem de Boas-vindas</Label>
              <Textarea value={form.welcome_message} onChange={e => updateField("welcome_message", e.target.value)} className="rounded-xl text-[13px] min-h-[70px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
            </div>
          </Section>

          {/* Behavior */}
          <Section title="Comportamento da IA">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Tom de Voz</Label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => updateField("tone", t.value)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      form.tone === t.value
                        ? "border-[#007aff] dark:border-[#0a84ff] bg-[#007aff]/[0.04] dark:bg-[#0a84ff]/[0.1]"
                        : "border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                    }`}
                  >
                    <p className={`text-[12px] font-medium ${form.tone === t.value ? "text-[#007aff] dark:text-[#0a84ff]" : "text-[#86868b] dark:text-[#98989d]"}`}>{t.label}</p>
                    <p className="text-[10px] text-[#b0b0b5] dark:text-[#636366] mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Sugestões de Produtos</p>
                <p className="text-[11px] text-[#86868b] dark:text-[#98989d]">Mostrar cards de produtos nas respostas</p>
              </div>
              <Switch checked={form.show_product_suggestions} onCheckedChange={v => updateField("show_product_suggestions", v)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Limite de Mensagens por Sessão</Label>
              <Input type="number" value={form.max_messages_per_session} onChange={e => updateField("max_messages_per_session", parseInt(e.target.value) || 50)} className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e] w-32" />
            </div>
          </Section>

          {/* Suggested Questions */}
          <Section title="Perguntas Sugeridas">
            <p className="text-[11px] text-[#b0b0b5] dark:text-[#636366]">Exibidas como botões rápidos ao iniciar o chat</p>
            <div className="space-y-2">
              {(form.suggested_questions || []).map((q, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-xl px-3 py-2 group">
                  <MessageCircle className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d] flex-shrink-0" />
                  <span className="flex-1 text-[12px] text-[#1d1d1f] dark:text-[#f5f5f7]">{q}</span>
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
                className="h-9 rounded-xl text-[12px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]"
                onKeyDown={e => { if (e.key === "Enter") addQuestion(); }}
              />
              <button onClick={addQuestion} disabled={!newQuestion.trim()} className="h-9 px-3 bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#e8e8ed] dark:hover:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-xl text-[11px] font-medium transition-colors disabled:opacity-40 flex-shrink-0">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </Section>

          {/* Appearance */}
          <Section title="Aparência">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Cor Primária</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.primary_color}
                    onChange={e => updateField("primary_color", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-black/[0.06] dark:border-white/[0.06] cursor-pointer"
                  />
                  <Input value={form.primary_color} onChange={e => updateField("primary_color", e.target.value)} className="h-10 rounded-xl text-[12px] font-mono border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-[#86868b] dark:text-[#98989d] font-medium">Posição do Chat</Label>
                <Select value={form.chat_position} onValueChange={v => updateField("chat_position", v)}>
                  <SelectTrigger className="h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-[#1c1c1e] dark:text-[#f5f5f7]"><SelectValue /></SelectTrigger>
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
            <p className="text-[11px] font-medium text-[#86868b] dark:text-[#98989d] uppercase tracking-widest mb-3">Preview</p>
            <ChatPreview config={form} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_1px_8px_-3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_8px_-3px_rgba(0,0,0,0.2)] p-5 space-y-4">
      <h3 className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{title}</h3>
      {children}
    </div>
  );
}
