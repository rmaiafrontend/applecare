import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, ArrowRight, Store, User, Mail, Lock, Phone, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Registro() {
  const navigate = useNavigate();
  const { registro } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    nomeLoja: '',
    slug: '',
    emailLoja: '',
    telefoneLoja: '',
    nomeUsuario: '',
    emailUsuario: '',
    senha: '',
  });

  const [slugEdited, setSlugEdited] = useState(false);

  const update = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'nomeLoja' && !slugEdited) {
        next.slug = generateSlug(value);
      }
      return next;
    });
  };

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const sanitizeSlug = (v) => v.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/--+/g, '-');

  const canGoStep2 = form.nomeLoja.trim() && form.slug.trim() && /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(form.slug);
  const canSubmit = form.nomeUsuario.trim() && validateEmail(form.emailUsuario.trim()) && form.senha.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.emailUsuario.trim())) {
      setError('Formato de email invalido');
      return;
    }
    if (form.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registro({
        ...form,
        nomeLoja: form.nomeLoja.trim(),
        slug: form.slug.trim(),
        nomeUsuario: form.nomeUsuario.trim(),
        emailUsuario: form.emailUsuario.trim(),
        emailLoja: form.emailLoja.trim() || undefined,
        telefoneLoja: form.telefoneLoja.trim() || undefined,
      });
      navigate('/Admin');
    } catch (err) {
      setError(err.message || 'Erro ao criar conta');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-8">
          <Link to="/">
            <img src="/logo-alink.png" alt="aLink" className="h-16 mx-auto mb-4 object-contain invert brightness-200" />
          </Link>
          <h1 className="text-[28px] font-bold text-white tracking-tight">
            Crie sua loja
          </h1>
          <p className="text-[15px] text-white/40 mt-2">
            Configure sua loja e comece a vender em minutos
          </p>
        </motion.div>

        {/* Steps indicator */}
        <motion.div variants={fadeUp} custom={0.5} className="flex items-center gap-3 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
              step >= 1 ? 'bg-white text-black' : 'bg-white/[0.06] text-white/30'
            }`}>1</div>
            <span className={`text-[13px] font-medium ${step >= 1 ? 'text-white/70' : 'text-white/20'}`}>Loja</span>
          </div>
          <div className="w-8 h-px bg-white/[0.08]" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
              step >= 2 ? 'bg-white text-black' : 'bg-white/[0.06] text-white/30'
            }`}>2</div>
            <span className={`text-[13px] font-medium ${step >= 2 ? 'text-white/70' : 'text-white/20'}`}>Conta</span>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-[13px] text-red-400 mb-4"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Store info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Nome da loja *
                </label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    value={form.nomeLoja}
                    onChange={(e) => update('nomeLoja', e.target.value)}
                    placeholder="Minha Loja Apple"
                    required
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Slug (URL da loja) *
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => { update('slug', sanitizeSlug(e.target.value)); setSlugEdited(true); }}
                    placeholder="minha-loja"
                    required
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                </div>
                {form.slug && (
                  <p className="text-[12px] text-white/30 mt-1.5 pl-1">
                    applelink.com/<span className="text-white/50">{form.slug}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Email da loja
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="email"
                    value={form.emailLoja}
                    onChange={(e) => update('emailLoja', e.target.value)}
                    placeholder="contato@minhaloja.com"
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Telefone da loja
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="tel"
                    value={form.telefoneLoja}
                    onChange={(e) => update('telefoneLoja', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canGoStep2}
                className="w-full h-12 bg-white text-black rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed mt-6"
              >
                Proximo
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Step 2: User account */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Seu nome *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    value={form.nomeUsuario}
                    onChange={(e) => update('nomeUsuario', e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    autoComplete="name"
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Seu email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="email"
                    value={form.emailUsuario}
                    onChange={(e) => update('emailUsuario', e.target.value)}
                    placeholder="voce@email.com"
                    required
                    autoComplete="email"
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
                  Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.senha}
                    onChange={(e) => update('senha', e.target.value)}
                    placeholder="Minimo 6 caracteres"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl pl-11 pr-12 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.senha && form.senha.length < 6 && (
                  <p className="text-[12px] text-amber-400/70 mt-1.5 pl-1">
                    A senha precisa ter pelo menos 6 caracteres
                  </p>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-12 px-6 bg-white/[0.06] border border-white/[0.08] text-white/60 rounded-xl font-medium text-[15px] hover:bg-white/[0.1] active:scale-[0.98] transition-all"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading || !canSubmit}
                  className="flex-1 h-12 bg-white text-black rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Criar conta
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Divider */}
        <motion.div variants={fadeUp} custom={2} className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] text-white/20 uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Login link */}
        <motion.div variants={fadeUp} custom={3} className="text-center">
          <p className="text-[14px] text-white/40">
            Ja tem uma conta?{' '}
            <Link
              to="/Login"
              className="text-white font-medium hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/20"
            >
              Entrar
            </Link>
          </p>
        </motion.div>

        {/* Back to home */}
        <motion.div variants={fadeUp} custom={4} className="text-center mt-6">
          <Link
            to="/"
            className="text-[13px] text-white/20 hover:text-white/40 transition-colors"
          >
            Voltar para o inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
