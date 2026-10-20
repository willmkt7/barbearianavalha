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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <NavalhaLogo className="w-10 h-10" />
              <div>
                <span className="font-['Bebas_Neue'] text-2xl tracking-widest text-white uppercase block leading-none">
                  NAVALHA
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#F5E6C8] uppercase font-['Bebas_Neue']">
                  BARBEARIA EM CASCAVEL - CE
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 font-['Raleway'] max-w-sm">
              Corte de qualidade, preço acessível e atendimento individual. Atendemos com agendamento e ordem de chegada.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-base uppercase text-white tracking-wider mb-3 border-l-2 border-[#E31837] pl-2">
              NAVEGAÇÃO
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 text-xs font-['Raleway']">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white transition-colors">Galeria</a>
              </li>
              <li>
                <a href="#agendamento" className="hover:text-white transition-colors">Agendar</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">Localização</a>
              </li>
            </ul>
          </div>

          {/* Hours & Direct Action */}
          <div className="space-y-3">
            <h4 className="font-['Bebas_Neue'] text-base uppercase text-white tracking-wider mb-3 border-l-2 border-[#1E3A8A] pl-2">
              HORÁRIO & AGENDAMENTO
            </h4>
            <p className="text-xs text-zinc-400 flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#F5E6C8] flex-shrink-0" />
              <span>Seg a Sáb: 08h às 19h • Dom: 08h às 12h</span>
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto py-2 px-5 rounded bg-[#E31837] hover:bg-[#b81029] text-white text-xs font-['Bebas_Neue'] tracking-widest uppercase transition-colors"
            >
              AGENDE SEU HORÁRIO
            </button>
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
