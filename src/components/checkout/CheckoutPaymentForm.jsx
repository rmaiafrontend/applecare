import { CreditCard, QrCode, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

export default function CheckoutPaymentForm({ payment, onChange }) {
  return (
    <div className="space-y-4">
      {/* Payment methods */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-gray-900">Pagamento</h2>
              <p className="text-[11px] text-gray-400">Escolha como quer pagar</p>
            </div>
          </div>

          <RadioGroup
            value={payment.method}
            onValueChange={(v) => onChange((p) => ({ ...p, method: v }))}
            className="space-y-2.5"
          >
            <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              payment.method === 'pix' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
            }`}>
              <RadioGroupItem value="pix" className="sr-only" />
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-gray-900">PIX</span>
                  <span className="text-[9px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Recomendado</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">Aprovacao instantanea</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                payment.method === 'pix' ? 'border-gray-900' : 'border-gray-300'
              }`}>
                {payment.method === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
              </div>
            </label>

            <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
              payment.method === 'boleto' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'
            }`}>
              <RadioGroupItem value="boleto" className="sr-only" />
              <div className="w-10 h-10 rounded-xl bg-gray-500 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-semibold text-gray-900">Boleto Bancario</span>
                <p className="text-[11px] text-gray-400 mt-0.5">Vencimento em 3 dias</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                payment.method === 'boleto' ? 'border-gray-900' : 'border-gray-300'
              }`}>
                {payment.method === 'boleto' && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
              </div>
            </label>
          </RadioGroup>
        </div>
      </div>

      {/* Document */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-2.5">
          CPF/CNPJ para nota fiscal
        </label>
        <div className="flex gap-2.5">
          <Select
            value={payment.documentType}
            onValueChange={(v) => onChange((p) => ({ ...p, documentType: v }))}
          >
            <SelectTrigger className="w-[88px] h-11 rounded-xl border-gray-200 text-[13px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cpf">CPF</SelectItem>
              <SelectItem value="cnpj">CNPJ</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={payment.document}
            onChange={(e) => onChange((p) => ({ ...p, document: e.target.value }))}
            placeholder={payment.documentType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
            className="flex-1 h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
