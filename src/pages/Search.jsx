import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  ExternalLink,
  Truck,
} from 'lucide-react';
import Header from '@/components/navigation/Header';
import { getGreeting, processMessage } from '@/lib/chatEngine';
import { formatPrice } from '@/lib/format';
import { mapProductFromApi, mapCategoryFromApi } from '@/api/adapters';
import {
  useSlug,
  usePublicProducts,
  usePublicCategories,
  useCart,
} from '@/api/hooks';

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 px-4 mb-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shrink-0 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCarousel({ products }) {
  return (
    <div className="mt-3 -mx-1 overflow-x-auto no-scrollbar">
      <div className="flex gap-2 px-1 snap-x snap-mandatory" style={{ minWidth: 'min-content' }}>
        {products.map(product => {
          const hasDiscount = product.original_price && product.original_price > product.price;
          const discountPct = hasDiscount
            ? Math.round((1 - product.price / product.original_price) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              to={createPageUrl(`ProductDetail?id=${product.id}`)}
              className="snap-start shrink-0 w-[145px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors group"
            >
              <div className="relative">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'}
                  alt={product.name}
                  className="w-full aspect-square object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                  {hasDiscount && (
                    <span className="inline-flex items-center gap-0.5 bg-red-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                      -{discountPct}% <span className="text-white/70 text-[7px]">off</span>
                    </span>
                  )}
                </div>
                {product.express_delivery && (
                  <span className="absolute top-1.5 right-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <Truck className="w-2.5 h-2.5" /> 1h
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <h4 className="text-[11px] font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[28px]">
                  {product.name}
                </h4>
                <div className="mt-1.5 flex items-baseline gap-1">
                  {hasDiscount && (
                    <span className="text-[9px] text-gray-400 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-gray-900 tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function AiBubble({ message, onQuickReply, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <div className="flex items-end gap-2.5 px-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shrink-0 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
        </div>
        <div className="max-w-[calc(100%-60px)]">
          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
            <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: message.text
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
              }}
            />
            {message.products && message.products.length > 0 && (
              <ProductCarousel products={message.products} />
            )}
          </div>
        </div>
      </div>
      {isLast && message.quickReplies && message.quickReplies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="flex flex-wrap gap-1.5 mt-3 pl-[58px] pr-4"
        >
          {message.quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => onQuickReply(reply)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 active:scale-95 transition-all"
            >
              {reply}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function UserBubble({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end px-4 mb-3"
    >
      <div className="max-w-[80%] bg-gray-900 text-white rounded-2xl rounded-tr-md px-4 py-3">
        <p className="text-[13px] leading-relaxed">{message.text}</p>
      </div>
    </motion.div>
  );
}

export default function Search() {
  const slug = useSlug();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { data: productsPage } = usePublicProducts(slug, { tamanho: 200 });
  const products = useMemo(() => (productsPage?.conteudo || []).map(mapProductFromApi), [productsPage]);

  const { data: categoriesRaw = [] } = usePublicCategories(slug);
  const categories = useMemo(() => categoriesRaw.map(mapCategoryFromApi), [categoriesRaw]);

  const { data: cartItemsRaw = [] } = useCart(slug);
  const cartCount = cartItemsRaw.reduce((sum, item) => sum + item.quantidade, 0);

  // Greeting on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([getGreeting()]);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const { response, updatedContext } = processMessage(text, products, categories, context);
      setContext(updatedContext);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Compra Assistida" showBack showCart cartCount={cartCount} />

      {/* Chat area */}
      <main className="flex-1 pt-14 pb-[calc(4rem+env(safe-area-inset-bottom))] w-full max-w-lg mx-auto overflow-y-auto">
        <div className="h-3" />

        {/* Welcome badge */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center mb-4"
          >
            <div className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-500 rounded-full px-3.5 py-2 border border-gray-100">
              <Sparkles className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
              <span className="text-[11px] font-semibold">Assistente de compras aLink</span>
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg, i) =>
            msg.role === 'ai' ? (
              <AiBubble
                key={i}
                message={msg}
                onQuickReply={handleQuickReply}
                isLast={i === messages.length - 1}
              />
            ) : (
              <UserBubble key={i} message={msg} />
            )
          )}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </main>

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto px-4 py-3 flex items-center gap-2"
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre produtos..."
              disabled={isTyping}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-4 py-3 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-0 transition-all disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-2xl bg-gray-900 flex items-center justify-center shrink-0 disabled:opacity-20 active:scale-95 hover:bg-gray-800 transition-all"
          >
            <Send className="w-4 h-4 text-white -rotate-45" strokeWidth={2} />
          </button>
        </form>
      </div>

    </div>
  );
}
