import React, { useState } from 'react';
import { Calendar, Clock, Scissors, MessageSquare, ArrowRight, Sparkles, Shield, CheckCircle, Check } from 'lucide-react';
import { SERVICES, TIME_SLOTS, BUSINESS_INFO } from '../data/barberData';
import { ServiceItem } from '../types';

interface BookingSectionProps {
  preselectedService?: ServiceItem | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedService }) => {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    preselectedService?.id || SERVICES[0].id
  ]);

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // mantém pelo menos um selecionado
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay(); // 0 is Sunday
      const isSunday = dayOfWeek === 0;

      const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const shortMonth = date.toLocaleDateString('pt-BR', { month: 'short' });

      days.push({
        dateString: date.toISOString().split('T')[0],
        dayNumber: date.getDate(),
        dayName: dayNames[dayOfWeek],
        month: shortMonth,
        isSunday,
        isClosed: false,
      });
    }
    return days;
  };

  const daysList = getNextDays();
  const firstAvailableDay = daysList[0].dateString;

  const [selectedDate, setSelectedDate] = useState<string>(firstAvailableDay);
  const [selectedTime, setSelectedTime] = useState<string>('10:30');
  const [timeFilter, setTimeFilter] = useState<'todos' | 'manha' | 'tarde' | 'noite'>('todos');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [observation, setObservation] = useState<string>('');

  const isSelectedDateSunday = new Date(selectedDate + 'T12:00:00').getDay() === 0;

  React.useEffect(() => {
    if (isSelectedDateSunday) {
      const hour = parseInt(selectedTime.split(':')[0], 10);
      if (hour > 12 || hour < 8) {
        setSelectedTime('09:00');
      }
      if (timeFilter === 'tarde' || timeFilter === 'noite') {
        setTimeFilter('todos');
      }
    }
  }, [selectedDate, isSelectedDateSunday]);

  React.useEffect(() => {
    if (preselectedService) {
      setSelectedServiceIds((prev) =>
        prev.includes(preselectedService.id) ? prev : [...prev, preselectedService.id]
      );
    }
  }, [preselectedService]);

  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);

  const totalMinutes = selectedServices.reduce((acc, s) => {
    const match = s.duration.match(/(\d+)/);
    return acc + (match ? parseInt(match[1], 10) : 30);
  }, 0);

  const hasBeardOrHair = selectedServices.some(
    (s) => s.category === 'barba' || s.category === 'cabelo' || s.category === 'combo'
  );

  const availableSlotsForDate = isSelectedDateSunday
    ? TIME_SLOTS.filter((time) => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour >= 8 && hour <= 12;
      })
    : TIME_SLOTS;

  const filteredTimeSlots = availableSlotsForDate.filter((time) => {
    const hour = parseInt(time.split(':')[0], 10);
    if (timeFilter === 'manha') return hour < 12;
    if (timeFilter === 'tarde') return hour >= 12 && hour < 17;
    if (timeFilter === 'noite') return hour >= 17;
    return true;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert('Por favor, informe seu nome para o agendamento.');
      return;
    }

    const formattedDate = new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    const servicesListText = selectedServices
      .map((s) => `• ${s.name} (R$ ${s.price})`)
      .join('%0A');

    const message =
      `*AGENDAMENTO DE HORÁRIO - BARBEARIA NAVALHA*%0A%0A` +
      `*Cliente:* ${encodeURIComponent(customerName.trim())}%0A` +
      (customerPhone ? `*Telefone:* ${encodeURIComponent(customerPhone.trim())}%0A` : '') +
      `*Serviços Selecionados (${selectedServices.length}):*%0A${servicesListText}%0A%0A` +
      `*Valor Total:* R$ ${totalPrice},00%0A` +
      `*Duração Estimada:* ~${totalMinutes} min%0A` +
      (hasBeardOrHair
        ? `*Toalha Aquecida & Lavagem:* Inclusa no atendimento%0A`
        : '') +
      `*Data:* ${encodeURIComponent(formattedDate)}%0A` +
      `*Horário pretendido:* ${encodeURIComponent(selectedTime)}%0A` +
      (observation.trim() ? `*Observações:* ${encodeURIComponent(observation.trim())}%0A` : '') +
      `%0A*Local:* ${encodeURIComponent(BUSINESS_INFO.address)}%0A` +
      `_Por favor, confirmar a disponibilidade deste agendamento na bancada._`;

    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="agendamento" className="relative py-24 sm:py-32 bg-[#07090e] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#E31837]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#1E3A8A]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Poster Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#E31837]" />
            <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
              AGENDAMENTO RÁPIDO • CENTRO DE CASCAVEL
            </span>
          </div>

          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-2">
            AGENDE SEU HORÁRIO
          </h2>

          <p className="font-['Raleway'] text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Selecione um ou mais serviços desejados, o dia e o melhor horário. Os valores e duração são somados automaticamente na hora!
          </p>
        </div>

        {/* Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Interface - 8 cols */}
          <div className="lg:col-span-8 bg-[#0c0f16] border border-[#F5E6C8]/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              {/* Step 1: Select Service (Multi-select) */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                  <label className="flex items-center space-x-2 text-sm font-['Bebas_Neue'] uppercase tracking-wider text-white font-bold">
                    <Scissors className="w-4 h-4 text-[#E31837]" />
                    <span>1. ESCOLHA OS SERVIÇOS (PODE SELECIONAR MAIS DE UM)</span>
                  </label>
                  <span className="text-xs font-['Bebas_Neue'] tracking-wider text-[#F5E6C8] bg-[#141824] px-2.5 py-1 rounded-md border border-white/5 w-fit">
                    {selectedServices.length} {selectedServices.length === 1 ? 'SERVIÇO MARCADO' : 'SERVIÇOS MARCADOS'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedServiceIds.includes(srv.id);
                    return (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#181e2d] border-[#E31837] shadow-lg shadow-[#E31837]/20 ring-1 ring-[#E31837]'
                            : 'bg-[#10141e] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3 pr-2">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#E31837] text-white shadow-md shadow-[#E31837]/50'
                                : 'border border-white/20 bg-black/30'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="font-['Bebas_Neue'] text-lg text-white tracking-wide leading-snug">
                              {srv.name}
                            </p>
                            <p className="text-xs text-zinc-400 font-['Raleway']">
                              {srv.duration}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-['Bebas_Neue'] text-2xl text-[#F5E6C8]">
                            R$ {srv.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Date (Removed barber preference as requested) */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-['Bebas_Neue'] uppercase tracking-wider text-white font-bold mb-3">
                  <Calendar className="w-4 h-4 text-[#E31837]" />
                  <span>2. ESCOLHA O DIA</span>
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {daysList.map((d) => (
                    <button
                      type="button"
                      key={d.dateString}
                      disabled={d.isClosed}
                      onClick={() => setSelectedDate(d.dateString)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        d.isClosed
                          ? 'opacity-30 cursor-not-allowed bg-[#090b10] border-white/5 text-zinc-600'
                          : selectedDate === d.dateString
                          ? 'bg-[#E31837] border-[#E31837] text-white shadow-lg shadow-[#E31837]/30'
                          : 'bg-[#10141e] border-white/5 text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <p className="text-[10px] font-['Oswald'] uppercase font-bold tracking-wider">
                        {d.dayName.slice(0, 3)}
                      </p>
                      <p className="font-['Bebas_Neue'] text-2xl my-0.5 leading-none">
                        {d.dayNumber}
                      </p>
                      <p className={`text-[9px] uppercase font-['Raleway'] ${d.isSunday ? 'text-[#F5E6C8] font-bold' : 'opacity-80'}`}>
                        {d.isSunday ? '08h-12h' : d.month}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Select Time Slot */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <label className="flex items-center space-x-2 text-sm font-['Bebas_Neue'] uppercase tracking-wider text-white font-bold">
                    <Clock className="w-4 h-4 text-[#E31837]" />
                    <span>
                      3. HORÁRIOS DISPONÍVEIS {isSelectedDateSunday ? '(DOMINGO: 08:00 ÀS 12:00)' : '(INTERVALOS DE 30 MIN)'}
                    </span>
                  </label>

                  {/* Period filter pills */}
                  {!isSelectedDateSunday ? (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
                      {[
                        { id: 'todos', label: 'Todos' },
                        { id: 'manha', label: 'Manhã (08h-11h30)' },
                        { id: 'tarde', label: 'Tarde (12h-16h30)' },
                        { id: 'noite', label: 'Fim de Tarde (17h-19h)' },
                      ].map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setTimeFilter(p.id as any)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-['Bebas_Neue'] tracking-wider uppercase transition-colors cursor-pointer ${
                            timeFilter === p.id
                              ? 'bg-[#E31837] text-white shadow-sm'
                              : 'bg-[#121622] text-zinc-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] font-['Raleway'] text-[#F5E6C8] font-semibold bg-[#F5E6C8]/10 px-2 py-0.5 rounded border border-[#F5E6C8]/30">
                      ⚡ Funcionamento Exclusivo: 08:00 às 12:00
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
                  {filteredTimeSlots.map((time) => {
                    const hour = parseInt(time.split(':')[0], 10);
                    const periodLabel = hour < 12 ? 'Manhã' : hour < 17 ? 'Tarde' : 'Noite';
                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-2.5 rounded-xl border text-xs sm:text-sm font-['Oswald'] tracking-wider font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          selectedTime === time
                            ? 'bg-[#E31837] border-[#E31837] text-white shadow-lg shadow-[#E31837]/35 ring-1 ring-white/20'
                            : 'bg-[#10141e] border-white/5 text-zinc-300 hover:border-white/20 hover:bg-[#151a27]'
                        }`}
                      >
                        <span>{time}</span>
                        <span className="text-[9px] font-['Raleway'] font-normal opacity-70">
                          {periodLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    SEU NOME COMPLETO *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    className="w-full px-4 py-3 rounded-lg bg-[#10141e] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    SEU WHATSAPP / TELEFONE
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(85) 99999-9999"
                    className="w-full px-4 py-3 rounded-lg bg-[#10141e] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-['Bebas_Neue'] uppercase tracking-wider text-zinc-300 font-semibold mb-1.5">
                    OBSERVAÇÃO SOBRE O CORTE OU ESTILO (OPCIONAL)
                  </label>
                  <input
                    type="text"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Ex: Quero disfarce bem na zero e barba bem desenhada"
                    className="w-full px-4 py-3 rounded-lg bg-[#10141e] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E31837] transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded bg-[#E31837] hover:bg-[#b9102b] text-white font-['Bebas_Neue'] text-xl uppercase tracking-widest font-bold shadow-xl shadow-[#E31837]/35 transition-all flex items-center justify-center space-x-3 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>CONFIRMAR AGENDAMENTO VIA WHATSAPP</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Summary Column - 4 cols */}
          <div className="lg:col-span-4 bg-[#0c0f16] border border-[#F5E6C8]/15 rounded-2xl p-6 sm:p-7 shadow-xl sticky top-28">
            <h3 className="font-['Bebas_Neue'] text-2xl uppercase tracking-wider text-white pb-3 border-b border-white/10 flex items-center justify-between">
              <span>RESUMO DO HORÁRIO</span>
              <Sparkles className="w-4 h-4 text-[#F5E6C8]" />
            </h3>

            <div className="py-4 space-y-3.5 text-sm border-b border-white/10 font-['Raleway']">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400 text-xs font-['Bebas_Neue'] uppercase tracking-wider">
                    Serviços Selecionados ({selectedServices.length}):
                  </span>
                  <span className="text-[11px] text-zinc-500 font-['Raleway']">Clique no card para alternar</span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedServices.map((srv) => (
                    <div key={srv.id} className="flex justify-between items-center text-xs bg-[#10141e] border border-white/5 px-3 py-2 rounded-lg">
                      <div>
                        <p className="font-bold text-white font-['Raleway'] leading-tight">{srv.name}</p>
                        <p className="text-[10px] text-zinc-400 font-['Oswald']">{srv.duration}</p>
                      </div>
                      <span className="font-['Bebas_Neue'] text-base text-[#F5E6C8] flex-shrink-0">
                        R$ {srv.price},00
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-zinc-400">Duração estimada total:</span>
                <span className="text-zinc-300 font-semibold font-['Oswald'] tracking-wider">
                  ~{totalMinutes} min
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Atendimento:</span>
                <span className="text-zinc-200 font-semibold flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{hasBeardOrHair ? 'Toalha Aquecida • Lavagem' : 'Sem Fila • Lâmina Nova'}</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Data & Horário:</span>
                <span className="text-[#F5E6C8] font-semibold">
                  {selectedTime} • {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-zinc-300 font-['Bebas_Neue'] text-lg uppercase">
                  Valor Total ({selectedServices.length} {selectedServices.length === 1 ? 'item' : 'itens'}):
                </span>
                <span className="font-['Bebas_Neue'] text-3xl text-[#E31837]">
                  R$ {totalPrice},00
                </span>
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className="pt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-[#10141e] border border-white/5 text-xs text-zinc-300 space-y-1">
                <p className="font-['Bebas_Neue'] text-sm text-white uppercase flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sem Pagamento Adiantado</span>
                </p>
                <p className="text-zinc-400 text-[11px] leading-snug font-['Raleway']">
                  O valor é pago no balcão após o término do atendimento via Pix, Cartão ou Dinheiro.
                </p>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-zinc-500 mb-1 font-['Raleway']">
                  Dúvida rápida sobre disponibilidade?
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="font-['Bebas_Neue'] text-lg tracking-wider text-[#F5E6C8] hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
