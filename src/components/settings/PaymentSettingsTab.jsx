import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, CreditCard, Banknote, Save, Check, Loader2 } from "lucide-react";
import { useConfigPagamento, useSaveConfigPagamento } from "@/api/hooks";

const METHODS = [
  { key: "pix", label: "Pix", icon: QrCode, color: "#00D4AA", desc: "Pagamento instantâneo" },
  { key: "card", label: "Cartão", icon: CreditCard, color: "#6366f1", desc: "Crédito e débito" },
  { key: "cash", label: "Dinheiro", icon: Banknote, color: "#22c55e", desc: "Pagamento na entrega" },
];

export default function PaymentSettingsTab() {
  const [form, setForm] = useState({ pix_enabled: false, card_enabled: false, cash_enabled: false });
  const [saved, setSaved] = useState(false);

  const { data: config, isLoading } = useConfigPagamento();
  const saveMutation = useSaveConfigPagamento();

  useEffect(() => {
    if (config) {
      setForm({
        pix_enabled: config.pixHabilitado || false,
        card_enabled: config.cartaoHabilitado || false,
        cash_enabled: config.dinheiroHabilitado || false,
      });
    }
  }, [config]);

  const updateField = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync({
        pixHabilitado: form.pix_enabled,
        cartaoHabilitado: form.card_enabled,
        dinheiroHabilitado: form.cash_enabled,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* handled by mutation */ }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-5 h-5 animate-spin text-[#86868b]" />
      </div>
    );
  }

  const enabledCount = METHODS.filter(m => form[`${m.key}_enabled`]).length;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#86868b] dark:text-[#98989d]">
          {enabledCount} {enabledCount === 1 ? "método ativo" : "métodos ativos"}
        </p>
        <button
          onClick={handleSave}
          disabled={saveMutation.isPending}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-[#007aff] dark:bg-[#0a84ff] text-white hover:bg-[#0071e3] dark:hover:bg-[#409cff] active:scale-[0.97]"
          }`}
        >
          {saveMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : saved ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Save className="w-3.5 h-3.5" strokeWidth={1.8} />
          )}
          {saved ? "Salvo!" : "Salvar"}
        </button>
      </div>

      <div className="space-y-3">
        {METHODS.map((method) => {
          const enabled = form[`${method.key}_enabled`] || false;
          const Icon = method.icon;

          return (
            <div
              key={method.key}
              className={`bg-white dark:bg-[#2c2c2e] rounded-2xl border transition-all duration-300 ${
                enabled ? "border-black/[0.08] dark:border-white/[0.1] shadow-sm dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)]" : "border-black/[0.04] dark:border-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-4 p-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${!enabled ? "bg-[#f5f5f7] dark:bg-[#3a3a3c]" : ""}`}
                  style={enabled ? { backgroundColor: `${method.color}15` } : undefined}
                >
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${!enabled ? "text-[#c7c7cc] dark:text-[#636366]" : ""}`} style={enabled ? { color: method.color } : undefined} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[14px] font-semibold transition-colors ${enabled ? "text-[#1d1d1f] dark:text-[#f5f5f7]" : "text-[#86868b] dark:text-[#98989d]"}`}>{method.label}</p>
                  <p className="text-[11px] text-[#c7c7cc] dark:text-[#636366]">{method.desc}</p>
                </div>
                <Switch checked={enabled} onCheckedChange={(v) => updateField(`${method.key}_enabled`, v)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
