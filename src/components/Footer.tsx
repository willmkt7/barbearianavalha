import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/barberData';
import { NavalhaLogo } from './NavalhaLogo';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050608] border-t border-white/10 pt-16 pb-12 overflow-hidden text-zinc-400">
      {/* Barber Pole Accent Top Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 barber-stripe opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <NavalhaLogo className="w-10 h-10" />
              <div>
                <span className="font-['Bebas_Neue'] text-3xl tracking-widest text-white uppercase block leading-none">
                  NAVALHA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#F5E6C8] uppercase font-['Bebas_Neue']">
                  DO CLÁSSICO AO MODERNO
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 font-['Raleway']">
              A barbearia tradicional de Cascavel - CE. Cortes clássicos e modernos, fade degradê, barba na navalha, sobrancelha, pigmentação e reflexo platinado.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Lâminas Descartáveis & Esterilização</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wider mb-4 border-l-2 border-[#E31837] pl-2">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2 text-xs font-['Raleway']">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Serviços & Preços</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Sobre a Barbearia</a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white transition-colors">Galeria de Cortes</a>
              </li>
              <li>
                <a href="#agendamento" className="hover:text-white transition-colors">Agendamento de Horário</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">Onde Estamos Localizados?</a>
              </li>
            </ul>
          </div>

          {/* Services Quick List */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wider mb-4 border-l-2 border-[#1E3A8A] pl-2">
              SERVIÇOS DE BANCADA
            </h4>
            <ul className="space-y-2 text-xs font-['Raleway']">
              <li className="flex justify-between">
                <span>Degradê</span>
                <span className="font-['Bebas_Neue'] text-sm text-[#F5E6C8]">R$ 30,00</span>
              </li>
              <li className="flex justify-between">
                <span>Corte Social</span>
                <span className="font-['Bebas_Neue'] text-sm text-[#F5E6C8]">R$ 25,00</span>
              </li>
              <li className="flex justify-between">
                <span>Barba</span>
                <span className="font-['Bebas_Neue'] text-sm text-[#F5E6C8]">R$ 20,00</span>
              </li>
              <li className="flex justify-between">
                <span>Sobrancelha</span>
                <span className="font-['Bebas_Neue'] text-sm text-[#F5E6C8]">R$ 5,00</span>
              </li>
              <li className="flex justify-between">
                <span>Corte com Pigmentação</span>
                <span className="font-['Bebas_Neue'] text-sm text-[#F5E6C8]">R$ 45,00</span>
              </li>
              <li className="flex justify-between">
                <span>Luzes / Nevou / Reflexo</span>
                <span className="font-['Bebas_Neue'] text-sm text-[#E31837]">R$ 80,00</span>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-lg uppercase text-white tracking-wider mb-4 border-l-2 border-[#F5E6C8] pl-2">
              CASCAVEL - CE
            </h4>
            <div className="space-y-3 text-xs font-['Raleway']">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#E31837] flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <p className="flex items-center space-x-2 font-bold text-white">
                <Phone className="w-4 h-4 text-[#ff4765] flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-[#ff4765] transition-colors font-['Oswald']">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </p>
              <p className="flex items-start space-x-2 text-zinc-400">
                <Clock className="w-4 h-4 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
                <span>Seg a Sáb: 08:00 - 19:00 • Dom: 08:00 - 12:00</span>
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full mt-2 py-2.5 px-3 rounded bg-[#E31837] hover:bg-[#b81029] text-white text-sm font-['Bebas_Neue'] tracking-widest uppercase transition-colors"
              >
                AGENDE SEU HORÁRIO
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-['Raleway']">
          <p>
            © {currentYear} Barbearia Navalha. Todos os direitos reservados. Cascavel - Ceará.
          </p>

          <p className="font-['Bebas_Neue'] text-sm tracking-widest text-[#F5E6C8]/60 uppercase">
            DO CLÁSSICO AO MODERNO • ESTILO E CONFIANÇA
          </p>
        </div>
      </div>
    </footer>
  );
};
