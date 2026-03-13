import { Instagram, Youtube, Mail, Phone, Heart } from 'lucide-react';
import { STORE_INFO } from '@/lib/constants';

export default function FooterSection() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#007aff] to-[#007aff]/70 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">AppleLink</span>
            </div>
            <p className="text-white/35 text-[13px] sm:text-[14px] leading-relaxed max-w-xs mb-6">
              A plataforma completa para lojas Apple. Catálogo, entrega express, checkout via WhatsApp e muito mais.
            </p>
            <div className="flex items-center gap-3">
              <a href={STORE_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={STORE_INFO.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={STORE_INFO.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.6z"/></svg>
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-5">Produto</h4>
            <ul className="space-y-3.5">
              {['Catálogo', 'Entrega Express', 'WhatsApp Checkout', 'Painel Admin', 'Busca com IA', 'Link da Loja'].map((item) => (
                <li key={item}>
                  <span className="text-white/25 text-[13px] sm:text-[14px] cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-5">Empresa</h4>
            <ul className="space-y-3.5">
              {['Sobre nós', 'Blog', 'Carreiras', 'Contato', 'Parceiros'].map((item) => (
                <li key={item}>
                  <span className="text-white/25 text-[13px] sm:text-[14px] cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-5">Legal</h4>
            <ul className="space-y-3.5">
              {['Termos de Uso', 'Privacidade', 'Cookies', 'LGPD'].map((item) => (
                <li key={item}>
                  <span className="text-white/25 text-[13px] sm:text-[14px] cursor-default">{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-white/60 font-semibold text-[13px] uppercase tracking-wider mb-4 mt-8">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:contato@applelink.com.br`} className="flex items-center gap-2 text-white/35 text-[13px] hover:text-white/70 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  contato@applelink.com.br
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${STORE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/35 text-[13px] hover:text-white/70 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[12px] sm:text-[13px]">
            © {new Date().getFullYear()} AppleLink. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-white/15 text-[11px] sm:text-[12px]">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-red-500/50 fill-red-500/50" />
            <span>em São Paulo, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
