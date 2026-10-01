import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Olá! Gostaria de agendar um horário na Barbearia Navalha em Cascavel.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col space-y-2 select-none">
      {/* Interactive Tooltip Card */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#0c1018] border border-white/15 text-white p-3.5 rounded-xl shadow-2xl max-w-[240px] text-xs"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1.5 right-1.5 p-1 text-zinc-400 hover:text-white"
              aria-label="Fechar mensagem"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center space-x-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-['Bebas_Neue'] uppercase font-bold text-[#F5E6C8] tracking-wider text-sm">
                BARBEARIA NAVALHA
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-snug">
              Bancada disponível hoje. Agende em 30 segundos pelo WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Discrete Pulse */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp com a Barbearia Navalha"
        className="relative group p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 shadow-[#25D366]/40"
      >
        {/* Discrete Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none duration-1000" />

        <MessageCircle className="w-7 h-7 relative z-10" />

        {/* Status dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#090b10] rounded-full" />
      </a>
    </div>
  );
};
