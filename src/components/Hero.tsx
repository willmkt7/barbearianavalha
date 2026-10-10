import React from 'react';
import { motion, type Variants } from 'motion/react';
import { Calendar, ArrowRight, MapPin, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';
import { NavalhaLogo } from './NavalhaLogo';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden bg-[#06070a]"
    >
      {/* Background with Dark Vintage Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=85"
          alt="Barbearia Navalha Cascavel"
          className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-[1.2] scale-105"
        />
        {/* Layered Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06070a] via-[#06070a]/85 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E31837]/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#1E3A8A]/15 rounded-full blur-[150px] pointer-events-none" />
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-bg opacity-35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Typography - 8 cols */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 text-left"
          >
            {/* Top Pill / Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2.5 mb-5">
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/30 shadow-lg">
                <NavalhaLogo className="w-5 h-5" />
                <span className="text-[11px] font-['Bebas_Neue'] tracking-[0.25em] uppercase text-[#F5E6C8]">
                  BARBEARIA • CASCAVEL - CE
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-['Oswald'] uppercase tracking-wider hidden sm:inline">
                Preço Acessível & Atendimento Individual
              </span>
            </motion.div>

            {/* Poster Headline directly inspired by reference image */}
            <motion.div variants={itemVariants} className="mb-3">
              <span className="block font-['Alex_Brush'] text-4xl sm:text-5xl lg:text-6xl text-[#F5E6C8] -mb-3 sm:-mb-4">
                Mais que um corte, uma experiência
              </span>
              <h1 className="font-['Bebas_Neue'] tracking-tight text-white leading-[0.92] text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase drop-shadow-2xl">
                BARBEARIA NAVALHA
              </h1>
            </motion.div>

            {/* Sub-headline from poster */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-[#F5E6C8] font-['Oswald'] uppercase tracking-wider font-semibold mb-4 max-w-2xl"
            >
              CORTE DE QUALIDADE, CONFORTO E ATENÇÃO INDIVIDUAL
            </motion.p>

            {/* Clarifying Services Focus with objective local description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-300 leading-relaxed font-['Raleway'] max-w-2xl mb-8"
            >
              Sua barbearia no Centro de Cascavel - CE. Cortes simples e premium, barba com toalha aquecida, combos completos, sobrancelhas, luzes e hidratação. Atendimento pontual, lâminas 100% descartáveis e valores acessíveis para você manter o visual sempre em dia.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10"
            >
              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-8 py-4 rounded bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] text-xl tracking-widest uppercase transition-all duration-300 shadow-xl shadow-[#E31837]/35 hover:shadow-[#E31837]/60 active:scale-[0.98] flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>AGENDE SEU HORÁRIO</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-7 py-4 rounded bg-[#10141e]/90 hover:bg-[#182030] text-zinc-200 hover:text-white font-['Bebas_Neue'] text-lg tracking-widest uppercase border border-white/15 hover:border-[#F5E6C8]/40 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>VISUALIZAR A TABELA DE SERVIÇOS</span>
              </button>
            </motion.div>

            {/* Quick Benefits */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs font-['Oswald'] uppercase tracking-wider text-zinc-300"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>TOALHA AQUECIDA E LAVAGEM</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Lâminas Descartáveis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Preços Acessíveis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>CORTE PREMIUM</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Poster Card Frame - 4 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-4"
          >
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#F5E6C8]/40 via-[#E31837]/30 to-[#1E3A8A]/50 shadow-2xl">
              <div className="relative rounded-2xl bg-[#0a0d14]/95 backdrop-blur-xl p-6 overflow-hidden border border-white/5">
                {/* Poster Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
                  <div className="flex items-center space-x-2.5">
                    <NavalhaLogo className="w-5 h-5" />
                    <span className="font-['Bebas_Neue'] text-base tracking-widest text-[#F5E6C8] uppercase">
                      BARBEARIA NAVALHA
                    </span>
                  </div>
                  <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-['Bebas_Neue'] tracking-wider uppercase">
                    ESTAMOS FUNCIONANDO
                  </span>
                </div>

                {/* Official Logo Showcase */}
                <div className="flex flex-col items-center justify-center py-5 px-4 mb-5 rounded-xl bg-gradient-to-b from-[#131b2f]/60 to-[#0e1320]/40 border border-white/5">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl group-hover:bg-blue-600/35 transition-all duration-500" />
                    <NavalhaLogo className="relative w-28 h-28 drop-shadow-[0_8px_25px_rgba(32,82,205,0.45)] group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="font-['Bebas_Neue'] text-sm tracking-[0.2em] text-[#F5E6C8] uppercase mt-3">
                    Barbearia Navalha
                  </span>
                  <span className="text-[10px] font-['Raleway'] text-zinc-400">
                    TRADIÇÃO - ESTILO - ATITUDE
                  </span>
                </div>

                {/* Location Box styled like Poster 3 ("ONDE ESTAMOS LOCALIZADOS?") */}
                <div className="space-y-3 mb-6 text-xs text-zinc-300">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="w-4 h-4 text-[#E31837] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-['Bebas_Neue'] text-base text-white tracking-wider uppercase">
                        ONDE ESTAMOS LOCALIZADOS?
                      </p>
                      <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                        {BUSINESS_INFO.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-300 pt-1 border-t border-white/5">
                    <Clock className="w-3.5 h-3.5 text-[#F5E6C8] flex-shrink-0" />
                    <span>Seg a Sáb: 08h às 19h • Dom: 08h às 12h</span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded bg-[#E31837] hover:bg-[#b81029] text-white font-['Bebas_Neue'] text-base tracking-widest uppercase shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>AGENDE SEU HORÁRIO</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
