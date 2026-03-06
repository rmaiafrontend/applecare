import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
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

const formatPrice = (price) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 px-4 mb-3">
      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
        <span className="text-[11px] font-black text-white">W</span>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-300 rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
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
    <div className="mt-2.5 -mx-1 overflow-x-auto no-scrollbar">
      <div className="flex gap-2.5 px-1 snap-x snap-mandatory" style={{ minWidth: 'min-content' }}>
        {products.map(product => {
          const hasDiscount = product.original_price && product.original_price > product.price;
          const discountPct = hasDiscount
            ? Math.round((1 - product.price / product.original_price) * 100)
            : 0;

          return (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[140px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'}
                  alt={product.name}
                  className="w-full aspect-square object-cover bg-gray-100"
                />
                {hasDiscount && (
                  <span className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    -{discountPct}%
                  </span>
                )}
                {product.express_delivery && (
                  <span className="absolute top-1.5 right-1.5 bg-gray-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Truck className="w-2.5 h-2.5" /> 1h
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <h4 className="text-[11px] font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[28px]">
                  {product.name}
                </h4>
                <div className="mt-1">
                  {hasDiscount && (
                    <span className="text-[9px] text-gray-400 line-through block">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-gray-900 tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <Link
                    to={createPageUrl(`ProductDetail?id=${product.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-[10px] font-semibold py-1.5 rounded-lg active:scale-95 transition-transform"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ver
                  </Link>
                </div>
              </div>
            </div>
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
      className="flex items-end gap-2.5 px-4 mb-3"
    >
      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
        <span className="text-[11px] font-black text-white">W</span>
      </div>
      <div className="max-w-[calc(100%-60px)] space-y-0">
        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <p className="text-[13px] text-gray-800 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: message.text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }}
          />
          {message.products && message.products.length > 0 && (
            <ProductCarousel products={message.products} />
          )}
        </div>
        {isLast && message.quickReplies && message.quickReplies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="flex flex-wrap gap-1.5 mt-2 ml-0.5"
          >
            {message.quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => onQuickReply(reply)}
                className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:border-gray-400 active:scale-95 transition-all shadow-sm"
              >
                {reply}
              </button>
            ))}
          </motion.div>
        )}
      </div>
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
      <div className="max-w-[80%] bg-gray-900 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
        <p className="text-[13px] leading-relaxed">{message.text}</p>
      </div>
    </motion.div>
  );
}

export default function Search() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { data: products = [] } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.CartItem.list(),
  });

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

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
            <div className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-600 rounded-full px-3 py-1.5 border border-violet-100">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="text-[11px] font-semibold">Assistente de compras WEGX</span>
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto px-4 py-3 flex items-center gap-2.5"
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={isTyping}
              className="w-full bg-white border border-gray-200 rounded-2xl pl-4 pr-4 py-3 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-2xl bg-gray-900 flex items-center justify-center shrink-0 disabled:opacity-30 active:scale-95 transition-all"
          >
            <Send className="w-4.5 h-4.5 text-white" strokeWidth={2} />
          </button>
        </form>
      </div>

    </div>
  );
}
