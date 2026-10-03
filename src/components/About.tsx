import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Clock, Scissors, Tag, CheckCircle, Sparkles } from 'lucide-react';
import { COMFORT_FEATURES, BUSINESS_INFO } from '../data/barberData';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="relative py-20 sm:py-28 bg-[#06070a] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E31837]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header: Objetivo, Local e Acessível */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#121622] border border-[#F5E6C8]/25 mb-4">
              <Scissors className="w-3.5 h-3.5 text-[#E31837]" />
              <span className="text-xs font-['Bebas_Neue'] tracking-[0.2em] uppercase text-[#F5E6C8]">
                BARBEARIA LOCAL • CENTRO DE CASCAVEL
              </span>
            </div>

            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none mb-3">
              CORTE NA RÉGUA,{' '}
              <span className="text-[#F5E6C8] font-['Alex_Brush'] text-5xl sm:text-6xl lg:text-7xl normal-case block sm:inline">
                preço acessível e atendimento individual
              </span>
            </h2>

            <div className="space-y-3.5 font-['Raleway'] text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                A <strong className="text-white font-semibold">Barbearia Navalha</strong> é um espaço novo no Centro de Cascavel - CE, pensado para quem quer cortar o cabelo e fazer a barba com capricho, preço acessível e atendimento individual.
              </p>
              <p className="text-zinc-400">
                Nosso trabalho é direto e bem feito: degradê na zero bem disfarçado, corte social alinhado, barba desenhada na navalha, sobrancelha e platinado. Atendemos com técnica e atenção ao que você pede.
              </p>
              <p className="text-zinc-400">
                Sem enrolação e sem fila demorada: você agenda o seu horário com praticidade pelo WhatsApp ou pelo site, chega e é atendido na hora.
              </p>
            </div>

            {/* Core Pillars - Objetivos e Reais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#E31837] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Navalhas 100% Descartáveis
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Lâminas novas abertas na sua frente a cada cliente com higiene garantida.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#F5E6C8] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Toalha Aquecida & Lavagem
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Ritual com toalha aquecida relaxante para abrir os poros e lavagem refrescante para sair pronto.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#F5E6C8] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Pontualidade & Sem Fila
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Horário agendado é horário respeitado. Atendimento ágil para o seu dia a dia.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Tag className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Preço Acessível de Verdade
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Tabela de valores acessível para manter seu visual sempre alinhado.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wide">
                    Ambiente Novo & Limpo
                  </h4>
                  <p className="text-xs text-zinc-400 font-['Raleway']">
                    Espaço organizado, bem ventilado e com recepção amigável.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Poster Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#F5E6C8]/20 bg-[#0d1017] p-2 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] max-h-[460px]">
                <img
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80"
                  alt="Barbearia Navalha Cascavel"
                  className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('luzes_alinhado')) {
                      target.src = '/images/luzes_alinhado_1790794918959.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-lg bg-black/85 backdrop-blur-md border border-white/10">
                  <p className="font-['Bebas_Neue'] text-2xl text-white tracking-wider uppercase leading-none">
                    BARBEARIA NAVALHA
                  </p>
                  <p className="text-xs text-[#F5E6C8] font-['Raleway'] mt-1">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-['Bebas_Neue'] tracking-[0.2em] text-[#E31837]">
              POR QUE CORTAR AQUI
            </span>
            <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wider uppercase mt-1">
              O QUE VOCÊ ENCONTRA NA NOSSA BARBEARIA
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-['Raleway'] mt-1">
              Compromisso simples com o seu visual, seu tempo e o seu bolso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMFORT_FEATURES.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-[#0c1017] border border-white/10 overflow-hidden group hover:border-[#F5E6C8]/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('bigode_sobrancelha')) {
                        target.src = '/images/bigode_sobrancelha_1790794950792.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/30 to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-[#E31837] text-white px-2.5 py-1 rounded text-[10px] font-['Bebas_Neue'] tracking-wider uppercase shadow-md">
                    {item.highlight}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-['Bebas_Neue'] text-xl text-white tracking-wider uppercase mb-1.5 group-hover:text-[#F5E6C8] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-['Raleway'] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-['Bebas_Neue'] tracking-wider uppercase text-zinc-400">
                      Cascavel - CE
                    </span>
                    <span className="text-[#F5E6C8] font-['Bebas_Neue'] tracking-wider">
                      Centro
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
