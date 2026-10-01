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
    <section id="contato" className="relative py-24 sm:py-32 bg-[#06070a] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#E31837]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#E31837]" />
            <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
              LOCALIZAÇÃO & ATENDIMENTO
            </span>
          </div>

          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-2">
            ONDE ESTAMOS{' '}
            <span className="text-[#F5E6C8] font-['Alex_Brush'] text-5xl sm:text-6xl lg:text-7xl normal-case block sm:inline">
              localizados?
            </span>
          </h2>

          <p className="font-['Raleway'] text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Localização privilegiada no Centro de Cascavel - CE, fácil estacionamento e climatização na temperatura certa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Official Contact Info - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#0c0f16] border border-[#F5E6C8]/20 rounded-2xl p-7 sm:p-8 shadow-xl">
              <h3 className="font-['Bebas_Neue'] text-2xl uppercase tracking-wider text-white mb-6 flex items-center justify-between border-b border-white/10 pb-3">
                <span>DADOS OFICIAIS</span>
                <span className="w-2 h-2 rounded-full bg-[#E31837]" />
              </h3>

              <div className="space-y-6 text-sm font-['Raleway']">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E31837]/15 border border-[#E31837]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#ff4765]" />
                  </div>
                  <div>
                    <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wider">
                      ENDEREÇO
                    </h4>
                    <p className="text-zinc-300 leading-relaxed mt-0.5 text-xs sm:text-sm">
                      {BUSINESS_INFO.address}
                    </p>
                    <a
                      href={BUSINESS_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-[#F5E6C8] hover:text-white font-semibold mt-2 transition-colors font-['Oswald'] uppercase tracking-wider"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#E31837]" />
                      <span>ABRIR NO GOOGLE MAPS</span>
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/20 border border-[#1E3A8A]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wider">
                      TELEFONE & WHATSAPP
                    </h4>
                    <p className="text-zinc-200 leading-relaxed mt-0.5 font-bold font-['Oswald'] text-base tracking-wider">
                      {BUSINESS_INFO.phoneFormatted}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Agendamentos e confirmação de horários
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#F5E6C8]" />
                  </div>
                  <div>
                    <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wider">
                      HORÁRIO DE FUNCIONAMENTO
                    </h4>
                    <div className="space-y-1.5 mt-2">
                      {BUSINESS_INFO.hoursDetail.map((h, i) => (
                        <div key={i} className="text-xs flex items-center justify-between text-zinc-300">
                          <span className="font-medium">{h.days}:</span>
                          <span className="text-[#F5E6C8] font-['Oswald']">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#10141e] to-[#182030] border border-[#F5E6C8]/15 flex items-center justify-between">
              <div>
                <h4 className="font-['Bebas_Neue'] text-xl text-white uppercase tracking-wider">
                  DÚVIDA RÁPIDA?
                </h4>
                <p className="text-xs text-zinc-400 font-['Raleway']">
                  Fale com a bancada diretamente no WhatsApp.
                </p>
              </div>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20a%20Barbearia%20Navalha.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded bg-[#25D366] hover:bg-[#20ba59] text-white font-['Bebas_Neue'] text-base uppercase tracking-wider font-bold shadow-lg transition-all flex items-center space-x-1.5 flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAMAR</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form - 7 cols */}
          <div className="lg:col-span-7 bg-[#0c0f16] border border-[#F5E6C8]/20 rounded-2xl p-7 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-['Bebas_Neue'] text-3xl uppercase tracking-wider text-white mb-2">
                FALE COM O BARBEIRO
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-8 font-['Raleway']">
                Preencha os campos abaixo para tirar dúvidas sobre horários para noivos, serviços ou parcerias.
              </p>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-3 text-emerald-400 text-sm font-['Raleway']">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Sua mensagem foi redirecionada para nosso WhatsApp. Responderemos em instantes!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    NOME COMPLETO *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-lg bg-[#10141e] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    TELEFONE OU WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(85) 99999-9999"
                    className="w-full px-4 py-3 rounded-lg bg-[#10141e] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                    MENSAGEM *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Como podemos te ajudar hoje?"
                    className="w-full px-4 py-3 rounded-lg bg-[#10141e] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded bg-[#E31837] hover:bg-[#b9102b] text-white font-['Bebas_Neue'] text-lg uppercase tracking-widest font-bold shadow-xl shadow-[#E31837]/35 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR MENSAGEM</span>
                </button>
              </form>
            </div>

            <p className="text-[11px] text-zinc-500 text-center mt-6 pt-6 border-t border-white/5 font-['Raleway']">
              Barbearia Navalha • Centro de Cascavel - CE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
