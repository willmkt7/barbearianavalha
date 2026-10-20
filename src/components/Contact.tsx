import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, Navigation, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      return;
    }

    const encoded =
      `*MENSAGEM VIA SITE - BARBEARIA NAVALHA*%0A%0A` +
      `*Nome:* ${encodeURIComponent(name.trim())}%0A` +
      (phone.trim() ? `*Telefone:* ${encodeURIComponent(phone.trim())}%0A` : '') +
      `*Mensagem:* ${encodeURIComponent(message.trim())}`;

    setIsSuccess(true);
    const waUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contato" className="relative py-20 sm:py-28 bg-[#06070a] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#E31837]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#E31837]" />
            <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
              ONDE ESTAMOS
            </span>
          </div>

          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-2">
            LOCALIZAÇÃO & CONTATO
          </h2>

          <p className="font-['Raleway'] text-sm sm:text-base text-zinc-400 leading-relaxed">
            Venha nos visitar no Centro de Cascavel ou tire suas dúvidas diretamente pelo WhatsApp.
          </p>
        </div>

        {/* Simple & Objective Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Endereço */}
          <div className="bg-[#0c0f16] border border-white/10 hover:border-[#F5E6C8]/30 transition-all rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E31837]/15 border border-[#E31837]/30 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#ff4765]" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-xl uppercase tracking-wider text-white mb-2">
                ENDEREÇO
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-['Raleway']">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-xs text-zinc-500 mt-2 font-['Raleway']">
                Vagas para estacionar disponíveis
              </p>
            </div>

            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full mt-6 py-2.5 rounded-lg bg-[#141824] hover:bg-[#1a2030] text-[#F5E6C8] text-xs font-['Oswald'] uppercase tracking-wider transition-colors border border-white/10"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E31837]" />
              <span>COMO CHEGAR (GOOGLE MAPS)</span>
            </a>
          </div>

          {/* Card 2: Horários */}
          <div className="bg-[#0c0f16] border border-white/10 hover:border-[#F5E6C8]/30 transition-all rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#F5E6C8]" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-xl uppercase tracking-wider text-white mb-2">
                HORÁRIOS DE ATENDIMENTO
              </h3>
              <div className="space-y-2 text-sm text-zinc-300 font-['Raleway']">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Segunda a Sábado</span>
                  <span className="font-['Oswald'] text-[#F5E6C8]">08:00 - 19:00</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Domingo</span>
                  <span className="font-['Oswald'] text-[#F5E6C8]">08:00 - 12:00</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-4 font-['Raleway']">
                Atendimento por agendamento ou ordem de chegada
              </p>
            </div>

            <div className="mt-6 py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs font-['Bebas_Neue'] tracking-wider text-emerald-400 uppercase">
                Ambiente 100% Climatizado
              </span>
            </div>
          </div>

          {/* Card 3: WhatsApp & Telefone */}
          <div className="bg-[#0c0f16] border border-white/10 hover:border-[#F5E6C8]/30 transition-all rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="font-['Bebas_Neue'] text-xl uppercase tracking-wider text-white mb-2">
                CONTATO DIRETO
              </h3>
              <p className="font-bold text-white font-['Oswald'] text-2xl tracking-wide mb-1">
                {BUSINESS_INFO.phoneFormatted}
              </p>
              <p className="text-xs text-zinc-400 font-['Raleway'] leading-relaxed">
                Tire dúvidas, consulte horários ou fale direto com o barbeiro na bancada.
              </p>
            </div>

            <a
              href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20a%20Barbearia%20Navalha.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full mt-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-['Bebas_Neue'] text-base uppercase tracking-widest font-bold shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>CHAMAR NO WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
