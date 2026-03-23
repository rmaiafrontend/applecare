import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, senha);
      navigate('/Admin');
    } catch (err) {
      setError(err.message || 'Email ou senha incorretos');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <Link to="/">
            <img src="/logo-alink.png" alt="aLink" className="h-16 mx-auto mb-4 object-contain invert brightness-200" />
          </Link>
          <h1 className="text-[28px] font-bold text-white tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-[15px] text-white/40 mt-2">
            Entre na sua conta para gerenciar sua loja
          </p>
        </motion.div>

        {/* Form */}
        <motion.form variants={fadeUp} custom={1} onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-[13px] text-red-400"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-white/50 uppercase tracking-wider block mb-2 pl-1">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 pr-12 text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-white text-black rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Entrar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>

        {/* Divider */}
        <motion.div variants={fadeUp} custom={2} className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[12px] text-white/20 uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        {/* Register link */}
        <motion.div variants={fadeUp} custom={3} className="text-center">
          <p className="text-[14px] text-white/40">
            Ainda nao tem uma conta?{' '}
            <Link
              to="/Registro"
              className="text-white font-medium hover:text-white/80 transition-colors underline underline-offset-4 decoration-white/20"
            >
              Criar conta
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
