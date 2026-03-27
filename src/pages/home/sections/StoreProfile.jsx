import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Clock, MessageCircle, Tag, Zap, Package, HelpCircle, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function StoreProfile({
  storeName, storeSlogan, logoUrl, whatsapp,
  instagramUrl, tiktokUrl, youtubeUrl, facebookUrl,
  quickLinks, headerHours,
}) {
  const hoursEntries = Object.values(headerHours || {}).filter(Boolean);

  return (
    <motion.section initial="hidden" animate="visible" variants={stagger} className="px-5 pt-6 pb-5">
      <motion.div variants={fadeUp} custom={0} className="flex items-start gap-3.5">
        <div className="w-[64px] h-[64px] rounded-[18px] bg-store-primary flex items-center justify-center shadow-lg shadow-store-primary/20 shrink-0 overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-black text-white tracking-tighter">AL</span>
          )}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-bold text-store-text tracking-tight truncate">{storeName}</h2>
          </div>
          {storeSlogan && (
            <p className="text-[12px] text-store-text/50 mt-0.5 leading-snug">{storeSlogan}</p>
          )}
          {hoursEntries.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 text-[11px] text-store-text/50 bg-store-secondary rounded-full px-2.5 py-1">
                <Clock className="w-3 h-3 text-store-text/40" strokeWidth={2} />
                <span>{hoursEntries[0]}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Actions row */}
      <motion.div variants={fadeUp} custom={2} className="flex items-center gap-2 mt-5">
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-store-primary text-white rounded-2xl h-11 font-semibold text-[13px] transition-all hover:opacity-90 active:scale-[0.97]"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} />
            WhatsApp
          </a>
        )}
        <div className="flex items-center gap-1.5">
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-store-secondary flex items-center justify-center text-store-text/60 hover:bg-store-secondary/80 active:scale-95 transition-all">
              <Instagram className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </a>
          )}
          {tiktokUrl && (
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-store-secondary flex items-center justify-center text-store-text/60 hover:bg-store-secondary/80 active:scale-95 transition-all">
              <span className="text-[13px] font-bold">TT</span>
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-store-secondary flex items-center justify-center text-store-text/60 hover:bg-store-secondary/80 active:scale-95 transition-all">
              <span className="text-[13px] font-bold">YT</span>
            </a>
          )}
          {facebookUrl && (
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-store-secondary flex items-center justify-center text-store-text/60 hover:bg-store-secondary/80 active:scale-95 transition-all">
              <span className="text-[13px] font-bold">FB</span>
            </a>
          )}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={fadeUp} custom={3} className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar -mx-5 px-5">
        {quickLinks ? (
          quickLinks.map((link, i) => (
            <a
              key={i}
              href={link.url || '#'}
              target={link.url?.startsWith('http') ? '_blank' : undefined}
              rel={link.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-[12px] font-semibold hover:bg-store-secondary/80 active:scale-[0.96] transition-all shrink-0 ${
                link.is_highlight
                  ? 'bg-store-primary text-white border-store-primary hover:opacity-90'
                  : 'bg-store-secondary text-store-text/70 border-store-secondary'
              }`}
            >
              {link.emoji && <span className="text-[14px]">{link.emoji}</span>}
              {link.label}
            </a>
          ))
        ) : (
          [
            { label: 'Catálogo', icon: Tag, to: createPageUrl('Products') },
            { label: 'Ofertas', icon: Zap, to: createPageUrl('Products') },
            { label: 'Rastreio', icon: Package, to: createPageUrl('Orders') },
            { label: 'FAQ', icon: HelpCircle, to: createPageUrl('Profile') },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-1.5 bg-store-secondary border border-store-secondary rounded-full px-4 py-2 text-[12px] font-semibold text-store-text/70 hover:bg-store-secondary/80 active:scale-[0.96] transition-all shrink-0"
            >
              <link.icon className="w-3.5 h-3.5 text-store-text/40" strokeWidth={2} />
              {link.label}
            </Link>
          ))
        )}
      </motion.div>
    </motion.section>
  );
}
