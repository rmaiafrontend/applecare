import { createContext, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwXpFj7dmnhCxTe7A5SLmaOhg5g0veYxJaSi-fw3llQsuJs4Qu66zuquDWflt-4PJWb-Q/exec';

const WaitlistContext = createContext({ open: false, setOpen: () => {} });

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <WaitlistContext.Provider value={{ open, setOpen }}>
      {children}
      <WaitlistModal open={open} onOpenChange={setOpen} />
    </WaitlistContext.Provider>
  );
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function WaitlistModal({ open, onOpenChange }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Silently fail — lead is still shown success screen
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation completes
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-[440px] translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-white/[0.08] bg-[#111113] shadow-2xl shadow-black/60 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="relative px-6 pt-8 pb-5 text-center overflow-hidden">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-[#007aff]/[0.12] rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative">
                    <span className="inline-flex items-center gap-1.5 bg-[#007aff]/10 border border-[#007aff]/20 text-[#007aff] text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4">
                      <Sparkles className="w-3 h-3" />
                      Pre-lancamento
                    </span>
                    <h2 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight leading-tight">
                      Garanta seu acesso antecipado
                    </h2>
                    <p className="mt-2 text-[13px] sm:text-[14px] text-white/35 leading-relaxed max-w-[320px] mx-auto">
                      Cadastre-se na lista VIP e receba uma oferta exclusiva no lancamento.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-3.5">
                  <div>
                    <label className="block text-[12px] font-medium text-white/40 mb-1.5 ml-1">Nome</label>
                    <input
                      {...register('name', { required: true })}
                      placeholder="Seu nome completo"
                      className={`w-full h-11 bg-white/[0.04] border ${errors.name ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-xl px-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#007aff]/50 focus:bg-white/[0.06] transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-white/40 mb-1.5 ml-1">E-mail</label>
                    <input
                      {...register('email', {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      })}
                      type="email"
                      placeholder="seu@email.com"
                      className={`w-full h-11 bg-white/[0.04] border ${errors.email ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-xl px-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#007aff]/50 focus:bg-white/[0.06] transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-white/40 mb-1.5 ml-1">WhatsApp</label>
                    <input
                      {...register('whatsapp', { required: true })}
                      type="tel"
                      placeholder="(00) 00000-0000"
                      onChange={(e) => {
                        e.target.value = formatPhone(e.target.value);
                      }}
                      className={`w-full h-11 bg-white/[0.04] border ${errors.whatsapp ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-xl px-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#007aff]/50 focus:bg-white/[0.06] transition-all`}
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-white/40 mb-1.5 ml-1">Cidade</label>
                    <input
                      {...register('city', { required: true })}
                      placeholder="Sua cidade"
                      className={`w-full h-11 bg-white/[0.04] border ${errors.city ? 'border-red-500/50' : 'border-white/[0.08]'} rounded-xl px-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#007aff]/50 focus:bg-white/[0.06] transition-all`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#007aff] hover:bg-[#0071e3] text-white font-semibold rounded-xl text-[15px] transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Garantir minha vaga'
                    )}
                  </button>

                  <p className="text-center text-[11px] text-white/20 pt-1">
                    Vagas limitadas. Seus dados estao seguros.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 py-14 sm:py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 mx-auto bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </motion.div>

                <h3 className="text-[22px] sm:text-[24px] font-bold text-white tracking-tight">
                  Voce esta na lista!
                </h3>
                <p className="mt-3 text-[14px] text-white/40 leading-relaxed max-w-[300px] mx-auto">
                  Em breve entraremos em contato com sua oferta exclusiva de lancamento.
                </p>

                <button
                  onClick={handleClose}
                  className="mt-8 px-8 py-3 bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] rounded-xl text-[14px] font-medium transition-all"
                >
                  Fechar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
