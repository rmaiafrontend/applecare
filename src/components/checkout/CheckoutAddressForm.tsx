import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { utilsService } from '@/api/services';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

export interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface CheckoutAddressFormProps {
  address: AddressData;
  onChange: Dispatch<SetStateAction<AddressData>>;
}

const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

export default function CheckoutAddressForm({ address, onChange }: CheckoutAddressFormProps) {
  const [loadingCep, setLoadingCep] = useState(false);

  const fetchCep = async (cep: string) => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) return;
    setLoadingCep(true);
    try {
      const data = await utilsService.consultarCep(clean);
      if (data) {
        onChange((prev) => ({
          ...prev,
          street: data.rua,
          neighborhood: data.bairro,
          city: data.cidade,
          state: data.estado,
        }));
      }
    } catch (e) {
      console.error('CEP error:', e);
    }
    setLoadingCep(false);
  };

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    onChange((prev) => ({ ...prev, cep: formatted }));
    if (value.length === 8) fetchCep(value);
  };

  const set = (field: keyof AddressData) => (e: ChangeEvent<HTMLInputElement>) => onChange((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900">Endereco de entrega</h2>
            <p className="text-[11px] text-gray-400">Para onde enviamos seu pedido</p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">CEP</label>
            <div className="relative">
              <Input value={address.cep} onChange={handleCepChange} placeholder="00000-000" maxLength={9} className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300" />
              {loadingCep && <Loader2 className="w-4 h-4 absolute right-3 top-3.5 animate-spin text-gray-400" />}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Rua</label>
            <Input value={address.street} onChange={set('street')} placeholder="Nome da rua" className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Numero</label>
              <Input value={address.number} onChange={set('number')} placeholder="123" className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300" />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Complemento</label>
              <Input value={address.complement} onChange={set('complement')} placeholder="Apto, bloco (opcional)" className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300" />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Bairro</label>
            <Input value={address.neighborhood} onChange={set('neighborhood')} placeholder="Bairro" className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">Cidade</label>
              <Input value={address.city} onChange={set('city')} placeholder="Cidade" className="h-11 rounded-xl border-gray-200 text-[14px] placeholder:text-gray-300" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">UF</label>
              <Select value={address.state} onValueChange={(v) => onChange((p) => ({ ...p, state: v }))}>
                <SelectTrigger className="h-11 rounded-xl border-gray-200 text-[14px]">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
