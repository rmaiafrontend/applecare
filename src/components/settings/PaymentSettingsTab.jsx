import React, { useState, useEffect } from "react";
import { PaymentConfig } from "@/api/dataService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, CreditCard, FileText, Banknote, Save, Check, Loader2 } from "lucide-react";
import { QUERY_KEYS } from '@/lib/constants';

const METHODS = [
  { key: "pix", label: "Pix", icon: QrCode, color: "#00D4AA", desc: "Pagamento instantâneo" },
  { key: "card", label: "Cartão", icon: CreditCard, color: "#6366f1", desc: "Crédito e débito" },
  { key: "boleto", label: "Boleto", icon: FileText, color: "#f59e0b", desc: "Boleto bancário" },
  { key: "cash", label: "Dinheiro", icon: Banknote, color: "#22c55e", desc: "Pagamento na entrega" },
];

export default function PaymentSettingsTab() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ config_key: "payment_methods" });
  const [saved, setSaved] = useState(false);

  const { data: configs, isLoading } = useQuery({
    queryKey: QUERY_KEYS.paymentConfig,
    queryFn: () => PaymentConfig.filter({ config_key: "payment_methods" }),
  });

  const existing = configs?.[0];

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const updateField = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { id, created_date, updated_date, created_by, ...data } = form;
      if (existing) {
        return PaymentConfig.update(existing.id, data);
      }
      return PaymentConfig.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.paymentConfig });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

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
          onClick={() => saveMutation.mutate()}
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

              <AnimatePresence>
                {enabled && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
                      <MethodFields method={method.key} form={form} updateField={updateField} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MethodFields({ method, form, updateField }) {
  const inputClass = "h-10 rounded-xl text-[13px] border-black/[0.06] dark:border-white/[0.06] bg-[#fafafa] dark:bg-[#1c1c1e] dark:text-[#f5f5f7] focus:bg-white dark:focus:bg-[#2c2c2e]";

  switch (method) {
    case "pix":
      return (
        <div className="space-y-3 pt-3">
          <FieldRow label="Chave Pix">
            <Input value={form.pix_key || ""} onChange={e => updateField("pix_key", e.target.value)} placeholder="CPF, e-mail, telefone ou chave aleatória" className={inputClass} />
          </FieldRow>
          <FieldRow label="Nome do titular">
            <Input value={form.pix_holder_name || ""} onChange={e => updateField("pix_holder_name", e.target.value)} placeholder="Nome completo" className={inputClass} />
          </FieldRow>
        </div>
      );
    case "card":
      return (
        <div className="grid grid-cols-2 gap-3 pt-3">
          <FieldRow label="Máx. parcelas">
            <Input type="number" value={form.card_max_installments || 12} onChange={e => updateField("card_max_installments", parseInt(e.target.value) || 1)} min={1} max={24} className={inputClass} />
          </FieldRow>
          <FieldRow label="Valor mín. parcela (R$)">
            <Input type="number" value={form.card_min_installment_value || 50} onChange={e => updateField("card_min_installment_value", parseFloat(e.target.value) || 0)} min={0} className={inputClass} />
          </FieldRow>
        </div>
      );
    case "boleto":
      return (
        <div className="pt-3">
          <FieldRow label="Dias para vencimento">
            <Input type="number" value={form.boleto_days_due || 3} onChange={e => updateField("boleto_days_due", parseInt(e.target.value) || 1)} min={1} max={30} className={`${inputClass} w-24`} />
          </FieldRow>
        </div>
      );
    case "cash":
      return (
        <div className="pt-3">
          <FieldRow label="Observação sobre troco">
            <Input value={form.cash_change_note || ""} onChange={e => updateField("cash_change_note", e.target.value)} placeholder="Ex: Informe se precisa de troco" className={inputClass} />
          </FieldRow>
        </div>
      );
    default:
      return null;
  }
}

function FieldRow({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
