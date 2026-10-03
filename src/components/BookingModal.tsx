import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { SERVICES, TIME_SLOTS, BUSINESS_INFO } from '../data/barberData';
import { ServiceItem } from '../types';
import { NavalhaLogo } from './NavalhaLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    preselectedService?.id || SERVICES[0].id
  ]);
  const [selectedTime, setSelectedTime] = useState<string>('10:30');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');

  useEffect(() => {
    if (preselectedService) {
      setSelectedServiceIds((prev) =>
        prev.includes(preselectedService.id) ? prev : [...prev, preselectedService.id]
      );
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Mantém no mínimo 1
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);

  const hasBeardOrHair = selectedServices.some(
    (s) => s.category === 'barba' || s.category === 'cabelo' || s.category === 'combo'
  );

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Por favor, informe seu nome para prosseguir.');
      return;
    }

    const servicesListText = selectedServices
      .map((s) => `• ${s.name} (R$ ${s.price})`)
      .join('%0A');

    const message =
      `*AGENDAMENTO - BARBEARIA NAVALHA*%0A%0A` +
      `*Cliente:* ${encodeURIComponent(clientName.trim())}%0A` +
      (clientPhone.trim() ? `*Telefone:* ${encodeURIComponent(clientPhone.trim())}%0A` : '') +
      `*Serviços Selecionados (${selectedServices.length}):*%0A${servicesListText}%0A%0A` +
      `*Valor Total:* R$ ${totalPrice},00%0A` +
      (hasBeardOrHair
        ? `*Toalha Aquecida & Lavagem:* Inclusa no atendimento%0A`
        : '') +
      `*Horário Preferencial:* ${encodeURIComponent(selectedTime)}%0A%0A` +
      `_Gostaria de confirmar este agendamento na barbearia._`;

    const url = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${message}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#0c1018] border border-[#F5E6C8]/20 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-[#E31837] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121622] border border-[#F5E6C8]/30 text-[11px] font-['Bebas_Neue'] uppercase tracking-wider text-[#F5E6C8] mb-2">
              <NavalhaLogo className="w-4 h-4" />
              <span>BARBEARIA LOCAL • CASCAVEL</span>
            </div>
            <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide uppercase leading-none">
              AGENDE SEU HORÁRIO
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-['Raleway']">
              Selecione um ou mais serviços para o seu atendimento.
            </p>
          </div>

          <form onSubmit={handleConfirm} className="space-y-4">
            {/* Multi-service Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-bold">
                  SERVIÇOS (CLIQUE PARA SELECIONAR UM OU MAIS)
                </label>
                <span className="text-[11px] font-['Raleway'] text-[#F5E6C8]">
                  {selectedServices.length} marcado{selectedServices.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isSelected = selectedServiceIds.includes(s.id);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#181e2d] border-[#E31837] text-white ring-1 ring-[#E31837]'
                          : 'bg-[#121622] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 pr-1 truncate">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[10px] ${
                            isSelected ? 'bg-[#E31837] text-white' : 'border border-white/25'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-['Bebas_Neue'] tracking-wide truncate">
                          {s.name}
                        </span>
                      </div>
                      <span className="text-xs font-['Bebas_Neue'] text-[#F5E6C8] flex-shrink-0">
                        R$ {s.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time selection (20 available slots with optgroups) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-bold">
                  HORÁRIO ESTIMADO (20 HORÁRIOS DISPONÍVEIS)
                </label>
                <span className="text-[11px] font-['Raleway'] text-[#F5E6C8]">
                  Intervalos de 30 min
                </span>
              </div>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#121622] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E31837]"
              >
                <optgroup label="☀️ Manhã (08:00 - 11:30)">
                  {TIME_SLOTS.filter((t) => parseInt(t.split(':')[0], 10) < 12).map((t) => (
                    <option key={t} value={t}>
                      {t} — Manhã
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌤️ Tarde (12:00 - 16:30)">
                  {TIME_SLOTS.filter(
                    (t) =>
                      parseInt(t.split(':')[0], 10) >= 12 && parseInt(t.split(':')[0], 10) < 17
                  ).map((t) => (
                    <option key={t} value={t}>
                      {t} — Tarde
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌙 Fim de Tarde / Noite (17:00 - 19:00)">
                  {TIME_SLOTS.filter((t) => parseInt(t.split(':')[0], 10) >= 17).map((t) => (
                    <option key={t} value={t}>
                      {t} — Fim de Tarde
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Name and Phone */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-bold mb-1">
                  SEU NOME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do cliente"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121622] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837]"
                />
              </div>

              <div>
                <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-bold mb-1">
                  SEU WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="(85) 99999-9999"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121622] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837]"
                />
              </div>
            </div>

            {/* Ritual Highlight */}
            <div className="p-2.5 rounded-xl bg-[#121622] border border-white/5 flex items-center space-x-2 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
              <span className="font-['Raleway'] text-[11px]">
                {hasBeardOrHair
                  ? 'Ritual de toalha aquecida & lavagem capilar inclusos no atendimento'
                  : 'Lâminas descartáveis trocadas na hora a cada cliente'}
              </span>
            </div>

            {/* Price Preview */}
            <div className="p-3 rounded-xl bg-[#080a0f] border border-white/5 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-['Raleway']">
                Valor Total ({selectedServices.length} {selectedServices.length === 1 ? 'serviço' : 'serviços'}):
              </span>
              <span className="font-['Bebas_Neue'] text-2xl text-[#E31837]">
                R$ {totalPrice},00
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] uppercase tracking-widest text-lg font-bold shadow-xl shadow-[#E31837]/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>ENVIAR NO WHATSAPP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
