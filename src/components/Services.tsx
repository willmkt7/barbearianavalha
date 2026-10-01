import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Check, Scissors, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/barberData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenBooking }) => {
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'populares', label: 'Mais Pedidos' },
    { id: 'combo', label: 'Combos' },
    { id: 'cabelo', label: 'Cortes' },
    { id: 'barba', label: 'Barba' },
    { id: 'sobrancelha', label: 'Sobrancelhas' },
    { id: 'luzes', label: 'Luzes & Platinado' },
    { id: 'tratamento', label: 'Hidratação & Matização' },
  ];

  const filteredServices =
    filterCategory === 'todos'
      ? SERVICES
      : filterCategory === 'populares'
      ? SERVICES.filter((s) => s.isPopular)
      : SERVICES.filter((s) => s.category === filterCategory);

  return (
    <section id="servicos" className="relative py-24 sm:py-32 bg-[#08090d] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E31837]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
            <Scissors className="w-3.5 h-3.5 text-[#E31837]" />
            <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
              TABELA OFICIAL DE SERVIÇOS & VALORES
            </span>
          </div>

          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-2">
            DO CLÁSSICO AO{' '}
            <span className="text-[#F5E6C8] font-['Alex_Brush'] text-5xl sm:text-6xl lg:text-7xl normal-case block sm:inline">
              moderno
            </span>
          </h2>

          <p className="font-['Raleway'] text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mt-2 leading-relaxed">
            Tabela completa com cortes simples e premium, barba com toalha quente, combos econômicos, sobrancelhas, luzes e hidratação capilar.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-['Bebas_Neue'] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-[#E31837] text-white shadow-lg shadow-[#E31837]/35 ring-1 ring-white/20'
                    : 'bg-[#10141e] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl bg-gradient-to-b from-[#131722] via-[#0d1017] to-[#08090d] border border-white/10 hover:border-[#E31837]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E31837]/25"
            >
              <div>
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.15] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('luzes_alinhado')) {
                        target.src = '/images/luzes_alinhado_1790794918959.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-[#0d1017]/40 to-transparent" />

                  {/* Highlight Badge */}
                  {service.isPopular && (
                    <div className="absolute top-4 right-4 bg-[#E31837] text-white px-3 py-1 rounded text-xs font-['Bebas_Neue'] tracking-widest uppercase shadow-md flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>MAIS PEDIDO</span>
                    </div>
                  )}

                  {/* Time Badge */}
                  <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-xs text-zinc-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[#ff4765]" />
                    <span className="font-['Oswald'] tracking-wider">{service.duration}</span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between mb-3 border-b border-white/10 pb-3">
                    <h3 className="font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#F5E6C8] transition-colors">
                      {service.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-[#E31837] tracking-wider">
                        R$ {service.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-['Raleway'] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2 text-xs text-zinc-300 font-['Raleway']">
                        <Check className="w-3.5 h-3.5 text-[#E31837] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 px-4 rounded bg-[#10141e] hover:bg-[#E31837] text-white font-['Bebas_Neue'] text-base tracking-widest uppercase border border-white/10 hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2 group/btn cursor-pointer shadow-md"
                >
                  <Clock className="w-4 h-4 text-[#ff4765] group-hover/btn:text-white" />
                  <span>AGENDAR ESTE SERVIÇO</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0e121a] border border-[#F5E6C8]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#E31837]/15 border border-[#E31837]/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#E31837]" />
            </div>
            <div>
              <h4 className="font-['Bebas_Neue'] text-2xl text-white tracking-wider uppercase">
                COMBINE SERVIÇOS & GANHE TEMPO
              </h4>
              <p className="text-xs text-zinc-400 font-['Raleway']">
                Faça cabelo, barba e sobrancelha no mesmo horário com atendimento pontual e toalha quente cortesia.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] text-lg tracking-widest uppercase shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <span>AGENDE SEU HORÁRIO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
