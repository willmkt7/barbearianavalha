import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Check, Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { BARBER_TIPS, BUSINESS_INFO } from '../data/barberData';

interface BarberTipsProps {
  onOpenBooking: () => void;
}

export const BarberTips: React.FC<BarberTipsProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#06070a] border-y border-white/10 overflow-hidden">
      {/* Background Graphic Ambient Lighting */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#E31837]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#1E3A8A]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Editorial Card directly reflecting reference image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#F5E6C8]/20 bg-[#0c0f16] shadow-2xl p-2">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] max-h-[560px]">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
                  alt="Barbeiro Mestre na Bancada"
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/40 to-transparent" />

                {/* Top Badge: "DO CLÁSSICO AO MODERNO" */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <div className="bg-[#E31837] text-white px-3.5 py-1 rounded text-xs font-['Bebas_Neue'] tracking-widest uppercase shadow-lg">
                    DO CLÁSSICO AO MODERNO
                  </div>
                  <span className="text-[11px] font-['Oswald'] uppercase tracking-wider text-[#F5E6C8] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    Cascavel - CE
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-['Oswald'] tracking-[0.25em] uppercase text-[#ff4765] font-bold block mb-1">
                    Cultura de Barbearia
                  </span>
                  <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide uppercase leading-none">
                    A BARBA PERFEITA TE ESPERA
                  </h3>
                  <p className="font-['Alex_Brush'] text-2xl text-[#F5E6C8] my-1">
                    estilo e presença de respeito
                  </p>
                  <p className="text-xs text-zinc-300 font-['Raleway'] leading-relaxed mb-4">
                    O homem que cuida do contorno da navalha e do alinhamento do fade se destaca antes de dizer uma única palavra.
                  </p>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] text-lg tracking-widest uppercase rounded shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>AGENDE SEU HORÁRIO</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dicas para ter uma barba perfeita (from Poster 8) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
              <Scissors className="w-3.5 h-3.5 text-[#E31837]" />
              <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
                DICAS DE BANCADA
              </span>
            </div>

            {/* Poster Header */}
            <div className="mb-8">
              <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-1">
                DICAS PARA TER UMA{' '}
                <span className="text-[#F5E6C8] font-['Alex_Brush'] text-5xl sm:text-6xl lg:text-7xl normal-case block sm:inline">
                  barba perfeita
                </span>
              </h2>
              <p className="font-['Raleway'] text-sm sm:text-base text-zinc-400 mt-2">
                O trabalho que fazemos na bancada com a navalha se mantém por muito mais tempo seguindo estes 6 mandamentos básicos:
              </p>
            </div>

            {/* Tips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {BARBER_TIPS.map((tip) => (
                <div
                  key={tip.step}
                  className="p-4 rounded-xl bg-[#0c1017] border border-white/10 hover:border-[#E31837]/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['Bebas_Neue'] text-2xl text-[#E31837] tracking-wider">
                      {tip.step}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5E6C8]/40 group-hover:bg-[#E31837] transition-colors" />
                  </div>
                  <h4 className="font-['Oswald'] text-base font-bold text-white uppercase tracking-wide mb-1 group-hover:text-[#F5E6C8] transition-colors">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-['Raleway']">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Status Box: ESTAMOS ABERTOS */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#121624] via-[#1a2234] to-[#121624] border border-[#F5E6C8]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                </span>
                <div>
                  <h4 className="font-['Bebas_Neue'] text-xl tracking-wider text-white uppercase">
                    ESTAMOS ABERTOS • SEGUNDA A SÁBADO
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Atendimento ágil, lâminas descartáveis e preço justo no Centro de Cascavel.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] text-base tracking-widest uppercase shadow-md transition-all flex items-center justify-center space-x-2 flex-shrink-0 cursor-pointer"
              >
                <span>AGENDE SEU HORÁRIO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
